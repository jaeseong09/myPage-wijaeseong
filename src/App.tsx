import { HashRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { RouteScroll } from './components/layout/RouteScroll';
import { Footer } from './components/layout/Footer';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { CustomCursor } from './components/layout/CustomCursor';
import { Home } from './pages/Home';
import { CaseStudy } from './pages/projects/CaseStudy';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <HashRouter>
      <RouteScroll />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:id" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </HashRouter>
  );
}
