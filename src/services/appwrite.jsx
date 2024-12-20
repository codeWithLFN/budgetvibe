import { Client, Account, Databases } from 'appwrite';

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

// User related functions
export const createUser = async (email, password, name) => {
    const user = await account.create('unique()', email, password, name);
    await databases.createDocument(
        DATABASES.MAIN,
        DATABASES.COLLECTIONS.USERS,
        user.$id,
        {
            email: email,
            name: name,
            role: 'user',
            createdAt: new Date().toISOString()
        }
    );
    return user;
};
export const getUserProfile = async (userId) => {
    return await databases.getDocument(
        DATABASES.MAIN,
        DATABASES.COLLECTIONS.USERS,
        userId
    );
};

export const updateUserProfile = async (userId, data) => {
    return await databases.updateDocument(
        DATABASES.MAIN,
        DATABASES.COLLECTIONS.USERS,
        userId,
        data
    );
};
