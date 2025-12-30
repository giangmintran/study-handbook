import React, { useState, useRef } from 'react';
import { Battery, Lightbulb, Zap, Trash2, RotateCw } from 'lucide-react';

const CircuitSimulation = () => {
  const [circuitState, setCircuitState] = useState(false);
  const [droppedComponents, setDroppedComponents] = useState([]);
  const workspaceRef = useRef(null);

  // Danh sách công cụ
  const tools = [
    { type: 'source', name: 'Nguồn điện', icon: <Battery className="text-green-600"/>, bg: 'bg-green-50' },
    { type: 'bulb', name: 'Bóng đèn', icon: <Lightbulb className="text-yellow-600"/>, bg: 'bg-yellow-50' },
    { type: 'switch', name: 'Công tắc', icon: <RotateCw className="text-blue-600"/>, bg: 'bg-blue-50' },
    { type: 'resistor', name: 'Điện trở', icon: <div className="font-bold text-xs border border-gray-400 px-1">R</div>, bg: 'bg-gray-50' },
  ];

  // Bắt đầu kéo
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("componentType", JSON.stringify(item));
    e.dataTransfer.effectAllowed = "copy";
  };

  // Cho phép thả (Bắt buộc phải có preventDefault)
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  // Xử lý khi thả
  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("componentType");
    
    if (!data) return;
    
    try {
      const component = JSON.parse(data);
      
      // Lấy tọa độ chuẩn của khung làm việc
      const rect = workspaceRef.current.getBoundingClientRect();
      
      // Tính toán tọa độ chuột so với khung làm việc
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newComponent = {
        ...component,
        id: Date.now(),
        x: x - 24, // Trừ đi một nửa kích thước icon để icon nằm giữa chuột
        y: y - 24
      };

      setDroppedComponents((prev) => [...prev, newComponent]);
      console.log("Đã thả linh kiện:", newComponent); // Check console nếu lỗi
    } catch (err) {
      console.error("Lỗi khi thả:", err);
    }
  };

  const removeComponent = (id) => {
    setDroppedComponents((prev) => prev.filter(c => c.id !== id));
  };

  return (
    <div className="p-4 md:p-8 bg-blue-50 min-h-screen font-sans select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
          <Zap className="fill-current" /> Lắp Ráp Mạch Điện Ảo
        </h1>
        <button 
          onClick={() => setCircuitState(!circuitState)}
          className={`px-6 py-2 rounded-full font-bold shadow-md transition-all ${circuitState ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500' : 'bg-gray-300 text-gray-600 hover:bg-gray-400'}`}
        >
          {circuitState ? 'MỞ KHÓA K (ON)' : 'ĐÓNG KHÓA K (OFF)'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-150px)]">
        
        {/* THANH CÔNG CỤ (TOOLBOX) */}
        <div className="bg-white p-4 rounded-xl shadow-lg lg:col-span-1 border border-blue-100 overflow-y-auto z-20">
          <h3 className="font-bold text-gray-700 mb-4 uppercase text-xs tracking-wider">Linh kiện (Kéo từ đây)</h3>
          <div className="grid grid-cols-2 gap-3">
            {tools.map((item, idx) => (
              <div 
                key={idx}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                className={`${item.bg} p-4 rounded-lg cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow flex flex-col items-center justify-center gap-2 border border-transparent hover:border-blue-300`}
              >
                {item.icon}
                <span className="text-xs font-medium text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 p-3 bg-blue-50 rounded text-sm text-blue-800">
            💡 <strong>Hướng dẫn:</strong> Dùng chuột kéo linh kiện ở đây và thả sang vùng lưới bên phải.
          </div>
        </div>

        {/* BẢNG MẠCH (WORKSPACE) */}
        <div 
          ref={workspaceRef}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="bg-white rounded-xl shadow-inner border-2 border-dashed border-gray-400 lg:col-span-3 relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"
        >
          
          {/* HÌNH NỀN MẪU (BACKGROUND) - Đã thêm pointer-events-none để không chặn thao tác thả */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none z-0">
             <div className="flex flex-col items-center">
                <div className="border-4 border-gray-300 w-64 h-64 rounded-lg flex items-center justify-center">
                   <span className="text-gray-400 font-bold">VÙNG THẢ LINH KIỆN</span>
                </div>
             </div>
          </div>

          {/* CÁC LINH KIỆN ĐÃ THẢ (RENDERED COMPONENTS) */}
          {droppedComponents.map((comp) => (
            <div 
              key={comp.id}
              className="absolute p-3 bg-white rounded-lg shadow-xl border-2 border-blue-500 cursor-move z-10 hover:scale-110 transition-transform group"
              style={{ 
                left: comp.x, 
                top: comp.y,
                touchAction: 'none' // Tối ưu cho touch nếu có
              }}
            >
              {/* Nút xóa nhanh */}
              <button 
                onClick={(e) => { e.stopPropagation(); removeComponent(comp.id); }}
                className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              >
                <Trash2 size={12} />
              </button>
              
              {/* Icon */}
              <div className="pointer-events-none">
                {comp.type === 'source' && <Battery size={32} className="text-green-600"/>}
                {comp.type === 'bulb' && (
                  <Lightbulb 
                    size={32} 
                    className={`transition-all ${circuitState ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,1)]" : "text-yellow-600"}`}
                  />
                )}
                {comp.type === 'switch' && <RotateCw size={32} className="text-blue-600"/>}
                {comp.type === 'resistor' && <div className="font-bold text-lg border-2 border-gray-600 px-2 rounded">R</div>}
              </div>
            </div>
          ))}

          {/* Nút Xóa Tất Cả */}
          {droppedComponents.length > 0 && (
            <button 
              onClick={() => setDroppedComponents([])}
              className="absolute bottom-4 right-4 px-4 py-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 font-bold shadow z-20 flex items-center gap-2"
            >
              <Trash2 size={18} /> Xóa bàn làm việc
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CircuitSimulation;