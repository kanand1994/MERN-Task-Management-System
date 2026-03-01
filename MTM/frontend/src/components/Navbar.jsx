import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, CheckSquare } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto w-full h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <CheckSquare className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
                    <span className="text-xl font-extrabold tracking-tight">TaskMaster</span>
                </Link>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    {user ? (
                        <>
                            <span className="text-sm text-muted-foreground mr-4 hidden md:inline-block border-r border-border pr-6">
                                Welcome, <span className="font-semibold text-foreground">{user.name}</span>
                                {user.role === 'admin' && <span className="ml-2 rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary font-bold">Admin</span>}
                            </span>
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 rounded-md bg-secondary/70 hover:bg-destructive/90 hover:text-destructive-foreground px-3 py-1.5 text-sm font-medium transition-all text-secondary-foreground"
                            >
                                <LogOut className="h-4 w-4" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Login</Link>
                            <Link to="/register" className="rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105">Get Started</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
