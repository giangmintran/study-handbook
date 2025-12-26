import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Sidebar bên trái */}
      <Sidebar />

      {/* Workspace bên phải */}
      <div className="flex-1 overflow-auto p-6">
        {/* SỬA TẠI ĐÂY: đổi h-full thành min-h-full */}
        <div className="w-full min-h-full bg-white shadow-sm rounded-lg p-6">
          {/* Nội dung route */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;