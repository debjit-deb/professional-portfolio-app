const ContactMessage = require('../models/ContactMessage');
const asyncHandler = require('../utils/asyncHandler');

const submitContact = asyncHandler(async (req, res) => {
  const { name, email, phone, address, message } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ success: false, message: 'Name, email, and phone are required' });
  }

  const contact = new ContactMessage({
    name,
    email,
    phone,
    address,
    message,
    status: 'new',
  });

  await contact.save();

  res.status(201).json({
    success: true,
    message: 'Thank you for submitting. We will reach back to you within 3-5 business days.',
  });
});

module.exports = { submitContact };
