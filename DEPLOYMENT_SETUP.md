# Automated Deployment Setup Guide

This guide will help you set up automated deployment to Netlify using GitHub Actions.

## Prerequisites

1. GitHub repository with your project code
2. Netlify account (free tier available)
3. Access to repository settings (admin/owner permissions)

## Step 1: Create Netlify Site

### Option A: Manual Setup via Netlify Dashboard
1. Log in to [Netlify](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose "Deploy with GitHub"
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Branch to deploy**: `main` (or `master`)
6. Click "Deploy site"

### Option B: Connect Existing Repository
1. Go to your Netlify dashboard
2. Click "Add new site" → "Import an existing project"
3. Authorize GitHub and select your repository
4. Netlify will auto-detect the build settings from `netlify.toml`

## Step 2: Get Netlify Credentials

1. In your Netlify dashboard, go to **User settings** → **Applications**
2. Under "Personal access tokens", click **New access token**
3. Give it a name (e.g., "GitHub Actions Deploy") and generate the token
4. Copy the token (you won't see it again!)
5. Go to your site's settings → **General** → **Site details**
6. Copy the **Site ID** (also called API ID)

## Step 3: Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:
   - **Name**: `NETLIFY_AUTH_TOKEN`
   - **Value**: Your personal access token from Step 2
4. Add another secret:
   - **Name**: `NETLIFY_SITE_ID`
   - **Value**: Your site ID from Step 2

## Step 4: Enable GitHub Actions

1. Go to your repository's **Actions** tab
2. If prompted, click **"I understand my workflows, enable them"**
3. The workflows should now be enabled and ready to run

## Step 5: Test the Deployment

1. Make a small change to your code (e.g., update a comment)
2. Commit and push to the `main` branch:
   ```bash
   git add .
   git commit -m "Test automated deployment"
   git push origin main
   ```
3. Go to **Actions** tab in your repository to see the workflow running
4. Once complete, check your Netlify site to see the changes

## Workflow Features

### Main Deployment Workflow (`.github/workflows/deploy.yml`)
- **Triggers**: Push to main/master, Pull Requests
- **Production Deploy**: Automatic on main/master branch push
- **Preview Deploy**: Automatic on Pull Request creation/update
- **Quality Checks**: Runs linting before deployment
- **Test Integration**: Runs tests if available

### Security Workflow (`.github/workflows/security.yml`)
- **Dependency Scanning**: Checks for vulnerable dependencies
- **Scheduled Scans**: Daily security checks at 2 AM UTC
- **PR Reviews**: Dependency review for pull requests

## Configuration Files

### `netlify.toml`
- **Build Settings**: Automated build configuration
- **Redirects**: SPA routing support
- **Headers**: Security and caching headers
- **Environment**: Node.js version and build environment

### Branch Strategy
- **Production**: `main` or `master` branch → Production site
- **Preview**: Pull Requests → Deploy previews
- **Branch Deploys**: Other branches → Branch-specific deploys

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check the Actions log for detailed error messages
   - Ensure all dependencies are listed in `package.json`
   - Verify Node.js version compatibility

2. **Missing Secrets**
   - Error: "Error: Input required and not supplied: args"
   - Solution: Add `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` secrets

3. **Deploy Preview Not Working**
   - Check if the Netlify site allows deploy previews
   - Verify the GitHub integration is properly connected

4. **Site Not Loading Correctly**
   - Check for console errors in browser dev tools
   - Verify all assets are properly built and included
   - Check redirects configuration for SPA routing

### Debug Steps

1. **Check GitHub Actions logs**:
   - Go to Actions tab → Select failed workflow → View logs

2. **Check Netlify deploy logs**:
   - Netlify Dashboard → Site → Deploys → Click on specific deploy

3. **Verify build locally**:
   ```bash
   npm install
   npm run build
   npm run preview
   ```

## Environment Variables

If your app requires environment variables:

1. **In Netlify Dashboard**:
   - Site settings → Environment variables
   - Add production variables

2. **In GitHub Secrets** (for build-time variables):
   - Add as repository secrets with `VITE_` prefix
   - Update workflow to pass them to build process

## Performance Optimizations

The setup includes several optimizations:

- **Caching**: Static assets cached for 1 year
- **Security Headers**: CSP, XSS protection, etc.
- **Compression**: Automatic Gzip/Brotli compression
- **CDN**: Global edge network for fast loading

### Bundle Size Optimization

The current build produces a large JavaScript bundle (~1MB). Consider these optimizations:

```bash
# Analyze bundle size
npm run build:analyze

# Implement code splitting in vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          charts: ['recharts'],
          icons: ['lucide-react']
        }
      }
    }
  }
})
```

## Monitoring

### Deploy Notifications
- Netlify sends email notifications for deploy status
- Configure Slack/Discord webhooks in Netlify settings

### Uptime Monitoring
- Use services like UptimeRobot or Pingdom
- Monitor your production URL for availability

## Next Steps

1. **Custom Domain**: Add your domain in Netlify settings
2. **SSL Certificate**: Automatically provided by Netlify
3. **Analytics**: Enable Netlify Analytics or integrate Google Analytics
4. **Forms**: Use Netlify Forms for contact forms
5. **Functions**: Add serverless functions if needed

## Support

- **Netlify Docs**: https://docs.netlify.com/
- **GitHub Actions Docs**: https://docs.github.com/en/actions
- **Community**: Netlify Community Forums