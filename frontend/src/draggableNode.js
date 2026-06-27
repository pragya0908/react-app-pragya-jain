// draggableNode.js
import { useState } from 'react';

const TYPE_COLORS = {
  customInput:  { bg: '#eff6ff', border: '#bfdbfe', icon: '#2563eb' },
  customOutput: { bg: '#f0fdf4', border: '#bbf7d0', icon: '#16a34a' },
  llm:          { bg: '#faf5ff', border: '#e9d5ff', icon: '#7c3aed' },
  text:         { bg: '#fff7ed', border: '#fed7aa', icon: '#ea580c' },
  json:         { bg: '#fefce8', border: '#fde68a', icon: '#ca8a04' },
  math:         { bg: '#f0fdfa', border: '#99f6e4', icon: '#0d9488' },
  api:          { bg: '#fff1f2', border: '#fecdd3', icon: '#e11d48' },
  database:     { bg: '#f0f9ff', border: '#bae6fd', icon: '#0284c7' },
  email:        { bg: '#fdf4ff', border: '#f5d0fe', icon: '#a21caf' },
};

export const DraggableNode = ({ type, label, icon, desc }) => {
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const colors = TYPE_COLORS[type] || { bg: '#f8fafc', border: '#e2e8f0', icon: '#64748b' };

  const onDragStart = (event) => {
    setDragging(true);
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify({ nodeType: type })
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={() => setDragging(false)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 11px',
        borderRadius: 10,
        border: `1.5px solid ${hovered || dragging ? colors.border : 'transparent'}`,
        background: hovered || dragging ? colors.bg : 'transparent',
        cursor: dragging ? 'grabbing' : 'grab',
        transition: 'all .15s ease',
        userSelect: 'none',
        transform: dragging ? 'scale(0.97)' : 'scale(1)',
      }}
    >
      {/* Icon badge */}
      <div style={{
        width: 32, height: 32, flexShrink: 0,
        borderRadius: 8,
        background: colors.bg,
        border: `1.5px solid ${colors.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 15,
        color: colors.icon,
        fontWeight: 700,
        transition: 'transform .15s',
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
      }}>
        {icon}
      </div>

      {/* Text */}
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>
          {label}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 1, lineHeight: 1.3 }}>
          {desc}
        </div>
      </div>
    </div>
  );
};