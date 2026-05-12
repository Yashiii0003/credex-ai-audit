function App() {
  const handleAudit = () => {
  alert("Audit Generated Successfully!");
};
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0f172a",
      color: "white",
      padding: "40px",
      fontFamily: "Arial"
    }}>
      
      <h1 style={{
        fontSize: "40px",
        marginBottom: "10px"
      }}>
        AI Spend Audit
      </h1>

      <p style={{
        color: "#cbd5e1",
        marginBottom: "30px"
      }}>
        Discover how much your team can save on AI tools.
      </p>

      <div style={{
        backgroundColor: "#1e293b",
        padding: "25px",
        borderRadius: "15px",
        maxWidth: "500px"
      }}>

        <label>AI Tool</label>
        <br />
        <input
          type="text"
          placeholder="ChatGPT Plus"
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "none"
          }}
        />

        <label>Monthly Spend ($)</label>
        <br />
        <input
          type="number"
          placeholder="200"
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "none"
          }}
        />

        <button onClick={handleAudit} 
        style={{ 
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "10px",
          cursor: "pointer"
        }}>
          Generate Audit
        </button>

      </div>
    </div>
  )
}

export default App