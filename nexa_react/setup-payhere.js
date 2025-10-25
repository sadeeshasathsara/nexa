#!/usr/bin/env node

/**
 * PayHere.lk Integration Setup Script
 * This script helps set up the PayHere integration
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up PayHere.lk Payment Gateway Integration...\n');

// Check if we're in the right directory
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ Error: Please run this script from the nexa_react directory');
  process.exit(1);
}

// Create environment file template
const envTemplate = `# PayHere.lk Payment Gateway Configuration for Vite
# Note: Vite uses VITE_ prefix for environment variables

# PayHere Merchant Credentials
# Get these from your PayHere merchant account at https://www.payhere.lk/
VITE_PAYHERE_MERCHANT_ID=1217129
VITE_PAYHERE_MERCHANT_SECRET=MzQ0NTU4NzE5MTMxMjE3MTI5OTUxMzE0ODUwMTE=
VITE_PAYHERE_SANDBOX=true

# API Configuration
VITE_API_URL=http://localhost:5000
`;

const envPath = path.join(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envTemplate);
  console.log('✅ Created .env file with PayHere configuration');
} else {
  console.log('⚠️  .env file already exists. Please add PayHere configuration manually.');
}

// Check if crypto-js is installed
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

if (!dependencies['crypto-js']) {
  console.log('📦 Installing crypto-js dependency...');
  console.log('   Run: npm install crypto-js');
  console.log('   Or use the dependency-free version: payhere-simple.utils.js (already configured)');
} else {
  console.log('✅ crypto-js is already installed');
}

console.log('\n🎉 PayHere Integration Setup Complete!');
console.log('\n📋 Next Steps:');
console.log('1. Get your PayHere merchant credentials from https://www.payhere.lk/');
console.log('2. Update the .env file with your credentials');
console.log('3. Start your development server: npm run dev');
console.log('4. Test the integration using the donation form');
console.log('\n📚 Documentation: See PAYHERE_INTEGRATION.md for detailed setup instructions');

console.log('\n🔧 Configuration Files:');
console.log('   - Frontend: .env (PayHere credentials)');
console.log('   - Backend: nexa_express/.env (PayHere credentials)');
console.log('   - Utils: src/utils/payhere-simple.utils.js (dependency-free)');

console.log('\n✨ The PayHere integration is ready to use!');
