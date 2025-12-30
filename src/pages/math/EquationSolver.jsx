import React, { useState } from 'react';
import nerdamer from 'nerdamer/all.min';

const EquationSolver = () => {
  const [equation, setEquation] = useState('');
  const [solution, setSolution] = useState(null);
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState('');
  
  // State mới để quản lý việc hiển thị nghiệm phức tạp
  const [isComplexResult, setIsComplexResult] = useState(false);
  const [showComplex, setShowComplex] = useState(false);

  // Ngưỡng độ dài để xác định nghiệm có "phức tạp" hay không
  const COMPLEX_THRESHOLD = 80; 

  const handleSolve = () => {
    setError('');
    setSolution(null);
    setSteps([]);
    setIsComplexResult(false);
    setShowComplex(false);

    if (!equation.trim()) {
      setError('Vui lòng nhập phương trình.');
      return;
    }

    try {
      const sol = nerdamer.solve(equation, 'x');
      const cleanSolution = sol.toString(); 
      
      if(cleanSolution === '' || cleanSolution === '[]') {
         setError('Không tìm thấy nghiệm hoặc phương trình vô nghiệm.');
         return;
      }

      // Kiểm tra độ phức tạp của nghiệm
      if (cleanSolution.length > COMPLEX_THRESHOLD) {
        setIsComplexResult(true);
      }
      
      setSolution(cleanSolution);
      generateSteps(equation, cleanSolution);

    } catch (err) {
      console.error(err);
      setError('Phương trình không hợp lệ. Hãy thử dạng: 2x + 5 = 10');
    }
  };

  const generateSteps = (eq, result) => {
    const stepList = [];
    let degree = 'unknown';
    try {
        const leftSide = eq.split('=')[0]; 
        degree = nerdamer(leftSide).deg().toString();
    } catch (e) {
        degree = 'unknown';
    }

    stepList.push(`1. Nhận diện phương trình: ${eq}`);

    switch (degree) {
      case '1':
        stepList.push('2. Đây là phương trình Bậc Nhất.');
        stepList.push('3. Chuyển vế đổi dấu và chia hệ số.');
        break;
      case '2':
        stepList.push('2. Đây là phương trình Bậc Hai.');
        stepList.push('3. Tính Delta và áp dụng công thức nghiệm.');
        break;
      case '3':
        stepList.push('2. Đây là phương trình Bậc Ba.');
        stepList.push('3. Sử dụng phân tích nhân tử hoặc công thức Cardano.');
        break;
      default:
        stepList.push(`2. Đây là phương trình Bậc ${degree}.`);
        stepList.push('3. Sử dụng các phương pháp đại số cao cấp hoặc giải tích số.');
        break;
    }
    
    // Nếu không bị ẩn do phức tạp thì hiện kết quả ở bước cuối
    if (result.length <= COMPLEX_THRESHOLD) {
        stepList.push(`-> Kết quả: x = ${result}`);
    } else {
        stepList.push('-----------------------------------');
        stepList.push('-> Kết quả: (Đã ẩn vì biểu thức quá dài)');
    }

    setSteps(stepList);
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <div style={styles.headerBox}>
          <h2 style={styles.header}>🧮 Giải Toán Thông Minh</h2>
          <p style={styles.subText}>Hỗ trợ giải phương trình đa bậc nhanh chóng</p>
        </div>
        
        <div style={styles.card}>
          <div style={styles.inputGroup}>
            <input
              type="text"
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              placeholder="Nhập phương trình (VD: x^2 - 4 = 0)"
              style={styles.input}
              onKeyPress={(e) => e.key === 'Enter' && handleSolve()}
            />
            <button onClick={handleSolve} style={styles.button}>
              Giải ngay
            </button>
          </div>

          {error && (
            <div style={styles.errorBox}>
              <span style={styles.errorIcon}>⚠️</span> {error}
            </div>
          )}
        </div>

        {solution && (
          <div style={styles.resultSection}>
            <h3 style={styles.sectionTitle}>Kết quả tìm được:</h3>
            
            {/* Logic hiển thị nghiệm phức tạp */}
            {isComplexResult && !showComplex ? (
              <div style={styles.complexWarning}>
                <p>⚠️ Nghiệm của phương trình này rất dài và phức tạp.</p>
                <button 
                  style={styles.showButton}
                  onClick={() => setShowComplex(true)}
                >
                  Hiển thị kết quả đầy đủ
                </button>
              </div>
            ) : (
              <div style={styles.solutionBox}>
                <span style={styles.variable}>x</span> = 
                <span style={styles.value}>{solution}</span>
              </div>
            )}

            <div style={styles.stepsContainer}>
              <h4 style={styles.stepTitle}>📝 Các bước giải:</h4>
              <ul style={styles.stepList}>
                {steps.map((step, index) => (
                  <li key={index} style={styles.stepItem}>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles Objects Updated
const styles = {
  pageWrapper: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '40px 20px',
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  container: {
    width: '100%',
    maxWidth: '700px',
  },
  headerBox: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  header: {
    color: '#4f46e5',
    margin: '0 0 10px 0',
    fontSize: '2.5rem',
    fontWeight: '700',
  },
  subText: {
    color: '#666',
    fontSize: '1rem',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
    marginBottom: '20px',
  },
  inputGroup: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap', 
  },
  input: {
    flex: 1,
    minWidth: '200px',
    padding: '14px 18px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '2px solid #e0e0e0',
    outline: 'none',
    transition: 'border-color 0.2s',
    backgroundColor: '#f9f9f9',
  },
  button: {
    padding: '14px 28px',
    fontSize: '16px',
    backgroundColor: '#4f46e5', // Indigo color
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    boxShadow: '0 4px 6px rgba(79, 70, 229, 0.2)',
    transition: 'transform 0.1s, background-color 0.2s',
  },
  errorBox: {
    marginTop: '20px',
    color: '#b91c1c',
    backgroundColor: '#fef2f2',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #fecaca',
    display: 'flex',
    alignItems: 'center',
  },
  errorIcon: {
    marginRight: '10px',
  },
  resultSection: {
    animation: 'fadeIn 0.5s ease-in-out',
  },
  sectionTitle: {
    fontSize: '1.2rem',
    color: '#374151',
    marginBottom: '15px',
    fontWeight: '600',
  },
  solutionBox: {
    fontSize: '18px',
    color: '#065f46',
    backgroundColor: '#d1fae5',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #a7f3d0',
    marginBottom: '25px',
    wordBreak: 'break-all', // Quan trọng: xuống dòng nếu nghiệm quá dài
    lineHeight: '1.6',
  },
  variable: {
    fontWeight: 'bold',
    marginRight: '8px',
  },
  value: {
    fontFamily: 'Consolas, monospace',
    fontWeight: '600',
  },
  complexWarning: {
    backgroundColor: '#fffbeb',
    border: '1px solid #fcd34d',
    color: '#92400e',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
    marginBottom: '25px',
  },
  showButton: {
    marginTop: '10px',
    padding: '8px 16px',
    backgroundColor: '#d97706',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  stepsContainer: {
    backgroundColor: '#ffffff',
    padding: '25px',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
    border: '1px solid #f0f0f0',
  },
  stepTitle: {
    marginTop: 0,
    marginBottom: '15px',
    color: '#4f46e5',
    borderBottom: '2px solid #e0e7ff',
    paddingBottom: '10px',
    display: 'inline-block',
  },
  stepList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  stepItem: {
    marginBottom: '12px',
    lineHeight: '1.6',
    color: '#4b5563',
    padding: '8px 12px',
    backgroundColor: '#f9fafb',
    borderRadius: '6px',
    borderLeft: '4px solid #e5e7eb',
  },
};

export default EquationSolver;