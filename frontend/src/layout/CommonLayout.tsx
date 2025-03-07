import { ReactNode } from 'react';
import Navbar from "../components/UI/Navbar";
import Footer from '../components/UI/Footer';
import Sidebar from '../components/UI/Sidebar';
interface CommonLayoutProps {
    children: ReactNode;
}

const CommonLayout = ({ children }: CommonLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Sidebar />
            <main className="flex-1 min-h-screen">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default CommonLayout;

