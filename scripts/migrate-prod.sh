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

    # Determine project ref (env override first, otherwise derive from URL)
    if [ -n "$SUPABASE_PROJECT_REF" ]; then
        PROJECT_REF="$SUPABASE_PROJECT_REF"
    else
        CANDIDATE_URL="$SUPABASE_URL"
        # Accept raw 20-char ref directly
        if echo "$CANDIDATE_URL" | grep -Eq '^[a-z0-9]{20}$'; then
            PROJECT_REF="$CANDIDATE_URL"
        else
            # Extract subdomain before .supabase.co or .supabase.in
            PROJECT_REF=$(echo "$CANDIDATE_URL" | sed -E 's#https?://([^.]+)\.supabase\.(co|in).*#\1#')
        fi
    fi

    if ! echo "$PROJECT_REF" | grep -Eq '^[a-z0-9]{20}$'; then
        echo "❌ Invalid project ref format. Must be a 20-char lowercase string."
        echo "   Set SUPABASE_PROJECT_REF explicitly (Dashboard → Settings → General)"
        echo "   or ensure SUPABASE_URL is like https://<ref>.supabase.co"
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


