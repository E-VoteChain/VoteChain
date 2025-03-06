import { Outlet } from 'react-router';
import { AdminSidebar } from '@/components/shared/admin/sidebar';

const AdminLayout = () => {
  return (
    <section className="flex-1 container grid  gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] px-4 py-6 md:px-6 md:py-8">
      <AdminSidebar />
      <main>
        <Outlet />
      </main>
    </section>
  );
};

export default AdminLayout;
