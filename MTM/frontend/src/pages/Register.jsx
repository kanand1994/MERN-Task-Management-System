import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user'
    });
    const [error, setError] = useState('');

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(formData.name, formData.email, formData.password, formData.role);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
            <div className="w-full max-w-md space-y-8 rounded-xl border border-border bg-card p-10 shadow-xl transition-all hover:shadow-2xl">
                <div className="space-y-3 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Create Account</h1>
                    <p className="text-sm text-muted-foreground">Join us and start managing your tasks</p>
                </div>

                {error && (
                    <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive border border-destructive/20 text-center animate-in fade-in slide-in-from-top-2">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-foreground">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground transition-all duration-200"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-foreground">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground transition-all duration-200"
                            placeholder="name@example.com"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-foreground">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground transition-all duration-200"
                            placeholder="Min 6 characters"
                            required
                            minLength={6}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-foreground">Account Type</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-foreground transition-all duration-200"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin (For assignment testing)</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="inline-flex h-11 w-full mt-4 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground ring-offset-background transition-all hover:bg-primary/90 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95"
                    >
                        Create Account
                    </button>
                </form>

                <div className="text-center text-sm text-muted-foreground mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="font-bold text-primary hover:underline hover:text-primary/80 transition-colors">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
