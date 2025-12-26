import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  Languages, 
  BookOpen, 
  Zap, 
  ArrowRight,
  Star 
} from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-2">
      {/* 1. Banner Chào mừng */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl p-8 text-white mb-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Xin chào, Chúc bạn một ngày học tập hiệu quả! 👋</h1>
        <p className="opacity-90">
          Chào mừng đến với Cẩm nang môn học. Hãy chọn một công cụ bên dưới hoặc từ menu để bắt đầu.
        </p>
      </div>

      {/* 2. Thống kê nhanh (Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Môn học</p>
            <p className="text-2xl font-bold text-slate-800">2</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-full">
            <Zap size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Công cụ</p>
            <p className="text-2xl font-bold text-slate-800">4+</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
            <Star size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Đánh giá</p>
            <p className="text-2xl font-bold text-slate-800">5.0</p>
          </div>
        </div>
      </div>

      {/* 3. Lối tắt đến các môn học (Quick Access) */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Truy cập nhanh</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Toán học */}
        <Link to="/math/graph" className="group block">
          <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Calculator size={24} />
              </div>
              <ArrowRight className="text-slate-300 group-hover:text-blue-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Công cụ Toán Học</h3>
            <p className="text-slate-500 text-sm">
              Truy cập các công cụ như vẽ đồ thị hàm số, giải phương trình và tính toán vector.
            </p>
          </div>
        </Link>

        {/* Card Tiếng Anh */}
        <Link to="/english/dictionary" className="group block">
          <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-green-400 hover:shadow-md transition-all cursor-pointer h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors">
                <Languages size={24} />
              </div>
              <ArrowRight className="text-slate-300 group-hover:text-green-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Từ điển Tiếng Anh</h3>
            <p className="text-slate-500 text-sm">
              Tra cứu nghĩa từ vựng, phát âm và ví dụ minh họa nhanh chóng.
            </p>
          </div>
        </Link>
      </div>

      {/* 4. Góc kiến thức (Tip) */}
      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h3 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
           💡 Bạn có biết?
        </h3>
        <p className="text-amber-700">
          Đạo hàm của vị trí theo thời gian chính là vận tốc, và đạo hàm của vận tốc chính là gia tốc. Đây là ứng dụng cơ bản nhất của giải tích trong vật lý!
        </p>
      </div>
    </div>
  );
};

export default Dashboard;