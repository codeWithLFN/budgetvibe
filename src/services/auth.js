import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const generateToken = (id) => {
    return jwt.sign({ id }, import.meta.env.VITE_JWT_SECRET, {
        expiresIn: '30d',
    });
};

export const createUser = async (email, password, name) => {
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new Error('User already exists');
        }

        const user = await User.create({
            name,
            email,
            password
        });

        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            }
        };
    } catch (error) {
        throw new Error('Failed to create user: ' + error.message);
    }
};

export const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            // Update last login
            user.lastLogin = new Date();
            await user.save();

            return {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user._id)
                }
            };
        }
        throw new Error('Invalid email or password');
    } catch (error) {
        throw new Error('Login failed: ' + error.message);
    }
};

export const getCurrentUser = async (token) => {
    try {
        if (!token) {
            return null;
        }
        const decoded = jwt.verify(token, import.meta.env.VITE_JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        return user;
    } catch {
        return null;
    }
};

export const updateUserProfile = async (userId, data) => {
    try {
        const user = await User.findByIdAndUpdate(
            userId, 
            data,
            { new: true }
        ).select('-password');
        return user;
    } catch (error) {
        throw new Error('Failed to update user profile: ' + error.message);
    }
};

export const resetPassword = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        // Note: Implement actual password reset email functionality here
        // For now, throwing an error as email service needs to be implemented
        throw new Error('Password reset functionality not implemented');
    } catch (error) {
        throw new Error('Password reset failed: ' + error.message);
    }
};