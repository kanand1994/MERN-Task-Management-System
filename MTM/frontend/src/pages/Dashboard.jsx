import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { Trash2, Edit2, Play, CheckCircle } from 'lucide-react';
import TaskForm from '../components/TaskForm';
import AdminAnalyticsPanel from '../components/AdminAnalyticsPanel';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const fetchTasks = async () => {
        try {
            const { data } = await api.get('/tasks');
            setTasks(data.data);
        } catch (err) {
            console.error('Error fetching tasks', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter(t => t._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (editingTask) {
                const { data } = await api.put(`/tasks/${editingTask._id}`, formData);
                setTasks(tasks.map(t => t._id === editingTask._id ? data.data : t));
            } else {
                const { data } = await api.post('/tasks', formData);
                setTasks([data.data, ...tasks]);
            }
            setIsModalOpen(false);
            setEditingTask(null);
        } catch (err) {
            console.error(err);
        }
    };

    const updateStatus = async (task, newStatus) => {
        try {
            const { data } = await api.put(`/tasks/${task._id}`, { status: newStatus });
            setTasks(tasks.map(t => t._id === task._id ? data.data : t));
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            {user?.role === 'admin' && <AdminAnalyticsPanel />}

            <div className="flex items-center justify-between mt-4">
                <h1 className="text-3xl font-extrabold tracking-tight">{user?.role === 'admin' ? 'All Workspace Tasks' : 'Your Tasks'}</h1>
                <button
                    onClick={() => { setEditingTask(null); setIsModalOpen(true); }}
                    className="rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105"
                >
                    + New Task
                </button>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                {loading ? (
                    <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
                ) : tasks.length === 0 ? (
                    <div className="text-center p-12 text-muted-foreground border-2 border-dashed border-border rounded-lg">
                        No tasks found. Create one to get started!
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {tasks.map(task => (
                            <div key={task._id} className="p-4 border border-border rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center hover:border-primary/50 transition-colors group gap-4">
                                <div className="flex flex-col gap-1 w-full md:max-w-[60%]">
                                    <h4 className="font-semibold text-lg">{task.title}</h4>
                                    <p className="text-sm text-muted-foreground truncate">{task.description}</p>
                                    {user?.role === 'admin' && task.user && (
                                        <span className="text-xs font-mono text-muted-foreground mt-1 bg-secondary/50 w-fit px-2 py-0.5 rounded-sm">user: {task.user.name || task.user}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-4 self-end md:self-auto w-full md:w-auto justify-between md:justify-end">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${task.status === 'completed' ? 'bg-green-500/20 text-green-500' : task.status === 'in-progress' ? 'bg-blue-500/20 text-blue-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                                        {task.status}
                                    </span>
                                    <div className="flex items-center gap-1 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                        {task.status !== 'completed' && <button onClick={() => updateStatus(task, 'completed')} className="p-2 text-muted-foreground hover:text-green-500 transition-colors" title="Mark Completed"><CheckCircle className="h-4 w-4" /></button>}
                                        <button onClick={() => { setEditingTask(task); setIsModalOpen(true); }} className="p-2 text-muted-foreground hover:text-primary transition-colors" title="Edit"><Edit2 className="h-4 w-4" /></button>
                                        <button onClick={() => handleDelete(task._id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors" title="Delete"><Trash2 className="h-4 w-4" /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <TaskForm
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setEditingTask(null); }}
                onSubmit={handleFormSubmit}
                initialData={editingTask}
            />
        </div>
    );
};

export default Dashboard;
