#!/bin/bash

set -euo pipefail

if [ -z "${SUPABASE_URL:-}" ] || [ -z "${POSTGRES_PASSWORD:-}" ]; then
  echo "Usage: SUPABASE_URL and POSTGRES_PASSWORD must be set in environment"
  exit 1
fi

PROJECT_REF=$(echo "$SUPABASE_URL" | sed -E 's#https?://([^.]+)\\.supabase\\.co.*#\1#')
if [ -z "$PROJECT_REF" ]; then
  echo "Failed to derive project ref from SUPABASE_URL: $SUPABASE_URL"
  exit 1
fi

./node_modules/.bin/supabase link --project-ref "$PROJECT_REF" --password "$POSTGRES_PASSWORD"





