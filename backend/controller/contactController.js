import Contact from '../models/contactModel.js';

export const sendContactMessage = async (req, res) => {
  try {
    const { firstName, lastName, email, company, phone, message } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: 'Please fill in all required fields.' });
    }

    // Create and save contact message
    const contact = new Contact({ firstName, lastName, email, company, phone, message });
    await contact.save();

    res.status(201).json({ success: true, message: 'Contact message sent successfully.' });
  } catch (error) {
    console.error('Contact message error:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};
