import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer'; // Nhớ import Footer

const Layout = () => {
  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Sidebar bên trái */}
      <Sidebar />

      {/* Container bên phải (chứa Workspace + Footer) */}
      <div className="flex-1 flex flex-col h-screen overflow-auto">
        
        {/* Workspace: Nội dung chính sẽ giãn ra (flex-1) */}
        <div className="flex-1 p-6">
          <div className="w-full min-h-full bg-white shadow-sm rounded-lg p-6">
            {/* Nội dung route */}
            <Outlet />
          </div>
        </div>

        {/* Footer nằm dưới cùng của vùng cuộn */}
        <Footer />
        
      </div>
    </div>
  );
};

export default Layout;