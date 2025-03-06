import { Outlet } from 'react-router';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4.1rem)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
