import React, { useState, useMemo } from 'react';

// --- CƠ SỞ DỮ LIỆU CÔNG THỨC ---
// Mỗi công thức bao gồm: id, môn, lớp, tiêu đề, biểu thức hiển thị, 
// danh sách biến đầu vào (inputs), và hàm tính toán (logic).
const FORMULAS = [
  // --- TOÁN HỌC ---
  {
    id: 'm6_rect_area',
    subject: 'math',
    grade: 6,
    title: 'Diện tích hình chữ nhật',
    expression: 'S = a × b',
    description: 'a: chiều dài, b: chiều rộng',
    inputs: [
      { name: 'a', label: 'Chiều dài (a)' },
      { name: 'b', label: 'Chiều rộng (b)' }
    ],
    logic: (vals) => vals.a * vals.b
  },
  {
    id: 'm6_rect_peri',
    subject: 'math',
    grade: 6,
    title: 'Chu vi hình chữ nhật',
    expression: 'P = (a + b) × 2',
    description: 'a: chiều dài, b: chiều rộng',
    inputs: [
      { name: 'a', label: 'Chiều dài (a)' },
      { name: 'b', label: 'Chiều rộng (b)' }
    ],
    logic: (vals) => (vals.a + vals.b) * 2
  },
  {
    id: 'm7_power',
    subject: 'math',
    grade: 7,
    title: 'Lũy thừa',
    expression: 'aⁿ',
    description: 'Tính a mũ n',
    inputs: [
      { name: 'a', label: 'Cơ số (a)' },
      { name: 'n', label: 'Số mũ (n)' }
    ],
    logic: (vals) => Math.pow(vals.a, vals.n)
  },
  {
    id: 'm8_pythagoras',
    subject: 'math',
    grade: 8,
    title: 'Định lý Pytago (Tìm cạnh huyền)',
    expression: 'c = √(a² + b²)',
    description: 'Tam giác vuông với 2 cạnh góc vuông a, b',
    inputs: [
      { name: 'a', label: 'Cạnh góc vuông 1 (a)' },
      { name: 'b', label: 'Cạnh góc vuông 2 (b)' }
    ],
    logic: (vals) => Math.sqrt(vals.a * vals.a + vals.b * vals.b)
  },
  {
    id: 'm9_quad',
    subject: 'math',
    grade: 9,
    title: 'Giải PT Bậc 2 (Tìm Delta)',
    expression: 'Δ = b² - 4ac',
    description: 'Tính biệt thức Delta cho pt: ax² + bx + c = 0',
    inputs: [
      { name: 'a', label: 'Hệ số a' },
      { name: 'b', label: 'Hệ số b' },
      { name: 'c', label: 'Hệ số c' }
    ],
    logic: (vals) => vals.b * vals.b - 4 * vals.a * vals.c
  },
  {
    id: 'm9_circle_area',
    subject: 'math',
    grade: 9,
    title: 'Diện tích hình tròn',
    expression: 'S = πr²',
    description: 'r là bán kính',
    inputs: [
      { name: 'r', label: 'Bán kính (r)' }
    ],
    logic: (vals) => Math.PI * vals.r * vals.r
  },

  // --- VẬT LÝ ---
  {
    id: 'p6_density',
    subject: 'physics',
    grade: 6,
    title: 'Khối lượng riêng',
    expression: 'D = m / V',
    description: 'm: khối lượng (kg), V: thể tích (m³)',
    inputs: [
      { name: 'm', label: 'Khối lượng (m)' },
      { name: 'V', label: 'Thể tích (V)' }
    ],
    logic: (vals) => vals.V !== 0 ? vals.m / vals.V : 'Lỗi chia cho 0'
  },
  {
    id: 'p8_force',
    subject: 'physics',
    grade: 8,
    title: 'Áp suất chất rắn',
    expression: 'p = F / S',
    description: 'F: áp lực (N), S: diện tích bị ép (m²)',
    inputs: [
      { name: 'F', label: 'Áp lực (F)' },
      { name: 'S', label: 'Diện tích (S)' }
    ],
    logic: (vals) => vals.S !== 0 ? vals.F / vals.S : 'Lỗi chia cho 0'
  },
  {
    id: 'p8_work',
    subject: 'physics',
    grade: 8,
    title: 'Công cơ học',
    expression: 'A = F × s',
    description: 'F: lực tác dụng (N), s: quãng đường (m)',
    inputs: [
      { name: 'F', label: 'Lực (F)' },
      { name: 's', label: 'Quãng đường (s)' }
    ],
    logic: (vals) => vals.F * vals.s
  },
  {
    id: 'p9_ohm',
    subject: 'physics',
    grade: 9,
    title: 'Định luật Ohm (Tìm CĐDĐ)',
    expression: 'I = U / R',
    description: 'U: Hiệu điện thế (V), R: Điện trở (Ω)',
    inputs: [
      { name: 'U', label: 'Hiệu điện thế (U)' },
      { name: 'R', label: 'Điện trở (R)' }
    ],
    logic: (vals) => vals.R !== 0 ? vals.U / vals.R : 'Lỗi chia cho 0'
  },
  {
    id: 'p9_power',
    subject: 'physics',
    grade: 9,
    title: 'Công suất điện',
    expression: 'P = U × I',
    description: 'U: Hiệu điện thế (V), I: Cường độ dòng điện (A)',
    inputs: [
      { name: 'U', label: 'Hiệu điện thế (U)' },
      { name: 'I', label: 'Cường độ dòng điện (I)' }
    ],
    logic: (vals) => vals.U * vals.I
  },
];

