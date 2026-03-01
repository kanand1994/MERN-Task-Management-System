const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/asyncHandler');

const generateTokens = (id) => {
    const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};

const sendTokenResponse = (user, statusCode, res, accessToken, refreshToken) => {
    const options = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    };

    res
        .status(statusCode)
        .cookie('refreshToken', refreshToken, options)
        .json({
            success: true,
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
};

exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ success: false, error: 'User already exists' });
    }

    const user = await User.create({ name, email, password, role });
    const { accessToken, refreshToken } = generateTokens(user._id);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    sendTokenResponse(user, 201, res, accessToken, refreshToken);
});

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Please provide an email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const { accessToken, refreshToken } = generateTokens(user._id);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    sendTokenResponse(user, 200, res, accessToken, refreshToken);
});

exports.refresh = asyncHandler(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ success: false, error: 'No refresh token, not authorized' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({ success: false, error: 'Invalid refresh token' });
        }

        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        res.status(200).json({
            success: true,
            accessToken,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        return res.status(401).json({ success: false, error: 'Refresh token expired or invalid' });
    }
});

exports.logout = asyncHandler(async (req, res, next) => {
    if (req.user) {
        req.user.refreshToken = '';
        await req.user.save({ validateBeforeSave: false });
    }
    res.cookie('refreshToken', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({ success: true, data: {} });
});

exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
});
