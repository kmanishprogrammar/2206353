const express = require('express');
const analyticsController = require('../controllers/analyticsController');
const router = express.Router();

router.get('/api/users', analyticsController.handleGetTopUsers);
router.get('/api/posts', analyticsController.handleGetPosts); 

module.exports = router;