const express = require('express');
const { createProject, updateProject, deleteProject } = require('../controllers/projectController');
const auth = require('../middleware/authMiddleware');
const requireOwnership = require('../middleware/requireOwnership');

const router = express.Router();

router.post('/', auth, createProject);
router.put('/:id', auth, requireOwnership, updateProject);
router.delete('/:id', auth, requireOwnership, deleteProject);

module.exports = router;
