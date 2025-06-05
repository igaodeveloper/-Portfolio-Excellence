#!/usr/bin/env node

/**
 * Deployment script for Vercel
 * 
 * This script helps deploy the application to Vercel
 * Run with: node deploy.js
 */

import { execSync } from 'child_process';
import readline from 'readline';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🚀 Portfolio Excellence Vercel Deployment Script 🚀\n');

// Check if Vercel CLI is installed
try {
  execSync('vercel --version', { stdio: 'ignore' });
} catch (error) {
  console.log('❌ Vercel CLI is not installed. Installing now...');
  execSync('npm install -g vercel', { stdio: 'inherit' });
}

// Verify vercel.json configuration
function verifyVercelConfig() {
  console.log('🔍 Verifying Vercel configuration...');
  
  // Check root vercel.json
  const rootVercelPath = path.join(__dirname, 'vercel.json');
  if (fs.existsSync(rootVercelPath)) {
    const rootVercel = JSON.parse(fs.readFileSync(rootVercelPath, 'utf8'));
    
    // Ensure proper API routing
    let rootConfigUpdated = false;
    rootVercel.routes = rootVercel.routes.map(route => {
      if (route.src === '/api/(.*)' && !route.dest.startsWith('/')) {
        route.dest = '/' + route.dest;
        rootConfigUpdated = true;
      }
      return route;
    });
    
    // Add health check route if missing
    if (!rootVercel.routes.some(route => route.src === '/health')) {
      rootVercel.routes.splice(1, 0, {
        src: '/health',
        dest: '/server/src/index.js'
      });
      rootConfigUpdated = true;
    }
    
    if (rootConfigUpdated) {
      fs.writeFileSync(rootVercelPath, JSON.stringify(rootVercel, null, 2));
      console.log('✅ Updated root vercel.json configuration');
    }
  }
  
  // Check server vercel.json
  const serverVercelPath = path.join(__dirname, 'server', 'vercel.json');
  if (fs.existsSync(serverVercelPath)) {
    const serverVercel = JSON.parse(fs.readFileSync(serverVercelPath, 'utf8'));
    
    // Ensure proper API routing
    let serverConfigUpdated = false;
    serverVercel.routes = serverVercel.routes.map(route => {
      if (route.src === '/api/(.*)' && !route.dest.startsWith('/')) {
        route.dest = '/' + route.dest;
        serverConfigUpdated = true;
      }
      return route;
    });
    
    // Add health check route if missing
    if (!serverVercel.routes.some(route => route.src === '/health')) {
      serverVercel.routes.push({
        src: '/health',
        dest: '/src/index.js'
      });
      serverConfigUpdated = true;
    }
    
    if (serverConfigUpdated) {
      fs.writeFileSync(serverVercelPath, JSON.stringify(serverVercel, null, 2));
      console.log('✅ Updated server vercel.json configuration');
    }
  }
  
  console.log('✅ Vercel configuration verified');
}

// Ask for environment variables
const questions = [
  {
    name: 'JWT_SECRET',
    message: 'Enter your JWT secret (leave empty for auto-generated):',
    default: () => crypto.randomBytes(32).toString('hex')
  },
  {
    name: 'SUPABASE_PROJECT_ID',
    message: 'Enter your Supabase project ID (leave empty if not using Supabase):',
    default: ''
  },
  {
    name: 'SUPABASE_URL',
    message: 'Enter your Supabase URL (leave empty if not using Supabase):',
    default: ''
  },
  {
    name: 'SUPABASE_KEY',
    message: 'Enter your Supabase key (leave empty if not using Supabase):',
    default: ''
  }
];

const envVars = {};

function askQuestion(index) {
  if (index >= questions.length) {
    verifyVercelConfig();
    deployToVercel();
    return;
  }

  const question = questions[index];
  
  rl.question(`${question.message} `, (answer) => {
    envVars[question.name] = answer || question.default();
    askQuestion(index + 1);
  });
}

function deployToVercel() {
  console.log('\n📦 Preparing for deployment...');
  
  // Set environment variables
  console.log('🔐 Setting environment variables...');
  Object.entries(envVars).forEach(([key, value]) => {
    if (value) {
      try {
        execSync(`vercel env add ${key} production`, { stdio: 'inherit' });
      } catch (error) {
        console.log(`⚠️ Failed to set ${key}. You may need to set it manually in the Vercel dashboard.`);
      }
    }
  });

  // Deploy to Vercel
  console.log('\n🚀 Deploying to Vercel...');
  console.log('\n📌 The application will be deployed to: https://portfolio-excellence.vercel.app');
  try {
    execSync('vercel --prod', { stdio: 'inherit' });
    console.log('\n✅ Deployment complete!');
    console.log('\n🌐 Your application should now be available at: https://portfolio-excellence.vercel.app');
    console.log('🔌 API endpoints are available at: https://portfolio-excellence.vercel.app/api');
    console.log('\n📝 Note: If this is your first deployment, you may need to configure additional settings in the Vercel dashboard.');
  } catch (error) {
    console.error('\n❌ Deployment failed:', error.message);
    console.log('\nTry deploying manually with:');
    console.log('  vercel --prod');
  }

  rl.close();
}

// Start the deployment process
console.log('🔍 Checking project configuration...');
askQuestion(0); 