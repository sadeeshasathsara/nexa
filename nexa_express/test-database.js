#!/usr/bin/env node

/**
 * Database Connection Test Script
 * This script tests if your database connection is working
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testDatabaseConnection = async () => {
  try {
    console.log('🔍 Testing database connection...');
    
    // Connect to MongoDB
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nexa';
    console.log(`📡 Connecting to: ${uri}`);
    
    await mongoose.connect(uri);
    console.log('✅ MongoDB Connected Successfully!');
    
    // Test basic operations
    console.log('🧪 Testing basic operations...');
    
    // Create a test collection
    const testCollection = mongoose.connection.db.collection('test');
    
    // Insert a test document
    const testDoc = {
      message: 'Database test successful!',
      timestamp: new Date(),
      testId: Math.random().toString(36).substr(2, 9)
    };
    
    const result = await testCollection.insertOne(testDoc);
    console.log('✅ Document inserted:', result.insertedId);
    
    // Find the document
    const foundDoc = await testCollection.findOne({ _id: result.insertedId });
    console.log('✅ Document found:', foundDoc.message);
    
    // Clean up test document
    await testCollection.deleteOne({ _id: result.insertedId });
    console.log('✅ Test document cleaned up');
    
    // Test your models
    console.log('🏗️ Testing your models...');
    
    // Import your models
    const Donor = (await import('./src/models/donor.models/donor.model.js')).default;
    const Donation = (await import('./src/models/donor.models/donation.model.js')).default;
    
    console.log('✅ Donor model loaded');
    console.log('✅ Donation model loaded');
    
    // Test model validation
    const testDonor = new Donor({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'testpassword123'
    });
    
    console.log('✅ Donor model validation passed');
    
    console.log('\n🎉 Database test completed successfully!');
    console.log('📊 Your database is ready to use!');
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure MongoDB is running');
    console.log('2. Check your MONGODB_URI in .env file');
    console.log('3. Try: mongod --version (to check if MongoDB is installed)');
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
};

// Run the test
testDatabaseConnection();
