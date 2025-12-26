import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Import trang Dashboard mới
import Dashboard from './pages/Dashboard'; 

import GraphPlotter from './pages/math/GraphPlotter';
import Dictionary from './pages/english/Dictionary';
import EquationSolver from './pages/math/EquationSolver';
import FormulaUtility from './pages/math/FormulaUtility';

// Các placeholder cũ
const Solver = () => <div>Tính năng Giải phương trình đang phát triển...</div>;
const Vector = () => <div>Tính năng Tính Vector đang phát triển...</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          
          {/* Thay thế Home cũ bằng Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Toán */}
          <Route path="math/solver" element={<EquationSolver />} />
          <Route path="math/graph" element={<GraphPlotter />} />
          <Route path="math/vector" element={<Vector />} />
          <Route path="math/formula" element={<FormulaUtility />} />
          {/* Tiếng Anh */}
          <Route path="english/dictionary" element={<Dictionary />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;