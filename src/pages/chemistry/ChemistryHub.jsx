import { Beaker, BookOpen, Calculator, FlaskConical, Flame, AlertTriangle, Droplet, Atom } from 'lucide-react'; 
import { Link } from 'react-router-dom';
// Lưu ý: Nếu chưa cài lucide-react, bạn chạy: npm install lucide-react
// Hoặc thay thế icon bằng text/emoji nếu không muốn cài thêm thư viện.

const ChemistryHub = () => {
  const tools = [
    {
      category: "Bảng tra cứu 🧾",
      description: "Dữ liệu cơ bản và bảng tuần hoàn",
      color: "text-blue-600",
      bg: "bg-blue-50",
      items: [
        { title: "Bảng tuần hoàn", icon: <Atom size={20} />, desc: "Tương tác, xem chi tiết nguyên tố", path: "/chemistry/periodic-table" },
        { title: "Bảng hóa trị", icon: <BookOpen size={20} />, desc: "Tra cứu hóa trị các nhóm nguyên tố", path: "/chemistry/periodic-table" },
        { title: "Dãy hoạt động hóa học", icon: <Flame size={20} />, desc: "Kim loại từ K đến Au", path: "/chemistry/periodic-table" },
      ]
    },
    {
      category: "Công cụ tính toán 🧮",
      description: "Hỗ trợ giải bài tập nhanh",
      color: "text-green-600",
      bg: "bg-green-50",
      items: [
        { title: "Tính khối lượng mol (M)", icon: <Calculator size={20} />, desc: "Nhập công thức (vd: H2SO4)", path: "/chemistry/calculator" },
        { title: "Tính số mol (n)", icon: <Droplet size={20} />, desc: "Chuyển đổi m, V, CM sang mol", path: "/chemistry/calculator" },
        { title: "Tính nồng độ % (C%)", icon: <FlaskConical size={20} />, desc: "Tính nồng độ dung dịch", path: "/chemistry/calculator" },
      ]
    },
    {
      category: "Phản ứng hóa học 💥",
      description: "Cân bằng và nhận biết chất",
      color: "text-purple-600",
      bg: "bg-purple-50",
      items: [
        { title: "Nhận biết chất", icon: <BookOpen size={20} />, desc: "Màu sắc, kết tủa, khí bay ra", path: "/chemistry/chemistry-page" },
      ]
    },
    {
      category: "Thí nghiệm ảo 🧪",
      description: "Mô phỏng và an toàn",
      color: "text-orange-600",
      bg: "bg-orange-50",
      items: [
        { title: "Mô phỏng phản ứng", icon: <FlaskConical size={20} />, desc: "Quan sát hiện tượng trực quan", path: "/chemistry/reaction-simulation" },
        { title: "An toàn phòng thí nghiệm", icon: <AlertTriangle size={20} />, desc: "Quy tắc an toàn cần nhớ", path: "/chemistry/lab-safety" },
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header của trang */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-indigo-600">Góc Học Tập Hóa Học</h1>
        <p className="text-gray-500 mt-2">Tổng hợp các công cụ tra cứu, tính toán và thí nghiệm ảo.</p>
      </div>

      {/* Render từng category */}
      {tools.map((section, index) => (
        <div key={index} className="space-y-4">
          <div className="flex items-center space-x-2">
            <h2 className={`text-xl font-bold ${section.color}`}>{section.category}</h2>
            <span className="text-sm text-gray-400">| {section.description}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items.map((item, idx) => (
              <Link 
                to={item.path || "#"}
                key={idx}
                className="group relative bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-transparent hover:ring-2 ring-offset-2 ring-indigo-500"
              >
                <div className={`absolute top-5 right-5 p-2 rounded-full ${section.bg} ${section.color} opacity-20 group-hover:opacity-100 transition-opacity`}>
                  {item.icon}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-indigo-600">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {item.desc}
                </p>

                <div className="mt-4 flex items-center text-sm font-medium text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  Truy cập công cụ &rarr;
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChemistryHub;