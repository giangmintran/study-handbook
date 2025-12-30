import React, { useState, useEffect } from 'react';
import { PlayCircle, PauseCircle, RefreshCw, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MotionSimulation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [velocity, setVelocity] = useState(10); // m/s
  const [time, setTime] = useState(0);
  const [data, setData] = useState([{ t: 0, s: 0 }]);

  // Giả lập chạy thời gian
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => {
          const newTime = prev + 1;
          const newDistance = newTime * velocity;
          setData((prevData) => [...prevData, { t: newTime, s: newDistance }]);
          return newTime;
        });
      }, 500); // Cập nhật mỗi 0.5s
    }
    return () => clearInterval(interval);
  }, [isRunning, velocity]);

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setData([{ t: 0, s: 0 }]);
  };

  return (
    <div className="p-4 md:p-8 bg-orange-50 min-h-screen">
      <h1 className="text-2xl font-bold text-orange-700 mb-6 flex items-center gap-2">
        <Activity /> Mô Phỏng Chuyển Động Thẳng Đều
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Panel */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-orange-100">
          <h2 className="font-semibold mb-4 text-gray-700">Thông số đầu vào</h2>
          
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Vận tốc (v) - m/s</label>
            <input 
              type="range" min="1" max="50" 
              value={velocity} 
              onChange={(e) => setVelocity(Number(e.target.value))}
              disabled={isRunning}
              className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-right font-bold text-orange-600">{velocity} m/s</div>
          </div>

          <div className="flex gap-2 mt-6">
            <button 
              onClick={() => setIsRunning(!isRunning)}
              className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 font-medium text-white transition-colors ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
            >
              {isRunning ? <><PauseCircle size={20}/> Tạm dừng</> : <><PlayCircle size={20}/> Bắt đầu</>}
            </button>
            <button 
              onClick={handleReset}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700"
            >
              <RefreshCw size={20} />
            </button>
          </div>

          <div className="mt-6 p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-600">Thời gian: <span className="font-bold text-gray-900">{time}s</span></p>
            <p className="text-sm text-gray-600">Quãng đường (s = v*t): <span className="font-bold text-gray-900">{time * velocity}m</span></p>
          </div>
        </div>

        {/* Visual & Graph Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Animation Box */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-orange-100 h-40 relative overflow-hidden flex items-center">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-100 opacity-50"></div>
            <div 
              className="absolute transition-all duration-500 ease-linear"
              style={{ left: `${Math.min((time * velocity) / 5, 90)}%` }} // Giới hạn hiển thị demo
            >
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg">
                Xe
              </div>
            </div>
            <div className="absolute bottom-2 left-0 w-full border-b-2 border-gray-300"></div>
          </div>

          {/* Chart */}
          <div className="bg-white p-4 rounded-xl shadow-lg border border-orange-100 h-64">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">Đồ thị Quãng đường - Thời gian (s-t)</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="t" label={{ value: 't (s)', position: 'insideBottomRight', offset: -5 }} />
                <YAxis label={{ value: 's (m)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Line type="monotone" dataKey="s" stroke="#ea580c" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotionSimulation;