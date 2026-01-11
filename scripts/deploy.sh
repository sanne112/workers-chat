#!/bin/bash

# This script deploys the Cloudflare chat application using Wrangler.

# Exit immediately if a command exits with a non-zero status
set -e

# Build the project
echo "Building the project..."
npm run build

# Deploy the workers
echo "Deploying Cloudflare Workers..."
npx wrangler publish --env production

# Deploy the pages
echo "Deploying Cloudflare Pages..."
npx wrangler pages publish ./pages/public --project-name cloudflare-chat-app --branch main

echo "Deployment completed successfully!"