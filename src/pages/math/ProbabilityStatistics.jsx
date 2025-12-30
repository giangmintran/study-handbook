import React, { useState } from 'react';
import { 
  Sigma, 
  TrendingUp, 
  Calculator, 
  AlertCircle, 
  RefreshCw, 
  BarChart3, 
  ArrowRightLeft, 
  ChevronRight,
  Database,
  Binary
} from 'lucide-react';

// --- UTILS: COMPONENTS ---

// Card kết quả nhỏ (Dùng cho cả 2 phần)
const ResultCard = ({ title, value, subtext, colorClass, icon: Icon }) => (
  <div className={`relative overflow-hidden p-5 rounded-2xl border ${colorClass} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
    <div className="flex justify-between items-start mb-2">
      <span className="text-xs font-bold uppercase tracking-wider opacity-70">{title}</span>
      {Icon && <Icon size={16} className="opacity-50" />}
    </div>
    <div className="text-2xl sm:text-3xl font-extrabold break-all tracking-tight mb-1">
      {value}
    </div>
    {subtext && <div className="text-xs opacity-80 font-medium">{subtext}</div>}
  </div>
);

// Nút bấm chính
const PrimaryButton = ({ onClick, icon: Icon, children, className = "" }) => (
  <button
    onClick={onClick}
    className={`w-full group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-xl active:scale-[0.98] ${className}`}
  >
    <span className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 -skew-x-12 -translate-x-full" />
    {Icon && <Icon size={20} className="transition-transform group-hover:rotate-12" />}
    <span className="relative">{children}</span>
  </button>
);

// Input Field được style lại
const InputField = ({ label, value, onChange, placeholder, type = "number" }) => (
  <div className="group">
    <label className="block text-sm font-semibold text-gray-600 mb-1.5 ml-1 group-focus-within:text-indigo-600 transition-colors">
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400"
        placeholder={placeholder}
        inputMode={type === 'number' ? 'numeric' : 'text'}
      />
    </div>
  </div>
);

// --- COMPONENT CON: TÍNH TỔ HỢP ---
const ProbabilitySection = () => {
  const [n, setN] = useState('');
  const [k, setK] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const factorial = (num) => {
    if (num < 0) return -1;
    if (num === 0) return 1;
    let res = 1;
    for (let i = 1; i <= num; i++) res *= i;
    return res;
  };

  const handleCalculate = () => {
    const nVal = parseInt(n);
    const kVal = parseInt(k);

    if (!n || !k || isNaN(nVal) || isNaN(kVal)) {
      setError('Vui lòng nhập đầy đủ số liệu');
      setResult(null); return;
    }
    if (nVal < 0 || kVal < 0) {
      setError('Giá trị n và k phải là số dương');
      setResult(null); return;
    }
    if (kVal > nVal) {
      setError('Số phần tử con (k) không được lớn hơn tổng (n)');
      setResult(null); return;
    }
    setError('');
    
    const gtN = factorial(nVal);
    const ank = gtN / factorial(nVal - kVal);
    const nck = ank / factorial(kVal);

    setResult({ pn: gtN, ank: ank, nck: nck });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="bg-white rounded-2xl p-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          <InputField label="Tổng số phần tử (n)" value={n} onChange={(e) => setN(e.target.value)} placeholder="VD: 10" />
          <InputField label="Số phần tử chọn (k)" value={k} onChange={(e) => setK(e.target.value)} placeholder="VD: 3" />
        </div>

        <PrimaryButton onClick={handleCalculate} icon={Calculator}>
          Tính Kết Quả
        </PrimaryButton>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3 text-sm font-medium animate-pulse">
          <AlertCircle size={20} /> {error}
        </div>
      )}

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in zoom-in-95 duration-300">
          <ResultCard 
            title="Hoán vị (Pn)" 
            value={result.pn.toLocaleString()} 
            subtext={`Sắp xếp ${n} phần tử`}
            colorClass="bg-amber-50 text-amber-900 border-amber-100"
            icon={RefreshCw}
          />
          <ResultCard 
            title="Chỉnh hợp (Ank)" 
            value={result.ank.toLocaleString()} 
            subtext="Chọn có thứ tự"
            colorClass="bg-sky-50 text-sky-900 border-sky-100"
            icon={ArrowRightLeft}
          />
          <ResultCard 
            title="Tổ hợp (nCk)" 
            value={result.nck.toLocaleString()} 
            subtext="Chọn không thứ tự"
            colorClass="bg-indigo-50 text-indigo-900 border-indigo-100"
            icon={Binary}
          />
        </div>
      )}
    </div>
  );
};

// --- COMPONENT CON: THỐNG KÊ ---
const StatisticsSection = () => {
  const [inputData, setInputData] = useState('');
  const [stats, setStats] = useState(null);

  const calculateStats = () => {
    const numbers = inputData.split(/[\s,]+/).map(num => parseFloat(num)).filter(num => !isNaN(num));
    if (numbers.length === 0) { setStats(null); return; }

    const n = numbers.length;
    const sum = numbers.reduce((a, b) => a + b, 0);
    const mean = sum / n;
    const sorted = [...numbers].sort((a, b) => a - b);
    const min = sorted[0];
    const max = sorted[n - 1];
    
    let median;
    if (n % 2 === 0) median = (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
    else median = sorted[Math.floor(n / 2)];

    const variance = numbers.reduce((total, num) => total + Math.pow(num - mean, 2), 0) / (n > 1 ? n - 1 : 1);
    const stdDev = Math.sqrt(variance);

    setStats({ count: n, sum, mean, min, max, median, variance, stdDev });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="relative group">
        <label className="block text-sm font-semibold text-gray-600 mb-2 ml-1">
          Dữ liệu đầu vào <span className="font-normal text-gray-400">(Phân cách bằng dấu phẩy hoặc khoảng trắng)</span>
        </label>
        <textarea
          value={inputData} onChange={(e) => setInputData(e.target.value)}
          className="w-full p-4 border border-gray-200 bg-gray-50 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none h-32 transition-all resize-y text-gray-700 font-mono text-sm leading-relaxed"
          placeholder="Nhập dãy số... Ví dụ: 4.5, 8, 15, 16.2, 23, 42"
        />
        <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded-md backdrop-blur-sm border border-gray-100">
          CSV / Space
        </div>
      </div>

      <div className="flex gap-3">
        <PrimaryButton onClick={calculateStats} icon={BarChart3} className="flex-[3]">
          Phân Tích Dữ Liệu
        </PrimaryButton>
        <button 
          onClick={() => {setInputData(''); setStats(null)}} 
          className="flex-1 bg-white border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 font-semibold py-3 px-4 rounded-xl flex items-center justify-center transition-all active:scale-95"
          title="Xóa dữ liệu"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 animate-in zoom-in-95 duration-300">
           {/* Basic Stats */}
           <ResultCard title="Số lượng (N)" value={stats.count} colorClass="bg-gray-50 text-gray-800 border-gray-200" />
           <ResultCard title="Tổng (Sum)" value={stats.sum.toLocaleString('en-US', { maximumFractionDigits: 2 })} colorClass="bg-gray-50 text-gray-800 border-gray-200" />
           
           {/* Range Stats */}
           <ResultCard title="Nhỏ nhất (Min)" value={stats.min} colorClass="bg-cyan-50 text-cyan-800 border-cyan-200" />
           <ResultCard title="Lớn nhất (Max)" value={stats.max} colorClass="bg-cyan-50 text-cyan-800 border-cyan-200" />
           
           {/* Central Tendency - Highlighted */}
           <div className="col-span-2 md:col-span-1">
            <ResultCard title="Trung bình (Mean)" value={stats.mean.toLocaleString('en-US', { maximumFractionDigits: 4 })} colorClass="bg-emerald-50 text-emerald-800 border-emerald-200 ring-1 ring-emerald-400" />
           </div>
           <ResultCard title="Trung vị (Median)" value={stats.median} colorClass="bg-teal-50 text-teal-800 border-teal-200" />
           
           {/* Dispersion Stats */}
           <ResultCard title="Phương sai" value={stats.variance.toLocaleString('en-US', { maximumFractionDigits: 4 })} colorClass="bg-purple-50 text-purple-800 border-purple-200" />
           <ResultCard title="Độ lệch chuẩn" value={stats.stdDev.toLocaleString('en-US', { maximumFractionDigits: 4 })} colorClass="bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200 font-bold" />
        </div>
      )}
    </div>
  );
};

// --- COMPONENT CHÍNH ---
const ProbabilityStatistics = () => {
  const [activeTab, setActiveTab] = useState('probability');

  return (
    <div className="from-slate-100 via-white to-blue-50 p-4 md:p-8 flex items-start justify-center font-sans text-slate-800">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-900/10 border border-white/50 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-900 via-blue-800 to-indigo-900 text-white p-8 md:p-10 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <h1 className="text-3xl md:text-4xl font-black mb-2 flex items-center justify-center gap-3 tracking-tight">
              <Sigma className="text-blue-300" size={32} strokeWidth={3} />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Math Assistant
              </span>
            </h1>
            <p className="text-blue-200 text-sm md:text-base font-medium opacity-90">
              Công cụ tính toán Xác suất & Thống kê dữ liệu
            </p>
          </div>
        </div>

        {/* Custom Tab Navigation */}
        <div className="flex p-2">
          <button
            onClick={() => setActiveTab('probability')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm md:text-base font-bold flex items-center justify-center gap-2 transition-all duration-300
              ${activeTab === 'probability' 
                ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-black/5' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'}`}
          >
            <Database size={18} /> <span className="hidden sm:inline">Tổ Hợp &</span> Xác Suất
          </button>
          
          <button
            onClick={() => setActiveTab('statistics')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm md:text-base font-bold flex items-center justify-center gap-2 transition-all duration-300
              ${activeTab === 'statistics' 
                ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-black/5' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'}`}
          >
            <TrendingUp size={18} /> Phân Tích Thống Kê
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 md:p-10 min-h-[400px]">
          {activeTab === 'probability' ? <ProbabilitySection /> : <StatisticsSection />}
        </div>
        
        {/* Footer tiny */}
        <div className="bg-gray-50 px-6 py-3 text-center border-t border-gray-100">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
            Developed for Educational Purpose
          </p>
        </div>

      </div>
    </div>
  );
};

export default ProbabilityStatistics;