import { ReactNode } from 'react';
import Navbar from "../components/UI/Navbar";
import Footer from '../components/UI/Footer';
interface CommonLayoutProps {
    children: ReactNode;
}

const CommonLayout = ({ children }: CommonLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto p-4">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default CommonLayout;

