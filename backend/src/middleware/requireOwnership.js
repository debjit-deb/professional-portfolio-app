const Project = require('../models/Project');

const requireOwnership = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const isOwner = project.owner?.toString() === req.user.id;
    const isSuperAdmin = req.user.role === 'superadmin';

    if (project.type === 'organization' && !isSuperAdmin) {
      return res.status(403).json({ success: false, message: 'Only Super Admin can modify organization projects' });
    }

    if (project.type === 'personal' && !isOwner && !isSuperAdmin) {
      return res.status(403).json({ success: false, message: 'You can only modify your own projects' });
    }

    req.project = project;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = requireOwnership;
