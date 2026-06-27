// toolbar.js
import { useState } from 'react';
import { DraggableNode } from './draggableNode';

const NODE_GROUPS = [
  {
    label: 'I/O',
    nodes: [
      { type: 'customInput', label: 'Input',  icon: '→',  desc: 'Pipeline entry point' },
      { type: 'customOutput', label: 'Output', icon: '←',  desc: 'Pipeline exit point' },
    ],
  },
  {
    label: 'AI',
    nodes: [
      { type: 'llm',  label: 'LLM',  icon: '✦', desc: 'Language model call' },
    ],
  },
  {
    label: 'Data',
    nodes: [
      { type: 'text',     label: 'Text',     icon: '✎', desc: 'Static text with variables' },
      { type: 'json',     label: 'JSON',     icon: '{}', desc: 'JSON transform' },
      { type: 'math',     label: 'Math',     icon: '∑',  desc: 'Math expression' },
    ],
  },
  {
    label: 'Integrations',
    nodes: [
      { type: 'api',      label: 'API',      icon: '⚡', desc: 'HTTP request' },
      { type: 'database', label: 'Database', icon: '🗄', desc: 'DB query' },
      { type: 'email',    label: 'Email',    icon: '✉',  desc: 'Send email' },
    ],
  },
];

export const PipelineToolbar = () => {
  const [search, setSearch] = useState('');
  const q = search.toLowerCase();

  const filtered = NODE_GROUPS
    .map(g => ({
      ...g,
      nodes: g.nodes.filter(
        n => n.label.toLowerCase().includes(q) || n.desc.toLowerCase().includes(q)
      ),
    }))
    .filter(g => g.nodes.length > 0);

  return (
    <aside style={{
      width: 220,
      flexShrink: 0,
      background: '#fff',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      boxShadow: '2px 0 8px rgba(15,23,42,.04)',
    }}>
      {/* Header */}
      <div style={{ padding: '16px 16px 12px' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)',
          textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>
          Nodes
        </p>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <svg style={{ position: 'absolute', left: 9, top: '50%',
            transform: 'translateY(-50%)', pointerEvents: 'none' }}
            width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="#94a3b8" strokeWidth="2"/>
            <path d="M16.5 16.5L21 21" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search nodes…"
            style={{
              width: '100%',
              padding: '7px 10px 7px 30px',
              borderRadius: 8,
              border: '1.5px solid var(--border)',
              fontSize: 13,
              color: 'var(--text-primary)',
              background: '#f8fafc',
              outline: 'none',
              fontFamily: 'inherit',
              transition: 'border-color .15s',
            }}
            onFocus={e => e.target.style.borderColor = '#2563eb'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>
      </div>

      {/* Node groups */}
      <div style={{ padding: '0 12px 16px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {filtered.map(group => (
          <div key={group.label}>
            <p style={{
              fontSize: 10, fontWeight: 700, color: 'var(--text-light)',
              textTransform: 'uppercase', letterSpacing: '.1em',
              marginBottom: 8, paddingLeft: 4,
            }}>
              {group.label}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {group.nodes.map(n => (
                <DraggableNode key={n.type} type={n.type} label={n.label}
                  icon={n.icon} desc={n.desc} />
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-light)', fontSize: 13 }}>
            No nodes match "{search}"
          </div>
        )}
      </div>

      {/* Footer tip */}
      <div style={{
        marginTop: 'auto', padding: 14,
        borderTop: '1px solid var(--border)',
        fontSize: 12, color: 'var(--text-light)',
        lineHeight: 1.5,
      }}>
        💡 Drag any node onto the canvas to add it
      </div>
    </aside>
  );
};