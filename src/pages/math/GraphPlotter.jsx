import React, { useEffect, useRef, useState } from 'react';
import functionPlot from 'function-plot';
import * as math from 'mathjs';

const GraphPlotter = () => {
  const rootEl = useRef(null);
  const [expression, setExpression] = useState('x^2 - 4');
  const [intercepts, setIntercepts] = useState({ xIntercepts: [], yIntercept: null });
  const [tableData, setTableData] = useState([]);
  
  const [highlightedPoint, setHighlightedPoint] = useState(null);
  const activePointRef = useRef(null);

  // --- THUẬT TOÁN TÌM NGHIỆM ---
  const findPreciseRoots = (compiledExpr, compiledDerivative, range = [-20, 20]) => {
    let roots = [];
    const step = 0.5;
    const epsilon = 1e-7;

    for (let x = range[0]; x <= range[1]; x += step) {
      try {
        const y1 = compiledExpr.evaluate({ x: x });
        const y2 = compiledExpr.evaluate({ x: x + step });

        if (y1 * y2 <= 0) {
          let currentRoot = x + step / 2;
          let iter = 0;
          let found = false;

          while (iter < 10) {
            const y = compiledExpr.evaluate({ x: currentRoot });
            const slope = compiledDerivative.evaluate({ x: currentRoot });
            if (Math.abs(slope) < 1e-9) break;
            const nextRoot = currentRoot - y / slope;
            if (Math.abs(nextRoot - currentRoot) < epsilon) {
              found = true;
              currentRoot = nextRoot;
              break;
            }
            currentRoot = nextRoot;
            iter++;
          }

          if (found) {
             const roundedRoot = Math.round(currentRoot * 10000) / 10000;
             if (!roots.some(r => Math.abs(r - roundedRoot) < 1e-4)) {
                roots.push(roundedRoot);
             }
          }
        }
      } catch (e) {}
    }
    return roots.sort((a, b) => a - b);
  };

  useEffect(() => {
    let pointsToRender = [];
    let calculatedIntercepts = { xIntercepts: [], yIntercept: null };
    let calculatedTableData = [];

    try {
      const compiled = math.compile(expression);
      const derivativeExpr = math.derivative(expression, 'x');
      const compiledDerivative = derivativeExpr.compile();

      // 1. GIAO ĐIỂM
      const yAtZero = compiled.evaluate({ x: 0 });
      if (isFinite(yAtZero)) {
        pointsToRender.push([0, yAtZero]);
        calculatedIntercepts.yIntercept = yAtZero;
      }

      const roots = findPreciseRoots(compiled, compiledDerivative);
      roots.forEach(r => {
        pointsToRender.push([r, 0]);
        calculatedIntercepts.xIntercepts.push(r);
      });

      setIntercepts(calculatedIntercepts);

      // 2. BẢNG DỮ LIỆU
      for (let i = -5; i <= 5; i++) {
        try {
            const yVal = compiled.evaluate({ x: i });
            if (isFinite(yVal)) {
                calculatedTableData.push({ x: i, y: yVal });
            }
        } catch (err) {}
      }
      setTableData(calculatedTableData);

      // 3. VẼ ĐỒ THỊ
      functionPlot({
        target: rootEl.current,
        width: 800,
        height: 600,
        grid: true,
        xAxis: { domain: [-10, 10] },
        yAxis: { domain: [-10, 10] },
        data: [
          {
            fn: expression,
            color: 'steelblue',
            graphType: 'polyline'
          },
          {
            fnType: 'points',
            graphType: 'scatter',
            points: pointsToRender,
            color: 'red',
            attr: { r: 6, opacity: 1 },
            skipTip: false 
          }
        ],
        tip: {
          xLine: true,
          yLine: true,
          renderer: (x, y) => {
            // 1. TĂNG NGƯỠNG BẮT DÍNH (QUAN TRỌNG)
            // Tăng từ 0.5 lên 3 hoặc 5. Vì ta dùng thuật toán tìm điểm gần nhất (min distance),
            // nên threshold lớn cũng không sợ bị bắt nhầm sang điểm ở xa hơn.
            const SNAP_DISTANCE = 0.25; 

            // 2. TỔNG HỢP TẤT CẢ CÁC ĐIỂM CẦN BẮT DÍNH VÀO MỘT DANH SÁCH
            const allCandidates = [];

            // Thêm điểm cắt trục Oy
            if (calculatedIntercepts.yIntercept !== null) {
              allCandidates.push({ 
                x: 0, 
                y: calculatedIntercepts.yIntercept, 
                type: 'y', 
                value: calculatedIntercepts.yIntercept 
              });
            }

            // Thêm các điểm cắt trục Ox
            if (calculatedIntercepts.xIntercepts) {
              calculatedIntercepts.xIntercepts.forEach(root => {
                allCandidates.push({ x: root, y: 0, type: 'x', value: root });
              });
            }

            // Thêm các điểm trên bảng dữ liệu (nếu có)
            if (calculatedTableData) {
              calculatedTableData.forEach(p => {
                allCandidates.push({ x: p.x, y: p.y, type: 'table', value: p.x });
              });
            }

            // 3. THUẬT TOÁN TÌM ĐIỂM GẦN NHẤT (NEAREST NEIGHBOR)
            let closestPoint = null;
            let minDistance = Infinity;

            allCandidates.forEach(p => {
              // Tính khoảng cách Euclid từ chuột (x,y) tới điểm (p.x, p.y)
              const dist = Math.sqrt(Math.pow(x - p.x, 2) + Math.pow(y - p.y, 2));
              
              // Nếu khoảng cách nhỏ hơn ngưỡng VÀ nhỏ hơn khoảng cách tìm được trước đó
              if (dist <= SNAP_DISTANCE && dist < minDistance) {
                minDistance = dist;
                closestPoint = p;
              }
            });

            // 4. CẬP NHẬT STATE (Giữ nguyên logic debounce của bạn)
            const isDifferent =
              (closestPoint === null && activePointRef.current !== null) ||
              (closestPoint !== null && activePointRef.current === null) ||
              (closestPoint && activePointRef.current && 
                (closestPoint.type !== activePointRef.current.type || closestPoint.value !== activePointRef.current.value));

            if (isDifferent) {
              activePointRef.current = closestPoint;
              setHighlightedPoint(closestPoint);
            }

            // 5. HIỂN THỊ TOOLTIP
            // Nếu đang bắt dính vào điểm nào, hiển thị tọa độ điểm đó (để người dùng biết chính xác)
            // Nếu không, hiển thị tọa độ chuột
            if (closestPoint) {
              return `  (${closestPoint.x.toFixed(3)}, ${closestPoint.y.toFixed(3)})`;
            }
            return `  (${x.toFixed(3)}, ${y.toFixed(3)})`;
          }
        }
      });
    } catch (e) {
      console.log("Lỗi:", e.message);
    }
  }, [expression]);

  const isHighlighted = (type, value) => {
      if (!highlightedPoint) return false;
      return highlightedPoint.type === type && Math.abs(highlightedPoint.value - value) < 1e-5;
  };

  return (
    <div className="font-sans ">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Đồ Thị Hàm Số & Giao Điểm</h2>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT PANEL */}
        <div className="w-full lg:w-1/3 space-y-4">
          
          {/* 1. INPUT VÀ HƯỚNG DẪN CHI TIẾT */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Hàm số f(x):</label>
            <input 
              type="text" 
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              className="w-full border-2 border-blue-200 focus:border-blue-500 p-3 rounded-lg outline-none transition-colors mb-3 shadow-sm"
              placeholder="Nhập hàm số (vd: x^2 - 4)..."
            />
            
            {/* HƯỚNG DẪN CHI TIẾT */}
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-sm text-gray-700">
                <p className="font-semibold text-blue-800 mb-2 text-xs uppercase tracking-wide">Cú pháp hỗ trợ:</p>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                    <div className="flex justify-between">
                        <span>Mũ:</span> <code className="bg-white px-1 rounded border text-pink-600">^</code>
                    </div>
                    <div className="flex justify-between">
                        <span>Căn bậc 2:</span> <code className="bg-white px-1 rounded border text-pink-600">sqrt(x)</code>
                    </div>
                    <div className="flex justify-between">
                        <span>Lượng giác:</span> <code className="bg-white px-1 rounded border text-pink-600">sin, cos, tan</code>
                    </div>
                    <div className="flex justify-between">
                        <span>Logarit:</span> <code className="bg-white px-1 rounded border text-pink-600">log(x)</code>
                    </div>
                    <div className="flex justify-between">
                        <span>Hằng số:</span> <code className="bg-white px-1 rounded border text-pink-600">pi, e</code>
                    </div>
                     <div className="flex justify-between">
                        <span>Trị tuyệt đối:</span> <code className="bg-white px-1 rounded border text-pink-600">abs(x)</code>
                    </div>
                </div>
            </div>
          </div>
          
          {/* 2. CARD THÔNG TIN GIAO ĐIỂM */}
          <div className="bg-white p-5 rounded-lg border shadow-sm">
            <h3 className="font-bold text-gray-800 border-b pb-2 mb-3">Thông tin giao điểm</h3>
            <div className="space-y-3">
              <div className={`flex items-start p-2 rounded transition-all duration-300 ${
                  isHighlighted('y', intercepts.yIntercept) ? 'bg-yellow-100 ring-1 ring-yellow-400' : ''
              }`}>
                <span className="w-24 font-medium text-purple-600">Cắt Oy:</span>
                <span className="font-mono text-gray-900">
                  {intercepts.yIntercept !== null ? `(0, ${intercepts.yIntercept.toFixed(4)})` : '---'}
                </span>
              </div>

              <div className="flex items-start p-2">
                <span className="w-24 font-medium text-red-600 pt-1">Cắt Ox:</span>
                <div className="flex-1">
                  {intercepts.xIntercepts.length > 0 ? (
                    <ul className="space-y-1">
                      {intercepts.xIntercepts.map((x, idx) => (
                        <li key={idx} className={`inline-block mr-2 px-2 py-1 rounded font-mono transition-all duration-300 ${
                            isHighlighted('x', x) ? 'bg-red-100 text-red-700 font-bold' : 'text-gray-900'
                        }`}>
                          ({x.toFixed(4)}, 0)
                        </li>
                      ))}
                    </ul>
                  ) : <span className="text-gray-400 italic">Vô nghiệm</span>}
                </div>
              </div>
            </div>
          </div>

          {/* 3. CARD BẢNG DẪN NHẬP */}
          <div className="bg-white p-5 rounded-lg border shadow-sm">
             <h3 className="font-bold text-gray-800 border-b pb-2 mb-3 flex justify-between items-center">
                Bảng giá trị
                <span className="text-xs font-normal text-gray-400">(x: -5 đến 5)</span>
             </h3>
             <div className="overflow-x-auto max-h-60 overflow-y-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-600 font-medium">
                        <tr>
                            <th className="px-4 py-2 border-b">x</th>
                            <th className="px-4 py-2 border-b">y = f(x)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {tableData.map((point) => (
                            <tr 
                                key={point.x} 
                                className={`transition-colors duration-200 ${
                                    isHighlighted('table', point.x) 
                                    ? 'bg-blue-100 text-blue-800 font-semibold' 
                                    : 'hover:bg-gray-50'
                                }`}
                            >
                                <td className="px-4 py-2 font-mono">{point.x}</td>
                                <td className="px-4 py-2 font-mono">{point.y.toFixed(4)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
          </div>

        </div>

        {/* RIGHT PANEL: GRAPH */}
        <div className="flex-1">
           <div ref={rootEl} className="rounded-xl overflow-hidden shadow-lg border bg-white"></div>
           <p className="text-center text-sm text-gray-400 mt-2">Di chuột vào các điểm trên đồ thị</p>
        </div>
      </div>
    </div>
  );
};

export default GraphPlotter;