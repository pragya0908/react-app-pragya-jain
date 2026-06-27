import { useState } from "react";
import { Position } from "reactflow";
import BaseNode from "../components/BaseNode";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );

  const [outputType, setOutputType] = useState(
    data?.outputType || "Text"
  );

  return (
    <BaseNode
      title="Output"
      inputs={[
        {
          id: `${id}-value`,
          position: Position.Left,
        },
      ]}
    >
      <label>
        Name
        <input
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          style={{
    width:"100%",
    padding:"8px",
    borderRadius:"8px",
    border:"1px solid #cbd5e1",
    outline:"none"
}}
        />
      </label>

      <label>
        Type
        <select
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
          style={{
    width:"100%",
    padding:"8px",
    borderRadius:"8px",
    border:"1px solid #cbd5e1"
}}
        >
          <option>Text</option>
          <option>Image</option>
        </select>
      </label>
    </BaseNode>
  );
};