import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { seedDB } from './seed.js';

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('MONGODB_URI not set in environment. Please add it to a .env file or set the environment variable.');
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');

    const result = await seedDB();
    console.log(`✅ Seed complete — inserted ${result.count} documents`);
  } catch (err) {
    console.error('❌ Error seeding database:', err.message || err);
    process.exitCode = 1;
  } finally {
    try {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    } catch (e) {
      // ignore
    }
  }
})();
