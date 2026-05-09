import { useEffect, useState } from 'react';
import { getProject } from '../api';

const ExplorePage = () => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await getProject('proj_seed01');
                setProject(data);
            } catch (err) {
                setError(err.message || 'Failed to load project.');
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
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
                {loading && <p className="text-on-surface-variant">Loading project data...</p>}
                {error && <p className="text-red-400">{error}</p>}

                {!loading && !error && project && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="glass-card p-6 rounded-xl flex flex-col transition-all hover:border-primary/50 group cursor-pointer">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 rounded-lg bg-primary-container/20 flex items-center justify-center border border-white/5">
                                    <span className="material-symbols-outlined text-primary text-2xl">biotech</span>
                                </div>
                                <div className="px-3 py-1 bg-surface-container-high rounded-full border border-white/10 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">person</span>
                                    <span className="font-data-sm text-[12px] uppercase">{project.ownerUsername}</span>
                                </div>
                            </div>
                            <h3 className="font-h3 text-h3 text-primary mb-3 group-hover:text-primary-container transition-colors">{project.projectName}</h3>
                            <p className="text-on-surface-variant font-body-md line-clamp-3 mb-6">
                                {project.description || project.aboutPitch || 'No description available.'}
                            </p>
                            <div className="mt-auto space-y-4">
                                <div className="h-[1px] w-full bg-white/10"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-on-surface-variant font-data-sm">
                                        {project.budgetValue ? `${project.budgetValue} ${project.budgetCurrency || ''}`.trim() : 'Budget not set'}
                                    </span>
                                    <span className="material-symbols-outlined text-primary">arrow_forward</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExplorePage;
