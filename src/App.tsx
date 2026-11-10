import { useState } from 'react';
import { Backdrop } from './components/Backdrop';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { useReveals } from './lib/reveal';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Distinct } from './sections/Distinct';
import { Hero } from './sections/Hero';
import { Mission } from './sections/Mission';
import { Projects } from './sections/Projects';
import { supportsWebGL } from './three/quality';

export function App() {
  useReveals();
  const [hasBackdrop] = useState(supportsWebGL);

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header hasBackdrop={hasBackdrop} />
      {hasBackdrop && <Backdrop />}
      <main id="contenido">
        <Hero />
        <About />
        <Distinct />
        <Mission />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
