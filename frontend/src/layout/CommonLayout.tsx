import { ReactNode } from 'react';
import Navbar from "../components/UI/Navbar";
import Footer from '../components/UI/Footer';
import Sidebar from '../components/UI/Sidebar';
import AuthProtected from './AuthProtected';
interface CommonLayoutProps {
    children: ReactNode;
    allow?: string
}

const CommonLayout = ({ children, allow = "Student" }: CommonLayoutProps) => {
    return (
        <AuthProtected allow={allow}>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <Sidebar />
                <main className="flex-1 min-h-screen">
                    {children}
                </main>
                <Footer />
            </div>
        </AuthProtected>
    );
};

export default CommonLayout;

