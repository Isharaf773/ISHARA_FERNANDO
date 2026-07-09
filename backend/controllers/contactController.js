import ContactMessage from '../models/ContactMessage.js';

export const createMessage = async (req, res) => {
  try {
    const { name, email, message: msg } = req.body;
    if (!name || !email || !msg) return res.status(400).json({ message: 'name, email and message are required' });

    const messageDoc = new ContactMessage({ name, email, phone: req.body.phone, message: msg });
    await messageDoc.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
