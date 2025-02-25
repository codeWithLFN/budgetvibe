import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loginUser, createUser as register, getCurrentUser, updateUserProfile } from '../services/auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const currentUser = await getCurrentUser(token);
                setUser(currentUser);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Session check failed:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const { user: userData } = await loginUser(email, password);
            setUser(userData);
            localStorage.setItem('token', userData.token);
            navigate('/dashboard');
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const signup = async (email, password, name) => {
        try {
            const { user: userData } = await register(email, password, name);
            setUser(userData);
            localStorage.setItem('token', userData.token);
            navigate('/dashboard');
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            localStorage.removeItem('token');
            setUser(null);
            navigate('/');
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const updateProfile = async (userData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token || !user?.id) {
                throw new Error('Not authenticated');
            }
            const updatedUser = await updateUserProfile(user.id, userData);
            setUser(current => ({...current, ...updatedUser}));
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            logout,
            signup,
            updateProfile
        }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
