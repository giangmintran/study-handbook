import React, { useState } from 'react';
import { Ruler, Scale, Timer, Zap, ArrowRightLeft, Copy, Check } from 'lucide-react';

// Cấu hình dữ liệu và tỷ lệ chuyển đổi
// Logic: Định nghĩa tỷ lệ quy đổi về đơn vị chuẩn (Base Unit)
// Công thức: (Giá trị * Tỷ lệ nguồn) / Tỷ lệ đích
const CONVERTERS = [
  {
    id: 'length',
    title: "Độ dài",
    icon: <Ruler size={24} />,
    desc: "m, km, cm, mm, inch...",
    baseUnit: 'm',
    units: [
      { code: 'km', label: 'Kilomet (km)', ratio: 1000 },
      { code: 'm', label: 'Met (m)', ratio: 1 },
      { code: 'cm', label: 'Centimet (cm)', ratio: 0.01 },
      { code: 'mm', label: 'Milimet (mm)', ratio: 0.001 },
      { code: 'inch', label: 'Inch (in)', ratio: 0.0254 },
    ]
  },
  {
    id: 'mass',
    title: "Khối lượng",
    icon: <Scale size={24} />,
    desc: "kg, g, tấn, tạ...",
    baseUnit: 'kg',
    units: [
      { code: 'tan', label: 'Tấn', ratio: 1000 },
      { code: 'ta', label: 'Tạ', ratio: 100 },
      { code: 'kg', label: 'Kilogam (kg)', ratio: 1 },
      { code: 'g', label: 'Gam (g)', ratio: 0.001 },
      { code: 'lb', label: 'Pound (lb)', ratio: 0.453592 },
    ]
  },
  {
    id: 'time',
    title: "Thời gian",
    icon: <Timer size={24} />,
    desc: "Giờ, phút, giây...",
    baseUnit: 's',
    units: [
      { code: 'h', label: 'Giờ (h)', ratio: 3600 },
      { code: 'min', label: 'Phút (m)', ratio: 60 },
      { code: 's', label: 'Giây (s)', ratio: 1 },
      { code: 'ms', label: 'Miligiây (ms)', ratio: 0.001 },
    ]
  },
  {
    id: 'power',
    title: "Công suất",
    icon: <Zap size={24} />,
    desc: "W, kW, Mã lực (HP)...",
    baseUnit: 'W',
    units: [
      { code: 'kW', label: 'Kilowatt (kW)', ratio: 1000 },
      { code: 'W', label: 'Watt (W)', ratio: 1 },
      { code: 'HP', label: 'Mã lực (HP)', ratio: 745.7 }, // Mechanical HP
      { code: 'J/s', label: 'Joule/giây', ratio: 1 },
    ]
  }
];

const ConverterCard = ({ tool }) => {
  const [inputValue, setInputValue] = useState(1);
  const [fromUnit, setFromUnit] = useState(tool.units[0].code); // Mặc định đơn vị đầu tiên
  const [toUnit, setToUnit] = useState(tool.units[1].code);     // Mặc định đơn vị thứ hai
  const [copied, setCopied] = useState(false);

  // Hàm tính toán
  const calculateResult = () => {
    const fromRatio = tool.units.find(u => u.code === fromUnit)?.ratio || 1;
    const toRatio = tool.units.find(u => u.code === toUnit)?.ratio || 1;
    const val = parseFloat(inputValue);

    if (isNaN(val)) return '---';

    // Convert to Base -> Convert to Target
    const result = (val * fromRatio) / toRatio;

    // Format số cho đẹp (tối đa 6 số lẻ nếu cần)
    return parseFloat(result.toFixed(6));
  };

  const result = calculateResult();

  // Hàm đảo chiều đơn vị
  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-indigo-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      {/* Header */}
      <div className="bg-indigo-50 p-4 border-b border-indigo-100 flex items-center gap-3">
        <div className="p-2 bg-indigo-600 text-white rounded-lg shadow-sm">
          {tool.icon}
        </div>
        <div>
          <h3 className="font-bold text-gray-800">{tool.title}</h3>
          <p className="text-xs text-indigo-600 truncate max-w-[150px]">{tool.desc}</p>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col gap-4">

        {/* Input Section */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 uppercase">Nhập giá trị</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-2/3 p-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-lg"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-1/3 p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-indigo-500 outline-none cursor-pointer"
            >
              {tool.units.map(u => (
                <option key={u.code} value={u.code}>{u.code}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center -my-2 relative z-10">
          <button
            onClick={handleSwap}
            className="bg-white border border-indigo-100 p-1.5 rounded-full text-indigo-600 hover:bg-indigo-50 hover:scale-110 transition-all shadow-sm"
            title="Đảo chiều"
          >
            <ArrowRightLeft size={16} />
          </button>
        </div>

        {/* Output Section */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 uppercase">Kết quả</label>
          <div className="flex gap-2">
            <div className="w-2/3 p-2 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-between">
              <span className="font-mono text-lg font-bold text-indigo-800 truncate">{result}</span>
              <button
                onClick={handleCopy}
                className="bg-transparent border-none p-1 text-indigo-400 hover:text-indigo-700 transition-colors"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-1/3 p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-indigo-500 outline-none cursor-pointer"
            >
              {tool.units.map(u => (
                <option key={u.code} value={u.code}>{u.code}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-auto pt-3">
          <p className="text-xs text-center text-gray-400">
            1 {fromUnit} = {parseFloat((tool.units.find(u => u.code === fromUnit).ratio / tool.units.find(u => u.code === toUnit).ratio).toFixed(6))} {toUnit}
          </p>
        </div>

      </div>
    </div>
  );
};

const PhysicUnitConverterPage = () => {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Chuyển đổi <span className="text-indigo-600">Đơn vị</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Công cụ chuyển đổi nhanh chóng và chính xác cho các đại lượng vật lý phổ biến.
          </p>
        </div>

        {/* Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {CONVERTERS.map((tool) => (
            <ConverterCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* Simple Guide */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <span className="block text-2xl mb-1">📏</span>
              <span className="text-sm font-medium text-gray-600">Chuẩn Quốc Tế (SI)</span>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <span className="block text-2xl mb-1">⚡</span>
              <span className="text-sm font-medium text-gray-600">Cập nhật tức thì</span>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <span className="block text-2xl mb-1">📱</span>
              <span className="text-sm font-medium text-gray-600">Tương thích Mobile</span>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <span className="block text-2xl mb-1">🎯</span>
              <span className="text-sm font-medium text-gray-600">Độ chính xác cao</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PhysicUnitConverterPage;