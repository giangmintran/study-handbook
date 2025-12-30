import React, { useState, useEffect } from 'react';
import { Activity, Gauge, Timer, Battery, ArrowRight, RefreshCcw } from 'lucide-react';

// Cấu hình logic cho từng loại máy tính
const CALCULATORS = [
  {
    id: 'velocity',
    title: "Vận tốc chuyển động",
    desc: "Tính toán mối quan hệ giữa Vận tốc, Quãng đường và Thời gian.",
    icon: <Activity size={24} />,
    formulaDisplay: "v = s / t",
    variables: [
      { key: 'v', label: 'Vận tốc (v)', unit: 'm/s' },
      { key: 's', label: 'Quãng đường (s)', unit: 'm' },
      { key: 't', label: 'Thời gian (t)', unit: 's' }
    ],
    // Logic tính toán: target là biến cần tìm, values là giá trị các biến khác
    calculate: (target, values) => {
      const s = parseFloat(values.s);
      const t = parseFloat(values.t);
      const v = parseFloat(values.v);

      if (target === 'v') return (s && t) ? (s / t) : null;
      if (target === 's') return (v && t) ? (v * t) : null;
      if (target === 't') return (s && v) ? (s / v) : null;
      return null;
    }
  },
  {
    id: 'newton',
    title: "Định luật II Newton",
    desc: "Tính lực, khối lượng hoặc gia tốc của vật.",
    icon: <Gauge size={24} />,
    formulaDisplay: "F = m × a",
    variables: [
      { key: 'F', label: 'Lực (F)', unit: 'N' },
      { key: 'm', label: 'Khối lượng (m)', unit: 'kg' },
      { key: 'a', label: 'Gia tốc (a)', unit: 'm/s²' }
    ],
    calculate: (target, values) => {
      const F = parseFloat(values.F);
      const m = parseFloat(values.m);
      const a = parseFloat(values.a);

      if (target === 'F') return (m && a) ? (m * a) : null;
      if (target === 'm') return (F && a) ? (F / a) : null;
      if (target === 'a') return (F && m) ? (F / m) : null;
      return null;
    }
  },
  {
    id: 'power',
    title: "Công suất",
    desc: "Tính công suất dựa trên công thực hiện và thời gian.",
    icon: <Timer size={24} />,
    formulaDisplay: "P = A / t",
    variables: [
      { key: 'P', label: 'Công suất (P)', unit: 'W' },
      { key: 'A', label: 'Công (A)', unit: 'J' },
      { key: 't', label: 'Thời gian (t)', unit: 's' }
    ],
    calculate: (target, values) => {
      const P = parseFloat(values.P);
      const A = parseFloat(values.A);
      const t = parseFloat(values.t);

      if (target === 'P') return (A && t) ? (A / t) : null;
      if (target === 'A') return (P && t) ? (P * t) : null;
      if (target === 't') return (A && P) ? (A / P) : null;
      return null;
    }
  },
  {
    id: 'ohm',
    title: "Định luật Ohm",
    desc: "Tính hiệu điện thế, cường độ dòng điện hoặc điện trở.",
    icon: <Battery size={24} />,
    formulaDisplay: "U = I × R",
    variables: [
      { key: 'U', label: 'Hiệu điện thế (U)', unit: 'V' },
      { key: 'I', label: 'Cường độ (I)', unit: 'A' },
      { key: 'R', label: 'Điện trở (R)', unit: 'Ω' }
    ],
    calculate: (target, values) => {
      const U = parseFloat(values.U);
      const I = parseFloat(values.I);
      const R = parseFloat(values.R);

      if (target === 'U') return (I && R) ? (I * R) : null;
      if (target === 'I') return (U && R) ? (U / R) : null;
      if (target === 'R') return (U && I) ? (U / I) : null;
      return null;
    }
  }
];

// Component con: Thẻ máy tính đơn lẻ
const CalculatorCard = ({ tool }) => {
  // Mặc định chọn biến đầu tiên làm mục tiêu cần tính
  const [targetVar, setTargetVar] = useState(tool.variables[0].key);
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);

  // Reset khi đổi mục tiêu tính
  const handleTargetChange = (key) => {
    setTargetVar(key);
    setInputs({});
    setResult(null);
  };

  const handleInputChange = (key, value) => {
    const newInputs = { ...inputs, [key]: value };
    setInputs(newInputs);
    
    // Tự động tính toán
    const res = tool.calculate(targetVar, newInputs);
    setResult(res);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-indigo-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      {/* Header Card */}
      <div className="bg-indigo-50 p-4 border-b border-indigo-100 flex items-center gap-3">
        <div className="p-2 bg-indigo-600 text-white rounded-lg">
          {tool.icon}
        </div>
        <div>
          <h3 className="font-bold text-gray-800">{tool.title}</h3>
          <p className="text-xs text-indigo-600 font-mono mt-0.5">{tool.formulaDisplay}</p>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col gap-4">
        {/* Chọn cái cần tính */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
            Bạn muốn tính gì?
          </label>
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            {tool.variables.map((v) => (
              <button
                key={v.key}
                onClick={() => handleTargetChange(v.key)}
                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
                  targetVar === v.key
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {v.key}
              </button>
            ))}
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-3">
          {tool.variables.map((v) => {
            if (v.key === targetVar) return null; // Ẩn ô input của biến đang cần tính
            return (
              <div key={v.key}>
                <label className="block text-sm text-gray-700 mb-1">{v.label}</label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder={`Nhập ${v.key}...`}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    value={inputs[v.key] || ''}
                    onChange={(e) => handleInputChange(v.key, e.target.value)}
                  />
                  <span className="absolute right-3 top-2.5 text-gray-400 text-sm font-medium">
                    {v.unit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Kết quả */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Kết quả:</span>
            <button 
              onClick={() => {setInputs({}); setResult(null);}} 
              className="text-xs text-gray-400 hover:text-indigo-600 flex items-center gap-1"
            >
              <RefreshCcw size={12}/> Reset
            </button>
          </div>
          
          <div className={`mt-2 p-3 rounded-lg text-center transition-colors ${
            result !== null ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'
          }`}>
            <span className="text-2xl font-bold">
              {result !== null && isFinite(result) ? Number(result.toFixed(2)) : '---'}
            </span>
            <span className="ml-1 text-sm opacity-80">
              {tool.variables.find(v => v.key === targetVar)?.unit}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Page Component
const PhysicsToolsPage = () => {
  return (
    <div className="min-h-screenpy-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            Máy tính Vật lý <span className="text-indigo-600">Đa năng</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Công cụ hỗ trợ tính toán nhanh các đại lượng vật lý cơ bản. 
            Chọn đại lượng cần tìm và nhập các thông số còn lại.
          </p>
        </div>

        {/* Grid Layout: Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {CALCULATORS.map((tool) => (
            <CalculatorCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhysicsToolsPage;