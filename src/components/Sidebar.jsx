import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Book, ChevronDown, ChevronRight, Home } from 'lucide-react';

const Sidebar = () => {
  // Quản lý trạng thái mở/đóng của các submenu
  const [openSubjects, setOpenSubjects] = useState({ math: true, english: false });

  const toggleSubject = (subject) => {
    setOpenSubjects(prev => ({ ...prev, [subject]: !prev[subject] }));
  };

  return (
    <div className="w-64 h-screen bg-slate-900 text-white flex flex-col border-r border-slate-700">
      <div className="p-4 text-xl font-bold border-b border-slate-700">
        📚 Cẩm Nang
      </div>
      
      <nav className="flex-1 overflow-y-auto p-2">
        {/* Trang chủ */}
        <Link to="/" className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded">
          <Home size={18} /> Trang chủ
        </Link>

        {/* Môn Toán */}
        <div className="mt-2">
          <button 
            onClick={() => toggleSubject('math')}
            className="w-full flex items-center justify-between p-2 hover:bg-slate-800 rounded text-left"
          >
            <span className="flex items-center gap-2"><Calculator size={18}/> Toán Học</span>
            {openSubjects.math ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
          </button>
          
          {openSubjects.math && (
            <div className="ml-6 flex flex-col border-l border-slate-600 pl-2 mt-1 space-y-1">
              {/* <Link to="/math/solver" className="text-base p-1 hover:text-blue-400">Giải phương trình</Link> */}
              <Link to="/math/graph" className="text-base p-1 hover:text-blue-400">Vẽ đồ thị</Link>
              <Link to="/math/vector" className="text-base p-1 hover:text-blue-400">Tính Vector</Link>
              <Link to="/math/formula" className="text-base p-1 hover:text-blue-400">Công thức</Link>
            </div>
          )}
        </div>

        {/* Môn Tiếng Anh */}
        <div className="mt-2">
          <button 
            onClick={() => toggleSubject('english')}
            className="w-full flex items-center justify-between p-2 hover:bg-slate-800 rounded text-left"
          >
            <span className="flex items-center gap-2"><Book size={18}/> Tiếng Anh</span>
            {openSubjects.english ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
          </button>
          
          {openSubjects.english && (
            <div className="ml-6 flex flex-col border-l border-slate-600 pl-2 mt-1 space-y-1">
              <Link to="/english/dictionary" className="text-base p-1 hover:text-blue-400">Tra từ điển</Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;