#!/bin/bash

set -euo pipefail

# If .env.local already has the values, skip work
if [ -f .env.local ] && grep -q '^SUPABASE_URL=' .env.local && grep -q '^SUPABASE_SERVICE_ROLE_KEY=' .env.local; then
  exit 0
fi

# Prefer existing environment variables (non-interactive, no CLI calls)
SUPABASE_URL_VALUE=${SUPABASE_URL:-}
SERVICE_ROLE_VALUE=${SUPABASE_SERVICE_ROLE_KEY:-}
ANON_KEY_VALUE=${NEXT_PUBLIC_SUPABASE_ANON_KEY:-}

if [ -z "$SUPABASE_URL_VALUE" ] || [ -z "$SERVICE_ROLE_VALUE" ]; then
  echo "ℹ️  Skipping Supabase .env sync (set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY or run 'supabase start' then manually export)."
  exit 0
fi

touch .env.local

update_env() {
  local key="$1"; shift
  local val="$1"; shift
  if [ -z "$val" ]; then return 0; fi
  awk -v k="$key" -v v="$val" '
    BEGIN{done=0}
    $0 ~ "^"k"=" {print k"="v; done=1; next}
    {print}
    END{if(done==0) print k"="v}
  ' .env.local > .env.local.tmp && mv .env.local.tmp .env.local
}

update_env "SUPABASE_URL" "$SUPABASE_URL_VALUE"
update_env "SUPABASE_SERVICE_ROLE_KEY" "$SERVICE_ROLE_VALUE"
update_env "NEXT_PUBLIC_SUPABASE_ANON_KEY" "$ANON_KEY_VALUE"

exit 0


