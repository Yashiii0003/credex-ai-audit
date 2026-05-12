function App() {

  const auditResult = {
    savings: 80,
    recommendation: "Switch to yearly plan for better savings."
  }

  const handleAudit = () => {
    console.log(auditResult)
  }

  return (
    <div style={{
      backgroundColor: "#0f172a",
      minHeight: "100vh",
      color: "white",
      padding: "40px",
      fontFamily: "Arial"
    }}>

      <h1 style={{
        fontSize: "48px",
        marginBottom: "10px",
        textAlign: "center"
      }}>
        AI Spend Audit
      </h1>

      <p style={{
        color: "#cbd5e1",
        marginBottom: "30px",
        textAlign: "center"
      }}>
        Discover how much your team can save on AI tools.
      </p>

      <div style={{
        backgroundColor: "#1e293b", 
       textAlign: "center",
        padding: "25px",
        borderRadius: "15px",
        maxWidth: "500px",
        margin: "auto"
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

        <button
          onClick={handleAudit}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer"
          }}
        >
          Generate Audit
        </button>

        <div style={{
          marginTop: "20px",
          padding: "20px",
          backgroundColor: "#0f172a",
          borderRadius: "10px"
        }}>

          <h2>Audit Result</h2>

          <p>
            Estimated Savings: ${auditResult.savings}
          </p>

          <p>
            {auditResult.recommendation}
          </p>

        </div>

      </div>

    </div>
  )
}

export default App