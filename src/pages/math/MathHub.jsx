import { 
  Calculator, 
  Activity, // Biểu tượng cho đồ thị
  Triangle, // Biểu tượng cho hình học
  Sigma,    // Biểu tượng cho tổng/thống kê
  BookOpen, 
  Move,     // Biểu tượng cho Vector
  Pi,       // Biểu tượng số Pi/Toán học
  TrendingUp,
  Grid,     // Ma trận
  Scale     // Đổi đơn vị
} from 'lucide-react'; 
import { Link } from 'react-router-dom';

const MathHub = () => {
  const tools = [
    {
      category: "Đại số & Giải tích 📉",
      description: "Đồ thị, phương trình và ma trận",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      items: [
        { title: "Vẽ đồ thị hàm số", icon: <Activity size={20} />, desc: "Khảo sát và vẽ đồ thị y=f(x)", path: "/math/graph" },
        { title: "Giải phương trình", icon: <Calculator size={20} />, desc: "PT bậc 2, bậc 3, hệ phương trình", path: "/math/solver" },
        { title: "Tính toán Vector", icon: <Grid size={20} />, desc: "Cộng, nhân, tìm định thức, nghịch đảo", path: "/math/vector" },
      ]
    },
    {
      category: "Hình học & Vector 📐",
      description: "Không gian Oxyz và hình phẳng",
      color: "text-orange-600",
      bg: "bg-orange-50",
      items: [
        { title: "Máy tính Vector", icon: <Move size={20} />, desc: "Tích vô hướng, có hướng, góc giữa 2 vector", path: "/math/vector" },
        { title: "Diện tích & Chu vi", icon: <Triangle size={20} />, desc: "Công thức tính nhanh các hình học", path: "/math/formula" },
        { title: "Lượng giác", icon: <Pi size={20} />, desc: "Đường tròn lượng giác và công thức", path: "/math/trigonometry" },
      ]
    },
    {
      category: "Thống kê & Xác suất 📊",
      description: "Phân tích dữ liệu và tổ hợp",
      color: "text-green-600",
      bg: "bg-green-50",
      items: [
        { title: "Tổ hợp & Chỉnh hợp", icon: <Sigma size={20} />, desc: "Tính nCk, nAk, Pn nhanh chóng", path: "/math/probability-statistics" },
        { title: "Phân tích số liệu", icon: <TrendingUp size={20} />, desc: "Tính trung bình, phương sai, độ lệch chuẩn", path: "/math/probability-statistics" },
      ]
    },
    {
      category: "Tra cứu & Tiện ích 📚",
      description: "Sổ tay công thức cần nhớ",
      color: "text-purple-600",
      bg: "bg-purple-50",
      items: [
        { title: "Sổ tay công thức", icon: <BookOpen size={20} />, desc: "Tổng hợp công thức Toán 10-11-12", path: "/math/formula" },
        { title: "Đổi đơn vị đo lường", icon: <Scale size={20} />, desc: "Độ dài, diện tích, thể tích, góc", path: "/math/converter" },
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header của trang */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-indigo-600">Góc Học Tập Toán Học</h1>
        <p className="text-gray-500 mt-2">Công cụ hỗ trợ tính toán, vẽ hình và tra cứu công thức Toán học.</p>
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
                  Sử dụng công cụ &rarr;
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MathHub;