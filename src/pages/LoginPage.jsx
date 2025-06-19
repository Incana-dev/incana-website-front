import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('https://incana-backend-service-340611009736.europe-west2.run.app/api/auth/login', { email, password });
            localStorage.setItem('authToken', response.data.token);
            window.location.href = '/admin/create';
        } catch (err) {
            setError('Failed to log in. Please check your credentials.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background transition-colors duration-300">
            <div className="p-8 bg-surface rounded-lg shadow-xl w-96">
                <h2 className="text-2xl font-bold text-center text-text-heading mb-6 font-poppins">Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-text-body mb-2" htmlFor="email">Email</label>
                        <input type="email" id="email" className="w-full px-3 py-2 bg-background rounded text-text-primary focus:ring-2 focus:ring-highlight focus:outline-none" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-text-body mb-2" htmlFor="password">Password</label>
                        <input type="password" id="password" className="w-full px-3 py-2 bg-background rounded text-text-primary focus:ring-2 focus:ring-highlight focus:outline-none" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    {error && <p className="text-strong text-center mb-4">{error}</p>}
                    <button type="submit" className="w-full bg-highlight hover:bg-strong text-white font-bold py-2 px-4 rounded transition-colors">Log In</button>
                </form>
            </div>
        </div>
    );
};
export default LoginPage;