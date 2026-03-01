import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Users, FileText, CheckCircle, Clock } from 'lucide-react';

const AdminAnalyticsPanel = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const { data } = await api.get('/tasks/analytics');
                setStats(data.data);
            } catch (err) {
                console.error('Error fetching analytics', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) return <div className="h-32 flex items-center justify-center border border-border rounded-xl bg-card"><div className="animate-spin h-6 w-6 border-b-2 border-primary rounded-full"></div></div>;
    if (!stats) return null;

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="rounded-xl border border-border bg-card p-6 flex flex-col justify-between shadow-sm hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-muted-foreground tracking-tight">Total Users</h3>
                    <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="mt-4 text-3xl font-extrabold">{stats.totalUsers}</div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 flex flex-col justify-between shadow-sm hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-muted-foreground tracking-tight">Total Tasks</h3>
                    <FileText className="h-4 w-4 text-primary" />
                </div>
                <div className="mt-4 text-3xl font-extrabold">{stats.totalTasks}</div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 flex flex-col justify-between shadow-sm hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-muted-foreground tracking-tight">Completed Tasks</h3>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="mt-4 text-3xl font-extrabold text-green-500">{stats.statusCounts.completed || 0}</div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 flex flex-col justify-between shadow-sm hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-muted-foreground tracking-tight">Pending / In-Progress</h3>
                    <Clock className="h-4 w-4 text-yellow-500" />
                </div>
                <div className="mt-4 text-3xl font-extrabold text-yellow-500">{(stats.statusCounts.pending || 0) + (stats.statusCounts['in-progress'] || 0)}</div>
            </div>
        </div>
    );
};
export default AdminAnalyticsPanel;
