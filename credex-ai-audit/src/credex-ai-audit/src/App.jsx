function App() {
  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          fontSize: "40px",
          marginBottom: "10px",
        }}
      >
        AI Spend Audit Tool
      </h1>

      <p
        style={{
          color: "#cbd5e1",
          marginBottom: "30px",
        }}
      >
        Analyze your AI tool spending and discover savings.
      </p>

      <button
        style={{
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Start Audit
      </button>

      <div
        style={{
          marginTop: "40px",
          backgroundColor: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
          maxWidth: "400px",
        }}
      >
        <h2>Monthly AI Spending</h2>

        <input
          type="text"
          placeholder="Enter amount"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "8px",
            border: "none",
          }}
        />

        <button
          style={{
            marginTop: "15px",
            backgroundColor: "#22c55e",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Generate Report
        </button>
        <div
  style={{
    marginTop: "20px",
    backgroundColor: "#334155",
    padding: "15px",
    borderRadius: "10px",
  }}
>
  <h3>Audit Result</h3>

  <p>Estimated Savings: ₹2,000/month</p>

  <p>Recommendation: Cancel inactive AI tools to save more money.</p>
</div>
      </div>
    </div>
  );
}

export default App;