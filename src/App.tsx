import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { CustomCursor } from './components/layout/CustomCursor';
import { Home } from './pages/Home';
import { Folio } from './pages/projects/Folio';

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/folio" element={<Folio />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </BrowserRouter>
  );
}
