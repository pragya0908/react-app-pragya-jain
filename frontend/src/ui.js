// ui.js
import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

import { InputNode }    from './nodes/inputNode';
import { LLMNode }      from './nodes/llmNode';
import { OutputNode }   from './nodes/outputNode';
import { TextNode }     from './nodes/textNode';
import { ApiNode }      from './nodes/apiNode';
import { DatabaseNode } from './nodes/databaseNode';
import { EmailNode }    from './nodes/emailNode';
import { JsonNode }     from './nodes/jsonNode';
import { MathNode }     from './nodes/mathNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput:  InputNode,
  llm:          LLMNode,
  customOutput: OutputNode,
  text:         TextNode,
  api:          ApiNode,
  database:     DatabaseNode,
  email:        EmailNode,
  json:         JsonNode,
  math:         MathNode,
};

const selector = (state) => ({
  nodes:         state.nodes,
  edges:         state.edges,
  getNodeID:     state.getNodeID,
  addNode:       state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect:     state.onConnect,
});

/* Empty-canvas hint */
const EmptyHint = () => (
  <div style={{
    position: 'absolute', inset: 0, pointerEvents: 'none',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', gap: 12, zIndex: 5,
  }}>
    <div style={{
      width: 64, height: 64, borderRadius: 18,
      background: 'linear-gradient(135deg,#eff6ff,#f0f9ff)',
      border: '1.5px dashed #bfdbfe',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 28,
    }}>
      🧩
    </div>
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: 15, fontWeight: 600, color: '#475569', marginBottom: 4 }}>
        Your canvas is empty
      </p>
      <p style={{ fontSize: 13, color: '#94a3b8' }}>
        Drag nodes from the left panel to get started
      </p>
    </div>
  </div>
);

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    nodes, edges, getNodeID, addNode,
    onNodesChange, onEdgesChange, onConnect,
  } = useStore(selector, shallow);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    if (!reactFlowInstance) return;

    const bounds = reactFlowWrapper.current.getBoundingClientRect();
    const raw = event.dataTransfer.getData('application/reactflow');
    if (!raw) return;

    const { nodeType: type } = JSON.parse(raw);
    if (!type) return;

    const position = reactFlowInstance.project({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });

    const nodeID = getNodeID(type);
    addNode({ id: nodeID, type, position, data: { id: nodeID, nodeType: type } });
  }, [reactFlowInstance, addNode, getNodeID]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div
      ref={reactFlowWrapper}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      {nodes.length === 0 && <EmptyHint />}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType='smoothstep'
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#2563eb', strokeWidth: 2 },
        }}
        fitView
      >
        <Background
          variant='dots'
          gap={gridSize}
          size={1}
          color='#cbd5e1'
        />
        <Controls showInteractive={false} />
        <MiniMap
          zoomable
          pannable
          nodeColor={() => '#2563eb'}
          style={{ background: '#f8fafc' }}
        />
      </ReactFlow>
    </div>
  );
};