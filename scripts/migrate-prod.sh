#!/bin/bash

# Production database migration script for Vercel deployment
echo "🚀 Running production database migrations..."

# Check if we're in production environment
if [ "$VERCEL_ENV" = "production" ] || [ "$NODE_ENV" = "production" ]; then
    echo "✅ Production environment detected"

    # If the Supabase CLI access token isn't present, skip migrations (don't fail the build)
    if [ -z "$SUPABASE_ACCESS_TOKEN" ]; then
        echo "ℹ️  SUPABASE_ACCESS_TOKEN not set; skipping migrations during build."
        echo "    Provide a personal access token from Supabase if you want automated prod migrations."
        exit 0
    fi

    # Ensure required DB variables exist when running migrations
    if [ -z "$POSTGRES_PASSWORD" ] || [ -z "$SUPABASE_URL" ]; then
        echo "❌ Missing required environment variables for migrations:"
        echo "   - POSTGRES_PASSWORD (your database password)"
        echo "   - SUPABASE_URL (used to derive project ref)"
        exit 1
    fi

    # Set up Supabase authentication
    echo "🔑 Setting up Supabase authentication..."
    export SUPABASE_ACCESS_TOKEN="$SUPABASE_ACCESS_TOKEN"

    # Derive project ref if not provided, using SUPABASE_URL like https://<ref>.supabase.co
    PROJECT_REF=$(echo "$SUPABASE_URL" | sed -E 's#https?://([^.]+)\\.supabase\\.co.*#\1#')
    if [ -z "$PROJECT_REF" ]; then
        echo "❌ Unable to determine Supabase project ref from SUPABASE_URL: $SUPABASE_URL"
        exit 1
    fi

    # Link to the production project
    echo "🔗 Linking to production Supabase project..."
    timeout 60 ./node_modules/.bin/supabase link --project-ref "$PROJECT_REF" --password "$POSTGRES_PASSWORD"
    LINK_EXIT_CODE=$?

    if [ $LINK_EXIT_CODE -eq 124 ]; then
        echo "❌ Linking timed out after 60 seconds"
        exit 1
    elif [ $LINK_EXIT_CODE -ne 0 ]; then
        echo "❌ Linking failed with exit code: $LINK_EXIT_CODE"
        exit 1
    fi

    # Push migrations to production
    echo "📦 Pushing migrations to production database..."
    timeout 120 ./node_modules/.bin/supabase db push --include-all --include-seed=false --password "$POSTGRES_PASSWORD"
    PUSH_EXIT_CODE=$?

    if [ $PUSH_EXIT_CODE -eq 124 ]; then
        echo "❌ Migration push timed out after 120 seconds"
        exit 1
    elif [ $PUSH_EXIT_CODE -ne 0 ]; then
        echo "❌ Migration push failed with exit code: $PUSH_EXIT_CODE"
        exit 1
    fi

    echo "✅ Production database migrations completed successfully!"
else
    echo "⏭️  Skipping migrations (not in production environment)"
fi


