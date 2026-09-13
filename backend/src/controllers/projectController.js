const Project = require('../models/Project');
const asyncHandler = require('../utils/asyncHandler');

const createProject = asyncHandler(async (req, res) => {
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
    type: 'personal',
    owner: req.user.id,
  });

  await project.save();

  res.status(201).json({
    success: true,
    message: 'Project created successfully',
    data: project,
  });
});

const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, image, liveLink, githubLink, description, techStack } = req.body;

  const project = await Project.findByIdAndUpdate(
    id,
    {
      title,
      image,
      liveLink,
      githubLink,
      description,
      techStack: techStack ? techStack.split(',').map((t) => t.trim()) : [],
    },
    { new: true, runValidators: true }
  );

  if (!project) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }

  res.status(200).json({ success: true, message: 'Project updated successfully', data: project });
});

const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const project = await Project.findByIdAndDelete(id);

  if (!project) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }

  res.status(200).json({ success: true, message: 'Project deleted successfully' });
});

module.exports = { createProject, updateProject, deleteProject };
