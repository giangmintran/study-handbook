import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, Book, ChevronDown, ChevronRight, Home, Dumbbell, 
  Menu, X, PanelLeftClose, PanelLeftOpen 
} from 'lucide-react';

const Sidebar = () => {
  // --- States ---
  // Trạng thái mở menu con (Toán, Anh...)
  const [openSubjects, setOpenSubjects] = useState({ math: true, english: false, physics: false });
  // Trạng thái thu gọn sidebar (Desktop)
  const [isCollapsed, setIsCollapsed] = useState(false);
  // Trạng thái mở sidebar trên Mobile
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // --- Handlers ---
  const toggleSubject = (subject) => {
    // Nếu đang thu gọn mà bấm vào menu cha, thì mở bung sidebar ra để user thấy menu con
    if (isCollapsed) setIsCollapsed(false);
    setOpenSubjects(prev => ({ ...prev, [subject]: !prev[subject] }));
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Đóng sidebar mobile khi user click vào link (điều hướng sang trang khác)
  const handleLinkClick = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* --- MOBILE: Nút Hamburger (Chỉ hiện trên màn hình nhỏ khi menu đóng) --- */}
      {!isMobileOpen && (
        <button 
          onClick={() => setIsMobileOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 bg-slate-800 text-white rounded md:hidden hover:bg-slate-700 shadow-lg"
        >
          <Menu size={24} />
        </button>
      )}

      {/* --- MOBILE: Overlay (Lớp phủ đen mờ khi mở menu) --- */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* --- SIDEBAR CONTAINER --- */}
      <div className={`
        fixed inset-y-0 left-0 z-50 bg-slate-900 text-white border-r border-slate-700 flex flex-col transition-all duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:relative
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}>
        
        {/* HEADER: Logo + Nút Collapse */}
        <div className="p-4 h-16 flex items-center justify-between border-b border-slate-700">
          {/* Logo Text - Ẩn khi thu gọn */}
          <div className={`font-bold text-xl overflow-hidden whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-full opacity-100'}`}>
            📚 Cẩm Nang
          </div>
          
          {/* Nút đóng mobile */}
          <button onClick={() => setIsMobileOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>

          {/* Nút thu gọn Desktop */}
          <button 
            onClick={toggleSidebar} 
            className="hidden md:block text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
          >
            {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>
        </div>
        
        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden p-2">
          
          {/* Trang chủ */}
          <Link 
            to="/" 
            onClick={handleLinkClick}
            className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded mb-2 transition-colors"
            title={isCollapsed ? "Trang chủ" : ""}
          >
            <div className="min-w-[20px]"><Home size={20} /></div>
            <span className={`whitespace-nowrap transition-all duration-200 ${isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>
              Trang chủ
            </span>
          </Link>

          {/* Helper Component cho các nhóm môn học */}
          <SubjectGroup 
            title="Toán Học" 
            icon={<Calculator size={20}/>} 
            isOpen={openSubjects.math}
            onToggle={() => toggleSubject('math')}
            isCollapsed={isCollapsed}
          >
            <SubLink to="/math/graph" onClick={handleLinkClick}>Vẽ đồ thị</SubLink>
            <SubLink to="/math/vector" onClick={handleLinkClick}>Tính Vector</SubLink>
            <SubLink to="/math/formula" onClick={handleLinkClick}>Công thức</SubLink>
          </SubjectGroup>

          <SubjectGroup 
            title="Tiếng Anh" 
            icon={<Book size={20}/>} 
            isOpen={openSubjects.english}
            onToggle={() => toggleSubject('english')}
            isCollapsed={isCollapsed}
          >
            <SubLink to="/english/dictionary" onClick={handleLinkClick}>Tra từ điển</SubLink>
          </SubjectGroup>

          <SubjectGroup 
            title="Vật Lý" 
            icon={<Dumbbell size={20}/>} 
            isOpen={openSubjects.physics}
            onToggle={() => toggleSubject('physics')}
            isCollapsed={isCollapsed}
          >
            <SubLink to="/physics/formula" onClick={handleLinkClick}>Công thức</SubLink>
          </SubjectGroup>

        </nav>
      </div>
    </>
  );
};

// --- Sub-components để code gọn hơn ---

const SubjectGroup = ({ title, icon, isOpen, onToggle, isCollapsed, children }) => {
  return (
    <div className="mt-2">
      <button 
        onClick={onToggle}
        className={`w-full flex items-center p-2 hover:bg-slate-800 rounded text-left transition-colors relative group`}
        title={isCollapsed ? title : ""}
      >
        <div className="min-w-[20px] flex items-center justify-center text-slate-200">
          {icon}
        </div>
        
        {/* Text và Mũi tên: Ẩn khi collapsed */}
        <div className={`flex items-center justify-between flex-1 ml-2 overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0 hidden' : 'w-full opacity-100'}`}>
          <span className="whitespace-nowrap">{title}</span>
          {isOpen ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
        </div>

        {/* Tooltip giả (chỉ hiện khi hover ở chế độ collapsed nếu muốn - tuỳ chọn) */}
        {/* {isCollapsed && (
             <div className="absolute left-14 bg-slate-700 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
               {title}
             </div>
        )} */}
      </button>
      
      {/* Menu con: Chỉ hiện khi Mở (isOpen) VÀ không bị thu gọn (isCollapsed = false) */}
      {/* Lưu ý: Nếu user click icon khi đang collapsed, hàm toggleSubject ở trên đã set isCollapsed = false nên menu sẽ hiện ra */}
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen && !isCollapsed ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="ml-9 flex flex-col border-l border-slate-600 pl-2 mt-1 space-y-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const SubLink = ({ to, children, onClick }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className="text-sm p-1 hover:text-blue-400 block whitespace-nowrap text-slate-300 transition-colors"
  >
    {children}
  </Link>
);

export default Sidebar;