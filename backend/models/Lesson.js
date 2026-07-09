import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  topic: { type: String },
  classDate: { type: Date },
  academicYear: { type: String },
  language: { type: String, default: 'Sinhala' },
  thumbnailUrl: { type: String },
  videoUrl: { type: String, required: true }, // YouTube embed link
  attachments: [{
    title: String,
    url: String // Cloudinary PDF URL
  }],
  tags: [{ type: String }],
  visibility: { type: Boolean, default: true },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Lesson', lessonSchema);
