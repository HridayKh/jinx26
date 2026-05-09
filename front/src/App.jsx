import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import ExplorePage from './pages/ExplorePage';
import MyLabPage from './pages/MyLabPage';
import SettingsPage from './pages/SettingsPage';

const App = () => {
    const location = useLocation();
    
    const getTitle = (path) => {
        switch(path) {
            case '/': return 'Dashboard';
            case '/explore': return 'Exchange Repository';
            case '/lab': return 'My Research Lab';
            case '/settings': return 'Student Profile';
            default: return 'Exchange Hub';
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <Header title={getTitle(location.pathname)} />
            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/lab" element={<MyLabPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Routes>
            </main>
            
            {location.pathname === '/explore' && (
                <button 
                    className="fixed bottom-10 right-10 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50"
                    onClick={() => alert('Add to Repository')}
                >
                    <span className="material-symbols-outlined text-3xl">add</span>
                </button>
            )}
        </div>
    );
};

export default App;
