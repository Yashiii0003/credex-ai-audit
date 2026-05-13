# StackSave AI - AI Prompts

This document details the prompts designed for generating the AI summary on the results page. In the current implementation, the AI summary is a hardcoded fallback, but these prompts are ready for integration with a large language model (LLM) API.

---

### Primary Prompt for AI Summary

This is the main prompt designed to be sent to an LLM like GPT-4 or Claude 3 Sonnet. It takes a JSON object of the audit results as input and is instructed to produce a concise, insightful summary.

**Model:** GPT-4 / Claude 3 Sonnet
**Role:** You are an expert financial analyst specializing in SaaS spending for tech companies.
**Instructions:**
-   Your tone should be professional, insightful, and encouraging.
-   Do not use marketing jargon or overly enthusiastic language.
-   Focus on the key drivers of savings.
-   Keep the summary to 2-3 sentences.
-   If savings are low, the tone should be congratulatory.

**Prompt:**

```
Given the following AI spending audit report in JSON format, generate a brief, 2-3 sentence summary for the user.

The user is likely a tech lead, engineering manager, or CTO.

Your summary should be professional and directly address the major findings.

**Audit Report:**
{
  "totalMonthlySavings": ${totalMonthlySavings},
  "totalAnnualSavings": ${totalAnnualSavings},
  "recommendations": [
    ${recommendations.map(rec => `{ "tool": "${rec.tool}", "recommendation": "${rec.recommendation}", "savings": ${rec.savings} }`).join(',\n    ')}
  ],
  "formData": {
    "teamSize": ${formData.teamSize},
    "primaryUseCase": "${formData.primaryUseCase}"
  }
}

**Example Output (High Savings):**
"Based on your current stack, you have a significant savings opportunity of over $${totalAnnualSavings.toFixed(0)} annually. The primary driver is optimizing your team-based subscriptions for your actual team size and exploring more efficient API usage."

**Example Output (Low Savings):**
"Your AI spending is already well-optimized. Our analysis found only minor potential savings, indicating that your current tool selection and plans are a good fit for your team's size and use case."

**Generated Summary:**
```

---

### Failed Prompt Experiments

During the design phase, a few prompt variations were considered and discarded.

1.  **Overly Casual Tone:**
    -   **Prompt:** `"You're an AI buddy. Tell the user in a fun way how much they can save."`
    -   **Result:** The output was often unprofessional ("Wow, you're burning cash!") and didn't align with the clean, SaaS-inspired UI.
    -   **Reasoning for Failure:** The target audience (technical leaders) is more likely to respond to professional, data-driven advice than a casual, "buddy" tone.

2.  **Too Much Detail:**
    -   **Prompt:** `"Provide a detailed, bullet-pointed list of every single recommendation and the exact calculation for each."`
    -   **Result:** The LLM would often just re-format the JSON data into a long, unreadable block of text, defeating the purpose of a "summary."
    -   **Reasoning for Failure:** The goal of the AI summary is to provide a high-level overview, not to repeat the detailed recommendations that are already displayed elsewhere on the page. The prompt was too prescriptive and didn't allow the model to synthesize information.

### Reasoning for Final Prompt Design

The final prompt design was chosen because it:
-   **Sets a Clear Persona:** "You are an expert financial analyst..." immediately puts the model in the right frame of mind.
-   **Provides Context:** It specifies the target audience (tech lead, etc.), which helps the model tailor its language.
-   **Uses Examples (Few-Shot Learning):** Providing examples of both high-savings and low-savings outputs is a powerful way to guide the model's tone and structure.
-   **Separates Data from Instruction:** The prompt clearly separates the instructions from the JSON data, which improves reliability.
-   **Constrains the Output:** "Keep the summary to 2-3 sentences" is a clear, actionable constraint that prevents verbose responses.
