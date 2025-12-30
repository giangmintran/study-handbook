import React, { useState } from 'react';
import { Beaker, Calculator, Search, ChevronRight, Info } from 'lucide-react';

const ChemistryPage = () => {
  const [activeTab, setActiveTab] = useState('balance');

  return (
    <div className="from-blue-50 to-indigo-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
        
        {/* Header Section */}
        <header className="bg-indigo-600 p-6 text-white text-center md:text-left flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <Beaker className="w-8 h-8" />
              Hóa Học Trực Tuyến
            </h1>
            <p className="text-indigo-200 text-sm mt-1">Công cụ hỗ trợ học tập và tra cứu phản ứng</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <TabButton 
              isActive={activeTab === 'identify'} 
              onClick={() => setActiveTab('identify')} 
              icon={<Search size={18} />}
              label="Nhận biết chất"
            />
          </div>
        </header>

        {/* Content Section */}
        <main className="p-6 md:p-8 min-h-[400px]">
          <IdentificationSection />
        </main>
      </div>
    </div>
  );
};

// --- Sub-components ---

const TabButton = ({ isActive, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
      isActive 
        ? 'bg-white text-indigo-700 shadow-md' 
        : 'bg-indigo-700 text-indigo-200 hover:bg-indigo-500 hover:text-white'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);


// 2. Component Nhận biết chất
const IdentificationSection = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Dữ liệu mẫu (Data base)
  const substances = [
    { ion: "Cu²⁺", reagent: "dd NaOH", phenomenon: "Kết tủa Xanh lam (Cu(OH)₂)", note: "Tan trong NH₃ dư tạo phức màu xanh thẫm" },
    { ion: "Fe³⁺", reagent: "dd NaOH", phenomenon: "Kết tủa Nâu đỏ (Fe(OH)₃)", note: "Không tan trong kiềm dư" },
    { ion: "Fe²⁺", reagent: "dd NaOH", phenomenon: "Kết tủa Trắng xanh → Hóa nâu trong không khí", note: "Fe(OH)₂ → Fe(OH)₃" },
    { ion: "Al³⁺", reagent: "dd NaOH từ từ", phenomenon: "Kết tủa keo Trắng → Tan trong NaOH dư", note: "Lưỡng tính" },
    { ion: "Cl⁻", reagent: "dd AgNO₃", phenomenon: "Kết tủa Trắng (AgCl)", note: "Hóa đen ngoài ánh sáng" },
    { ion: "SO₄²⁻", reagent: "dd BaCl₂", phenomenon: "Kết tủa Trắng (BaSO₄)", note: "Không tan trong axit mạnh" },
    { ion: "CO₃²⁻", reagent: "Axit (HCl, H₂SO₄)", phenomenon: "Sủi bọt khí không màu (CO₂)", note: "Làm đục nước vôi trong" },
    { ion: "NH₄⁺", reagent: "dd Kiềm (NaOH)", phenomenon: "Khí mùi khai (NH₃)", note: "Làm xanh quỳ tím ẩm" },
  ];

  const filteredData = substances.filter(item => 
    item.ion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.phenomenon.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Search className="text-indigo-600" />
          Tra cứu Nhận biết chất
        </h2>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Tìm ion, màu sắc..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-left border-collapse bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold border-b">Ion / Chất</th>
              <th className="p-4 font-semibold border-b">Thuốc thử</th>
              <th className="p-4 font-semibold border-b">Hiện tượng nhận biết</th>
              <th className="p-4 font-semibold border-b hidden md:table-cell">Ghi chú</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <tr key={index} className="hover:bg-indigo-50 transition-colors">
                  <td className="p-4 font-bold text-indigo-700 font-mono text-lg">{row.ion}</td>
                  <td className="p-4 text-gray-800">{row.reagent}</td>
                  <td className="p-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getColorStyle(row.phenomenon)}`}>
                      {row.phenomenon}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 text-sm italic hidden md:table-cell">{row.note}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">
                  Không tìm thấy dữ liệu phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Helper function để tô màu badge dựa trên text hiện tượng (đơn giản hóa)
const getColorStyle = (text) => {
  const lower = text.toLowerCase();
  if (lower.includes('xanh')) return 'bg-blue-100 text-blue-800 border-blue-200';
  if (lower.includes('đỏ') || lower.includes('nâu')) return 'bg-red-100 text-red-800 border-red-200';
  if (lower.includes('trắng')) return 'bg-gray-100 text-gray-800 border-gray-300';
  if (lower.includes('khí')) return 'bg-yellow-50 text-yellow-800 border-yellow-200';
  return 'bg-gray-50 text-gray-700 border-gray-200';
};

export default ChemistryPage;