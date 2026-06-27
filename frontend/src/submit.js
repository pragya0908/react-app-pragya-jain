export const SubmitButton = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "25px",
      }}
    >
      <button
        style={{
          background: "#2563eb",
          color: "white",
          padding: "14px 30px",
          border: "none",
          borderRadius: "10px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 8px 20px rgba(37,99,235,.3)",
        }}
      >
        Submit Pipeline
      </button>
    </div>
  );
};