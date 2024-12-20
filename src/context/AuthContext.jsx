import { createContext, useContext, useState, useEffect } from 'react';
import { account } from '../services/appwrite';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Check if user is logged in
    useEffect(() => {
        checkUser();
    }, []);

    // Verify current session
    const checkUser = async () => {
        try {
            const session = await account.getSession('current');
            setUser(session);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Login function
    const login = async (email, password) => {
        try {
            const session = await account.createEmailSession(email, password);
            setUser(session);
            navigate('/dashboard');
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Register function
    const register = async (email, password, name) => {
        try {
            await account.create('unique()', email, password, name);
            await login(email, password);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await account.deleteSession('current');
            setUser(null);
            navigate('/');
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Update user profile
    const updateProfile = async (userData) => {
        try {
            const updatedUser = await account.updatePrefs(userData);
            setUser(current => ({...current, prefs: updatedUser}));
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Password reset
    const resetPassword = async (email) => {
        try {
            await account.createRecovery(email, 'http://localhost:3000/reset-password');
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        resetPassword
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Custom hook for using auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
