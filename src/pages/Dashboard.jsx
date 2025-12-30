import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  Languages, 
  BookOpen, 
  Zap, 
  ArrowRight,
  Star,
  Atom,         // Icon cho Vật lý
  FlaskConical  // Icon cho Hóa học
} from 'lucide-react';

const Dashboard = () => {
  // 1. Tạo state để lưu câu "Bạn có biết" hiện tại
  const [randomFact, setRandomFact] = useState("");

  // 2. Danh sách các sự thật thú vị
  const facts = [
    "Đạo hàm của vị trí theo thời gian chính là vận tốc, và đạo hàm của vận tốc chính là gia tốc.",
    "Số 0 là số duy nhất không thể biểu diễn bằng chữ số La Mã.",
    "Câu 'The quick brown fox jumps over the lazy dog' chứa tất cả các chữ cái trong bảng chữ cái tiếng Anh.",
    "Trong một nhóm có 23 người, xác suất để 2 người có cùng ngày sinh nhật là 50%.",
    "Từ 'Queue' (hàng đợi) là từ duy nhất trong tiếng Anh vẫn giữ nguyên cách phát âm khi bỏ đi 4 chữ cái cuối.",
    "Pi (π) là một số vô tỉ, nghĩa là các chữ số sau dấu phẩy của nó kéo dài vô tận và không bao giờ lặp lại.",
    "Hình tam giác là hình duy nhất có sự ổn định tuyệt đối về mặt cấu trúc.",
    "Nguyên tử chủ yếu là không gian trống rỗng. Nếu loại bỏ khoảng trống, cả nhân loại có thể nằm gọn trong 1 viên đường."
  ];

  // 3. Sử dụng useEffect để chọn ngẫu nhiên 1 câu khi load trang
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * facts.length);
    setRandomFact(facts[randomIndex]);
  }, []);

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
            <p className="text-2xl font-bold text-slate-800">4</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-full">
            <Zap size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Công cụ</p>
            <p className="text-2xl font-bold text-slate-800">8+</p>
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
        <Link to="/math" className="group block">
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
        <Link to="/english" className="group block">
          <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-green-400 hover:shadow-md transition-all cursor-pointer h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors">
                <Languages size={24} />
              </div>
              <ArrowRight className="text-slate-300 group-hover:text-green-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Từ điển Tiếng Anh</h3>
            <p className="text-slate-500 text-sm">
              Tra cứu nghĩa từ vựng, phát âm, ngữ pháp và ví dụ minh họa nhanh chóng.
            </p>
          </div>
        </Link>

        {/* Card Vật Lý (Mới) */}
        <Link to="/physics" className="group block">
          <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-purple-400 hover:shadow-md transition-all cursor-pointer h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Atom size={24} />
              </div>
              <ArrowRight className="text-slate-300 group-hover:text-purple-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Vật Lý Đại Cương</h3>
            <p className="text-slate-500 text-sm">
              Tra cứu công thức, chuyển đổi đơn vị và mô phỏng các hiện tượng vật lý.
            </p>
          </div>
        </Link>

        {/* Card Hóa Học (Mới) */}
        <Link to="/chemistry" className="group block">
          <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-rose-400 hover:shadow-md transition-all cursor-pointer h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-rose-50 text-rose-600 rounded-lg group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <FlaskConical size={24} />
              </div>
              <ArrowRight className="text-slate-300 group-hover:text-rose-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Phòng Thí Nghiệm Hóa</h3>
            <p className="text-slate-500 text-sm">
              Bảng tuần hoàn tương tác, cân bằng phương trình phản ứng và từ điển chất.
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
          {randomFact}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;