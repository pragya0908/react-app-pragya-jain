// App.js


import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";

function App() {
  return (
    <div
      style={{
        background: "#eff6ff",
        minHeight: "100vh",
        padding: "25px",
      }}
    >
      <PipelineToolbar />

      <PipelineUI />

      <SubmitButton />
    </div>
  );
}

export default App;