import { useState } from "react"
function App() {
 const [showResult, setShowResult] = useState(false)
 const [spend, setSpend] = useState("")
const [teamSize, setTeamSize] = useState("")
const [estimatedSavings, setEstimatedSavings] = useState("")
const [recommendation, setRecommendation] = useState("")
 const handleAudit = () => {
   const savings = Math.floor(spend * 0.3)

  setEstimatedSavings(savings)

  if (Number(teamSize) > 10) {
    setRecommendation("Consider enterprise AI plans for larger teams.")
  } else {
    setRecommendation("Switch to yearly billing for better savings.")
  }

  setShowResult(true)
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
          type="text"
          placeholder="200"
          value={spend}
          onChange={(e) => setSpend(Number(e.target.value))}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "none"
          }}
          />
          <label>Team Size</label>
<br />

<input
  type="number"
  placeholder="5"
  value={teamSize}
  onChange={(e) => setTeamSize(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    marginBottom: "20px",
    borderRadius: "10px",
    border: "none"
  }}
/>

<label>Primary Use Case</label>
<br />

<select
  style={{
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    marginBottom: "20px",
    borderRadius: "10px",
    border: "none"
  }}
>
  <option>Coding</option>
  <option>Writing</option>
  <option>Research</option>
  <option>Data</option>
  <option>Mixed</option>
</select>
           <button
          onClick={handleAudit}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer" ,
            transition: "0.3s",
fontWeight: "bold",
          }}
        >
          Generate Audit
        </button>
{showResult && (
        <div style={{
          marginTop: "20px",
          padding: "20px",
          backgroundColor: "#0f172a",
          borderRadius: "10px"
        }}>

          <h2>Audit Result</h2>

          <p>
            Estimated Savings: ${estimatedSavings}
          </p>

          <p>
            {recommendation}
          </p>

        </div>
      )}
      </div>
      </div>
      )
}

export default App;
