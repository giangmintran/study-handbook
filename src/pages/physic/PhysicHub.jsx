import React from 'react';
import { 
  Zap,            // Điện học
  Activity,       // Chuyển động
  Thermometer,    // Nhiệt học
  Scale,          // Lực/Cân bằng
  Calculator,     // Máy tính
  Timer,          // Thời gian/Đồng hồ
  RefreshCw,      // Đổi đơn vị
  PlayCircle,     // Mô phỏng
  Gauge,          // Áp suất/Đo lường
  Move,           // Chuyển động cơ học
  Battery,        // Mạch điện
  Ruler           // Đo chiều dài
} from 'lucide-react'; 
import { Link } from 'react-router-dom';

const PhysicsHub = () => {
  const tools = [
    {
      category: "Công thức 📚",
      description: "Lý thuyết và công thức cơ bản",
      color: "text-indigo-600",
      bg: "bg-blue-50",
      items: [
        { title: "Chuyển động cơ học", icon: <Move size={20} />, desc: "Vận tốc, quãng đường, thời gian", path: "/physics/formula" },
        { title: "Lực – Áp suất", icon: <Scale size={20} />, desc: "Lực đẩy Archimedes, áp suất chất lỏng", path: "/physics/formula" },
        { title: "Điện học", icon: <Zap size={20} />, desc: "Định luật Ohm, công suất điện", path: "/physics/formula" },
        { title: "Nhiệt học", icon: <Thermometer size={20} />, desc: "Nhiệt năng, dẫn nhiệt, đối lưu", path: "/physics/formula" },
      ]
    },
    {
      category: "Công cụ tính toán ⚙️",
      description: "Nhập 2 đại lượng → tính cái còn lại",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      items: [
        { title: "Vận tốc (v = s/t)", icon: <Activity size={20} />, desc: "Tính toán chuyển động đều", path: "/physics/tools" },
        { title: "Định luật II Newton", icon: <Gauge size={20} />, desc: "F = m × a (Lực, khối lượng, gia tốc)", path: "/physics/tools" },
        { title: "Công suất (P = A/t)", icon: <Timer size={20} />, desc: "Tính công suất thực hiện", path: "/physics/tools" },
        { title: "Định luật Ohm (U=I.R)", icon: <Battery size={20} />, desc: "Tính hiệu điện thế, cường độ, trở", path: "/physics/tools" },
      ]
    },
    {
      category: "Đổi đơn vị 🔄",
      description: "Chuyển đổi nhanh các đơn vị đo",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      items: [
        { title: "Độ dài", icon: <Ruler size={20} />, desc: "m ↔ km, cm, mm", path: "/physics/converter" },
        { title: "Khối lượng", icon: <Scale size={20} />, desc: "kg ↔ g, tấn, tạ", path: "/physics/converter" },
        { title: "Thời gian", icon: <Timer size={20} />, desc: "Giờ (h) ↔ Giây (s)", path: "/physics/converter" },
        { title: "Công suất", icon: <Zap size={20} />, desc: "W ↔ kW, HP (mã lực)", path: "/physics/converter" },
      ]
    }
    // {
    //   category: "Mô phỏng thí nghiệm 💻",
    //   description: "Trực quan hóa hiện tượng",
    //   color: "text-orange-600",
    //   bg: "bg-orange-50",
    //   items: [
    //     { title: "Chuyển động thẳng đều", icon: <PlayCircle size={20} />, desc: "Đồ thị s-t và v-t", path: "/physics/simulation/motion" },
    //     { title: "Mạch điện đơn giản", icon: <Battery size={20} />, desc: "Lắp ráp mạch điện ảo", path: "/physics/simulation/circuit" },
    //     { title: "Thước & Đồng hồ", icon: <Gauge size={20} />, desc: "Thực hành đo đạc ảo", path: "/physics/simulation/tools" },
    //   ]
    // }
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Header của trang */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-indigo-600">Góc Học Tập Vật Lý</h1>
        <p className="text-gray-600 mt-2">Tổng hợp kiến thức, công cụ tính toán và mô phỏng thí nghiệm vật lý.</p>
      </div>

      {/* Render từng category */}
      {tools.map((section, index) => (
        <div key={index} className="space-y-4">
          <div className="flex items-center space-x-2">
            <h2 className={`text-xl font-bold ${section.color}`}>{section.category}</h2>
            <span className="text-sm text-gray-500 font-medium hidden sm:inline-block">| {section.description}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {section.items.map((item, idx) => (
              <Link 
                to={item.path || "#"}
                key={idx}
                className="group relative bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-transparent hover:ring-2 ring-offset-2 ring-indigo-500"
              >
                {/* Icon background */}
                <div className={`absolute top-5 right-5 p-2 rounded-full ${section.bg} ${section.color} opacity-20 group-hover:opacity-100 transition-opacity`}>
                  {item.icon}
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-indigo-600 pr-8">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {item.desc}
                </p>

                <div className="mt-4 flex items-center text-sm font-medium text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                  Sử dụng ngay &rarr;
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhysicsHub;