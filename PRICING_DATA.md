# StackSave AI - Pricing Data

This document contains the pricing data used by the audit engine. In the current version of the application, this data is hardcoded in `src/utils/auditEngine.js`. In a future version, this could be moved to a database to allow for dynamic updates.

**Note:** The pricing information below is for illustrative purposes and may not be up-to-date. Always refer to the official pricing pages for the most accurate information.

---

### GitHub Copilot

-   **Official Pricing URL:** [https://github.com/features/copilot#pricing](https://github.com/features/copilot#pricing)

| Plan       | Price (per user/month) | Notes                               |
| :--------- | :--------------------- | :---------------------------------- |
| Individual | $10                    | For personal use.                   |
| Business   | $19                    | For organizations. Includes SSO.    |
| Enterprise | $39                    | For large enterprises.              |

---

### ChatGPT / OpenAI

-   **Official Pricing URL:** [https://openai.com/pricing](https://openai.com/pricing)

| Plan | Price (per user/month) | Notes                               |
| :--- | :--------------------- | :---------------------------------- |
| Plus | $20                    | For individuals.                    |
| Team | $25                    | For teams. Billed annually or monthly. |

---

### Cursor

-   **Official Pricing URL:** [https://cursor.sh/pricing](https://cursor.sh/pricing)

| Plan | Price (per user/month) | Notes                               |
| :--- | :--------------------- | :---------------------------------- |
| Pro  | $20                    | For individual developers.          |

---

### Anthropic (Claude)

-   **Official Pricing URL:** [https://www.anthropic.com/pricing](https://www.anthropic.com/pricing)

| Plan | Price (per user/month) | Notes                               |
| :--- | :--------------------- | :---------------------------------- |
| Pro  | $20                    | For individuals.                    |
| Team | $30                    | For teams. Minimum 5 users.         |

*Note: The audit engine currently has a specific rule for the Claude Team plan's minimum user count.*

---

### API Pricing

API pricing is usage-based and much more complex. The audit engine simplifies this by looking for high monthly spend (e.g., >$1000) and suggesting a flat percentage saving (e.g., 10%) that could be achieved through bulk credits or other optimization strategies.

-   **OpenAI API:** [https://openai.com/api/pricing/](https://openai.com/api/pricing/)
-   **Anthropic API:** [https://www.anthropic.com/pricing](https://www.anthropic.com/pricing)
-   **Google Gemini:** [https://ai.google.dev/pricing](https://ai.google.dev/pricing)
