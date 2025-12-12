/**
 * Seed Script - Create Test User
 * 
 * This script creates a test user for development/testing purposes.
 * 
 * Usage:
 *   npm run seed:user
 *   or
 *   node src/scripts/seedUser.js
 * 
 * Or with custom credentials:
 *   node src/scripts/seedUser.js test@example.com password123 "Test Name"
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { hashPassword } from '../utils/password.js';
import { config } from '../config/env.js';

const DEFAULT_EMAIL = 'test@ballerpro.com';
const DEFAULT_PASSWORD = 'test123';
const DEFAULT_NAME = 'Test User';

async function seedUser() {
  try {
    // Get email and password from command line args or use defaults
    const email = process.argv[2] || DEFAULT_EMAIL;
    const password = process.argv[3] || DEFAULT_PASSWORD;
    const name = process.argv[4] || DEFAULT_NAME;

    console.log('🌱 Starting user seed...');
    console.log(`📧 Email: ${email}`);
    console.log(`👤 Name: ${name}`);

    // Connect to MongoDB
    await mongoose.connect(config.mongodbUri);
    console.log('✅ Connected to MongoDB');

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('⚠️  User already exists!');
      console.log(`   Email: ${existingUser.email}`);
      console.log(`   ID: ${existingUser._id}`);
      console.log('\n💡 You can login with these credentials:');
      console.log(`   Email: ${email}`);
      console.log(`   Password: ${password}`);
      await mongoose.disconnect();
      return;
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      isEmailVerified: false,
    });

    console.log('✅ Test user created successfully!');
    console.log(`   ID: ${user._id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Name: ${user.name}`);
    console.log('\n🔑 Login Credentials:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log('\n📱 You can now login to the app with these credentials!');

    await mongoose.disconnect();
    console.log('\n✅ Seed completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding user:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Run the seed function
seedUser();




