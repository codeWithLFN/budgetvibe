import { useState } from "react";
import { useAuth } from "../hooks/useAuth"; // Changed from "../context/AuthContext"

const LoginPage = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(credentials.email, credentials.password);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {/* Form content */}
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
