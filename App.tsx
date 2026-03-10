import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Footer } from './layout';
import { Home, CompanyApply } from './pages';
import { ProfessionalApply } from './src/pages/ProfessionalApply';
import { HowWeWorkPage } from './src/pages/HowWeWork';

function App() {
  const location = useLocation();
  const isApplyPage = location.pathname.includes('/empresas/aplicar') || location.pathname.includes('/profesionales/aplicar') || location.pathname.includes('/como-trabajamos');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      {!isApplyPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/empresas/aplicar" element={<CompanyApply />} />
        <Route path="/profesionales/aplicar" element={<ProfessionalApply />} />
        <Route path="/como-trabajamos" element={<HowWeWorkPage />} />
      </Routes>
      {!isApplyPage && <Footer />}
    </div>
  );
}

export default App;
