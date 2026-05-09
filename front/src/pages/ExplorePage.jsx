import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ExplorePage = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/projects');
                if (!response.ok) throw new Error('Failed to fetch projects');
                const data = await response.json();
                setProjects(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const getRandomColor = (id) => {
        const colors = ['primary', 'tertiary', 'secondary'];
        // Use id length or sum of chars to make it deterministic but pseudorandom
        const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return colors[hash % colors.length];
    };

    if (loading) return <div className="ml-[280px] pt-28 p-8 min-h-screen text-on-surface">Loading repository...</div>;
    if (error) return <div className="ml-[280px] pt-28 p-8 min-h-screen text-red-400">Error: {error}</div>;

    return (
        <div className="ml-[280px] pt-28 p-8 min-h-screen">
            <div className="max-w-container-max mx-auto">
                <div className="mb-10 flex justify-between items-end">
                    <div>
                        <h1 className="font-h1 text-h1 text-on-surface mb-2">Project Repository</h1>
                        <p className="text-on-surface-variant font-body-lg">Access and manage international academic exchange initiatives.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-6 py-2 rounded-full border border-white/10 text-on-surface hover:bg-white/5 transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined">filter_list</span> Filter
                        </button>
                        <button className="px-6 py-2 rounded-full border border-white/10 text-on-surface hover:bg-white/5 transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined">sort</span> Sort
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.length === 0 ? (
                        <div className="text-on-surface-variant text-center col-span-3 py-12">No projects found.</div>
                    ) : projects.map(proj => {
                        const color = getRandomColor(proj.projectId);
                        return (
                        <div 
                            key={proj.projectId} 
                            onClick={() => navigate(`/projects/${proj.projectId}`)}
                            className="glass-card p-6 rounded-xl flex flex-col transition-all hover:border-primary/50 group cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-12 h-12 rounded-lg bg-${color}-container/20 flex items-center justify-center border border-white/5`}>
                                    <span className={`material-symbols-outlined text-${color} text-2xl`}>public</span>
                                </div>
                                <div className="px-3 py-1 bg-surface-container-high rounded-full border border-white/10 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">person</span>
                                    <span className="font-data-sm text-[12px] uppercase">{proj.ownerUsername}</span>
                                </div>
                            </div>
                            <h3 className="font-h3 text-h3 text-primary mb-3 group-hover:text-primary-container transition-colors">{proj.projectName}</h3>
                            <p className="text-on-surface-variant font-body-md line-clamp-3 mb-6">{proj.aboutPitch || proj.description || 'No description provided.'}</p>
                            <div className="mt-auto space-y-4">
                                <div className="h-[1px] w-full bg-white/10"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-on-surface-variant font-data-sm">Active Repository</span>
                                    <span className="material-symbols-outlined text-primary">arrow_forward</span>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default ExplorePage;
