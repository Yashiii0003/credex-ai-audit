// This is a simplified, hardcoded audit engine.
// In a real-world scenario, this would be much more complex,
// likely involving a database of pricing plans and more sophisticated rules.

const pricing = {
  "GitHub Copilot": { individual: 10, business: 19 },
  "ChatGPT": { plus: 20, team: 25 },
  "Cursor": { pro: 20 },
};

export function runAudit(formData) {
  let totalMonthlySavings = 0;
  let totalAnnualSavings = 0;
  const recommendations = [];

  const { tools, teamSize } = formData;

  for (const toolName in tools) {
    const toolData = tools[toolName];
    const spend = parseFloat(toolData.monthlySpend) || 0;
    const seats = parseInt(toolData.seats) || 0;
    const plan = toolData.plan ? toolData.plan.toLowerCase() : '';

    if (spend === 0) continue;

    let savings = 0;
    let reasoning = '';

    // Rule: ChatGPT Team for very small teams
    if (toolName === "ChatGPT" && plan.includes("team") && seats < 5) {
      const suggestedSpend = seats * pricing.ChatGPT.plus;
      if (spend > suggestedSpend) {
        savings = spend - suggestedSpend;
        reasoning = `ChatGPT Team is priced per user. For a team of ${seats}, switching to individual Plus plans could be more cost-effective.`;
        recommendations.push({
          tool: toolName,
          recommendation: `Consider switching ${seats} users to ChatGPT Plus plans instead of the Team plan.`,
          reasoning,
          savings,
        });
      }
    }

    // Rule: GitHub Copilot Business vs Individual
    if (toolName === "GitHub Copilot" && plan.includes("business") && teamSize < 5) {
        const suggestedSpend = seats * pricing["GitHub Copilot"].individual;
        if (spend > suggestedSpend) {
            savings = spend - suggestedSpend;
            reasoning = `GitHub Copilot Business offers features for larger organizations. For a team of ${seats}, individual plans might suffice.`;
            recommendations.push({
                tool: toolName,
                recommendation: `Evaluate if GitHub Copilot Individual plans meet your team's needs.`,
                reasoning,
                savings,
            });
        }
    }

    // Rule: High API spend
    if (toolName.includes("API") && spend > 1000) {
      savings = spend * 0.1; // Assume 10% savings from bulk credits/better management
      reasoning = `High API spend often has optimization potential through committed use discounts, regional routing, or model selection.`;
      recommendations.push({
        tool: toolName,
        recommendation: `Explore bulk credit purchases or committed use discounts for your ${toolName} usage.`,
        reasoning,
        savings,
      });
    }
    
    totalMonthlySavings += savings;
  }

  if (recommendations.length === 0 && totalMonthlySavings < 100) {
    recommendations.push({
        recommendation: "Your spending is already quite optimized!",
        reasoning: "Based on our analysis, your current tool stack and spending levels appear efficient for a team of your size. Keep up the great work!",
        savings: 0,
    });
  }

  totalAnnualSavings = totalMonthlySavings * 12;

  return {
    totalMonthlySavings,
    totalAnnualSavings,
    recommendations,
    // This would be replaced by a real AI call
    aiSummary: "Default fallback summary. API call would go here.", 
  };
}
