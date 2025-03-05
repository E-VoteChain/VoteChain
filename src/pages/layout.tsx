import { Outlet } from 'react-router';
import Navbar from '@/components/shared/Navbar';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4.1rem)]">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
