import { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from '../components/BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      title="Output"
      nodeType="customOutput"
      icon="←"
      inputs={[{ id: `${id}-value`, position: Position.Left }]}
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
          value={outputType}
          onChange={e => setOutputType(e.target.value)}
        >
          <option>Text</option>
          <option>Image</option>
        </select>
      </div>
    </BaseNode>
  );
};