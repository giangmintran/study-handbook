import React, { useState } from 'react';
import { FlaskConical, RefreshCcw, ArrowRight, Info } from 'lucide-react';

const chemicals = [
  { id: 'water', name: 'Nước (H₂O)', color: 'bg-blue-100', type: 'neutral' },
  { id: 'acid', name: 'Axit (HCl)', color: 'bg-red-200', type: 'acid' },
  { id: 'base', name: 'Bazo (NaOH)', color: 'bg-blue-300', type: 'base' },
  { id: 'indicator', name: 'Quỳ tím', color: 'bg-purple-200', type: 'indicator' },
];

const ReactionSimulation = () => {
  const [chem1, setChem1] = useState(chemicals[0]);
  const [chem2, setChem2] = useState(chemicals[0]);
  const [result, setResult] = useState(null);

  const handleMix = () => {
    // Logic mô phỏng đơn giản
    let res = { message: "Không có hiện tượng gì đặc biệt.", color: "bg-gray-100" };

    if ((chem1.id === 'acid' && chem2.id === 'base') || (chem1.id === 'base' && chem2.id === 'acid')) {
      res = { message: "Phản ứng trung hòa! Tạo ra muối và nước + Tỏa nhiệt.", color: "bg-green-100", icon: "🔥" };
    } else if ((chem1.id === 'indicator' && chem2.id === 'acid') || (chem1.id === 'acid' && chem2.id === 'indicator')) {
      res = { message: "Quỳ tím hóa ĐỎ (Môi trường Axit).", color: "bg-red-500", textColor: "text-white" };
    } else if ((chem1.id === 'indicator' && chem2.id === 'base') || (chem1.id === 'base' && chem2.id === 'indicator')) {
      res = { message: "Quỳ tím hóa XANH (Môi trường Bazo).", color: "bg-blue-600", textColor: "text-white" };
    } else if (chem1.id === chem2.id) {
      res = { message: "Hai chất giống nhau, dung dịch hòa tan.", color: chem1.color };
    }

    setResult(res);
  };

  const reset = () => {
    setChem1(chemicals[0]);
    setChem2(chemicals[0]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-orange-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-orange-600 p-6 text-white flex items-center gap-3">
          <FlaskConical size={32} />
          <div>
            <h1 className="text-2xl font-bold">Mô phỏng Phản ứng Hóa học</h1>
            <p className="text-orange-100 text-sm">Chọn hóa chất và quan sát hiện tượng</p>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Controls Section */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Khu vực pha chế</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Chất 1:</label>
                <select 
                  className="w-full p-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none"
                  value={chem1.id}
                  onChange={(e) => setChem1(chemicals.find(c => c.id === e.target.value))}
                >
                  {chemicals.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div className="flex justify-center text-gray-400">
                <span className="text-2xl">+</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Chất 2:</label>
                <select 
                  className="w-full p-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none"
                  value={chem2.id}
                  onChange={(e) => setChem2(chemicals.find(c => c.id === e.target.value))}
                >
                  {chemicals.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={handleMix}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-medium transition flex justify-center items-center gap-2"
                >
                  <FlaskConical size={18} /> Tiến hành thí nghiệm
                </button>
                <button 
                  onClick={reset}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition"
                  title="Làm lại"
                >
                  <RefreshCcw size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Visualization Section */}
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-6 border border-gray-200">
             <h2 className="text-lg font-semibold text-gray-700 mb-4 self-start">Kết quả mô phỏng</h2>
            
            <div className={`w-48 h-64 border-4 border-gray-300 border-t-0 rounded-b-3xl relative overflow-hidden transition-all duration-500 ease-in-out ${result ? result.color : 'bg-transparent'}`}>
               {/* Liquid animation/representation */}
               <div className="absolute bottom-0 w-full h-2/3 opacity-80 flex items-center justify-center">
                  {result && result.icon && <span className="text-4xl animate-bounce">{result.icon}</span>}
               </div>
               {/* Glass reflection effect */}
               <div className="absolute top-4 left-4 w-4 h-32 bg-white opacity-20 rounded-full"></div>
            </div>

            <div className="mt-6 w-full">
              {result ? (
                <div className={`p-4 rounded-lg ${result.textColor || 'text-gray-800'} ${result.color} bg-opacity-20 border border-gray-200`}>
                  <p className="font-medium flex items-start gap-2">
                    <Info size={20} className="shrink-0 mt-0.5" />
                    {result.message}
                  </p>
                </div>
              ) : (
                <p className="text-center text-gray-500 italic">Chọn chất và nhấn nút để xem kết quả</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactionSimulation;