// App.js
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import './index.css';

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: 'var(--bg-app)',
      overflow: 'hidden',
    }}>
      {/* ── Top navbar ── */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: 56,
        background: '#fff',
        borderBottom: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
        flexShrink: 0,
        zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32,
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h10M4 18h13" stroke="#fff" strokeWidth="2.2"
                strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: '-0.3px' }}>
            Vector<span style={{ color: '#2563eb' }}>Shift</span>
          </span>
          <span style={{
            fontSize: 11, fontWeight: 600, color: '#7c3aed',
            background: '#f3f0ff', borderRadius: 99, padding: '2px 8px',
            marginLeft: 4,
          }}>Pipeline Builder</span>
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Drag nodes → connect → submit
          </span>
          <SubmitButton />
        </div>
      </header>

      {/* ── Body: sidebar + canvas ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <PipelineToolbar />
        <main style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <PipelineUI />
        </main>
      </div>
    </div>
  );
}

export default App;