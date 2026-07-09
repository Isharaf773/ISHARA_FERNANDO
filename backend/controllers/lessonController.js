import Lesson from '../models/Lesson.js';

export const getLessons = async (req, res) => {
  try {
    const { search, category, year, isFeatured } = req.query;
    let query = { visibility: true };

    if (search) query.title = { $regex: search, $options: 'i' };
    if (category) query.categoryId = category;
    if (year) query.academicYear = year;
    if (isFeatured === 'true') query.featured = true;

    // Admin can see all, handled differently if needed, but for now this is public endpoint
    const lessons = await Lesson.find(query).populate('categoryId', 'name').sort({ createdAt: -1 });
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate('categoryId', 'name');
    if (lesson) {
      res.json(lesson);
    } else {
      res.status(404).json({ message: 'Lesson not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createLesson = async (req, res) => {
  try {
    const { title, categoryId, videoUrl } = req.body;
    if (!title || !categoryId || !videoUrl) {
      return res.status(400).json({ message: 'title, categoryId and videoUrl are required' });
    }

    const lesson = new Lesson(req.body);
    await lesson.save();
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteLesson = async (req, res) => {
  try {
    await Lesson.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lesson removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getAdminLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find().populate('categoryId', 'name').sort({ createdAt: -1 });
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
