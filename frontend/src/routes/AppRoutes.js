import { Routes, Route } from 'react-router-dom';
// import PrivateRoute from '../components/auth/PrivateRoute';
import MainLayout from '../components/layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import Projects from '../pages/Projects';
import Tickets from '../pages/Tickets';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import HomePage from '../pages/HomePage';
import CreateProjectPage from '../pages/CreateProjectPage';
import ProjectDetail from '../pages/ProjectDetails';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/dash" element={<Dashboard />} />
            <Route path="/create-project" element={<CreateProjectPage />} />
            <Route path="/project/:projectId" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;