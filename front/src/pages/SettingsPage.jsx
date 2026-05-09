import { useEffect, useState } from 'react';
import { getProfile } from '../api';

const SettingsPage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile('demo_user');
                setProfile(data);
            } catch (err) {
                setError(err.message || 'Failed to load profile.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="ml-[280px] pt-20 p-8 min-h-screen">
            {loading && <p className="text-on-surface-variant">Loading profile...</p>}
            {error && <p className="text-red-400">{error}</p>}
            <div className="max-w-container-max mx-auto space-y-8">
            <section className="relative rounded-3xl overflow-hidden glass-panel">
                <div className="h-64 w-full relative">
                    <img className="w-full h-full object-cover opacity-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6GZQ73V2LYR7r5vGBGuXFmAwvBkOxX8U2kFJPxViy3smctZ_Z0HS1ZUNIVSXKLM1O0EKuC48WJ1ddjjYXlYkypAb9Rx6Y1vGE4Z8Cb8deMNTc_ffKmqFuOqHHh_8g3RYymnO6WawiCsQ9V2pldzx7XnShfce9vZv25y2VnAccmOr47S-mmTGIpYCQZDAPZtPR8C0ppGHYiYP9a2wSHEMrjVR0E6s3_K-kzJZr56IVJT_Yh9_YBpmh3vNUtWgyV_MKqFg68X26qIk" alt="Banner" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                </div>
                <div className="px-8 pb-8 -mt-20 relative z-10 flex flex-col md:flex-row items-end justify-between gap-6">
                    <div className="flex flex-col md:flex-row items-end gap-6">
                        <div className="relative">
                            <img className="h-40 w-40 rounded-3xl object-cover border-4 border-background shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOQ0KcfaaQlOI5nC9RcuI1PgysbUVG_q_NHEXXygOqeyZnSJk8VitVaJR9e_V-9PjuRCrwjn5nJ2XEUbXRlL_W7c8ZW5qKCCbXBb4-LI5aQ6M1YAmRQ6_8lvANuLZAeQUG1V37btZwsENqO8HxHTyzsC71ODzg8rXaIOMh7eaYaWLLe94TrUAajPqW_mhsLTpIJg0SLX1tYBcUf5jNojNeOwNet4k7hSOzCfGYdCwGzJThHhi-1gj_P9dYxID1sM1G_8E6HJDhtHI" alt="Profile" />
                            <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-primary rounded-full border-4 border-background flex items-center justify-center">
                                <span className="material-symbols-outlined text-[16px] text-on-primary" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                            </div>
                        </div>
                        <div className="pb-2">
                            <h2 className="font-h1 text-h1 text-on-surface">{profile?.username || 'Student'}</h2>
                            <div className="flex items-center gap-3 mt-2">
                                <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full font-data-sm text-data-sm">
                                    Class {profile?.class_year || 'N/A'}
                                </span>
                                <span className="flex items-center gap-1 text-on-surface-variant font-data-sm text-data-sm">
                                    <span className="material-symbols-outlined text-[16px]">location_on</span> {profile?.homeCountry || 'N/A'} → {profile?.targetCountry || 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-8">
                    <section className="glass-panel p-6 rounded-3xl space-y-6">
                        <h3 className="font-h3 text-h3 flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">person</span> About Me
                        </h3>
                        <p className="font-body-md text-on-surface-variant">
                            {profile?.bio || 'No bio has been added yet.'}
                        </p>
                    </section>
                    <section className="glass-panel p-6 rounded-3xl space-y-4">
                        <h3 className="font-h3 text-h3 flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">star</span> Expertise
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {[profile?.targetCollege, profile?.targetCountry, profile?.prefCurrency]
                                .filter(Boolean)
                                .map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-surface-container-highest border border-white/10 rounded-full font-data-sm text-data-sm">{tag}</span>
                            ))}
                        </div>
                    </section>
                </div>
                <div className="lg:col-span-2 space-y-6">
                    <section className="glass-panel p-6 rounded-3xl">
                        <h3 className="font-h3 text-h3 mb-10">Application Journey</h3>
                        <div className="relative pl-12 space-y-12">
                            <div className="absolute left-[20px] top-4 bottom-4 w-px bg-white/10"></div>
                            <div className="relative">
                                <div className="absolute -left-[53px] top-1 h-6 w-6 rounded-full bg-primary border-4 border-background flex items-center justify-center z-10">
                                    <span className="material-symbols-outlined text-[12px] text-on-primary">check</span>
                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <h4 className="font-h3 text-lg">Initial Application Submitted</h4>
                                        <p className="text-on-surface-variant text-sm mt-1">Submitted to ETH Zurich - Global Exchange Program</p>
                                    </div>
                                    <div className="font-data-sm text-sm text-on-surface-variant bg-surface-container-highest px-4 py-1 rounded-full h-fit">SEP 12, 2023</div>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[53px] top-1 h-6 w-6 rounded-full bg-primary-container border-4 border-background flex items-center justify-center z-10 ring-4 ring-primary/20">
                                    <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <h4 className="font-h3 text-lg text-primary">Interview Scheduled</h4>
                                        <p className="text-on-surface-variant text-sm mt-1">Academic committee interview with Faculty of CS.</p>
                                    </div>
                                    <div className="font-data-sm text-sm text-primary-container font-bold bg-primary-container/10 border border-primary-container/20 px-4 py-1 rounded-full h-fit">NOV 18, 2023</div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
);
};

export default SettingsPage;
