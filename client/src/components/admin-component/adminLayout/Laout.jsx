
import { Outlet, NavLink } from 'react-router-dom';

const AdminLayoutPage = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <nav className="flex flex-col space-y-2">
          <NavLink to="/admin" end>Dashboard</NavLink>
          <NavLink to="/admin/project">Projects</NavLink>
          <NavLink to="/admin/certificate">Certificates</NavLink>
          <NavLink to="/admin/blog">Blogs</NavLink>
          <NavLink to="/admin/profile">Profile</NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayoutPage;
