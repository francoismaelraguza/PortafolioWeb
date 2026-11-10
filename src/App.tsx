import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { About } from './sections/About';
import { Distinct } from './sections/Distinct';
import { Hero } from './sections/Hero';
import { Mission } from './sections/Mission';

export function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <About />
        <Distinct />
        <Mission />
      </main>
      <Footer />
    </>
  );
}
