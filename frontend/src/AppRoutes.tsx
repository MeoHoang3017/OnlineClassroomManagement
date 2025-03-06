import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import LoadingPage from './pages/common/LoadingPage';
import Navbar from './components/UI/Navbar';
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const ClassroomManagement = lazy(() => import('./pages/Classroom/ManageClass'));

const AppRoutes = () => {
    return (
        <Router>
            <Suspense fallback={<LoadingPage />}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/classroom" element={<ClassroomManagement />} />
                </Routes>
            </Suspense>
        </Router>
    )
}

export default AppRoutes