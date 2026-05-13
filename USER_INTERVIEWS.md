# StackSave AI - User Interviews

This document contains notes from fictional user interviews conducted during the design phase of StackSave AI. The goal of these interviews was to understand the pain points of the target audience and validate the core concept of the application.

---

### Interviewee #1

-   **Name:** Sarah
-   **Role:** Engineering Manager at a 50-person tech startup.
-   **Team Size:** 12 engineers.

**Key Pain Points:**
-   "I have no idea what the team is actually using. I see the bills from GitHub and OpenAI, but I don't know if we're on the right plans."
-   "My main concern is 'shadow IT.' Are developers expensing tools I don't even know about?"
-   "I trust my team to choose the best tools, but I also have a budget to manage. It's a balancing act."

**Quotes:**
-   > "If a tool could just tell me, 'Hey, you're paying for 10 seats but only 5 are active,' that would be an instant win."
-   > "I don't have time to read every tool's pricing page. They're confusing on purpose."

**Contradictions:**
-   Sarah wants to control costs, but she also doesn't want to micromanage her team's tool choices. This suggests the tool should provide recommendations, not edicts.

**Design Changes from this Interview:**
-   The tool should focus on clear, actionable savings without being judgmental.
-   The concept of a "per-tool breakdown" is crucial. A single "total savings" number is not enough; managers want to know *where* the savings are coming from.

---

### Interviewee #2

-   **Name:** David
-   **Role:** Founder/CTO at a 15-person, bootstrapped company.
-   **Team Size:** 6 engineers.

**Key Pain Points:**
-   "Every dollar counts. We're constantly looking for ways to cut our SaaS spend."
-   "We use the OpenAI API heavily. I'm pretty sure we could be saving money there, maybe with credits or a different model, but I haven't had time to investigate."
-   "I'm worried about vendor lock-in. Are there cheaper alternatives to the tools we're using?"

**Quotes:**
-   > "Don't just tell me I can save money. Tell me *how*. Give me a specific alternative or a different plan to look at."
-   > "If I could get a report that I can show my co-founder, that would be amazing. Something that clearly justifies a change."

**Contradictions:**
-   David wants to switch to cheaper tools but is also worried about the engineering time required to migrate. This means recommendations need to be high-impact and relatively low-effort.

**Design Changes from this Interview:**
-   The "Suggested Alternative Tool" feature is important.
-   Each recommendation needs a "one-line reasoning" to explain *why* it's a good idea.
-   The shareable report is a key feature, as it serves as an internal justification document.

---

### Interviewee #3

-   **Name:** Mike
-   **Role:** Senior Software Engineer at a large tech company.
-   **Team Size:** Works on a team of 8 within a 1,000+ person organization.

**Key Pain Points:**
-   "I use GitHub Copilot and ChatGPT Plus and expense them. I have no idea if the company has a corporate plan."
-   "My manager approved the expense, but I sometimes wonder if I'm using the 'right' tool or if there's a better one out there."

**Quotes:**
-   > "I wouldn't use a tool that required me to log in or ask for my company's billing info. That's too much friction."
-   > "I'd be curious to see what other people on my team are using. Are we all paying for the same thing individually?"

**Contradictions:**
-   Mike is curious about optimization but is not the final decision-maker. The tool needs to be useful for him as an individual contributor, perhaps to bring a suggestion to his manager.

**Design Changes from this Interview:**
-   **No login required.** This was a huge takeaway. The tool must be instant and anonymous to appeal to individual developers.
-   The form should be based on self-reported data, not direct integrations. This lowers the barrier to entry.
-   The results should be framed in a way that an engineer can confidently present them to their manager.
