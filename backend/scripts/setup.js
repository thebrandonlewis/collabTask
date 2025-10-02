/**
 * CollabTask Backend Setup Script
 * 
 * Automated setup script for Strapi backend
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up CollabTask Strapi Backend...');

// Create necessary directories
const directories = [
  'src/api',
  'src/extensions',
  'src/middlewares',
  'src/plugins',
  'config',
  'database',
  'public',
  'uploads',
  '.tmp',
];

directories.forEach(dir => {
  const dirPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', 'env.example');

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  fs.copyFileSync(envExamplePath, envPath);
  console.log('✅ Created .env file from template');
}

// Create database directory
const dbDir = path.join(__dirname, '..', 'database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log('✅ Created database directory');
}

console.log('🎉 CollabTask Backend setup complete!');
console.log('');
console.log('Next steps:');
console.log('1. Run: npm install');
console.log('2. Run: npm run develop');
console.log('3. Access admin panel at: http://localhost:1337/admin');
console.log('4. Create your admin account');
console.log('5. Configure API permissions');
