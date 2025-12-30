import React, { useState } from 'react';

const ChemistryCalculator = () => {
  // --- STATE QUẢN LÝ DỮ LIỆU ---

  // 1. Tính Khối lượng mol (M)
  const [formula, setFormula] = useState('');
  const [molarMassResult, setMolarMassResult] = useState(null);
  const [molarMassError, setMolarMassError] = useState('');

  // 2. Tính Số mol (n)
  const [massForMole, setMassForMole] = useState('');
  const [molarMassForMole, setMolarMassForMole] = useState('');
  const [moleResult, setMoleResult] = useState(null);

  // 3. Tính Nồng độ phần trăm (C%)
  const [massSolute, setMassSolute] = useState(''); // m_ct
  const [massSolution, setMassSolution] = useState(''); // m_dd
  const [concentrationResult, setConcentrationResult] = useState(null);

  // --- HÀM XỬ LÝ LOGIC ---

  // Dữ liệu nguyên tử khối cơ bản (Có thể mở rộng thêm)
  const atomicWeights = {
    H: 1, He: 4, Li: 7, Be: 9, B: 11, C: 12, N: 14, O: 16, F: 19, Ne: 20,
    Na: 23, Mg: 24, Al: 27, Si: 28, P: 31, S: 32, Cl: 35.5, K: 39, Ca: 40,
    Fe: 56, Cu: 64, Zn: 65, Br: 80, Ag: 108, Ba: 137, Au: 197, Hg: 201, Pb: 207
  };

  // Logic 1: Tính khối lượng mol từ công thức
  const calculateMolarMass = () => {
    setMolarMassError('');
    setMolarMassResult(null);
    
    if (!formula) return;

    try {
      let totalMass = 0;
      // Regex để tìm Nguyên tố và Số lượng (VD: H2, O, Na)
      const regex = /([A-Z][a-z]?)(\d*)/g;
      let match;
      let parsedString = '';

      while ((match = regex.exec(formula)) !== null) {
        const element = match[1];
        const count = match[2] === '' ? 1 : parseInt(match[2]);
        
        if (atomicWeights[element]) {
          totalMass += atomicWeights[element] * count;
          parsedString += match[0];
        } else {
          throw new Error(`Không tìm thấy nguyên tố: ${element}`);
        }
      }

      if (parsedString.length !== formula.length) {
         throw new Error("Công thức không hợp lệ hoặc chứa ký tự lạ.");
      }

      setMolarMassResult(totalMass);
    } catch (err) {
      setMolarMassError(err.message);
    }
  };

  // Logic 2: Tính số mol (n = m / M)
  const calculateMoles = () => {
    const m = parseFloat(massForMole);
    const M = parseFloat(molarMassForMole);
    if (m && M) {
      setMoleResult(m / M);
    }
  };

  // Logic 3: Tính C% = (m_ct / m_dd) * 100
  const calculateConcentration = () => {
    // Lấy giá trị từ state
    const m_ct = parseFloat(massSolute); 
    const m_dd = parseFloat(massSolution);

    // Kiểm tra xem m_ct và m_dd có hợp lệ không
    // Lưu ý: Phải dùng đúng tên biến 'm_ct', không dùng 'ct'
    if (!isNaN(m_ct) && !isNaN(m_dd) && m_dd !== 0) {
      setConcentrationResult((m_ct / m_dd) * 100);
    } else {
      // (Tuỳ chọn) Xử lý khi nhập sai hoặc mẫu số bằng 0
      setConcentrationResult(null);
    }
  };

  // --- GIAO DIỆN (JSX) ---
  return (
    <div className="py-10 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Công Cụ Tính Hóa Học</h1>
          <p className="text-gray-600">Hỗ trợ tính toán nhanh cho bài tập hóa học</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* --- CARD 1: TÍNH KHỐI LƯỢNG MOL --- */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-500">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Khối lượng mol</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Công thức hóa học
                </label>
                <input
                  type="text"
                  placeholder="VD: H2SO4, NaCl..."
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-200 outline-none"
                  value={formula}
                  onChange={(e) => setFormula(e.target.value)}
                />
                <p className="text-xs text-gray-400 mt-1">*Phân biệt chữ hoa/thường (VD: Ca khác C A)</p>
              </div>
              
              <button
                onClick={calculateMolarMass}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition"
              >
                Tính
              </button>

              {/* Kết quả */}
              <div className="mt-4 p-3 bg-gray-100 rounded text-center min-h-[80px] flex flex-col justify-center">
                {molarMassError ? (
                  <span className="text-red-500 text-sm">{molarMassError}</span>
                ) : molarMassResult !== null ? (
                  <div>
                    <span className="text-sm text-gray-500">Kết quả:</span>
                    <div className="text-2xl font-bold text-blue-800">{molarMassResult} <span className="text-base font-normal text-gray-600">g/mol</span></div>
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">Chờ nhập liệu...</span>
                )}
              </div>
            </div>
          </div>

          {/* --- CARD 2: TÍNH SỐ MOL --- */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-green-500">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">2. Số mol</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Khối lượng chất - gam
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-200 outline-none"
                  value={massForMole}
                  onChange={(e) => setMassForMole(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Khối lượng mol - g/mol
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-200 outline-none"
                  value={molarMassForMole}
                  onChange={(e) => setMolarMassForMole(e.target.value)}
                />
              </div>

              <button
                onClick={calculateMoles}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded transition"
              >
                Tính n = m / M
              </button>

              {/* Kết quả */}
              <div className="mt-4 p-3 bg-gray-100 rounded text-center min-h-[80px] flex flex-col justify-center">
                {moleResult !== null ? (
                  <div>
                    <span className="text-sm text-gray-500">Kết quả:</span>
                    <div className="text-2xl font-bold text-green-800">{moleResult.toFixed(4)} <span className="text-base font-normal text-gray-600">mol</span></div>
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">Chờ nhập liệu...</span>
                )}
              </div>
            </div>
          </div>

          {/* --- CARD 3: TÍNH NỒNG ĐỘ % --- */}
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-purple-500">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">3. Nồng độ phần trăm</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Khối lượng chất tan 
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-200 outline-none"
                  value={massSolute}
                  onChange={(e) => setMassSolute(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Khối lượng dung dịch
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-200 outline-none"
                  value={massSolution}
                  onChange={(e) => setMassSolution(e.target.value)}
                />
              </div>

              <button
                onClick={calculateConcentration}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded transition"
              >
                Tính C%
              </button>

              {/* Kết quả */}
              <div className="mt-4 p-3 bg-gray-100 rounded text-center min-h-[80px] flex flex-col justify-center">
                {concentrationResult !== null ? (
                  <div>
                    <span className="text-sm text-gray-500">Kết quả:</span>
                    <div className="text-2xl font-bold text-purple-800">{concentrationResult.toFixed(2)}%</div>
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">Chờ nhập liệu...</span>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* --- Footer --- */}
        <div className="mt-10 text-center text-sm text-gray-400">
          <p>Sử dụng nguyên tử khối: H=1, C=12, O=16, S=32, Cl=35.5, Na=23...</p>
        </div>
      </div>
    </div>
  );
};

export default ChemistryCalculator;