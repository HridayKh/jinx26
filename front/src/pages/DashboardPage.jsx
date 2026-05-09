import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const getWeatherDetails = (code) => {
    if (code === 0) return { icon: 'wb_sunny', desc: 'Clear Skies' };
    if (code === 1 || code === 2) return { icon: 'partly_cloudy_day', desc: 'Partly Cloudy' };
    if (code === 3) return { icon: 'wb_cloudy', desc: 'Overcast' };
    if ([45, 48].includes(code)) return { icon: 'foggy', desc: 'Foggy' };
    if ([51, 53, 55, 56, 57].includes(code)) return { icon: 'grain', desc: 'Drizzle' };
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { icon: 'rainy', desc: 'Rain' };
    if ([71, 73, 75, 77, 85, 86].includes(code)) return { icon: 'ac_unit', desc: 'Snow' };
    if ([95, 96, 99].includes(code)) return { icon: 'thunderstorm', desc: 'Storm' };
    return { icon: 'cloud', desc: 'Unknown' };
};

const DashboardPage = () => {
    const { user } = useAuth();
    const [recentProjects, setRecentProjects] = useState([]);
    const [totalProjects, setTotalProjects] = useState(0);
    const [weatherData, setWeatherData] = useState(null);
    const [weatherLoading, setWeatherLoading] = useState(true);

    useEffect(() => {
        // Fetch recent projects
        const fetchRecent = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/projects');
                if (response.ok) {
                    const data = await response.json();
                    const userProjects = data.filter(p => p.ownerUsername === user?.username);
                    setTotalProjects(userProjects.length);
                    setRecentProjects(userProjects.slice(0, 2));
                }
            } catch (err) {
                console.error("Failed to fetch recent projects", err);
            }
        };
        fetchRecent();
    }, [user?.username]);

    useEffect(() => {
        const fetchWeather = async () => {
            const locationName = user?.targetCountry || user?.homeCountry || 'Tokyo';
            try {
                const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationName)}&count=1`);
                const geoData = await geoRes.json();
                
                if (geoData.results && geoData.results.length > 0) {
                    const { latitude, longitude } = geoData.results[0];
                    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`);
                    const data = await weatherRes.json();
                    
                    setWeatherData({
                        location: locationName,
                        currentTemp: Math.round(data.current.temperature_2m),
                        currentCode: data.current.weather_code,
                        daily: data.daily.time.slice(1, 4).map((time, index) => ({ // next 3 days
                            date: new Date(time),
                            maxTemp: Math.round(data.daily.temperature_2m_max[index + 1]),
                            minTemp: Math.round(data.daily.temperature_2m_min[index + 1]),
                            code: data.daily.weather_code[index + 1]
                        }))
                    });
                }
            } catch (error) {
                console.error("Failed to fetch dashboard weather", error);
            } finally {
                setWeatherLoading(false);
            }
        };
        fetchWeather();
    }, [user?.targetCountry, user?.homeCountry]);

    const displayLocation = weatherData?.location || user?.targetCountry || user?.homeCountry || 'Tokyo';
    const currentWeather = weatherData ? getWeatherDetails(weatherData.currentCode) : { icon: 'cloud', desc: 'Loading...' };

    return (
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
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-data-sm mb-3 inline-block border border-primary/20 uppercase tracking-widest">
                            {user?.targetCountry ? `Target: ${user.targetCountry}` : 'No Target Country Set'}
                        </span>
                        <h2 className="font-h1 text-h1 text-white leading-none">Welcome back, {user?.username}.</h2>
                        <p className="text-on-surface-variant text-lg mt-2 max-w-2xl font-body-lg">
                            {user?.bio || "Designing the next generation of modular academic exchanges."}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                    <div className="space-y-1">
                        <p className="text-on-surface-variant text-xs uppercase tracking-widest font-data-sm">Projects Built</p>
                        <p className="text-h2 font-h2 text-white">{totalProjects}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-on-surface-variant text-xs uppercase tracking-widest font-data-sm">Countries Explored</p>
                        <p className="text-h2 font-h2 text-white">{user?.targetCountry ? 1 : 0}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-on-surface-variant text-xs uppercase tracking-widest font-data-sm">Students Impacted</p>
                        <p className="text-h2 font-h2 text-white">{totalProjects * 12}</p>
                    </div>
                </div>
            </div>
        </section>

        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4 space-y-6">
                <div className="glass-panel rounded-3xl p-6">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-h3 text-h3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">cloud</span> {displayLocation} Pulse
                        </h3>
                        <span className="font-data-sm text-on-surface-variant text-sm">Live</span>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="material-symbols-outlined text-5xl text-primary" style={{fontVariationSettings: "'FILL' 1"}}>{currentWeather.icon}</span>
                                <div>
                                    <p className="text-4xl font-h2">{weatherData ? `${weatherData.currentTemp}°C` : '--°C'}</p>
                                    <p className="text-on-surface-variant font-body-md">{currentWeather.desc}</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                            {weatherData ? weatherData.daily.map((day, idx) => {
                                const details = getWeatherDetails(day.code);
                                const dayName = day.date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
                                return (
                                    <div key={idx} className="text-center p-2 rounded-xl bg-white/5 stitch-border">
                                        <p className="text-xs text-on-surface-variant mb-1 font-data-sm">{dayName}</p>
                                        <span className="material-symbols-outlined text-primary mb-1">{details.icon}</span>
                                        <p className="text-sm font-bold">{day.maxTemp}°</p>
                                    </div>
                                );
                            }) : (
                                <>
                                    <div className="text-center p-2 rounded-xl bg-white/5 stitch-border"><p className="text-xs text-on-surface-variant font-data-sm">...</p></div>
                                    <div className="text-center p-2 rounded-xl bg-white/5 stitch-border"><p className="text-xs text-on-surface-variant font-data-sm">...</p></div>
                                    <div className="text-center p-2 rounded-xl bg-white/5 stitch-border"><p className="text-xs text-on-surface-variant font-data-sm">...</p></div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button className="flex-1 glass-panel hover:bg-primary hover:text-on-primary transition-all p-4 rounded-2xl flex items-center justify-center gap-2 group active:scale-95">
                        <span className="material-symbols-outlined">map</span>
                        <span className="font-bold">Explore {displayLocation}</span>
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
                    {recentProjects.length === 0 ? (
                        <p className="text-on-surface-variant text-sm">No recent projects found.</p>
                    ) : recentProjects.map((proj) => (
                        <div key={proj.projectId} className="glass-panel rounded-3xl p-6 flex gap-8 group hover:border-primary/40 transition-colors cursor-pointer">
                            <div className="w-48 h-32 rounded-2xl overflow-hidden shrink-0 stitch-border bg-surface-variant flex items-center justify-center">
                                <span className="material-symbols-outlined text-4xl text-on-surface-variant">public</span>
                            </div>
                            <div className="flex-1 py-1">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded text-[10px] font-data-sm uppercase tracking-wider">{proj.ownerUsername}</span>
                                    <span className="font-data-sm text-on-surface-variant text-xs">{new Date(proj.createdAt).toLocaleDateString()}</span>
                                </div>
                                <h4 className="font-h3 text-xl text-white group-hover:text-primary transition-colors">{proj.projectName}</h4>
                                <p className="text-sm text-on-surface-variant mt-2 line-clamp-2">{proj.aboutPitch || proj.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    );
};

export default DashboardPage;
