import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Category from './models/Category.js';
import Lesson from './models/Lesson.js';
import ContactMessage from './models/ContactMessage.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Category.deleteMany();
    await Lesson.deleteMany();
    await ContactMessage.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Ishara@1234', salt);

    await User.create({
      username: 'ISHARAF773',
      email: 'isharaf773@gmail.com',
      password: hashedPassword,
      role: 'admin'
    });

    const categories = await Category.insertMany([
      { name: 'Grade 08', description: 'School syllabus mathematics for Grade 8 students. Foundation building with clear explanations and exercises.' },
      { name: 'Grade 09', description: 'School syllabus mathematics for Grade 9 students. Structured lessons covering geometry, algebra, and logic.' },
      { name: 'Grade 10', description: 'School syllabus mathematics for Grade 10 students. Pre-O/L syllabus coverage with comprehensive assessments.' },
      { name: 'Grade 11', description: 'O/L Mathematics syllabus coverage. Fast revision, model paper discussions, and past paper analysis.' },
      { name: '2027 A/L', description: 'Combined Mathematics theory and revision for 2027 Advanced Level students. Covers Pure and Applied Maths.' },
      { name: '2028 A/L', description: 'Combined Mathematics theory and revision for 2028 Advanced Level students. Comprehensive syllabus coverage from scratch.' },
      { name: '2027 A/L Paper Class', description: 'Exclusive paper discussions, model papers, and past paper marking for 2027 A/L Combined Maths students.' }
    ]);

    await Lesson.create([
      {
        title: 'Trigonometry Part 1',
        description: 'Introduction to basic trigonometric concepts',
        categoryId: categories[0]._id,
        topic: 'Trigonometry',
        classDate: new Date('2024-01-10'),
        academicYear: '2025 A/L',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
        thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg', // Placeholder
        featured: true
      },
      {
        title: '2023 A/L Past Paper MCQ Discussion',
        description: 'In-depth discussion of 2023 MCQs',
        categoryId: categories[1]._id,
        topic: 'Past Papers',
        classDate: new Date('2024-02-15'),
        academicYear: '2025 A/L',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
        featured: true
      }
    ]);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  // Can add destroy data logic here if needed
} else {
  importData();
}
