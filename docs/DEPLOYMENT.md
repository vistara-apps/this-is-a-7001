# BioCraft AI Deployment Guide

This guide covers various deployment options for BioCraft AI, from development to production environments.

## 🚀 Quick Deploy Options

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vistara-apps/biocraft-ai)

1. **One-click deploy** using the button above
2. **Set environment variables** in Vercel dashboard:
   - `VITE_OPENAI_API_KEY`
   - `VITE_STRIPE_PUBLISHABLE_KEY`
3. **Deploy** - Vercel will automatically build and deploy

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/vistara-apps/biocraft-ai)

1. **Connect repository** to Netlify
2. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Environment variables**:
   - `VITE_OPENAI_API_KEY`
   - `VITE_STRIPE_PUBLISHABLE_KEY`

## 🐳 Docker Deployment

### Local Docker

```bash
# Build the image
docker build -t biocraft-ai .

# Run the container
docker run -p 3000:3000 \
  -e VITE_OPENAI_API_KEY=your_key_here \
  -e VITE_STRIPE_PUBLISHABLE_KEY=your_key_here \
  biocraft-ai
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  biocraft-ai:
    build: .
    ports:
      - "3000:3000"
    environment:
      - VITE_OPENAI_API_KEY=${VITE_OPENAI_API_KEY}
      - VITE_STRIPE_PUBLISHABLE_KEY=${VITE_STRIPE_PUBLISHABLE_KEY}
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

## ☁️ Cloud Platforms

### AWS (Elastic Beanstalk)

1. **Install EB CLI**:
   ```bash
   pip install awsebcli
   ```

2. **Initialize application**:
   ```bash
   eb init biocraft-ai
   ```

3. **Create environment**:
   ```bash
   eb create production
   ```

4. **Set environment variables**:
   ```bash
   eb setenv VITE_OPENAI_API_KEY=your_key_here
   eb setenv VITE_STRIPE_PUBLISHABLE_KEY=your_key_here
   ```

5. **Deploy**:
   ```bash
   eb deploy
   ```

### Google Cloud Platform

1. **Create `app.yaml`**:
   ```yaml
   runtime: nodejs18
   
   env_variables:
     VITE_OPENAI_API_KEY: "your_key_here"
     VITE_STRIPE_PUBLISHABLE_KEY: "your_key_here"
   
   handlers:
   - url: /.*
     static_files: dist/index.html
     upload: dist/index.html
   
   - url: /(.*)
     static_files: dist/\1
     upload: dist/(.*)
   ```

2. **Deploy**:
   ```bash
   gcloud app deploy
   ```

### Azure (Static Web Apps)

1. **Create workflow** in `.github/workflows/azure-static-web-apps.yml`:
   ```yaml
   name: Azure Static Web Apps CI/CD
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build_and_deploy_job:
       runs-on: ubuntu-latest
       steps:
       - uses: actions/checkout@v2
       
       - name: Build And Deploy
         uses: Azure/static-web-apps-deploy@v1
         with:
           azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
           repo_token: ${{ secrets.GITHUB_TOKEN }}
           action: "upload"
           app_location: "/"
           api_location: ""
           output_location: "dist"
         env:
           VITE_OPENAI_API_KEY: ${{ secrets.VITE_OPENAI_API_KEY }}
           VITE_STRIPE_PUBLISHABLE_KEY: ${{ secrets.VITE_STRIPE_PUBLISHABLE_KEY }}
   ```

## 🔧 Environment Configuration

### Production Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OPENAI_API_KEY` | OpenAI API key for bio generation | Yes* |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key for payments | Yes* |
| `NODE_ENV` | Set to `production` | Auto |

*Required for full functionality. App works in demo mode without these.

### Security Considerations

1. **API Keys**: Never commit API keys to version control
2. **Environment Variables**: Use platform-specific secret management
3. **HTTPS**: Always use HTTPS in production
4. **CSP Headers**: Configure Content Security Policy
5. **Rate Limiting**: Implement rate limiting for API endpoints

## 📊 Monitoring & Analytics

### Error Tracking

Add error tracking service (e.g., Sentry):

```bash
npm install @sentry/react @sentry/tracing
```

Configure in `src/main.jsx`:
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
});
```

### Performance Monitoring

1. **Web Vitals**: Built-in performance tracking
2. **Analytics**: Google Analytics or similar
3. **Uptime Monitoring**: UptimeRobot or Pingdom
4. **Log Aggregation**: LogRocket or similar

## 🚀 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - run: npm ci
    - run: npm run test
    - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

### GitLab CI

Create `.gitlab-ci.yml`:

```yaml
stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "18"

test:
  stage: test
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm run test
    - npm run build
  artifacts:
    paths:
      - dist/

deploy:
  stage: deploy
  image: node:$NODE_VERSION
  script:
    - npm install -g netlify-cli
    - netlify deploy --prod --dir=dist --site=$NETLIFY_SITE_ID --auth=$NETLIFY_AUTH_TOKEN
  only:
    - main
```

## 🔍 Health Checks

### Application Health

Create `public/health.json`:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Monitoring Endpoints

- **Health Check**: `/health.json`
- **Version Info**: Check console for build info
- **Performance**: Use browser dev tools

## 📈 Scaling Considerations

### CDN Configuration

1. **Static Assets**: Serve from CDN
2. **Cache Headers**: Configure appropriate caching
3. **Compression**: Enable gzip/brotli compression
4. **Image Optimization**: Use WebP format where possible

### Performance Optimization

1. **Code Splitting**: Implemented via Vite
2. **Lazy Loading**: Components loaded on demand
3. **Bundle Analysis**: Use `npm run build -- --analyze`
4. **Service Worker**: Consider for offline functionality

## 🛠️ Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version (18+ required)
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` and reinstall

2. **Environment Variables**:
   - Ensure variables start with `VITE_`
   - Check platform-specific configuration
   - Verify values are properly escaped

3. **API Issues**:
   - Verify API keys are valid
   - Check network connectivity
   - Review CORS configuration

### Debug Mode

Enable debug logging:
```bash
DEBUG=biocraft:* npm run dev
```

### Log Analysis

Check browser console for:
- API errors
- Network issues
- JavaScript errors
- Performance warnings

## 📞 Support

For deployment support:

- **Documentation**: [docs.biocraft-ai.com](https://docs.biocraft-ai.com)
- **GitHub Issues**: [Report deployment issues](https://github.com/vistara-apps/biocraft-ai/issues)
- **Email**: support@biocraft-ai.com
- **Discord**: [Join our community](https://discord.gg/biocraft-ai)

## 📋 Deployment Checklist

### Pre-deployment

- [ ] Environment variables configured
- [ ] API keys valid and tested
- [ ] Build process successful
- [ ] Tests passing
- [ ] Security headers configured

### Post-deployment

- [ ] Application accessible
- [ ] All features working
- [ ] Error tracking configured
- [ ] Performance monitoring active
- [ ] Backup strategy in place

### Production Readiness

- [ ] HTTPS enabled
- [ ] CDN configured
- [ ] Monitoring alerts set up
- [ ] Documentation updated
- [ ] Team notified of deployment
