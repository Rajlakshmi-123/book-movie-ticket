import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}

      <div className="w-64 bg-gray-900 min-h-screen">
        Sidebar
      </div>

      {/* Content */}

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;