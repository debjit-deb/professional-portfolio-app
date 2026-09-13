const express = require('express');
const auth = require('../middleware/authMiddleware');
const requireRole = require('../middleware/requireRole');
const {
  getContacts,
  updateContact,
  getOrganizationProjects,
  createOrganizationProject,
  getAdmins,
} = require('../controllers/superAdminController');

const router = express.Router();

// All routes require superadmin role
router.use(auth, requireRole('superadmin'));

router.get('/contacts', getContacts);
router.put('/contacts/:id', updateContact);
router.get('/organization-projects', getOrganizationProjects);
router.post('/organization-projects', createOrganizationProject);
router.get('/admins', getAdmins);

module.exports = router;
