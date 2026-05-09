import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const isActive = (path) => location.pathname === path;

    const [time, setTime] = useState(new Date());
    const [weather, setWeather] = useState({ temp: null, timezone: null, loading: true });

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchWeatherAndLocation = async () => {
            if (!user?.homeCountry) {
                setWeather({ temp: null, timezone: null, loading: false });
                return;
            }
            try {
                // Get coordinates and timezone from country name
                const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(user.homeCountry)}&count=1`);
                const geoData = await geoRes.json();

                if (geoData.results && geoData.results.length > 0) {
                    const { latitude, longitude, timezone } = geoData.results[0];
                    
                    // Fetch weather
                    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
                    const weatherData = await weatherRes.json();
                    
                    setWeather({
                        temp: Math.round(weatherData.current_weather.temperature),
                        timezone: timezone,
                        loading: false
                    });
                } else {
                    setWeather({ temp: null, timezone: null, loading: false });
                }
            } catch (error) {
                console.error("Failed to fetch weather", error);
                setWeather({ temp: null, timezone: null, loading: false });
            }
        };

        fetchWeatherAndLocation();
    }, [user?.homeCountry]);

    const navItems = [
        { path: '/', icon: 'dashboard', label: 'Dashboard' },
        { path: '/explore', icon: 'explore', label: 'Explore Projects' },
        { path: '/lab', icon: 'science', label: 'My Lab' },
        { path: '/settings', icon: 'settings', label: 'Settings' }
    ];

    const timeString = weather.timezone 
        ? time.toLocaleTimeString([], { timeZone: weather.timezone, hour: '2-digit', minute: '2-digit' })
        : time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <aside className="fixed left-0 top-0 h-screen w-[280px] border-r border-white/10 bg-surface-container/80 backdrop-blur-xl flex flex-col p-8 z-50">
            <div className="mb-10">
                <Link to="/settings">
                    <h1 className="font-h3 text-h3 text-primary">{user?.username || 'Guest User'}</h1>
                    <p className="text-on-surface-variant text-sm truncate">{user?.bio || 'Update your profile'}</p>
                </Link>
            </div>
            
            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <Link 
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all active:scale-95 duration-200 ${
                            isActive(item.path) 
                            ? 'text-primary font-bold border-r-2 border-primary bg-white/5' 
                            : 'text-on-surface-variant hover:bg-white/5'
                        }`}
                    >
                        <span className="material-symbols-outlined">{item.icon}</span>
                        <span className="font-body-md">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="mt-auto space-y-4 pt-6 border-t border-white/10">
                <button 
                    onClick={() => navigate('/create-project')}
                    className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-95"
                >
                    <span className="material-symbols-outlined">add</span>
                    <span>New Project</span>
                </button>
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-on-surface-variant">
                        <span className="material-symbols-outlined text-sm">cloud</span>
                        <span className="text-xs font-data-sm">
                            {weather.loading ? 'Loading...' : weather.temp !== null ? `Weather: ${weather.temp}°C` : 'Weather unavailable'}
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-on-surface-variant">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        <span className="text-xs font-data-sm">Local Time: {timeString}</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
