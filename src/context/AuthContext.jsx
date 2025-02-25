import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { loginUser, getCurrentUser } from '../services/auth';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const currentUser = await getCurrentUser(token);
                if (currentUser) {
                    setUser(currentUser);
                } else {
                    // Token is invalid or expired
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
        } catch (error) {
            console.error('Session check failed:', error);
            localStorage.removeItem('token');
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
            return userData;
        } catch (error) {
            console.error('Login failed:', error);
            throw new Error(error.message);
        }
    };

    const logout = async () => {
        try {
            localStorage.removeItem('token');
            setUser(null);
            return true;
        } catch (error) {
            console.error('Logout failed:', error);
            throw new Error(error.message);
        }
    };

    const value = {
        user,
        login,
        logout,
        loading,
        checkUser
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export function useAuth() {
    return useContext(AuthContext);
}
