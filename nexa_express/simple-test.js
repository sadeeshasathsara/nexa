#!/usr/bin/env node

/**
 * Simple MongoDB Connection Test
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔍 Testing MongoDB connection...');
console.log('📡 Connection string:', process.env.MONGODB_URI ? 'Found' : 'Not found');

if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env file');
  process.exit(1);
}

// Test connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully!');
    console.log('📊 Database name:', mongoose.connection.db.databaseName);
    
    // List collections
    mongoose.connection.db.listCollections().toArray()
      .then(collections => {
        console.log('📁 Collections:', collections.map(c => c.name));
        process.exit(0);
      });
  })
  .catch(error => {
    console.error('❌ Connection failed:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.log('\n🔧 Authentication Error:');
      console.log('1. Check your username and password in the connection string');
      console.log('2. Verify the database user exists in Atlas');
      console.log('3. Make sure the user has proper permissions');
      console.log('4. Check if the password contains special characters that need encoding');
    }
    
    process.exit(1);
  });