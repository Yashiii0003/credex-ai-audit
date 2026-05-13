 StackSave AI - Metrics

This document defines the key metrics that will be used to measure the success of the StackSave AI application.

---

### North Star Metric

The North Star Metric is the single metric that best captures the core value that the product delivers to its customers.

-   **North Star Metric:** **Total Annual Savings Identified**
    -   **Why:** This metric perfectly aligns with the product's core promise: to save users money. Every time a user completes an audit and we identify savings, this number goes up. It's a measure of the value we are creating in the world. It's also a great number for marketing ("We've found our users over $1M in savings!").

---

### Input Metrics (The "HEART" Framework)

These are the key metrics across different categories that will help us understand user behavior and diagnose problems.

#### Happiness

-   **Metric:** Net Promoter Score (NPS) from a simple, one-question survey shown after the audit.
-   **How to measure:** "On a scale of 0-10, how likely are you to recommend StackSave AI to a friend or colleague?"
-   **Goal:** Track user satisfaction and word-of-mouth potential.

#### Engagement

-   **Metric 1:** **Audit Completion Rate**
    -   **Calculation:** (Number of users who successfully generate a report) / (Number of users who start filling out the form).
    -   **Goal:** Understand if the form is too long or confusing. A low rate here indicates friction.

-   **Metric 2:** **Email Capture Rate**
    -   **Calculation:** (Number of users who submit the email form) / (Number of users who see the results page).
    -   **Goal:** Measure the effectiveness of the email capture CTA and the user's desire to save their report.

#### Adoption

-   **Metric:** **New User Growth Rate**
    -   **Calculation:** The week-over-week percentage growth in new users completing an audit.
    -   **Goal:** Track the effectiveness of our GTM strategy.

#### Retention

-   **Metric:** **Report Shares**
    -   **Calculation:** Number of times the "Share Report" or "Copy Link" button is clicked.
    -   **Goal:** This is a proxy for retention and virality. A shared report is a highly engaged user who is acting as a promoter for the product. Since there are no user accounts, traditional retention (e.g., Day 7 retention) is not applicable.

#### Task Success

-   **Metric:** **Average Savings Identified per Audit**
    -   **Calculation:** (Total Annual Savings Identified) / (Number of Audits Completed).
    -   **Goal:** Measure the effectiveness of the audit engine itself. If this number is consistently low, it might mean our rules are not finding enough savings to be valuable.

---

### Pivot Triggers

These are the conditions under which we would consider a significant change in strategy.

-   **Trigger 1: Low Audit Completion Rate (< 30%)**
    -   **Indicates:** The form is too complex, too long, or users don't trust the site.
    -   **Potential Pivot:** Drastically simplify the form, perhaps by only asking for one tool at a time, or improve the landing page copy to build more trust.

-   **Trigger 2: Low Average Savings Identified (< $100 per audit)**
    -   **Indicates:** The tool is not valuable enough. The audit engine is not finding meaningful savings.
    -   **Potential Pivot:** The hardcoded logic is insufficient. We would need to pivot to a more sophisticated engine, perhaps by integrating with billing APIs or building a much larger database of pricing plans.

-   **Trigger 3: Low Email Capture Rate (< 5%) AND Low Report Shares**
    -   **Indicates:** Users don't find the results valuable enough to save or share. The "wow" moment is missing.
    -   **Potential Pivot:** The results page needs a redesign to be more impactful. The AI summary might need to be more insightful, or the savings need to be presented more dramatically.
