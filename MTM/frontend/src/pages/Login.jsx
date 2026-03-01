import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-md space-y-8 rounded-xl border border-border bg-card p-10 shadow-xl transition-all hover:shadow-2xl">
                <div className="space-y-3 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Welcome Back</h1>
                    <p className="text-sm text-muted-foreground">Enter your credentials to access your workspace</p>
                </div>

                {error && (
                    <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive border border-destructive/20 text-center animate-in fade-in slide-in-from-top-2">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-foreground">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground transition-all duration-200"
                            placeholder="name@example.com"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-foreground">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground transition-all duration-200"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground ring-offset-background transition-all hover:bg-primary/90 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95"
                    >
                        Sign In
                    </button>
                </form>

                <div className="text-center text-sm text-muted-foreground mt-4">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-bold text-primary hover:underline hover:text-primary/80 transition-colors">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
