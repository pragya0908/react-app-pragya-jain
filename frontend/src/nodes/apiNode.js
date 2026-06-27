import { Position } from "reactflow";
import BaseNode from "../components/BaseNode";

export const ApiNode = ({ id }) => {
  return (
    <BaseNode
      title="API"
      inputs={[
        {
          id: `${id}-request`,
          position: Position.Left,
        },
      ]}
      outputs={[
        {
          id: `${id}-response`,
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
  REST API Call
</div>
    </BaseNode>
  );
};