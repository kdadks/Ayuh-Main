#!/bin/bash

# Quick deployment script for Ayuh Clinic Web App
# Usage: ./scripts/deploy.sh [environment]
# Environment: production (default), staging, preview

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default environment
ENVIRONMENT=${1:-production}

echo -e "${BLUE}🚀 Ayuh Clinic Deployment Script${NC}"
echo -e "${BLUE}Environment: ${ENVIRONMENT}${NC}"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Please run this script from the project root.${NC}"
    exit 1
fi

# Check if netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo -e "${YELLOW}⚠️  Netlify CLI not found. Installing...${NC}"
    npm install -g netlify-cli
fi

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm ci

# Run linting
echo -e "${BLUE}🔍 Running linting...${NC}"
npm run lint

# Build the project
echo -e "${BLUE}🏗️  Building project...${NC}"
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Build failed: dist directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completed successfully${NC}"

# Deploy based on environment
case $ENVIRONMENT in
    "production")
        echo -e "${BLUE}🌐 Deploying to production...${NC}"
        netlify deploy --prod --dir=dist
        ;;
    "staging"|"preview")
        echo -e "${BLUE}🔍 Deploying preview...${NC}"
        netlify deploy --dir=dist
        ;;
    *)
        echo -e "${RED}❌ Unknown environment: $ENVIRONMENT${NC}"
        echo -e "${YELLOW}Available environments: production, staging, preview${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${BLUE}Check your Netlify dashboard for deployment details.${NC}"