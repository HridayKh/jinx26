import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/', icon: 'dashboard', label: 'Dashboard' },
        { path: '/explore', icon: 'explore', label: 'Explore Projects' },
        { path: '/lab', icon: 'science', label: 'My Lab' },
        { path: '/settings', icon: 'settings', label: 'Settings' }
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-[280px] border-r border-white/10 bg-surface-container/80 backdrop-blur-xl flex flex-col p-8 z-50">
            <div className="mb-10">
                <Link to="/settings">
                    <h1 className="font-h3 text-h3 text-primary">Alex Rivers</h1>
                    <p className="text-on-surface-variant text-sm">Senior Researcher</p>
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
                    onClick={() => alert('New Project Creation Started')}
                    className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-95"
                >
                    <span className="material-symbols-outlined">add</span>
                    <span>New Project</span>
                </button>
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-on-surface-variant">
                        <span className="material-symbols-outlined text-sm">cloud</span>
                        <span className="text-xs font-data-sm">Weather: 22°C</span>
                    </div>
                    <div className="flex items-center gap-3 text-on-surface-variant">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        <span className="text-xs font-data-sm">Local Time: 14:32</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
