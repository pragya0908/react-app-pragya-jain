import { Position } from "reactflow";
import BaseNode from "../components/BaseNode";

export const DatabaseNode = ({ id }) => {
  return (
    <BaseNode
      title="Database"
      inputs={[
        {
          id: `${id}-query`,
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
  Database Query
</div>
    </BaseNode>
  );
};