import { Link } from 'react-router-dom';

const Header = ({ title }) => (
    <header className="fixed top-0 right-0 left-[280px] z-40 bg-surface/80 backdrop-blur-xl border-b border-white/10 flex justify-between items-center h-20 px-8">
        <h2 className="font-h3 text-h3 text-on-surface">{title}</h2>
        <div className="flex items-center gap-6">
            <div className="relative group">
                <input 
                    className="bg-surface-container-lowest border border-white/10 rounded-full py-2 px-10 focus:outline-none focus:border-primary transition-all w-64 text-sm" 
                    placeholder="Search resources..." 
                    type="text"
                />
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
            </div>
            <div className="flex items-center gap-4">
                <button className="text-on-surface-variant hover:text-primary transition-all active:opacity-80">
                    <span className="material-symbols-outlined">notifications</span>
                </button>
                <Link to="/settings" className="w-10 h-10 rounded-full border border-white/10 overflow-hidden cursor-pointer active:opacity-80 transition-opacity">
                    <img alt="User profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ2ULkaLZEzANe7aijoUQTxeqdydNOVSZBIOTFHNes8c9GHoHLPsVWEY_8Tcp6lWxvUZ30FuyYxt3aLU8Dt3Yol6uApbXk3W4-sfft8ANhMhfWFO8w9NHMtywixRoFXDfeSuCPxgNYiSOQODARqD_dqILZcbdDfbb3yP3lSmXEnY2YCpzKQoErX8kfXcb0C5qvas7YLPZkr9Bd94HwmcoZ3l182fPyw06U9lQWLuzB5vvW3Vuh8uI8WbgH_kNayHgoC4gnzkeQh58" className="w-full h-full object-cover" />
                </Link>
            </div>
        </div>
    </header>
);

export default Header;
