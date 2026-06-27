import { Position } from "reactflow";
import BaseNode from "../components/BaseNode";

export const JsonNode = ({ id }) => {
  return (
    <BaseNode
      title="JSON"
      inputs={[
        {
          id: `${id}-input`,
          position: Position.Left,
        },
      ]}
      outputs={[
        {
          id: `${id}-output`,
          position: Position.Right,
        },
      ]}
    >
      <div
  style={{
    color: "#475569",
    fontSize: 14,
    lineHeight: 1.5,
  }}
>
  JSON Parser
</div>
    </BaseNode>
  );
};