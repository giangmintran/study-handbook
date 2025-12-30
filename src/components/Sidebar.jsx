import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator, Book, ChevronDown, ChevronRight, Home, Dumbbell,
  Menu, X, PanelLeftClose, PanelLeftOpen,
  FlaskConical
} from 'lucide-react';

const Sidebar = () => {
  // --- States ---
  const [openSubjects, setOpenSubjects] = useState({
    math: true,
    english: false,
    physics: false,
    chemistry: false
  });

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // --- Handlers ---
  const toggleSubject = (subject) => {
    if (isCollapsed) setIsCollapsed(false);
    setOpenSubjects(prev => ({ ...prev, [subject]: !prev[subject] }));
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLinkClick = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* --- MOBILE: Nút Hamburger --- */}
      {!isMobileOpen && (
        <button
          onClick={() => setIsMobileOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 bg-slate-800 text-white rounded md:hidden hover:bg-slate-700 shadow-lg"
        >
          <Menu size={24} />
        </button>
      )}

      {/* --- MOBILE: Overlay --- */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* --- SIDEBAR CONTAINER --- */}
      <div className={`
        fixed inset-y-0 left-0 z-50 bg-slate-900 text-white border-r border-slate-700 flex flex-col transition-all duration-300 ease-in-out
        h-screen h-[100dvh]
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:relative
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}>

        {/* HEADER (Giữ nguyên - Không bị scroll) */}
        <div className="p-4 h-16 flex items-center justify-between border-b border-slate-700 shrink-0">
          <div className={`font-bold text-xl overflow-hidden whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-full opacity-100'}`}>
            📚 Cẩm Nang
          </div>

          <button onClick={() => setIsMobileOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>

          <button
            onClick={toggleSidebar}
            className="hidden md:block text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
          >
            {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>
        </div>

        {/* NAVIGATION (Phần này sẽ Scroll) */}
        {/* CẬP NHẬT: Thêm các class tùy chỉnh thanh cuộn (scrollbar) */}
        <nav className={`
          flex-1 overflow-y-auto overflow-x-hidden p-2
          /* Tùy chỉnh thanh cuộn cho đẹp hơn */
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-slate-700
          [&::-webkit-scrollbar-thumb]:rounded-full
          hover:[&::-webkit-scrollbar-thumb]:bg-slate-600
        `}>

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

          {/* MÔN TOÁN */}
          <SubjectGroup
            title="Toán Học"
            icon={<Calculator size={20} />}
            isOpen={openSubjects.math}
            onToggle={() => toggleSubject('math')}
            isCollapsed={isCollapsed}
          >
            <SubLink to="/math" onClick={handleLinkClick}>Tổng quan</SubLink>
            <SubLink to="/math/solver" onClick={handleLinkClick}>Giải phương trình</SubLink>
            <SubLink to="/math/graph" onClick={handleLinkClick}>Vẽ đồ thị</SubLink>
            <SubLink to="/math/vector" onClick={handleLinkClick}>Tính Vector</SubLink>
            <SubLink to="/math/formula" onClick={handleLinkClick}>Sổ tay Công thức</SubLink>
            <SubLink to="/math/probability-statistics" onClick={handleLinkClick}>Xác suất & Thống kê</SubLink>
            <SubLink to="/math/converter" onClick={handleLinkClick}>Đổi đơn vị</SubLink>
            <SubLink to="/math/trigonometry" onClick={handleLinkClick}>Lượng giác</SubLink>
          </SubjectGroup>

          {/* MÔN VẬT LÝ */}
          <SubjectGroup
            title="Vật Lý"
            icon={<Dumbbell size={20} />}
            isOpen={openSubjects.physics}
            onToggle={() => toggleSubject('physics')}
            isCollapsed={isCollapsed}
          >
            <SubLink to="/physics" onClick={handleLinkClick}>Tổng quan</SubLink>
            <SubLink to="/physics/formula" onClick={handleLinkClick}>Công thức</SubLink>
            <SubLink to="/physics/tools" onClick={handleLinkClick}>Công cụ tính toán</SubLink>
            <SubLink to="/physics/converter" onClick={handleLinkClick}>Chuyển đổi đơn vị</SubLink>
          </SubjectGroup>

          {/* MÔN HÓA HỌC */}
          <SubjectGroup
            title="Hóa Học"
            icon={<FlaskConical size={20} />}
            isOpen={openSubjects.chemistry}
            onToggle={() => toggleSubject('chemistry')}
            isCollapsed={isCollapsed}
          >
            <SubLink to="/chemistry" onClick={handleLinkClick}>Tổng quan</SubLink>
            <SubLink to="/chemistry/periodic-table" onClick={handleLinkClick}>Bảng tuần hoàn</SubLink>
            <SubLink to="/chemistry/calculator" onClick={handleLinkClick}>Công cụ tính mol</SubLink>
            <SubLink to="/chemistry/chemistry-page" onClick={handleLinkClick}>Nhận biết chất</SubLink>
            <SubLink to="/chemistry/reaction-simulation" onClick={handleLinkClick}>Mô phỏng phản ứng</SubLink>
            <SubLink to="/chemistry/lab-safety" onClick={handleLinkClick}>An toàn phòng thí nghiệm</SubLink>
          </SubjectGroup>

          {/* MÔN TIẾNG ANH */}
          <SubjectGroup
            title="Tiếng Anh"
            icon={<Book size={20} />}
            isOpen={openSubjects.english}
            onToggle={() => toggleSubject('english')}
            isCollapsed={isCollapsed}
          >
            <SubLink to="/english" onClick={handleLinkClick}>Tổng quan</SubLink>
            <SubLink to="/english/dictionary" onClick={handleLinkClick}>Tra từ điển</SubLink>
          </SubjectGroup>
          
          {/* Vùng đệm dưới cùng để không bị cấn nút khi scroll hết cỡ */}
          <div className="h-10"></div>

        </nav>
      </div>
    </>
  );
};

// --- Sub-components (Giữ nguyên) ---
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

        <div className={`flex items-center justify-between flex-1 ml-2 overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0 hidden' : 'w-full opacity-100'}`}>
          <span className="whitespace-nowrap">{title}</span>
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
      </button>

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