#!/bin/sh

set -e

pnpm i --frozen-lockfile
pnpm update:version

pnpm build

cd dist/vz-components
npm publish --provenance
cd -

echo "✅ Publish completed"
