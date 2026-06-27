import { useState } from "react";
import { Position } from "reactflow";
import BaseNode from "../components/BaseNode";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(
    data?.text || "{{input}}"
  );

  return (
    <BaseNode
      title="Text"
      outputs={[
        {
          id: `${id}-output`,
          position: Position.Right,
        },
      ]}
    >
      <label>
        Text
        <input
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          style={{
    width:"100%",
    padding:"8px",
    borderRadius:"8px",
    border:"1px solid #cbd5e1",
    outline:"none"
}}
        />
      </label>
    </BaseNode>
  );
};