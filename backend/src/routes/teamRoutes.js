const express = require('express');
const { getTeam, getTeamMember } = require('../controllers/teamController');

const router = express.Router();

router.get('/', getTeam);
router.get('/:slug', getTeamMember);

module.exports = router;
