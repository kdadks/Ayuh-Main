# 🚀 Automated Deployment System

This project includes a comprehensive automated deployment system for Netlify with GitHub Actions.

## Quick Start

### Automated Deployment (Recommended)
1. Follow the setup guide: [`DEPLOYMENT_SETUP.md`](../DEPLOYMENT_SETUP.md)
2. Push to `main` branch → Automatic production deployment
3. Create Pull Request → Automatic preview deployment

### Manual Deployment
```bash
# Deploy to production
npm run deploy

# Deploy preview
npm run deploy:preview

# Deploy to staging
npm run deploy:staging
```

## Files Overview

| File | Purpose |
|------|---------|
| [`netlify.toml`](../netlify.toml) | Netlify configuration, redirects, headers |
| [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) | Main deployment workflow |
| [`.github/workflows/security.yml`](../.github/workflows/security.yml) | Security and dependency checks |
| [`scripts/deploy.sh`](../scripts/deploy.sh) | Manual deployment script |
| [`DEPLOYMENT_SETUP.md`](../DEPLOYMENT_SETUP.md) | Complete setup instructions |

## Workflow Features

### 🔄 Continuous Deployment
- **Production**: Automatic deployment on `main` branch
- **Previews**: Deploy previews for all pull requests
- **Quality Gates**: Linting and testing before deployment

### 🔒 Security
- Daily dependency vulnerability scans
- Automated security headers
- Content Security Policy (CSP)
- XSS and clickjacking protection

### ⚡ Performance
- Static asset caching (1 year)
- Gzip/Brotli compression
- Global CDN distribution
- SPA routing optimization

### 📊 Monitoring
- Build status notifications
- Deploy preview comments on PRs
- Audit logs and dependency tracking

## Environment Support

| Environment | Branch | URL Type | Purpose |
|-------------|---------|----------|---------|
| Production | `main`/`master` | Custom domain | Live site |
| Preview | PR branches | `.netlify.app` | Testing changes |
| Branch Deploy | Feature branches | `.netlify.app` | Development |

## Common Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build locally

# Deployment
npm run deploy          # Deploy to production
npm run deploy:preview  # Deploy preview
npm run lint           # Check code quality

# Analysis
npm run build:analyze   # Analyze bundle size
```

## Troubleshooting

### Build Fails
1. Check GitHub Actions logs
2. Verify all dependencies in `package.json`
3. Test build locally: `npm run build`

### Deploy Fails
1. Check Netlify deploy logs
2. Verify GitHub secrets are set
3. Ensure Netlify site is properly configured

### Site Not Loading
1. Check browser console for errors
2. Verify SPA redirects in `netlify.toml`
3. Check CSP headers if scripts blocked

## Configuration

### Environment Variables
Add to Netlify site settings or GitHub secrets:
```bash
# Build-time variables (prefix with VITE_)
VITE_API_URL=https://api.example.com
VITE_APP_ENV=production

# Runtime variables
NODE_VERSION=18
```

### Custom Domain
1. Add domain in Netlify site settings
2. Update DNS records as instructed
3. SSL certificate auto-generated

### Advanced Configuration
Edit [`netlify.toml`](../netlify.toml) for:
- Custom redirects
- Function deployments
- Header modifications
- Build settings

## Support & Resources

- 📖 [Netlify Documentation](https://docs.netlify.com/)
- 🛠️ [GitHub Actions Documentation](https://docs.github.com/en/actions)
- 💬 [Netlify Community](https://community.netlify.com/)
- 🐛 [Report Issues](../../issues)

---

**Need help?** Check the troubleshooting section in [`DEPLOYMENT_SETUP.md`](../DEPLOYMENT_SETUP.md) or create an issue.