import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
// Import trang Dashboard mới
import Dashboard from './pages/Dashboard'; 

import GraphPlotter from './pages/math/GraphPlotter';
import Dictionary from './pages/english/Dictionary';
import EquationSolver from './pages/math/EquationSolver';
import FormulaUtility from './pages/math/FormulaUtility';
import VectorCalculator from './pages/math/VectorCalculator';
import FormulaPhysic from './pages/physic/FormulaPhysic';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ChemistryHub from './pages/chemistry/ChemistryHub';
import PeriodicTable from './pages/chemistry/PeriodicTable';
import ChemistryCalculator from './pages/chemistry/ChemistryCalculator';
import ChemistryPage from './pages/chemistry/ChemistryPage';
import MathHub from './pages/math/MathHub';
import ProbabilityStatistics from './pages/math/ProbabilityStatistics';
import UnitConverterPage from './pages/math/Converter';
import TrigonometryPage from './pages/math/TrigonometryPage';
import LabSafety from './pages/chemistry/LabSafety';
import ReactionSimulation from './pages/chemistry/ReactionSimulation';
import PhysicsHub from './pages/physic/PhysicHub';
import PhysicsToolsPage from './pages/physic/PhysicsToolsPage';
import PhysicUnitConverterPage from './pages/physic/PhysicUnitConverterPage';
import MotionSimulation from './pages/physic/MotionSimulation';
import CircuitSimulation from './pages/physic/CircuitSimulation';
import ToolsSimulation from './pages/physic/ToolsSimulation';
import EnglishHub from './pages/english/EnglishHub';
import GrammarPage from './pages/english/GrammarPage';

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import để dùng nút quay lại

const FeatureUnderDevelopment = ({ title = "Tính năng đang phát triển" }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Hình minh họa SVG đơn giản */}
        <div style={styles.iconWrapper}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={styles.icon}
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        </div>

        <h2 style={styles.title}>{title}</h2>
        
        <p style={styles.description}>
          Chúng tôi đang nỗ lực hoàn thiện chức năng này để mang lại trải nghiệm tốt nhất cho bạn. 
          Vui lòng quay lại sau nhé!
        </p>

        <div style={styles.buttonGroup}>
          <button 
            onClick={() => navigate(-1)} 
            style={styles.buttonSecondary}
          >
            Quay lại
          </button>
          <button 
            onClick={() => navigate('/')} 
            style={styles.buttonPrimary}
          >
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

// CSS styles nằm ngay trong file (Inline Styles) để dễ copy-paste
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh', // Chiếm khoảng 60% chiều cao màn hình
    padding: '20px',
    backgroundColor: '#f9fafb', // Màu nền xám rất nhạt
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', // Đổ bóng nhẹ
    textAlign: 'center',
    maxWidth: '500px',
    width: '100%',
  },
  iconWrapper: {
    backgroundColor: '#e0f2fe', // Nền xanh nhạt cho icon
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto 24px auto',
  },
  icon: {
    width: '40px',
    height: '40px',
    color: '#4f46e5', // Màu xanh chủ đạo
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '12px',
  },
  description: {
    fontSize: '16px',
    color: '#6b7280', // Màu chữ xám
    marginBottom: '32px',
    lineHeight: '1.6',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
  },
  buttonPrimary: {
    padding: '10px 20px',
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  buttonSecondary: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    color: '#4f46e5',
    border: '1px solid #4f46e5',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s',
  }
};

// Các placeholder cũ
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          
          {/* Thay thế Home cũ bằng Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Toán */}
          <Route path="math" element={<MathHub />} />
          <Route path="math/solver" element={<EquationSolver />} />
          <Route path="math/graph" element={<GraphPlotter />} />
          <Route path="math/vector" element={<VectorCalculator />} />
          <Route path="math/formula" element={<FormulaUtility />} />
          <Route path="/math/probability-statistics" element={<ProbabilityStatistics />} />
          <Route path="/math/converter" element={<UnitConverterPage />} />
          <Route path="/math/trigonometry" element={<TrigonometryPage />} />

          {/* Tiếng Anh */}
          <Route path="english" element={<EnglishHub />} />
          <Route path="english/dictionary" element={<Dictionary />} />
          <Route path="/english/grammar/:slug" element={<GrammarPage />} />

          <Route path="/english/dictionary/examples" element={<FeatureUnderDevelopment />} />
          <Route path="/english/dictionary/thesaurus" element={<FeatureUnderDevelopment />} />
          <Route path="/english/practice/flashcards" element={<FeatureUnderDevelopment />} />
          <Route path="/english/practice/quizzes" element={<FeatureUnderDevelopment />} />
          <Route path="/english/speaking/dialogues" element={<FeatureUnderDevelopment />} />
          <Route path="/english/listening" element={<FeatureUnderDevelopment />} />
          
          {/* Vật lý */}
          <Route path="physics" element={<PhysicsHub />} />
          <Route path="physics/formula" element={<FormulaPhysic />} />
          <Route path="physics/tools" element={<PhysicsToolsPage />} />
          <Route path="physics/converter" element={<PhysicUnitConverterPage />} />
          <Route path="/physics/simulation/motion" element={<MotionSimulation />} />
          <Route path="/physics/simulation/circuit" element={<CircuitSimulation />} />
          <Route path="/physics/simulation/tools" element={<ToolsSimulation />} />

          {/* Hóa học - placeholder tạm thời */}
          <Route path="chemistry" element={<ChemistryHub />} />
          <Route path="chemistry/periodic-table" element={<PeriodicTable />} />
          <Route path="chemistry/calculator" element={<ChemistryCalculator />} />
          <Route path="chemistry/chemistry-page" element={<ChemistryPage />} />
          <Route path="chemistry/lab-safety" element={<LabSafety />} />
          <Route path="chemistry/reaction-simulation" element={<ReactionSimulation />} />
          {/* Footer */}
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsOfService />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;