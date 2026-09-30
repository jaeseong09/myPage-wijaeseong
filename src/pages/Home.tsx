import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Skills } from '../components/sections/Skills';
import { Projects } from '../components/sections/Projects';
import { Achievements } from '../components/sections/Achievements';
import { Contact } from '../components/sections/Contact';
import { Experiences } from '../components/sections/Experiences';

export function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Experiences />
      <Achievements />
      <Skills />
      <Contact />
    </main>
  );
}
