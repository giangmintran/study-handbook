import React, { useState, useEffect } from 'react';

const VectorCalculator = () => {
  const [vecA, setVecA] = useState({ x: 0, y: 0, z: 0 });
  const [vecB, setVecB] = useState({ x: 0, y: 0, z: 0 });
  const [results, setResults] = useState(null);

  const handleChange = (vector, axis, value) => {
    const setter = vector === 'A' ? setVecA : setVecB;
    setter(prev => ({ ...prev, [axis]: value }));
  };

  const getVal = (val) => {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? 0 : parsed;
  };

  useEffect(() => {
    const ax = getVal(vecA.x), ay = getVal(vecA.y), az = getVal(vecA.z);
    const bx = getVal(vecB.x), by = getVal(vecB.y), bz = getVal(vecB.z);

    const add = { x: ax + bx, y: ay + by, z: az + bz };
    const sub = { x: ax - bx, y: ay - by, z: az - bz };
    const dot = (ax * bx) + (ay * by) + (az * bz);
    
    const cross = {
      x: ay * bz - az * by,
      y: az * bx - ax * bz,
      z: ax * by - ay * bx
    };

    const magA = Math.sqrt(ax ** 2 + ay ** 2 + az ** 2);
    const magB = Math.sqrt(bx ** 2 + by ** 2 + bz ** 2);

    let angleDeg = 0;
    if (magA > 0 && magB > 0) {
      const cosTheta = dot / (magA * magB);
      const clampedCos = Math.min(Math.max(cosTheta, -1), 1); 
      const angleRad = Math.acos(clampedCos);
      angleDeg = (angleRad * 180) / Math.PI;
    }

    setResults({ add, sub, dot, cross, magA, magB, angleDeg });
  }, [vecA, vecB]);

  const formatVec = (v) => `( ${v.x.toFixed(2)}, ${v.y.toFixed(2)}, ${v.z.toFixed(2)} )`;

  return (
    /* Thêm class bao ngoài 'vc-scope' để cô lập CSS */
    <div className="vc-scope">
      <style>{`
        /* SỬA: Thay :root bằng class bao ngoài để biến không bị lọt ra ngoài */
        .vc-scope {
          --primary: #6366f1;
          --card-bg: #ffffff;
          --text-main: #1f2937;
          --text-muted: #6b7280;
          --color-a: #3b82f6;
          --color-b: #f43f5e;
          
          /* Áp dụng font và background chỉ cho vùng này thay vì body */
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background-color: var(--bg-color);
          color: var(--text-main);
          padding: 1rem; /* Tạo khoảng cách nếu nhúng vào trang khác */
          border-radius: 8px; /* Bo nhẹ nếu cần */
        }

        /* SỬA: Thay * bằng selector cụ thể bên trong scope */
        .vc-scope * { box-sizing: border-box; }

        /* SỬA: Đổi tên class .container -> .vc-container để tránh trùng bootstrap/tailwind */
        .vc-container {
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        /* SỬA: Đổi .header -> .vc-header */
        .vc-header { text-align: center; margin-bottom: 0.5rem; }
        .vc-header h1 { margin: 0; font-weight: 800; color: rgb(67, 56, 202); letter-spacing: -0.025em; font-size: 2.5rem; }
        .vc-header p { margin: 0.5rem 0 0; color: var(--text-muted); font-size: 0.95rem; }

        .vc-input-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        /* SỬA: .vector-card -> .vc-card */
        .vc-card {
          background: var(--card-bg);
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0,0,0,0.03);
          transition: transform 0.2s;
        }

        .vc-card:focus-within {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
        }

        .vc-vector-label {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 1.25rem; font-weight: 700; font-size: 1.1rem;
        }
        .vc-badge {
          padding: 0.25rem 0.75rem; border-radius: 99px; 
          font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;
          color: white;
        }

        .vc-coord-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem; }
        
        .vc-input-group { position: relative; }
        .vc-input-group label {
          display: block; font-size: 0.7rem; color: var(--text-muted);
          margin-bottom: 0.25rem; text-align: center; font-weight: 600;
        }
        
        .vc-coord-input {
          width: 100%;
          padding: 0.75rem 0.5rem;
          text-align: center;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-main);
          outline: none;
          transition: all 0.2s;
          background: #f9fafb;
        }
        
        .vc-coord-input::-webkit-outer-spin-button,
        .vc-coord-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        .vc-coord-input[type=number] { -moz-appearance: textfield; }
        .vc-coord-input:focus { background: white; border-color: var(--primary); }

        .vc-section-title {
          font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
          color: var(--text-muted); margin-bottom: 1rem; display: block;
        }

        .vc-results-container { display: flex; flex-direction: column; gap: 2rem; }

        .vc-result-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
        }

        .vc-res-card {
          background: white; border-radius: 12px; padding: 1.25rem;
          border: 1px solid #f3f4f6;
          display: flex; flex-direction: column; gap: 0.5rem;
        }
        
        .vc-res-header { display: flex; justify-content: space-between; align-items: center; }
        .vc-res-title { font-size: 0.85rem; font-weight: 600; color: var(--text-muted); }
        .vc-res-formula { 
          font-family: 'Times New Roman', serif; font-style: italic; 
          background: #f3f4f6; padding: 2px 8px; border-radius: 4px; font-size: 0.9rem;
        }

        .vc-res-value { font-size: 1.1rem; font-weight: 700; color: var(--text-main); word-break: break-all; }
        .vc-res-value.mono { font-family: 'JetBrains Mono', 'Fira Code', monospace; letter-spacing: -0.5px; }
        
        .vc-highlight-card {
          background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
          color: white;
        }
        .vc-highlight-card .vc-res-title, .vc-highlight-card .vc-res-formula { color: rgba(255,255,255,0.8); background: rgba(255,255,255,0.1); }
        .vc-highlight-card .vc-res-value { color: white; font-size: 2rem; text-align: center; padding: 0.5rem 0; }

        @media (max-width: 600px) {
          .vc-container { padding: 0.75rem; gap: 1.5rem; }
          .vc-input-section { grid-template-columns: 1fr; gap: 1rem; }
          .vc-card { padding: 1rem; }
          .vc-coord-grid { gap: 0.5rem; }
          .vc-coord-input { font-size: 1rem; padding: 0.6rem 0.25rem; }
          .vc-res-value { font-size: 1rem; }
          .vc-highlight-card .vc-res-value { font-size: 1.75rem; }
        }
      `}</style>
      
      <div className="vc-container">
        <div className="vc-header">
          <h1>Vector Calculator</h1>
          <p>Nhập tọa độ để tính toán tự động</p>
        </div>

        {/* INPUTS */}
        <div className="vc-input-section">
          {/* Vector A */}
          <div className="vc-card">
            <div className="vc-vector-label" style={{color: 'var(--color-a)'}}>
              <span>Vector A</span>
              <span className="vc-badge" style={{backgroundColor: 'var(--color-a)'}}>Origin</span>
            </div>
            <div className="vc-coord-grid">
              {['x', 'y', 'z'].map(axis => (
                <div key={axis} className="vc-input-group">
                  <label>{axis.toUpperCase()}</label>
                  <input
                    className="vc-coord-input"
                    type="number"
                    inputMode="decimal"
                    value={vecA[axis]}
                    onChange={(e) => handleChange('A', axis, e.target.value)}
                    onFocus={(e) => e.target.select()}
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Vector B */}
          <div className="vc-card">
            <div className="vc-vector-label" style={{color: 'var(--color-b)'}}>
              <span>Vector B</span>
              <span className="vc-badge" style={{backgroundColor: 'var(--color-b)'}}>Target</span>
            </div>
            <div className="vc-coord-grid">
              {['x', 'y', 'z'].map(axis => (
                <div key={axis} className="vc-input-group">
                  <label>{axis.toUpperCase()}</label>
                  <input
                    className="vc-coord-input"
                    type="number"
                    inputMode="decimal"
                    value={vecB[axis]}
                    onChange={(e) => handleChange('B', axis, e.target.value)}
                    onFocus={(e) => e.target.select()}
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RESULTS */}
        {results && (
          <div className="vc-results-container">
            <div>
              <span className="vc-section-title">Phép toán Vector</span>
              <div className="vc-result-grid">
                <ResultItem label="Tổng (Cộng)" formula="A + B" value={formatVec(results.add)} isMono />
                <ResultItem label="Hiệu (Trừ)" formula="A - B" value={formatVec(results.sub)} isMono />
                <ResultItem label="Tích có hướng" formula="A × B" value={formatVec(results.cross)} isMono style={{borderLeft: '4px solid #8b5cf6'}} />
              </div>
            </div>

            <div>
              <span className="vc-section-title">Độ lớn & Góc</span>
              <div className="vc-result-grid">
                 <div className="vc-res-card vc-highlight-card" style={{ gridRow: 'span 2' }}>
                  <div className="vc-res-header">
                    <span className="vc-res-title">Góc giữa 2 vector</span>
                    <span className="vc-res-formula">θ</span>
                  </div>
                  <div className="vc-res-value">
                    {results.angleDeg.toFixed(2)}°
                  </div>
                </div>

                <ResultItem label="Tích vô hướng" formula="A · B" value={results.dot.toFixed(4)} />
                <ResultItem label="Độ dài Vector A" formula="|A|" value={results.magA.toFixed(4)} />
                <ResultItem label="Độ dài Vector B" formula="|B|" value={results.magB.toFixed(4)} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ResultItem = ({ label, formula, value, isMono, style }) => (
  <div className="vc-res-card" style={style}>
    <div className="vc-res-header">
      <span className="vc-res-title">{label}</span>
      <span className="vc-res-formula">{formula}</span>
    </div>
    <div className={`vc-res-value ${isMono ? 'mono' : ''}`}>
      {value}
    </div>
  </div>
);

export default VectorCalculator;