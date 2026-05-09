import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const CreateProjectPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        projectName: '',
        aboutPitch: '',
        description: '',
        budgetValue: '',
        budgetCurrency: 'USD'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const payload = {
                ...formData,
                budgetValue: formData.budgetValue ? parseFloat(formData.budgetValue) : null,
                ownerUsername: user.username
            };

            const response = await fetch('http://localhost:8000/api/v1/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.detail || 'Failed to create project');
            }

            navigate('/explore');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ml-[280px] pt-28 p-8 min-h-screen">
            <div className="max-w-3xl mx-auto space-y-8">
                <div>
                    <h1 className="font-h1 text-h1 text-on-surface mb-2">Create New Project</h1>
                    <p className="text-on-surface-variant font-body-lg">Propose a new academic exchange initiative to the repository.</p>
                </div>

                <div className="glass-panel p-8 rounded-3xl">
                    {error && (
                        <div className="bg-red-500/10 text-red-500 p-4 rounded-xl mb-6 border border-red-500/20">
                            {error}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-on-surface-variant mb-2">
                                Project Name *
                            </label>
                            <input
                                type="text"
                                required
                                name="projectName"
                                value={formData.projectName}
                                onChange={handleChange}
                                className="w-full bg-background border border-outline/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
                                placeholder="e.g. Quantum Mesh Networking"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-on-surface-variant mb-2">
                                Elevator Pitch / Short About
                            </label>
                            <input
                                type="text"
                                name="aboutPitch"
                                value={formData.aboutPitch}
                                onChange={handleChange}
                                className="w-full bg-background border border-outline/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
                                placeholder="A brief one-sentence pitch"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-on-surface-variant mb-2">
                                Full Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full bg-background border border-outline/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors h-32 resize-none"
                                placeholder="Detailed description of the project goals, requirements, and scope."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-on-surface-variant mb-2">
                                    Budget Value
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="budgetValue"
                                    value={formData.budgetValue}
                                    onChange={handleChange}
                                    className="w-full bg-background border border-outline/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
                                    placeholder="e.g. 50000"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-on-surface-variant mb-2">
                                    Budget Currency
                                </label>
                                <select
                                    name="budgetCurrency"
                                    value={formData.budgetCurrency}
                                    onChange={handleChange}
                                    className="w-full bg-background border border-outline/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors appearance-none"
                                >
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                    <option value="GBP">GBP (£)</option>
                                    <option value="JPY">JPY (¥)</option>
                                    <option value="INR">INR (₹)</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-6 flex justify-end gap-4 border-t border-white/10">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-6 py-3 rounded-xl font-medium hover:bg-surface-variant text-on-surface transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading || !formData.projectName}
                                className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Creating...' : 'Create Project'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProjectPage;
