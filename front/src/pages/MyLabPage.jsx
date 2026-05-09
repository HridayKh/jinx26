import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';

const MyLabPage = () => {
    const { user } = useAuth();
    const [myProjects, setMyProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyProjects = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/projects');
                if (response.ok) {
                    const data = await response.json();
                    const filtered = data.filter(p => p.ownerUsername === user?.username);
                    setMyProjects(filtered);
                }
            } catch (err) {
                console.error("Failed to fetch my projects", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMyProjects();
    }, [user?.username]);

    return (
    <div className="ml-[280px] pt-28 p-8 min-h-screen">
        <div className="grid grid-cols-12 gap-6 max-w-container-max mx-auto">
            <div className="col-span-12 lg:col-span-8 space-y-6">
                <div className="glass-panel p-6 rounded-xl relative overflow-hidden h-48 flex flex-col justify-end">
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none">
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAV45wBaDvRGRArrExgYergOqh1bNgC4ehzPHAJMWdbFIvhVo0HjuxPFaxZ5H0TBbalkhdxlQY_5O_kwk6YAHdG_a7TYD7T_wKld19HZVXvc8-vJZLwuOJLoHsHveuqGzJED7KKFMQaV9tgSBzRcJcME73-NxWA1Zvs29pJ1uFD9cSXd6czd58azC3PjLC_9GSIzCn3j8f-GTI8aVw9zd0y5yoLc-yQj77ayu6OmK9az8M29brZ-i2uBo1NDuSqsO8JUYG2qvsmZg0" alt="Lab" />
                    </div>
                    <div className="relative z-10">
                        <h2 className="font-h2 text-h2 text-primary mb-2">Workspace Overview</h2>
                        <p className="text-on-surface-variant font-body-md max-w-md">Continue your research on Neural Interconnectivity or browse new collaborator requests.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {loading ? (
                        <div className="col-span-2 text-on-surface-variant">Loading lab workspace...</div>
                    ) : myProjects.length === 0 ? (
                        <div className="col-span-2 text-on-surface-variant">You have no active projects in your lab.</div>
                    ) : myProjects.map((proj, idx) => {
                        const isEven = idx % 2 === 0;
                        const icon = isEven ? "neurology" : "travel_explore";
                        const colorClass = isEven ? "primary" : "tertiary";
                        return (
                        <div key={proj.projectId} className="glass-panel p-6 rounded-xl stitch-border hover:bg-white/5 transition-all group cursor-pointer flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`w-12 h-12 rounded-lg bg-${colorClass}/10 flex items-center justify-center text-${colorClass}`}>
                                        <span className="material-symbols-outlined">{icon}</span>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full bg-${colorClass}/20 text-${colorClass} text-[10px] font-data-sm uppercase tracking-wider`}>Active</span>
                                </div>
                                <h3 className="font-h3 text-h3 text-on-surface mb-2">{proj.projectName}</h3>
                                <p className="text-on-surface-variant font-body-md text-sm mb-6 line-clamp-2">{proj.aboutPitch || proj.description}</p>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex -space-x-3">
                                    <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-variant flex items-center justify-center text-xs text-on-surface-variant font-bold">{proj.ownerUsername.charAt(0).toUpperCase()}</div>
                                </div>
                                <button className={`text-${colorClass} group-hover:translate-x-1 transition-transform`}>
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    )})}
                </div>

                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-7 glass-panel p-6 rounded-xl stitch-border">
                        <h4 className="font-h3 text-on-surface text-lg mb-6">Resource Usage</h4>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="text-on-surface-variant">Cloud Computing</span>
                                    <span className="text-on-surface">82%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[82%] rounded-full"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="text-on-surface-variant">Data Storage</span>
                                    <span className="text-on-surface">45%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-tertiary w-[45%] rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-5 glass-panel p-6 rounded-xl border border-primary/20 bg-primary/5 flex flex-col justify-between">
                        <span className="material-symbols-outlined text-primary text-4xl mb-4">auto_awesome</span>
                        <div>
                            <p className="font-bold text-on-surface mb-1">AI Insight</p>
                            <p className="text-xs text-on-surface-variant">Project 'Neural Mapping' has 3 new relevant dataset suggestions.</p>
                        </div>
                        <button className="mt-4 text-xs font-bold text-primary flex items-center gap-2 hover:underline">
                            View Suggestions <span className="material-symbols-outlined text-xs">open_in_new</span>
                        </button>
                    </div>
                </div>
            </div>

            <aside className="col-span-12 lg:col-span-4 space-y-6">
                <div className="glass-panel rounded-xl flex flex-col h-full overflow-hidden">
                    <div className="p-6 border-b border-white/10">
                        <h4 className="font-h3 text-on-surface text-lg">Activity Stream</h4>
                    </div>
                    <div className="p-6 space-y-6">
                        {[
                            { icon: 'edit', user: 'Sara Chen', action: 'edited Dataset_V2.json', time: '2 hours ago', color: 'primary' },
                            { icon: 'chat_bubble', user: 'Marcus Thorne', action: 'commented on project proposal', time: '5 hours ago', color: 'tertiary' }
                        ].map((act, i) => (
                            <div key={i} className="flex gap-4 relative">
                                <div className="z-10 bg-surface h-8 w-8 rounded-full border border-white/10 flex items-center justify-center">
                                    <span className={`material-symbols-outlined text-sm text-${act.color}`}>{act.icon}</span>
                                </div>
                                <div>
                                    <p className="text-sm text-on-surface"><span className="font-bold">{act.user}</span> {act.action}</p>
                                    <p className="text-[10px] text-on-surface-variant font-data-sm mt-1">{act.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="glass-panel p-6 rounded-xl stitch-border">
                    <h4 className="font-h3 text-on-surface text-lg mb-6">Research Team</h4>
                    <div className="space-y-4">
                        {[
                            { name: 'Sara Chen', role: 'Data Scientist', status: 'bg-green-500', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJeQf_PLpbwdNE7v9Pfs2RUstQ1D6BUnqYn0oAXd05ePSzxeaiqS_QlQg3i2ACCX6eb5ndgb9i-Gwr8a1W375lSIkUIkmveyju9yQFnetVC26mAK7_kmbmW-Us2O9H00cCrln6rdwBJ7Wqa6ZVVPMey6sbPhMYro2AAQtB1HHZ9Hf0o8HzAOj9ZFn-RN6tdMKDmCVkT3mea0e1l3CKDYGGoZk_5CTKaxVbETGGrHOK7_zOrWlM61mxzRWBkCG3sJo1mz7FgrhCfx0' },
                            { name: 'Marcus Thorne', role: 'Lead Ethics', status: 'bg-gray-500', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxFQlEQYmVfqRLFDJnrcK471OOVae3zPZe3QWJK9s308zIbnKIRo2BAL1lpVx0qn2SITk0gLYW-UPV_MAoeSeUte5DzJ4T-K6VtCD_o-Yows6iteWrjUxkbCvNUzdsEZdefwHHFj-b_lgPUzb9shbddIk21HGQHwmrZ4yHMetmZ_VfhHnEAw5lDpVi9ClaX8E3MnXIs8dwhJLwBLHrZcEgjqId3s8Tj7-MBEaiD-WAanLG8YWU8ZG4pk1DFH3pVbj3r3QD9d2f-zg' }
                        ].map((member, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <img src={member.img} className="w-10 h-10 rounded-full object-cover" alt={member.name} />
                                        <div className={`absolute bottom-0 right-0 w-3 h-3 ${member.status} rounded-full border-2 border-surface`}></div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-on-surface">{member.name}</p>
                                        <p className="text-[10px] text-on-surface-variant">{member.role}</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-on-surface-variant text-sm">more_vert</span>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
        </div>
    </div>
    );
};

export default MyLabPage;
