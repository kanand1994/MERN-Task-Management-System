const Task = require('../models/Task');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
exports.getTasks = asyncHandler(async (req, res, next) => {
    let query;

    // If user is not admin, only get their tasks
    if (req.user.role !== 'admin') {
        query = Task.find({ user: req.user.id });
    } else {
        // Admin gets all, populate user info
        query = Task.find().populate('user', 'name email');
    }

    const tasks = await query;

    res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks
    });
});

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = asyncHandler(async (req, res, next) => {
    req.body.user = req.user.id; // Add user to request body

    const task = await Task.create(req.body);

    res.status(201).json({
        success: true,
        data: task
    });
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = asyncHandler(async (req, res, next) => {
    let task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({ success: false, error: 'Task not found' });
    }

    // Make sure user owns task or is admin
    if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ success: false, error: 'User not authorized to update this task' });
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        returnDocument: 'after',
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: task
    });
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = asyncHandler(async (req, res, next) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({ success: false, error: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ success: false, error: 'User not authorized to delete this task' });
    }

    await task.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });
});

// @desc    Get admin analytics
// @route   GET /api/tasks/analytics
// @access  Private/Admin
exports.getAnalytics = asyncHandler(async (req, res, next) => {
    const totalUsers = await User.countDocuments();
    const totalTasks = await Task.countDocuments();

    const tasksByStatus = await Task.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const statusCounts = {
        pending: 0,
        'in-progress': 0,
        completed: 0
    };

    tasksByStatus.forEach(t => {
        statusCounts[t._id] = t.count;
    });

    res.status(200).json({
        success: true,
        data: {
            totalUsers,
            totalTasks,
            statusCounts
        }
    });
});
