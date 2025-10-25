#!/usr/bin/env node

/**
 * Simple MongoDB Atlas Connection Test
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
  try {
    console.log('🔍 Testing MongoDB Atlas connection...');
    
    const uri = process.env.MONGODB_URI;
    console.log('📡 Connection string:', uri ? 'Found' : 'Not found');
    
    if (!uri) {
      console.error('❌ MONGODB_URI not found in .env file');
      return;
    }
    
    // Test connection
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB Atlas successfully!');
    
    // Test basic operation
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('📊 Available collections:', collections.map(c => c.name));
    
    console.log('🎉 Database connection test passed!');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.log('\n🔧 Authentication Error Solutions:');
      console.log('1. Check your username and password in the connection string');
      console.log('2. Verify the database user exists in Atlas');
      console.log('3. Make sure the user has proper permissions');
    }
    
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

testConnection();
