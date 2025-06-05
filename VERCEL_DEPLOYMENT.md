# Vercel Deployment Guide

This guide explains how to deploy this full-stack application (React frontend + Express backend) to Vercel.

## Deployment URL

The application will be deployed to:
- Main URL: `https://portfolio-excellence.vercel.app`
- API Endpoints: `https://portfolio-excellence.vercel.app/api/*`

## Prerequisites

- A [Vercel](https://vercel.com) account
- [Git](https://git-scm.com/) installed on your machine
- [Node.js](https://nodejs.org/) (v16 or later) installed on your machine

## Setup Steps

### 1. Configure Environment Variables

In your Vercel project settings, add the following environment variables:

- `NODE_ENV`: Set to `production`
- `JWT_SECRET`: Your secret key for JWT authentication
- `PORT`: Vercel will set this automatically, but you can add it for local development
- `SUPABASE_PROJECT_ID`: Your Supabase project ID (if using Supabase)
- `SUPABASE_URL`: Your Supabase URL (if using Supabase)
- `SUPABASE_KEY`: Your Supabase key (if using Supabase)

### 2. Deploy to Vercel

#### Option 1: Deploy from GitHub

1. Push your code to a GitHub repository
2. Log in to your Vercel account
3. Click "Add New..." and select "Project"
4. Import your GitHub repository
5. Configure the project:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: npm run vercel-build
   - Output Directory: dist
6. Click "Deploy"

#### Option 2: Deploy using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the project:
   ```bash
   vercel
   ```

4. Follow the CLI prompts to configure your project

### 3. Verify Deployment

After deployment:

1. Check that your frontend is accessible at your Vercel deployment URL
2. Verify API endpoints are working by accessing `https://your-deployment-url.vercel.app/api/health`

## Configuration Details

The project uses two key configuration files:

### Root `vercel.json`

```json
{
  "version": 2,
  "buildCommand": "npm run vercel-build",
  "outputDirectory": "dist",
  "builds": [
    {
      "src": "server/src/index.js",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/src/index.js"
    },
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Server `vercel.json` (server/vercel.json)

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "src/index.js"
    }
  ]
}
```

### Build Script

The `vercel-build` script in `package.json` builds both the frontend and backend:

```json
"vercel-build": "npm run build && cd server && npm install && npm run build"
```

## Troubleshooting

### API Routes Not Working

If your API routes return 404 errors:
- Check that the `/api` prefix is correctly set in both frontend requests and backend routes
- Verify that the server's `vercel.json` routes are correctly configured
- Check environment variables are properly set

### Build Failures

If your build fails:
- Check the build logs in the Vercel dashboard
- Ensure all dependencies are correctly listed in package.json
- Verify that the build script is correctly configured

### CORS Issues

If you encounter CORS errors:
- Check that your server's CORS configuration allows requests from your frontend domain
- Ensure your API requests use the correct URL format

## Local Development

For local development, create a `.env` file in the root directory with the necessary environment variables. Use the values from `.env.example` as a reference.

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Deploying Express.js to Vercel](https://vercel.com/guides/using-express-with-vercel)
- [Environment Variables in Vercel](https://vercel.com/docs/concepts/projects/environment-variables) 