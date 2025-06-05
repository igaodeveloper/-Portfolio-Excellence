#!/usr/bin/env node

/**
 * Simple Vercel deployment script
 * Run with: node deploy-vercel.js
 */

import { execSync } from 'child_process';

console.log('🚀 Deploying to Vercel...');

try {
  // First deployment - creates project if it doesn't exist
  console.log('Creating project and deploying...');
  execSync('vercel --prod', { stdio: 'inherit' });
  console.log('✅ Deployment complete!');
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  console.log('Try running these commands manually:');
  console.log('1. vercel');
  console.log('2. vercel --prod');
} 