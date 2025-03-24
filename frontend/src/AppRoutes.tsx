import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import LoadingPage from './pages/common/LoadingPage';
import CommonLayout from './layout/CommonLayout';
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const ClassroomManagement = lazy(() => import('./pages/Classroom/ManageClass'));
const ClassDetail = lazy(() => import('./pages/Classroom/ClassDetail'));
const LessonManagement = lazy(() => import('./pages/Lesson/LessonManagement'));
const ListClass = lazy(() => import('./pages/Classroom/ListClass'));
const UserManagemnet = lazy(() => import('./pages/User/UserManagement'));

const AppRoutes = () => {
    return (
        <Router>
            <Suspense fallback={<LoadingPage />}>
                <Routes>
                    <Route path="/" element={<CommonLayout><HomePage /></CommonLayout>} />
                    {/*Auth Routes*/}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/*Classroom Routes */}
                    <Route path="/classroom"
                        element={
                            <CommonLayout>
                                <ClassroomManagement />
                            </CommonLayout>
                        } />
                    <Route path="/classroom/:classroomId" element={<CommonLayout><ClassDetail /></CommonLayout>} />
                    <Route path="/class-list" element={<CommonLayout><ListClass /></CommonLayout>} />
                    <Route path="/lesson" element={<CommonLayout><LessonManagement /></CommonLayout>} />

                    {/*User Routes */}
                    <Route path="/user" element={<CommonLayout><UserManagemnet /></CommonLayout>} />

                    {/*Other Route */}
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
            </Suspense>
        </Router>
    )
}

export default AppRoutes