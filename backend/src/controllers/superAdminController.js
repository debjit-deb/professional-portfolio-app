const ContactMessage = require('../models/ContactMessage');
const Project = require('../models/Project');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await ContactMessage.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    count: contacts.length,
    data: contacts,
  });
});

const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const contact = await ContactMessage.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );

  if (!contact) {
    return res.status(404).json({ success: false, message: 'Contact request not found' });
  }

  res.status(200).json({
    success: true,
    message: 'Contact request updated',
    data: contact,
  });
});

const getOrganizationProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ type: 'organization' });
  res.status(200).json({ success: true, data: projects });
});

const createOrganizationProject = asyncHandler(async (req, res) => {
  const { title, image, liveLink, githubLink, description, techStack } = req.body;

  if (!title || !image || !liveLink) {
    return res.status(400).json({ success: false, message: 'Title, image, and liveLink are required' });
  }

  const project = new Project({
    title,
    image,
    liveLink,
    githubLink,
    description,
    techStack: techStack ? techStack.split(',').map((t) => t.trim()) : [],
    type: 'organization',
  });

  await project.save();

  res.status(201).json({
    success: true,
    message: 'Organization project created successfully',
    data: project,
  });
});

const getAdmins = asyncHandler(async (req, res) => {
  const admins = await User.find({ role: 'admin' }).select('-password');
  res.status(200).json({ success: true, data: admins });
});

module.exports = {
  getContacts,
  updateContact,
  getOrganizationProjects,
  createOrganizationProject,
  getAdmins,
};
