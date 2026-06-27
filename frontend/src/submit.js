// submit.js
import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({ nodes: state.nodes, edges: state.edges });

/* ── Result panel rendered in the header ── */
const ResultPanel = ({ result, onClose }) => {
  const { num_nodes, num_edges, is_dag } = result;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(15,23,42,.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999,
      backdropFilter: 'blur(2px)',
    }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 18,
          padding: '32px 36px',
          width: 360,
          boxShadow: '0 24px 64px rgba(15,23,42,.20)',
          border: '1px solid #e2e8f0',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'linear-gradient(135deg,#eff6ff,#dbeafe)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22,
          }}>
            📊
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 17, color: '#0f172a' }}>Pipeline Analysis</p>
            <p style={{ fontSize: 13, color: '#64748b', marginTop: 1 }}>Submitted successfully</p>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <StatCard label="Nodes" value={num_nodes} color="#2563eb" bg="#eff6ff" />
          <StatCard label="Edges" value={num_edges} color="#7c3aed" bg="#faf5ff" />
        </div>

        {/* DAG status */}
        <div style={{
          borderRadius: 12,
          padding: '14px 16px',
          background: is_dag ? '#f0fdf4' : '#fff1f2',
          border: `1.5px solid ${is_dag ? '#bbf7d0' : '#fecdd3'}`,
          display: 'flex', alignItems: 'center', gap: 12,
          marginBottom: 24,
        }}>
          <span style={{ fontSize: 24 }}>{is_dag ? '✅' : '❌'}</span>
          <div>
            <p style={{
              fontWeight: 700, fontSize: 14,
              color: is_dag ? '#15803d' : '#be123c',
            }}>
              {is_dag ? 'Valid DAG' : 'Contains a Cycle'}
            </p>
            <p style={{ fontSize: 12, color: is_dag ? '#16a34a' : '#e11d48', marginTop: 2 }}>
              {is_dag
                ? 'No cycles detected — pipeline is executable'
                : 'Cycles prevent sequential execution'}
            </p>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            width: '100%', padding: '11px',
            borderRadius: 10, border: 'none',
            background: 'linear-gradient(90deg,#2563eb,#3b82f6)',
            color: '#fff', fontWeight: 700, fontSize: 14,
            cursor: 'pointer', fontFamily: 'inherit',
            transition: 'opacity .15s',
          }}
          onMouseOver={e => e.target.style.opacity = '.85'}
          onMouseOut={e => e.target.style.opacity = '1'}
        >
          Got it
        </button>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color, bg }) => (
  <div style={{
    borderRadius: 12, padding: '14px 16px',
    background: bg, border: `1.5px solid ${color}22`,
    textAlign: 'center',
  }}>
    <p style={{ fontSize: 28, fontWeight: 800, color }}>{value}</p>
    <p style={{ fontSize: 12, color: '#64748b', marginTop: 2, fontWeight: 600 }}>{label}</p>
  </div>
);

/* ── Main submit button ── */
export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState(null);
  const [error, setError]     = useState('');

  const handleSubmit = async () => {
    if (nodes.length === 0) {
      setError('Add at least one node before submitting.');
      setTimeout(() => setError(''), 3000);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://127.0.0.1:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError('Backend unreachable. Is uvicorn running?');
      setTimeout(() => setError(''), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {result && <ResultPanel result={result} onClose={() => setResult(null)} />}

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {error && (
          <span style={{
            fontSize: 12, color: '#be123c',
            background: '#fff1f2', border: '1px solid #fecdd3',
            borderRadius: 8, padding: '4px 10px',
          }}>
            {error}
          </span>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '8px 18px',
            borderRadius: 9, border: 'none',
            background: loading
              ? '#94a3b8'
              : 'linear-gradient(90deg,#2563eb,#3b82f6)',
            color: '#fff',
            fontWeight: 700, fontSize: 13,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit',
            boxShadow: loading ? 'none' : '0 2px 8px rgba(37,99,235,.35)',
            transition: 'all .15s ease',
          }}
          onMouseOver={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          {loading ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                style={{ animation: 'spin 1s linear infinite' }}>
                <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,.3)" strokeWidth="3"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
              </svg>
              Analysing…
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Submit Pipeline
            </>
          )}
        </button>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
};