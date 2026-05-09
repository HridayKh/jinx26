import { useEffect, useState } from 'react';
import { getProjectsByIds } from '../api';

const ExplorePage = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getProjectsByIds()
            .then((items) => {
                const palette = ['primary', 'tertiary', 'secondary'];
                const icons = ['biotech', 'architecture', 'language', 'data_exploration', 'forest', 'electric_car'];
                setProjects(
                    items.map((item, idx) => ({
                        id: item.projectId,
                        title: item.projectName,
                        geo: (item.budgetCurrency || 'USD').toUpperCase(),
                        icon: icons[idx % icons.length],
                        desc: item.description || item.aboutPitch || 'No project description available yet.',
                        color: palette[idx % palette.length],
                    }))
                );
            })
            .catch(() => setProjects([]));
    }, []);

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
                    {projects.map(proj => (
                        <div key={proj.id} className="glass-card p-6 rounded-xl flex flex-col transition-all hover:border-primary/50 group cursor-pointer">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-12 h-12 rounded-lg bg-${proj.color}-container/20 flex items-center justify-center border border-white/5`}>
                                    <span className={`material-symbols-outlined text-${proj.color} text-2xl`}>{proj.icon}</span>
                                </div>
                                <div className="px-3 py-1 bg-surface-container-high rounded-full border border-white/10 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">public</span>
                                    <span className="font-data-sm text-[12px] uppercase">{proj.geo}</span>
                                </div>
                            </div>
                            <h3 className="font-h3 text-h3 text-primary mb-3 group-hover:text-primary-container transition-colors">{proj.title}</h3>
                            <p className="text-on-surface-variant font-body-md line-clamp-3 mb-6">{proj.desc}</p>
                            <div className="mt-auto space-y-4">
                                <div className="h-[1px] w-full bg-white/10"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-on-surface-variant font-data-sm">Active Repository</span>
                                    <span className="material-symbols-outlined text-primary">arrow_forward</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExplorePage;
