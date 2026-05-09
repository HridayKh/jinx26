import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const LoginPage = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (isRegistering) {
                // Register flow
                const response = await fetch('http://localhost:8000/api/v1/profiles', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, bio }),
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.detail || 'Registration failed');
                }

                const userData = await response.json();
                login(userData);
                navigate('/');
            } else {
                // Login flow
                const response = await fetch(`http://localhost:8000/api/v1/profiles/${username}`);
                
                if (!response.ok) {
                    throw new Error('User not found. Please register first.');
                }

                const userData = await response.json();
                login(userData);
                navigate('/');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="bg-surface border border-outline/20 p-8 rounded-2xl shadow-xl max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-on-surface mb-2">
                        {isRegistering ? 'Create an Account' : 'Welcome Back'}
                    </h1>
                    <p className="text-on-surface-variant">
                        {isRegistering 
                            ? 'Join the Student Exchange Hub' 
                            : 'Sign in to continue to the Exchange Hub'}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-on-surface-variant mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-background border border-outline/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            placeholder="Enter your username"
                        />
                    </div>

                    {isRegistering && (
                        <div>
                            <label className="block text-sm font-medium text-on-surface-variant mb-2">
                                Bio (Optional)
                            </label>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="w-full bg-background border border-outline/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors h-24 resize-none"
                                placeholder="Tell us a bit about yourself..."
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading || !username}
                        className="w-full bg-primary text-on-primary font-medium py-3 rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100"
                    >
                        {isLoading ? 'Processing...' : (isRegistering ? 'Sign Up' : 'Sign In')}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            setIsRegistering(!isRegistering);
                            setError('');
                        }}
                        className="text-primary hover:underline text-sm"
                    >
                        {isRegistering 
                            ? 'Already have an account? Sign In' 
                            : 'Need an account? Create one'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
