import React, { useState, useEffect } from 'react';
import { Scale, Ruler, Box, Maximize, ArrowRightLeft, Copy, Check, LayoutGrid } from 'lucide-react';

// --- DATA CẤU HÌNH ---
const CONVERSION_DATA = [
  {
    id: 'length',
    label: 'Độ dài',
    icon: <Ruler size={20} />,
    base: 'm',
    units: {
      km: { label: 'Kilomet (km)', rate: 1000 },
      m: { label: 'Met (m)', rate: 1 },
      cm: { label: 'Centimet (cm)', rate: 0.01 },
      mm: { label: 'Milimet (mm)', rate: 0.001 },
      inch: { label: 'Inch (in)', rate: 0.0254 },
      ft: { label: 'Foot (ft)', rate: 0.3048 },
    }
  },
  {
    id: 'area',
    label: 'Diện tích',
    icon: <Maximize size={20} />,
    base: 'm2',
    units: {
      km2: { label: 'Kilomet vuông (km²)', rate: 1000000 },
      ha: { label: 'Hecta (ha)', rate: 10000 },
      m2: { label: 'Met vuông (m²)', rate: 1 },
      cm2: { label: 'Centimet vuông (cm²)', rate: 0.0001 },
    }
  },
  {
    id: 'volume',
    label: 'Thể tích',
    icon: <Box size={20} />,
    base: 'l',
    units: {
      m3: { label: 'Met khối (m³)', rate: 1000 },
      l: { label: 'Lít (l)', rate: 1 },
      ml: { label: 'Mililit (ml)', rate: 0.001 },
      gal: { label: 'Gallon (US)', rate: 3.78541 },
    }
  },
  {
    id: 'angle',
    label: 'Góc',
    icon: <Scale size={20} />,
    base: 'deg',
    units: {
      deg: { label: 'Độ (°)', rate: 1 },
      rad: { label: 'Radian (rad)', rate: 57.2958 },
      grad: { label: 'Gradian (grad)', rate: 0.9 },
    }
  }
];

// --- COMPONENT CON: 1 BỘ CHUYỂN ĐỔI ---
const ConverterCard = ({ data }) => {
  const unitKeys = Object.keys(data.units);
  
  // State riêng cho từng card
  const [amount, setAmount] = useState(1);
  const [fromUnit, setFromUnit] = useState(unitKeys[0]);
  const [toUnit, setToUnit] = useState(unitKeys[1] || unitKeys[0]);
  const [result, setResult] = useState(0);
  const [copied, setCopied] = useState(false);

  // Tính toán
  useEffect(() => {
    const fromRate = data.units[fromUnit].rate;
    const toRate = data.units[toUnit].rate;
    const val = (parseFloat(amount) * fromRate) / toRate;
    // Xử lý hiển thị số: bỏ số 0 vô nghĩa, tối đa 6 số thập phân
    setResult(parseFloat(val.toFixed(6)));
  }, [amount, fromUnit, toUnit, data]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-purple-50 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Card Header */}
      <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-purple-50/30">
        <div className="p-2 bg-white rounded-lg text-purple-600 shadow-sm border border-purple-100">
          {data.icon}
        </div>
        <h3 className="font-bold text-gray-800 text-lg">{data.label}</h3>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col gap-4">
        {/* Input Area */}
        <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Nhập</label>
            <div className="flex gap-2">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-1/2 p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-purple-200"
                />
                <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="w-1/2 p-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-purple-400"
                >
                    {unitKeys.map((key) => (
                    <option key={key} value={key}>{data.units[key].label}</option>
                    ))}
                </select>
            </div>
        </div>

        {/* Separator Icon */}
        <div className="flex justify-center -my-2 relative z-10">
            <div className="bg-purple-50 p-1.5 rounded-full text-purple-400">
                <ArrowRightLeft size={16} />
            </div>
        </div>

        {/* Output Area */}
        <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Kết quả</label>
            <div className="flex gap-2">
                <div className="w-1/2 p-2.5 bg-purple-50 border border-purple-100 rounded-lg text-purple-700 font-bold flex items-center justify-between overflow-hidden">
                    <span className="truncate">{result}</span>
                    <button 
                        onClick={handleCopy} 
                        className="text-purple-300 hover:text-purple-600 transition-colors ml-1"
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                </div>
                <select
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                    className="w-1/2 p-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-purple-400"
                >
                    {unitKeys.map((key) => (
                    <option key={key} value={key}>{data.units[key].label}</option>
                    ))}
                </select>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT CHÍNH ---
const UnitConverterPage = () => {
  return (
    <div className="min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 text-center md:text-left md:flex md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mb-3">
                <LayoutGrid size={16} />
                Tiện ích
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Bảng quy đổi đơn vị
            </h1>
            <p className="text-gray-500 mt-2">
                Tra cứu nhanh các công thức quy đổi phổ biến
            </p>
          </div>
        </div>

        {/* Grid Layout: Hiển thị tất cả cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {CONVERSION_DATA.map((item) => (
            <ConverterCard key={item.id} data={item} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default UnitConverterPage;