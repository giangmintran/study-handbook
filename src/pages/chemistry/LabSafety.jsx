import React from 'react';
import { AlertTriangle, Eye, Hand, Wind, Ban, CheckCircle, ShieldAlert } from 'lucide-react';

const safetyRules = [
  {
    id: 1,
    title: "Trang phục bảo hộ",
    icon: <ShieldAlert className="text-orange-600" size={32} />,
    content: "Luôn mặc áo blouse trắng, cài kín cúc áo. Buộc tóc gọn gàng và không đi giày cao gót hoặc dép lê.",
    important: true
  },
  {
    id: 2,
    title: "Bảo vệ mắt",
    icon: <Eye className="text-blue-600" size={32} />,
    content: "Đeo kính bảo hộ chuyên dụng trong suốt quá trình làm thí nghiệm để tránh hóa chất bắn vào mắt.",
    important: true
  },
  {
    id: 3,
    title: "Xử lý hóa chất",
    icon: <Hand className="text-purple-600" size={32} />,
    content: "Không dùng tay trực tiếp tiếp xúc hóa chất. Đeo găng tay y tế khi làm việc với axit, bazo mạnh.",
    important: false
  },
  {
    id: 4,
    title: "Không ăn uống",
    icon: <Ban className="text-red-600" size={32} />,
    content: "Tuyệt đối không ăn, uống, hút thuốc trong phòng thí nghiệm. Không nếm thử hóa chất.",
    important: true
  },
  {
    id: 5,
    title: "Thông gió",
    icon: <Wind className="text-teal-600" size={32} />,
    content: "Làm thí nghiệm có khí độc hoặc mùi khó chịu trong tủ hút khí độc. Mở cửa sổ thoáng khí.",
    important: false
  },
  {
    id: 6,
    title: "Xử lý sự cố",
    icon: <CheckCircle className="text-green-600" size={32} />,
    content: "Báo ngay cho giáo viên khi có sự cố đổ vỡ, cháy nổ. Biết vị trí bình chữa cháy và vòi rửa mắt.",
    important: false
  }
];

const LabSafety = () => {
  return (
    <div className="min-h-screen bg-orange-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-full mb-4">
            <AlertTriangle size={48} className="text-orange-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Quy tắc An toàn Phòng thí nghiệm
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            An toàn là ưu tiên hàng đầu. Hãy đọc kỹ và tuân thủ nghiêm ngặt các quy định dưới đây trước khi bắt đầu bất kỳ thí nghiệm nào.
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safetyRules.map((rule) => (
            <div 
              key={rule.id} 
              className={`bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 ${rule.important ? 'border-orange-500' : 'border-gray-200'}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-gray-50 rounded-lg">
                  {rule.icon}
                </div>
                {rule.important && (
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                    Bắt buộc
                  </span>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2">{rule.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {rule.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Alert */}
        <div className="mt-12 bg-red-50 border border-red-200 rounded-lg p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <AlertTriangle className="text-red-500 shrink-0" size={40} />
          <div>
            <h4 className="text-lg font-bold text-red-700">Lưu ý quan trọng</h4>
            <p className="text-red-600 text-sm">
              Vi phạm các quy tắc an toàn có thể dẫn đến việc bị đình chỉ thực hành hoặc gây nguy hiểm cho bản thân và người khác.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabSafety;