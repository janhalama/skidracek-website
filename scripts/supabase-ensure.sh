#!/bin/bash

set -euo pipefail

if command -v supabase >/dev/null 2>&1; then
  CLI="supabase"
elif [ -x "./node_modules/.bin/supabase" ]; then
  CLI="./node_modules/.bin/supabase"
else
  echo "⚠️  Supabase CLI not found. Install with: npm i -D supabase or brew install supabase/tap/supabase"
  exit 0
fi

# Only check status; never start/stop to avoid blocking dev startup
$CLI status -o env >/dev/null 2>&1 || true

exit 0


