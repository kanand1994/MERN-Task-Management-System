import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const TaskForm = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({ title: '', description: '', status: 'pending' });

    useEffect(() => {
        if (initialData) setFormData(initialData);
        else setFormData({ title: '', description: '', status: 'pending' });
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4">
            <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-xl animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">{initialData ? 'Edit Task' : 'New Task'}</h2>
                    <button onClick={onClose} className="rounded-full p-2 hover:bg-secondary transition-colors"><X className="h-5 w-5" /></button>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="flex w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none min-h-[100px]" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Status</label>
                        <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none">
                            <option value="pending">Pending</option>
                            <option value="in-progress">In-Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="pt-4 flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-md hover:bg-secondary text-sm font-medium transition-colors">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors">{initialData ? 'Save Changes' : 'Create Task'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default TaskForm;
