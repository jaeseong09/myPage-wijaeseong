import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { CustomCursor } from './components/layout/CustomCursor';
import { Home } from './pages/Home';
import { Folio } from './pages/projects/Folio';
import { DecoratingTheHouse } from './pages/projects/DecoratingTheHouse';
import { GbswWeb } from './pages/projects/GbswWeb';
import { CampLog } from './pages/projects/CampLog';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/folio" element={<Folio />} />
          <Route path="/projects/decorating-the-house" element={<DecoratingTheHouse />} />
          <Route path="/projects/gbsw-web" element={<GbswWeb />} />
          <Route path="/projects/camplog" element={<CampLog />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </BrowserRouter>
  );
}
