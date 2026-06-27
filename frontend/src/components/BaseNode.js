import { Handle } from "reactflow";

export default function BaseNode({
  title,
  children,
  inputs = [],
  outputs = [],
}) {
  return (
    <div
      style={{
        width: 250,
        minHeight: 130,
        background: "#ffffff",
        borderRadius: 14,
        border: "1px solid #dbeafe",
        boxShadow: "0 8px 24px rgba(15,23,42,.08)",
        transition: "all .2s ease",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "linear-gradient(90deg,#2563eb,#3b82f6)",
          color: "white",
          padding: "12px 16px",
          fontWeight: 700,
          fontSize: 16,
        }}
      >
        {title}
      </div>

      <div
        style={{
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {children}
      </div>

      {inputs.map((h) => (
        <Handle
          key={h.id}
          type="target"
          position={h.position}
          id={h.id}
          style={{
            width: 12,
            height: 12,
            background: "#2563eb",
            border: "2px solid white",
            ...h.style,
          }}
        />
      ))}

      {outputs.map((h) => (
        <Handle
          key={h.id}
          type="source"
          position={h.position}
          id={h.id}
          style={{
            width: 12,
            height: 12,
            background: "#2563eb",
            border: "2px solid white",
            ...h.style,
          }}
        />
      ))}
    </div>
  );
}