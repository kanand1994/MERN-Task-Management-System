const express = require('express');
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    getAnalytics
} = require('../controllers/taskController');

const { protect, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All task routes require authentication

router.route('/analytics').get(authorizeRoles('admin'), getAnalytics);

router
    .route('/')
    .get(getTasks)
    .post(createTask);

router
    .route('/:id')
    .put(updateTask)
    .delete(deleteTask);

module.exports = router;
