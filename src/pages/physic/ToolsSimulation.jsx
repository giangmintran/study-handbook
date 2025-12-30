import React, { useState, useEffect, useRef } from 'react';
import { Gauge, Play, Square, RotateCcw } from 'lucide-react';

const ToolsSimulation = () => {
  // Logic Đồng hồ bấm giờ
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10); // +10ms
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (ms) => {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);
    const centisec = Math.floor((ms % 1000) / 10);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}:${centisec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
        <Gauge /> Phòng Thực Hành Đo Đạc
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: Đồng hồ bấm giờ */}
        <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center border-t-4 border-indigo-500">
          <h2 className="text-xl font-bold text-gray-700 mb-6">Đồng Hồ Bấm Giờ</h2>
          
          <div className="text-6xl font-mono font-bold text-indigo-600 mb-8 tabular-nums tracking-widest bg-gray-100 px-8 py-4 rounded-lg shadow-inner">
            {formatTime(time)}
          </div>

          <div className="flex gap-4 w-full justify-center">
            <button 
              onClick={() => setIsRunning(!isRunning)}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-transform active:scale-95 ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
            >
              {isRunning ? <Square fill="currentColor" size={24}/> : <Play fill="currentColor" size={24} className="ml-1"/>}
            </button>
            
            <button 
              onClick={() => { setIsRunning(false); setTime(0); }}
              className="w-16 h-16 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center shadow-lg transition-transform active:scale-95"
            >
              <RotateCcw size={24} />
            </button>
          </div>
        </div>

        {/* Card 2: Thước Kẹp Ảo (Mô phỏng UI) */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-teal-500">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Thước Đo Chiều Dài</h2>
          <div className="bg-teal-50 p-4 rounded-lg mb-4 text-sm text-teal-800">
            Kéo thanh trượt để đo vật thể mẫu bên dưới.
          </div>

          <div className="relative h-32 bg-gray-100 rounded-lg border border-gray-300 mt-8 overflow-hidden">
            {/* Vật thể cần đo */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 h-8 bg-orange-400 rounded-r-sm w-40 z-0 flex items-center justify-center text-xs text-white font-bold">
              Vật thể
            </div>

            {/* Thước cố định */}
            <div className="absolute bottom-0 left-0 w-full h-8 bg-yellow-200 border-t border-gray-400 flex items-end">
               {[...Array(20)].map((_, i) => (
                 <div key={i} className="flex-1 border-r border-gray-400 h-2 first:border-l relative">
                   <span className="absolute -top-4 -left-1 text-[10px]">{i}</span>
                 </div>
               ))}
            </div>

            {/* Thước trượt (Slider) */}
            <input 
              type="range" 
              className="absolute top-0 w-full h-full opacity-0 cursor-col-resize z-10" 
              min="0" max="100"
            />
            
            <div className="absolute top-0 left-[40%] h-full w-1 border-l-2 border-red-500 border-dashed pointer-events-none">
                <div className="bg-red-500 text-white text-xs px-1 rounded absolute top-0 -translate-x-1/2">
                    ? cm
                </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ToolsSimulation;