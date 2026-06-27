// toolbar.js

import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        marginBottom: "20px",
      }}
    >
      <h2
        style={{
          margin: 0,
          color: "#1e3a8a",
          fontWeight: "700",
        }}
      >
        Pipeline Builder
      </h2>

      <p
        style={{
          marginTop: "8px",
          color: "#64748b",
        }}
      >
        Drag nodes into the workspace
      </p>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <DraggableNode type="customInput" label="📥 Input" />
        <DraggableNode type="llm" label="🤖 LLM" />
        <DraggableNode type="customOutput" label="📤 Output" />
        <DraggableNode type="text" label="📝 Text" />
        <DraggableNode type="api" label="🌐 API" />
        <DraggableNode type="database" label="🗄 Database" />
        <DraggableNode type="email" label="📧 Email" />
        <DraggableNode type="json" label="📄 JSON" />
        <DraggableNode type="math" label="➕ Math" />
      </div>
    </div>
  );
};