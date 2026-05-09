import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext';

const SettingsPage = () => {
    const { user, login } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        bio: user?.bio || '',
        class_year: user?.class_year || '',
        targetCollege: user?.targetCollege || '',
        homeCountry: user?.homeCountry || '',
        targetCountry: user?.targetCountry || '',
        prefCurrency: user?.prefCurrency || ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setLoading(true);
        setError('');
        try {
            // "class" is an alias for "class_year" in the backend model
            const payload = {
                bio: formData.bio,
                class: formData.class_year,
                targetCollege: formData.targetCollege,
                homeCountry: formData.homeCountry,
                targetCountry: formData.targetCountry,
                prefCurrency: formData.prefCurrency
            };

            const response = await fetch(`http://localhost:8000/api/v1/profiles/${user.username}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Failed to update profile');
            const updatedUser = await response.json();
            login(updatedUser); // Update global auth state
            setIsEditing(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ml-[280px] pt-20 p-8 min-h-screen">
            <div className="max-w-container-max mx-auto space-y-8">
                <section className="relative rounded-3xl overflow-hidden glass-panel">
                    <div className="h-64 w-full relative bg-surface-container">
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                    </div>
                    <div className="px-8 pb-8 -mt-20 relative z-10 flex flex-col md:flex-row items-end justify-between gap-6">
                        <div className="flex flex-col md:flex-row items-end gap-6">
                            <div className="relative">
                                <div className="h-40 w-40 rounded-3xl object-cover border-4 border-background shadow-2xl bg-primary-container flex items-center justify-center text-6xl text-primary font-bold">
                                    {user?.username?.charAt(0).toUpperCase()}
                                </div>
                                <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-primary rounded-full border-4 border-background flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[16px] text-on-primary" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                                </div>
                            </div>
                            <div className="pb-2">
                                <h2 className="font-h1 text-h1 text-on-surface">{user?.username}</h2>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full font-data-sm text-data-sm">
                                        {user?.class_year ? `Class of ${user.class_year}` : 'Student'}
                                    </span>
                                    {user?.homeCountry && (
                                        <span className="flex items-center gap-1 text-on-surface-variant font-data-sm text-data-sm">
                                            <span className="material-symbols-outlined text-[16px]">location_on</span> {user.homeCountry}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            disabled={loading}
                            className="bg-primary text-on-primary px-6 py-2 rounded-xl font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : (isEditing ? 'Save Profile' : 'Edit Profile')}
                        </button>
                    </div>
                </section>

                {error && <div className="bg-red-500/10 text-red-500 p-4 rounded-xl">{error}</div>}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <section className="glass-panel p-6 rounded-3xl space-y-6">
                            <h3 className="font-h3 text-h3 flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">person</span> Profile Details
                            </h3>
                            
                            {isEditing ? (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-on-surface-variant mb-1">Bio</label>
                                        <textarea 
                                            name="bio" value={formData.bio} onChange={handleChange}
                                            className="w-full bg-background border border-outline/30 rounded-xl p-3 text-on-surface h-24"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-on-surface-variant mb-1">Class Year</label>
                                            <input 
                                                type="text" name="class_year" value={formData.class_year} onChange={handleChange}
                                                className="w-full bg-background border border-outline/30 rounded-xl p-3 text-on-surface"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-on-surface-variant mb-1">Target College</label>
                                            <input 
                                                type="text" name="targetCollege" value={formData.targetCollege} onChange={handleChange}
                                                className="w-full bg-background border border-outline/30 rounded-xl p-3 text-on-surface"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-on-surface-variant mb-1">Home Country</label>
                                            <input 
                                                type="text" name="homeCountry" value={formData.homeCountry} onChange={handleChange}
                                                className="w-full bg-background border border-outline/30 rounded-xl p-3 text-on-surface"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-on-surface-variant mb-1">Target Country</label>
                                            <input 
                                                type="text" name="targetCountry" value={formData.targetCountry} onChange={handleChange}
                                                className="w-full bg-background border border-outline/30 rounded-xl p-3 text-on-surface"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-on-surface-variant mb-1">Preferred Currency</label>
                                            <input 
                                                type="text" name="prefCurrency" value={formData.prefCurrency} onChange={handleChange}
                                                className="w-full bg-background border border-outline/30 rounded-xl p-3 text-on-surface"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <p className="font-body-md text-on-surface-variant">
                                        {user?.bio || "No bio provided."}
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                                        <div>
                                            <p className="text-xs text-on-surface-variant uppercase tracking-widest">Target College</p>
                                            <p className="font-bold text-on-surface">{user?.targetCollege || "Not set"}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-on-surface-variant uppercase tracking-widest">Target Country</p>
                                            <p className="font-bold text-on-surface">{user?.targetCountry || "Not set"}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-on-surface-variant uppercase tracking-widest">Home Country</p>
                                            <p className="font-bold text-on-surface">{user?.homeCountry || "Not set"}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-on-surface-variant uppercase tracking-widest">Currency</p>
                                            <p className="font-bold text-on-surface">{user?.prefCurrency || "Not set"}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </section>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <section className="glass-panel p-6 rounded-3xl space-y-4">
                            <h3 className="font-h3 text-h3 flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">info</span> Account Status
                            </h3>
                            <div className="space-y-4 text-sm text-on-surface-variant">
                                <div className="flex justify-between">
                                    <span>Joined</span>
                                    <span className="text-on-surface font-bold">
                                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Verification</span>
                                    <span className="text-primary font-bold">Verified</span>
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