const FormulaUtility = () => {
  // State quản lý UI
  const [activeTab, setActiveTab] = useState('math'); // 'math' or 'physics'
  const [activeGrade, setActiveGrade] = useState('all'); // 'all', 6, 7, 8, 9
  
  // State quản lý tính toán
  const [selectedFormula, setSelectedFormula] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [result, setResult] = useState(null);

  // Lọc danh sách công thức dựa trên Tab và Grade
  const filteredFormulas = useMemo(() => {
    return FORMULAS.filter(f => {
      const matchSubject = f.subject === activeTab;
      const matchGrade = activeGrade === 'all' || f.grade === parseInt(activeGrade);
      return matchSubject && matchGrade;
    });
  }, [activeTab, activeGrade]);

  // Xử lý khi chọn một công thức
  const handleSelectFormula = (formula) => {
    setSelectedFormula(formula);
    setInputValues({}); // Reset inputs
    setResult(null);    // Reset kết quả
    // Tự động cuộn lên đầu trang (nếu danh sách dài)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Xử lý khi nhập liệu vào các ô input
  const handleInputChange = (name, value) => {
    setInputValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Thực hiện tính toán
  const handleCalculate = () => {
    if (!selectedFormula) return;

    // Chuyển đổi input từ string sang number
    const numericValues = {};
    let isValid = true;

    selectedFormula.inputs.forEach(input => {
      const val = parseFloat(inputValues[input.name]);
      if (isNaN(val)) {
        isValid = false;
      }
      numericValues[input.name] = val;
    });

    if (!isValid) {
      setResult("Vui lòng nhập đầy đủ số hợp lệ.");
      return;
    }

    // Gọi hàm logic đã định nghĩa trong data
    const res = selectedFormula.logic(numericValues);
    
    // Format kết quả (nếu là số thì làm tròn 2 số lẻ)
    if (typeof res === 'number') {
      setResult(Number.isInteger(res) ? res : res.toFixed(2));
    } else {
      setResult(res);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto bg-gray-50 min-h-screen font-sans text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-8">
        Tra Cứu & Tính Toán Công Thức
      </h1>

      {/* --- PHẦN 1: MÁY TÍNH ĐỘNG (DYNAMIC CALCULATOR) --- */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-500 mb-10">
        {selectedFormula ? (
          <div>
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h2 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
                    🧮 {selectedFormula.title}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">Công thức: <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-black">{selectedFormula.expression}</span></p>
               </div>
               <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                 Lớp {selectedFormula.grade} - {selectedFormula.subject === 'math' ? 'Toán' : 'Lý'}
               </span>
            </div>
            
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
                      placeholder={`Nhập giá trị ${input.name}...`}
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
              <div className="flex items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-300 p-6">
                {result !== null ? (
                  <div className="text-center">
                    <p className="text-gray-500 mb-2">Kết quả tính toán</p>
                    <div className="text-4xl font-bold text-indigo-600 break-all">
                      {result}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 italic">Nhập số liệu và nhấn tính toán...</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="text-xl mb-2">👋 Chưa có công thức nào được chọn.</p>
            <p className="text-sm">Vui lòng chọn một công thức bên dưới để bắt đầu tính toán.</p>
          </div>
        )}
      </div>

      {/* --- PHẦN 2: BỘ LỌC (TABS & GRADE) --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-gray-200 pb-4">
            {/* Tab Môn học - Style Segmented */}
            <div className="bg-gray-200/60 p-1.5 rounded-xl inline-flex shadow-inner">
                {['math', 'physics'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-8 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ease-in-out ${
                    activeTab === tab
                        ? 'bg-white text-indigo-600 shadow-md transform scale-100'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                    }`}
                >
                    {tab === 'math' ? '🔢 Toán Học' : '⚛️ Vật Lý'}
                </button>
                ))}
            </div>

            {/* Filter Lớp - Giữ nguyên logic nhưng làm đẹp UI */}
            <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider text-right">
                    Chọn khối lớp
                </span>
                <div className="flex gap-2">
                    {['all', 6, 7, 8, 9].map((grade) => (
                        <button
                        key={grade}
                        onClick={() => setActiveGrade(grade)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 border-2 ${
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
        </div>

      {/* --- PHẦN 3: DANH SÁCH CÔNG THỨC (GRID) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFormulas.map((item) => (
          <div 
            key={item.id} 
            onClick={() => handleSelectFormula(item)}
            className={`cursor-pointer bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-indigo-300 transition-all group ${
              selectedFormula?.id === item.id ? 'ring-2 ring-indigo-500 border-transparent' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`text-xs font-bold px-2 py-1 rounded ${
                item.subject === 'math' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
              }`}>
                Lớp {item.grade}
              </span>
              {selectedFormula?.id === item.id && (
                <span className="text-indigo-600 text-xs font-bold animate-pulse">Đang chọn</span>
              )}
            </div>
            
            <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-indigo-600 transition-colors">
              {item.title}
            </h3>
            
            <div className="my-3 p-2 bg-gray-50 rounded text-center font-mono text-lg text-gray-700 border border-gray-100">
              {item.expression}
            </div>
            
            <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
          </div>
        ))}
        
        {filteredFormulas.length === 0 && (
          <div className="col-span-full text-center py-10 text-gray-400">
            Không tìm thấy công thức nào cho bộ lọc này.
          </div>
        )}
      </div>
    </div>
  );
};

export default FormulaUtility;