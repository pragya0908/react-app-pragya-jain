import { Position } from "reactflow";
import BaseNode from "../components/BaseNode";

export const MathNode = ({ id }) => {
  return (
    <BaseNode
      title="Math"
      inputs={[
        {
          id: `${id}-number`,
          position: Position.Left,
        },
      ]}
      outputs={[
        {
          id: `${id}-result`,
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
  Math Operation
</div>
    </BaseNode>
  );
};