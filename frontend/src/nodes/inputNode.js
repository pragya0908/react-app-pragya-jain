import { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from '../components/BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      title="Input"
      nodeType="customInput"
      icon="→"
      outputs={[{ id: `${id}-value`, position: Position.Right }]}
    >
      <div>
        <label className="node-label">Name</label>
        <input
          className="node-input"
          type="text"
          value={currName}
          placeholder="Enter name"
          onChange={e => setCurrName(e.target.value)}
        />
      </div>
      <div>
        <label className="node-label">Type</label>
        <select
          className="node-input"
          value={inputType}
          onChange={e => setInputType(e.target.value)}
        >
          <option>Text</option>
          <option>File</option>
        </select>
      </div>
    </BaseNode>
  );
};