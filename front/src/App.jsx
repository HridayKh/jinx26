import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import ExplorePage from './pages/ExplorePage';
import MyLabPage from './pages/MyLabPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import CreateProjectPage from './pages/CreateProjectPage';
import ProjectViewPage from './pages/ProjectViewPage';
import { useAuth } from './components/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;
    return children;
};

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const getTitle = (path) => {
        switch(path) {
            case '/': return 'Dashboard';
            case '/explore': return 'Exchange Repository';
            case '/lab': return 'My Research Lab';
            case '/settings': return 'Student Profile';
            default: return 'Exchange Hub';
        }
    };

    if (location.pathname === '/login') {
        return (
            <Routes>
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        );
    }

    return (
        <div className="flex">
            <Sidebar />
            <Header title={getTitle(location.pathname)} />
            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                    <Route path="/explore" element={<ProtectedRoute><ExplorePage /></ProtectedRoute>} />
                    <Route path="/lab" element={<ProtectedRoute><MyLabPage /></ProtectedRoute>} />
                    <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
                    <Route path="/create-project" element={<ProtectedRoute><CreateProjectPage /></ProtectedRoute>} />
                    <Route path="/projects/:projectId" element={<ProtectedRoute><ProjectViewPage /></ProtectedRoute>} />
                </Routes>
            </main>
            
            {location.pathname === '/explore' && (
                <button 
                    className="fixed bottom-10 right-10 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50"
                    onClick={() => navigate('/create-project')}
                >
                    <span className="material-symbols-outlined text-3xl">add</span>
                </button>
            )}
        </div>
    );
};

export default App;
