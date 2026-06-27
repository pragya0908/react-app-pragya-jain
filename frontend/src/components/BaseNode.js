// components/BaseNode.js
import { Handle } from 'reactflow';

const TYPE_THEME = {
  customInput:  { accent: '#2563eb', light: '#eff6ff', border: '#bfdbfe' },
  customOutput: { accent: '#16a34a', light: '#f0fdf4', border: '#bbf7d0' },
  llm:          { accent: '#7c3aed', light: '#faf5ff', border: '#e9d5ff' },
  text:         { accent: '#ea580c', light: '#fff7ed', border: '#fed7aa' },
  json:         { accent: '#ca8a04', light: '#fefce8', border: '#fde68a' },
  math:         { accent: '#0d9488', light: '#f0fdfa', border: '#99f6e4' },
  api:          { accent: '#e11d48', light: '#fff1f2', border: '#fecdd3' },
  database:     { accent: '#0284c7', light: '#f0f9ff', border: '#bae6fd' },
  email:        { accent: '#a21caf', light: '#fdf4ff', border: '#f5d0fe' },
};

const DEFAULT_THEME = { accent: '#2563eb', light: '#eff6ff', border: '#bfdbfe' };

export default function BaseNode({
  title,
  nodeType,
  icon,
  children,
  inputs = [],
  outputs = [],
}) {
  const theme = TYPE_THEME[nodeType] || DEFAULT_THEME;

  return (
    <div style={{
      width: 240,
      minHeight: 100,
      background: '#ffffff',
      borderRadius: 14,
      border: `1.5px solid ${theme.border}`,
      boxShadow: '0 4px 20px rgba(15,23,42,.08)',
      transition: 'box-shadow .2s, transform .2s',
      overflow: 'visible',
      fontFamily: "'Inter', sans-serif",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 8px 28px rgba(15,23,42,.13)`;
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(15,23,42,.08)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Header */}
      <div style={{
        background: theme.light,
        borderBottom: `1.5px solid ${theme.border}`,
        borderRadius: '12px 12px 0 0',
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        {icon && (
          <span style={{
            fontSize: 16,
            width: 28, height: 28,
            background: '#fff',
            border: `1.5px solid ${theme.border}`,
            borderRadius: 7,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            {icon}
          </span>
        )}
        <span style={{
          fontWeight: 700,
          fontSize: 13,
          color: theme.accent,
          letterSpacing: '-0.1px',
        }}>
          {title}
        </span>

        {/* Type pill */}
        <span style={{
          marginLeft: 'auto',
          fontSize: 10, fontWeight: 600,
          color: theme.accent,
          background: '#fff',
          border: `1px solid ${theme.border}`,
          borderRadius: 99,
          padding: '2px 7px',
          opacity: .8,
        }}>
          {nodeType || 'node'}
        </span>
      </div>

      {/* Body */}
      <div style={{
        padding: '14px 14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}>
        {children}
      </div>

      {/* Input handles (left) */}
      {inputs.map((h, i) => (
        <Handle
          key={h.id}
          type="target"
          position={h.position}
          id={h.id}
          style={{
            width: 12, height: 12,
            background: theme.accent,
            border: '2.5px solid #fff',
            borderRadius: '50%',
            boxShadow: `0 0 0 1px ${theme.accent}`,
            top: h.style?.top ?? `${((i + 1) / (inputs.length + 1)) * 100}%`,
            ...h.style,
          }}
        />
      ))}

      {/* Output handles (right) */}
      {outputs.map((h, i) => (
        <Handle
          key={h.id}
          type="source"
          position={h.position}
          id={h.id}
          style={{
            width: 12, height: 12,
            background: theme.accent,
            border: '2.5px solid #fff',
            borderRadius: '50%',
            boxShadow: `0 0 0 1px ${theme.accent}`,
            top: h.style?.top ?? `${((i + 1) / (outputs.length + 1)) * 100}%`,
            ...h.style,
          }}
        />
      ))}
    </div>
  );
}