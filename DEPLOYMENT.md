# Deployment Guide

## 🚀 Automated Deployment (Recommended)

**NEW**: This project now includes automated deployment workflows!

📋 **Quick Setup**: See [`DEPLOYMENT_SETUP.md`](./DEPLOYMENT_SETUP.md) for complete automated deployment setup.

### Features
- ✅ Automatic deployment on push to main branch
- ✅ Deploy previews for pull requests
- ✅ Security scanning and dependency checks
- ✅ Build optimization and caching
- ✅ SPA routing support

### Files Added
- [`netlify.toml`](./netlify.toml) - Netlify configuration
- [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) - Main deployment workflow
- [`.github/workflows/security.yml`](./.github/workflows/security.yml) - Security checks

## Manual Netlify Deployment

1. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18 or higher

2. **Environment Variables** (if needed):
   ```
   NODE_VERSION=18
   ```

3. **Deploy Steps**:
   - Connect your GitHub repository to Netlify
   - Configure build settings as above
   - Deploy automatically on push to main branch

## Vercel Deployment

1. **Import from GitHub**:
   - Connect your GitHub account
   - Import the repository
   - Vercel auto-detects Vite configuration

2. **Build Settings** (auto-configured):
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

## Manual Deployment

1. **Build the project**:
   ```bash
   npm install
   npm run build
   ```

2. **Deploy the `dist` folder** to any static hosting service:
   - GitHub Pages
   - AWS S3 + CloudFront
   - Firebase Hosting
   - Surge.sh

## Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## Performance Optimization

- The app is already optimized with:
  - Code splitting via React Router
  - Optimized Tailwind CSS build
  - Vite's built-in optimizations
  - Responsive images and lazy loading

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ support required
- Mobile responsive design included
