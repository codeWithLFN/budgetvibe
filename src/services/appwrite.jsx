import { Client, Account, Databases, ID, Query } from 'appwrite';

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);

export const DATABASES = {
    MAIN: import.meta.env.VITE_DATABASE_ID,
    COLLECTIONS: {
        USERS: import.meta.env.VITE_COLLECTION_USERS_ID,
        EXPENSES: import.meta.env.VITE_COLLECTION_EXPENSES_ID,
        BUDGETS: import.meta.env.VITE_COLLECTION_BUDGETS_ID,
        GOALS: import.meta.env.VITE_COLLECTION_GOALS_ID
    }
};

// Authentication Functions
export const createUser = async (email, password, name) => {
    try {
        // Create authentication account
        const user = await account.create('unique()', email, password, name);
        
        // Create user profile in database with correct structure
        const userProfile = await databases.createDocument(
            DATABASES.MAIN,
            DATABASES.COLLECTIONS.USERS,
            user.$id,
            {
                userId: user.$id,
                userName: name,
                userEmail: email,
                role: 'user',
                createdAt: new Date().toISOString(),
                currency: 'USD',
                monthlyBudget: 0,
                notificationsEnabled: true,
                theme: 'dark',
                lastLogin: new Date().toISOString()
            }
        );
        
        return { user, userProfile };
    } catch (error) {
        throw new Error('Failed to create user: ' + error.message);
    }
};

export const loginUser = async (email, password) => {
    try {
        const session = await account.createEmailSession(email, password);
        const user = await account.get();
        return { session, user };
    } catch (error) {
        throw new Error('Login failed: ' + error.message);
    }
};

export const logoutUser = async () => {
    try {
        await account.deleteSession('current');
    } catch (error) {
        throw new Error('Logout failed: ' + error.message);
    }
};

export const getCurrentUser = async () => {
    try {
        const user = await account.get();
        return user;
    } catch {
        // Return null when not authenticated
        return null;
    }
};
// User Profile Functions
export const getUserProfile = async (userId) => {
    try {
        return await databases.getDocument(
            DATABASES.MAIN,
            DATABASES.COLLECTIONS.USERS,
            userId
        );
    } catch (error) {
        throw new Error('Failed to fetch user profile: ' + error.message);
    }
};

export const updateUserProfile = async (userId, data) => {
    try {
        return await databases.updateDocument(
            DATABASES.MAIN,
            DATABASES.COLLECTIONS.USERS,
            userId,
            data
        );
    } catch (error) {
        throw new Error('Failed to update user profile: ' + error.message);
    }
};

// Password Management
export const resetPassword = async (email) => {
    try {
        await account.createRecovery(email, 'PASSWORD_RECOVERY_URL');
        return true;
    } catch (error) {
        throw new Error('Password reset failed: ' + error.message);
    }
};

export const updatePassword = async (oldPassword, newPassword) => {
    try {
        await account.updatePassword(newPassword, oldPassword);
        return true;
    } catch (error) {
        throw new Error('Password update failed: ' + error.message);
    }
};

// Session Management
export const createSession = async (email, password) => {
    try {
        return await account.createEmailSession(email, password);
    } catch (error) {
        throw new Error('Session creation failed: ' + error.message);
    }
};

export const deleteSession = async (sessionId) => {
    try {
        await account.deleteSession(sessionId);
        return true;
    } catch (error) {
        throw new Error('Session deletion failed: ' + error.message);
    }
};

export const getSessions = async () => {
    try {
        return await account.listSessions();
    } catch (error) {
        throw new Error('Failed to fetch sessions: ' + error.message);
    }
};

// Email Verification
export const sendVerificationEmail = async () => {
    try {
        await account.createVerification('EMAIL_VERIFICATION_URL');
        return true;
    } catch (error) {
        throw new Error('Failed to send verification email: ' + error.message);
    }
};

export const confirmVerification = async (userId, secret) => {
    try {
        await account.updateVerification(userId, secret);
        return true;
    } catch (error) {
        throw new Error('Failed to confirm verification: ' + error.message);
    }
};

export default {
    client,
    account,
    databases,
    DATABASES,
    createUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    getUserProfile,
    updateUserProfile,
    resetPassword,
    updatePassword,
    createSession,
    deleteSession,
    getSessions,
    sendVerificationEmail,
    confirmVerification
};
