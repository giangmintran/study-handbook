import React, { useState, useMemo } from 'react';
import formulasData from '../../data/formulas.json'; 
import { formulaLogic } from '../../logic/formulaLogic';

// --- XỬ LÝ DỮ LIỆU ---
const FORMULAS = formulasData.map((formula) => ({
  ...formula,
  logic: formulaLogic[formula.id] || (() => 'Chưa cập nhật logic')
}));

const FormulaPhysic = () => {
  const [activeGrade, setActiveGrade] = useState('all'); 
  const [selectedFormula, setSelectedFormula] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [result, setResult] = useState(null);

  // Lọc danh sách
  const filteredFormulas = useMemo(() => {
    return FORMULAS.filter(f => {
      const matchSubject = f.subject === 'physics'; 
      const matchGrade = activeGrade === 'all' || f.grade === parseInt(activeGrade);
      return matchSubject && matchGrade;
    });
  }, [activeGrade]);

  const handleSelectFormula = (formula) => {
    setSelectedFormula(formula);
    setInputValues({});
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (name, value) => {
    setInputValues(prev => ({ ...prev, [name]: value }));
  };

  const handleCalculate = () => {
    if (!selectedFormula) return;
    const numericValues = {};
    let isValid = true;

    selectedFormula.inputs.forEach(input => {
      const val = parseFloat(inputValues[input.name]);
      if (isNaN(val)) { isValid = false; }
      numericValues[input.name] = val;
    });

    if (!isValid) {
      setResult("Vui lòng nhập đầy đủ số hợp lệ.");
      return;
    }

    try {
        const res = selectedFormula.logic(numericValues);
        if (typeof res === 'number') {
          setResult(Number.isInteger(res) ? res : res.toFixed(2));
        } else {
          setResult(res);
        }
    } catch (error) {
        setResult("Lỗi tính toán");
        console.error(error);
    }
  };

  return (
    // RESPONSIVE 1: Thêm padding ngang (px-4) và max-width để không bị dính sát lề trên mobile
    <div className="font-sans text-gray-800 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
      
      {/* RESPONSIVE 2: Tiêu đề nhỏ lại một chút trên mobile (text-2xl) */}
      <h1 className="text-2xl md:text-4xl font-bold text-center text-indigo-700 my-6 md:mb-8">
        Tra Cứu & Tính Toán Công Thức Vật lý
      </h1>

      {/* --- PHẦN 1: MÁY TÍNH ĐỘNG --- */}
      {/* Giữ nguyên logic PC (md:p-6), chỉ chỉnh nhẹ padding mobile (p-4) */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border-t-4 border-indigo-500 mb-8 md:mb-10">
        {selectedFormula ? (
          <div>
            {/* Header máy tính: Flex wrap để xuống dòng trên mobile nhỏ */}
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
               <div>
                  <h2 className="text-xl md:text-2xl font-bold text-indigo-600 flex items-center gap-2">
                    🔢 {selectedFormula.title}
                  </h2>
                  {/* Công thức scroll ngang trên mobile nếu quá dài */}
                  <div className="mt-1 overflow-x-auto pb-1">
                    <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-black whitespace-nowrap">
                        {selectedFormula.expression}
                    </span>
                  </div>
               </div>
               <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded shrink-0">
                 Toán Học - Lớp {selectedFormula.grade}
               </span>
            </div>
            
            {/* GIỮ NGUYÊN LAYOUT PC: grid-cols-2 trên md trở lên */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cột Input */}
              <div className="space-y-4">
                {selectedFormula.inputs.map((input) => (
                  <div key={input.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {input.label}
                    </label>
                    <input
                      type="number"
                      value={inputValues[input.name] || ''}
                      onChange={(e) => handleInputChange(input.name, e.target.value)}
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                      placeholder={`Nhập ${input.name}...`}
                    />
                  </div>
                ))}
                <button
                  onClick={handleCalculate}
                  className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 transition shadow-md active:transform active:scale-95"
                >
                  Tính Kết Quả
                </button>
              </div>

              {/* Cột Kết quả */}
              <div className="flex items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-300 p-6 min-h-[150px]">
                {result !== null ? (
                  <div className="text-center w-full">
                    <p className="text-gray-500 mb-2">Kết quả tính toán</p>
                    {/* Thêm break-all để số quá lớn không phá layout trên mobile */}
                    <div className="text-3xl md:text-4xl font-bold text-indigo-600 break-all">
                      {result}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 italic text-center">Nhập số liệu và nhấn tính toán...</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="text-xl mb-2">👋 Chưa có công thức nào được chọn.</p>
            <p className="text-sm">Vui lòng chọn một công thức Toán học bên dưới để bắt đầu.</p>
          </div>
        )}
      </div>

      {/* --- PHẦN 2: BỘ LỌC (RESPONSIVE) --- */}
      {/* Mobile: Căn giữa, xếp dọc / PC: Căn phải, xếp ngang */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-center sm:items-end mb-8 border-gray-200 pb-4 gap-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Lọc theo lớp
          </span>
          <div className="flex gap-2">
              {['all', 6, 7, 8, 9].map((grade) => (
                  <button
                  key={grade}
                  onClick={() => setActiveGrade(grade)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 border-2 touch-manipulation ${
                      activeGrade === grade
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg scale-110'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-indigo-300 hover:text-indigo-500'
                  }`}
                  >
                  {grade === 'all' ? 'All' : grade}
                  </button>
              ))}
          </div>
      </div>

      {/* --- PHẦN 3: DANH SÁCH CÔNG THỨC (GRID RESPONSIVE) --- */}
      {/* 1 cột (Mobile) -> 2 cột (Tablet) -> 3 cột (PC) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {filteredFormulas.map((item) => (
          <div 
            key={item.id} 
            onClick={() => handleSelectFormula(item)}
            className={`cursor-pointer bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all group ${
              selectedFormula?.id === item.id ? 'ring-2 ring-indigo-500 border-transparent bg-indigo-50' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold px-2 py-1 rounded bg-blue-100 text-blue-700">
                Lớp {item.grade}
              </span>
              {selectedFormula?.id === item.id && (
                <span className="text-indigo-600 text-xs font-bold animate-pulse">Đang chọn</span>
              )}
            </div>
            
            <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-indigo-600 transition-colors">
              {item.title}
            </h3>
            
            {/* Scroll ngang cho công thức dài trong thẻ card */}
            <div className="my-3 p-2 bg-gray-50 rounded text-center font-mono text-base md:text-lg text-gray-700 border border-gray-100 overflow-x-auto whitespace-nowrap">
              {item.expression}
            </div>
            
            <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
          </div>
        ))}
        
        {filteredFormulas.length === 0 && (
          <div className="col-span-full text-center py-10 text-gray-400">
            Không tìm thấy công thức vật lý nào cho khối lớp này.
          </div>
        )}
      </div>
    </div>
  );
};

export default FormulaPhysic;