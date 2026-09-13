const User = require('../models/User');
const Project = require('../models/Project');
const asyncHandler = require('../utils/asyncHandler');

const getTeam = asyncHandler(async (req, res) => {
  const team = await User.find({ role: 'admin' }).select('-password');
  res.status(200).json({ success: true, data: team });
});

const getTeamMember = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const member = await User.findOne({ slug, role: 'admin' }).select('-password');

  if (!member) {
    return res.status(404).json({ success: false, message: 'Team member not found' });
  }

  const projects = await Project.find({ owner: member._id, type: 'personal' });

  res.status(200).json({
    success: true,
    data: {
      member,
      projects,
    },
  });
});

module.exports = { getTeam, getTeamMember };
