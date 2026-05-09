import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const ProjectViewPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/v1/projects/${projectId}`);
                if (!response.ok) {
                    if (response.status === 404) throw new Error("Project not found");
                    throw new Error("Failed to fetch project details");
                }
                const data = await response.json();
                setProject(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId]);

    const getRandomColor = (id) => {
        const colors = ['primary', 'tertiary', 'secondary'];
        const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return colors[hash % colors.length];
    };

    if (loading) return <div className="ml-[280px] pt-28 p-8 min-h-screen text-on-surface">Loading project details...</div>;
    if (error) return <div className="ml-[280px] pt-28 p-8 min-h-screen text-red-400">Error: {error}</div>;
    if (!project) return <div className="ml-[280px] pt-28 p-8 min-h-screen text-on-surface-variant">Project not found.</div>;

    const color = getRandomColor(project.projectId);
    const isOwner = user?.username === project.ownerUsername;

    return (
        <div className="ml-[280px] pt-20 p-8 min-h-screen">
            <div className="max-w-4xl mx-auto space-y-8">
                
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors"
                >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    <span className="text-sm font-bold">Back</span>
                </button>

                <section className="glass-panel p-8 rounded-3xl relative overflow-hidden">
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-${color}/10 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none`}></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                        <div className={`w-24 h-24 rounded-2xl bg-${color}-container/20 flex items-center justify-center border border-white/10 shrink-0`}>
                            <span className={`material-symbols-outlined text-${color} text-5xl`}>public</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <span className={`px-3 py-1 bg-${color}/10 text-${color} border border-${color}/20 rounded-full font-data-sm text-[10px] uppercase tracking-wider`}>
                                    Active Project
                                </span>
                                <span className="text-on-surface-variant font-data-sm text-xs">
                                    ID: {project.projectId}
                                </span>
                            </div>
                            <h1 className="font-h1 text-4xl text-on-surface mb-4">{project.projectName}</h1>
                            <p className="text-xl text-on-surface-variant font-body-lg max-w-2xl">
                                {project.aboutPitch || "No pitch provided."}
                            </p>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <section className="glass-panel p-8 rounded-3xl space-y-6">
                            <h3 className="font-h3 text-h3 flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">description</span> Detailed Description
                            </h3>
                            <div className="prose prose-invert max-w-none text-on-surface-variant">
                                {project.description ? (
                                    project.description.split('\n').map((paragraph, idx) => (
                                        <p key={idx} className="mb-4">{paragraph}</p>
                                    ))
                                ) : (
                                    <p className="italic">No detailed description provided for this project.</p>
                                )}
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-1 space-y-8">
                        <section className="glass-panel p-6 rounded-3xl space-y-6">
                            <h3 className="font-h3 text-h3 flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">info</span> Project Meta
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-on-surface-variant uppercase tracking-widest font-data-sm mb-1">Owner</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-surface-variant flex items-center justify-center text-xs font-bold text-on-surface">
                                            {project.ownerUsername.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="font-bold text-on-surface">{project.ownerUsername}</span>
                                        {isOwner && <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full ml-auto">You</span>}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-on-surface-variant uppercase tracking-widest font-data-sm mb-1">Created On</p>
                                    <p className="text-on-surface font-medium">{new Date(project.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-on-surface-variant uppercase tracking-widest font-data-sm mb-1">Budget</p>
                                    <p className="text-on-surface font-medium text-lg">
                                        {project.budgetValue ? `${project.budgetValue.toLocaleString()} ${project.budgetCurrency}` : 'Undisclosed'}
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="glass-panel p-6 rounded-3xl bg-primary/5 border border-primary/20">
                            <h3 className="font-h3 text-lg text-on-surface mb-2">Interested?</h3>
                            <p className="text-sm text-on-surface-variant mb-6">Connect with the project owner to collaborate or learn more.</p>
                            <button 
                                className="w-full py-3 bg-primary text-on-primary rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all"
                                onClick={() => alert(`Message feature coming soon! Owner: ${project.ownerUsername}`)}
                            >
                                <span className="material-symbols-outlined">mail</span> Contact Owner
                            </button>
                        </section>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProjectViewPage;
