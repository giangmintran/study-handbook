import React, { useState } from 'react';
import { Pi, Calculator, ArrowLeft, CheckCircle2 } from 'lucide-react';

// Component hiển thị công thức toán học gọn gàng
const FormulaCard = ({ title, formulas }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
    <h3 className="font-semibold text-orange-700 mb-3 flex items-center gap-2">
      <CheckCircle2 size={16} /> {title}
    </h3>
    <div className="space-y-2 text-gray-700 font-mono text-sm">
      {formulas.map((f, index) => (
        <div key={index} className="bg-orange-50/50 p-2 rounded border-l-2 border-orange-300">
          {f}
        </div>
      ))}
    </div>
  </div>
);

// Component Đường tròn lượng giác (SVG)
const UnitCircle = () => {
  return (
    <div className="relative w-full max-w-[300px] aspect-square mx-auto bg-white rounded-full shadow-inner border border-gray-100 p-4">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Grid lines */}
        <line x1="100" y1="0" x2="100" y2="200" stroke="#ddd" strokeWidth="1" />
        <line x1="0" y1="100" x2="200" y2="100" stroke="#ddd" strokeWidth="1" />
        
        {/* Main Circle */}
        <circle cx="100" cy="100" r="80" fill="none" stroke="#ea580c" strokeWidth="2" />
        
        {/* Axes */}
        <line x1="100" y1="20" x2="100" y2="180" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <line x1="20" y1="100" x2="180" y2="100" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrow)" />
        
        {/* Labels */}
        <text x="185" y="105" fontSize="12" fill="#333">x (cos)</text>
        <text x="105" y="15" fontSize="12" fill="#333">y (sin)</text>
        
        {/* Quadrant Signs */}
        <text x="130" y="70" fontSize="10" fill="#ea580c">(+, +)</text>
        <text x="50" y="70" fontSize="10" fill="#666">(-, +)</text>
        <text x="50" y="150" fontSize="10" fill="#666">(-, -)</text>
        <text x="130" y="150" fontSize="10" fill="#666">(+, -)</text>

        {/* Angles */}
        <text x="185" y="100" fontSize="10" textAnchor="start">0 (2π)</text>
        <text x="100" y="15" fontSize="10" textAnchor="middle">π/2</text>
        <text x="15" y="100" fontSize="10" textAnchor="end">π</text>
        <text x="100" y="195" fontSize="10" textAnchor="middle">3π/2</text>
      </svg>
    </div>
  );
};

const TrigonometryPage = () => {
  return (
    <div className="min-h-screen bg-orange-50 p-4 md:p-8 font-sans">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-indigo-600 flex items-center gap-3">
          <span className="p-2 bg-orange-200 rounded-lg text-orange-700">
            <Pi size={32} />
          </span>
          Lượng giác & Công thức
        </h1>
        <p className="text-gray-600 mt-2">Tổng hợp đường tròn lượng giác, bảng giá trị và các hệ thức cơ bản.</p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Cột trái: Đường tròn & Bảng giá trị */}
        <div className="md:col-span-1 space-y-6">
          {/* Card Đường tròn */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Đường tròn đơn vị</h2>
            <UnitCircle />
            <div className="mt-4 text-xs text-center text-gray-500">
              Trục hoành là Cos, trục tung là Sin
            </div>
          </div>

          {/* Bảng giá trị đặc biệt */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Calculator size={18} /> Giá trị đặc biệt
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-center">
                <thead className="bg-orange-100 text-orange-800 font-medium">
                  <tr>
                    <th className="p-2 rounded-tl-lg">Góc</th>
                    <th className="p-2">sin</th>
                    <th className="p-2 rounded-tr-lg">cos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-orange-100">
                  <tr><td className="p-2 font-mono">0</td><td>0</td><td>1</td></tr>
                  <tr><td className="p-2 font-mono">π/6</td><td>1/2</td><td>√3/2</td></tr>
                  <tr><td className="p-2 font-mono">π/4</td><td>√2/2</td><td>√2/2</td></tr>
                  <tr><td className="p-2 font-mono">π/3</td><td>√3/2</td><td>1/2</td></tr>
                  <tr><td className="p-2 font-mono">π/2</td><td>1</td><td>0</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Cột phải: Các công thức */}
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <FormulaCard 
              title="Hệ thức cơ bản"
              formulas={[
                "sin²x + cos²x = 1",
                "tan(x) = sin(x) / cos(x)",
                "cot(x) = cos(x) / sin(x)",
                "1 + tan²x = 1/cos²x",
                "1 + cot²x = 1/sin²x"
              ]}
            />

            <FormulaCard 
              title="Công thức nhân đôi"
              formulas={[
                "sin(2x) = 2sinx.cosx",
                "cos(2x) = cos²x - sin²x",
                "cos(2x) = 2cos²x - 1",
                "cos(2x) = 1 - 2sin²x"
              ]}
            />

            <FormulaCard 
              title="Công thức cộng"
              formulas={[
                "sin(a ± b) = sin(a)cos(b) ± cos(a)sin(b)",
                "cos(a ± b) = cos(a)cos(b) ∓ sin(a)sin(b)",
                "tan(a ± b) = (tan a ± tan b) / (1 ∓ tan a tan b)"
              ]}
            />

             <FormulaCard 
              title="Công thức hạ bậc"
              formulas={[
                "sin²x = (1 - cos2x) / 2",
                "cos²x = (1 + cos2x) / 2",
                "tan²x = (1 - cos2x) / (1 + cos2x)"
              ]}
            />
            
            <FormulaCard 
              title="Biến đổi tích thành tổng"
              formulas={[
                "cosa.cosb = 1/2[cos(a-b) + cos(a+b)]",
                "sina.sinb = 1/2[cos(a-b) - cos(a+b)]",
                "sina.cosb = 1/2[sin(a-b) + sin(a+b)]"
              ]}
            />

             <FormulaCard 
              title="Biến đổi tổng thành tích"
              formulas={[
                "cos a + cos b = 2cos((a+b)/2)cos((a-b)/2)",
                "sin a + sin b = 2sin((a+b)/2)cos((a-b)/2)",
                "sin a - sin b = 2cos((a+b)/2)sin((a-b)/2)"
              ]}
            />

          </div>
        </div>
      </div>
    </div>
  );
};

export default TrigonometryPage;