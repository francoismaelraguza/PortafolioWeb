import { Component, lazy, Suspense, type ReactNode } from 'react';
import s from './Backdrop.module.css';

// three.js pesa: se carga aparte para no retrasar el primer render del texto.
const Experience = lazy(() => import('../three/Experience'));

/** Si la escena falla, la página sigue igual con el fondo liso. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function Backdrop() {
  return (
    <div className={s.backdrop} aria-hidden="true">
      <SceneBoundary>
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </SceneBoundary>
    </div>
  );
}
