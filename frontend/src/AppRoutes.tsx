import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import LoadingPage from './pages/common/LoadingPage';
import CommonLayout from './layout/CommonLayout';
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const ClassroomManagement = lazy(() => import('./pages/Classroom/ManageClass'));

const AppRoutes = () => {
    return (
        <Router>
            <Suspense fallback={<LoadingPage />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/classroom"
                        element={
                            <CommonLayout>
                                <ClassroomManagement />
                            </CommonLayout>
                        } />
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
            </Suspense>
        </Router>
    )
}

export default AppRoutes