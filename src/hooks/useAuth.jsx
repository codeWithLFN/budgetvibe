import { createContext, useContext, useState, useEffect } from 'react';
import { account } from '../services/appwrite';
import PropTypes from 'prop-types';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const currentSession = await account.getSession('current');
            if (currentSession) {
                const currentUser = await account.get();
                setUser(currentUser);
                // You can also fetch user profile from your database here
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
            const session = await account.createEmailSession(email, password);
            const currentUser = await account.get();
            setUser(currentUser);
            return { session, user: currentUser };
        } catch (error) {
            console.error('Login failed:', error);
            throw new Error(error.message);
        }
    };

    const logout = async () => {
        try {
            await account.deleteSession('current');
            setUser(null);
            setUserProfile(null);
            return true;
        } catch (error) {
            console.error('Logout failed:', error);
            throw new Error(error.message);
        }
    };

    const value = {
        user,
        userProfile,
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
