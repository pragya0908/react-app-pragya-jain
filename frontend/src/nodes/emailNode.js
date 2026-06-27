import { Position } from "reactflow";
import BaseNode from "../components/BaseNode";

export const EmailNode = ({ id }) => {
  return (
    <BaseNode
      title="Email"
      inputs={[
        {
          id: `${id}-message`,
          position: Position.Left,
        },
      ]}
      outputs={[
        {
          id: `${id}-status`,
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
  Send Email
</div>
    </BaseNode>
  );
};