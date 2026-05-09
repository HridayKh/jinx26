import { Link } from 'react-router-dom';

const DashboardPage = () => (
    <div className="ml-[280px] pt-20 p-8 min-h-screen space-y-6">
        <section className="relative h-[420px] rounded-3xl overflow-hidden glass-panel group">
            <div className="absolute inset-0 z-0">
                <img className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGjIo3ERZ9epmRpBh_dma9fF7mztRgq2_r08F-3A3TUwAd_OpV8Y1jqt1XFv9Hbt1I-VojCKbibdhKEBRZajjqAb-w4i1zwzcyKK1IwlQKB1M86S7paHzcfmPa21HWMUz_K1hS9SsuRR-F7va9fq9emEo657TASDrv_dkpUY7rIJbDqCC8zUE2IPLFLYhL006PFvYJJZ6qi2sXEYDobjlql3_y5ikS-84txaPvwTpS3kE6QSYPGYsDP4418ow2US85KxInYvdlAq0" alt="Tokyo" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
            </div>
            <div className="relative z-10 h-full flex flex-col justify-end p-12">
                <div className="flex items-end gap-8 mb-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
                        <div className="relative h-32 w-32 rounded-full border-4 border-primary p-1 bg-background overflow-hidden">
                            <img className="h-full w-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOQ0KcfaaQlOI5nC9RcuI1PgysbUVG_q_NHEXXygOqeyZnSJk8VitVaJR9e_V-9PjuRCrwjn5nJ2XEUbXRlL_W7c8ZW5qKCCbXBb4-LI5aQ6M1YAmRQ6_8lvANuLZAeQUG1V37btZwsENqO8HxHTyzsC71ODzg8rXaIOMh7eaYaWLLe94TrUAajPqW_mhsLTpIJg0SLX1tYBcUf5jNojNeOwNet4k7hSOzCfGYdCwGzJThHhi-1gj_P9dYxID1sM1G_8E6HJDhtHI" alt="Avatar" />
                        </div>
                    </div>
                    <div>
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-data-sm mb-3 inline-block border border-primary/20 uppercase tracking-widest">Currently in: Tokyo, JP</span>
                        <h2 className="font-h1 text-h1 text-white leading-none">Welcome back, Alex.</h2>
                        <p className="text-on-surface-variant text-lg mt-2 max-w-2xl font-body-lg">Designing the next generation of modular academic exchanges across 12 countries.</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                    <div className="space-y-1">
                        <p className="text-on-surface-variant text-xs uppercase tracking-widest font-data-sm">Projects Built</p>
                        <p className="text-h2 font-h2 text-white">12</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-on-surface-variant text-xs uppercase tracking-widest font-data-sm">Countries Explored</p>
                        <p className="text-h2 font-h2 text-white">05</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-on-surface-variant text-xs uppercase tracking-widest font-data-sm">Students Impacted</p>
                        <p className="text-h2 font-h2 text-white">154</p>
                    </div>
                </div>
            </div>
        </section>

        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4 space-y-6">
                <div className="glass-panel rounded-3xl p-6">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-h3 text-h3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">cloud</span> Tokyo Pulse
                        </h3>
                        <span className="font-data-sm text-on-surface-variant text-sm">Update: 5m ago</span>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="material-symbols-outlined text-5xl text-primary" style={{fontVariationSettings: "'FILL' 1"}}>wb_sunny</span>
                                <div>
                                    <p className="text-4xl font-h2">22°C</p>
                                    <p className="text-on-surface-variant font-body-md">Clear Skies</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                            <div className="text-center p-2 rounded-xl bg-white/5 stitch-border">
                                <p className="text-xs text-on-surface-variant mb-1 font-data-sm">TUE</p>
                                <span className="material-symbols-outlined text-primary mb-1">wb_cloudy</span>
                                <p className="text-sm font-bold">20°</p>
                            </div>
                            <div className="text-center p-2 rounded-xl bg-white/5 stitch-border">
                                <p className="text-xs text-on-surface-variant mb-1 font-data-sm">WED</p>
                                <span className="material-symbols-outlined text-primary mb-1">rainy</span>
                                <p className="text-sm font-bold">18°</p>
                            </div>
                            <div className="text-center p-2 rounded-xl bg-white/5 stitch-border">
                                <p className="text-xs text-on-surface-variant mb-1 font-data-sm">THU</p>
                                <span className="material-symbols-outlined text-primary mb-1">sunny</span>
                                <p className="text-sm font-bold">24°</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button className="flex-1 glass-panel hover:bg-primary hover:text-on-primary transition-all p-4 rounded-2xl flex items-center justify-center gap-2 group active:scale-95">
                        <span className="material-symbols-outlined">map</span>
                        <span className="font-bold">Explore Tokyo</span>
                    </button>
                    <button className="p-4 glass-panel hover:bg-surface-variant rounded-2xl transition-all active:scale-95">
                        <span className="material-symbols-outlined">bookmark</span>
                    </button>
                </div>
            </div>

            <div className="col-span-12 lg:col-span-8 space-y-6">
                <div className="flex justify-between items-center px-2">
                    <h3 className="font-h3 text-h3">Recent Projects</h3>
                    <Link to="/explore" className="text-primary hover:underline text-sm font-bold">View All Archive</Link>
                </div>
                <div className="space-y-4">
                    {[
                        { title: "Hyper-Local Logistics in Tokyo Core", phase: "Research Phase", date: "Mar 12, 2024", tags: ["LOGISTICS", "SUSTAINABILITY"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhy3jsrbb4wj2_afrwE33uinCjm9hYljwhX_wwqnvs2FmjXF6epmd2quvvhoJWbJlhaOjD2c2kiHmXpSl5IUBpKy3U8fh53MOTH_ZVDYSZPqMt8DbH7PSIG7UHDqwFoxE5fGSAc0Gzk6tWz3p9VQLLH-_V67yaWt5d7WneLw0Bx1P_cVn2yJK41yUjM-2UXwzOCSI83o0TQ_Rr0av1xs042Z1Tuu8Nm50dMpYvDdj-bxoHxI-eSj4RmUP1KyxOYQdIJOPFGNTi0q0" },
                        { title: "Cross-Border Academic Verification", phase: "In Review", date: "Feb 28, 2024", tags: ["BLOCKCHAIN", "EDUCATION"], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPtr1bXA1LAGfsC7YXCXoFDTl2iV2FTNRllFc8uQdUBP1Hu9BniEhlQWVKmkEJga2BixaDkU1mSvsZXcRPymddhGV-EeYpG0ntIogqEJzK2lMYyB8qcjIRXFDmYjxky_Rfbs9NN97VN-rQMcPBgd3Eulf2wGSn4mwaWipWoRV9FLQ72FkaKHwZKINR1c2IdXloVslNaJpVGidu_xpol6JlD1bMy5g7NIkU0f3lQQiAmgUBnd4A85yK_E7v_gLMiPj6Vr2sRQDP3tQ" }
                    ].map((proj, idx) => (
                        <div key={idx} className="glass-panel rounded-3xl p-6 flex gap-8 group hover:border-primary/40 transition-colors cursor-pointer">
                            <div className="w-48 h-32 rounded-2xl overflow-hidden shrink-0 stitch-border">
                                <img src={proj.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={proj.title} />
                            </div>
                            <div className="flex-1 py-1">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded text-[10px] font-data-sm uppercase tracking-wider">{proj.phase}</span>
                                    <span className="font-data-sm text-on-surface-variant text-xs">{proj.date}</span>
                                </div>
                                <h4 className="font-h3 text-xl text-white group-hover:text-primary transition-colors">{proj.title}</h4>
                                <div className="flex gap-2 mt-4">
                                    {proj.tags.map(t => <div key={t} className="px-3 py-1 rounded-full bg-white/5 stitch-border text-[10px] font-data-sm">{t}</div>)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default DashboardPage;
