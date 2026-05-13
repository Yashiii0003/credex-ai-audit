# StackSave AI - Unit Economics

This document provides a rough, back-of-the-napkin calculation of the unit economics for StackSave AI. The goal is to understand the potential costs and revenue associated with acquiring and serving a user.

---

### Assumptions

-   The core audit tool is free.
-   Monetization comes from a "Pro Consultation" service offered to high-savings users.
-   **Conversion Rate:** 1% of users who see the "Book a Consultation" CTA will actually purchase it.
-   **Consultation Price:** $299 for a one-hour consultation.

### Cost of Acquiring a User (CAC)

The initial go-to-market strategy is focused on organic channels (Hacker News, Reddit, SEO), so the direct marketing spend is $0. The primary cost is **time**.

Let's estimate the cost of acquiring the first 1,000 users through content and community engagement.

-   **Time Spent:** 40 hours (writing content, posting on forums, engaging with users).
-   **Assumed Hourly Rate of Developer:** $50/hour.
-   **Total "Cost":** 40 hours * $50/hour = $2,000.
-   **CAC (for first 1,000 users):** $2,000 / 1,000 users = **$2.00 per user**.

This is a "blended CAC" that includes non-paying users.

---

### Cost of Serving a User

The application is designed to be extremely low-cost.

-   **Frontend Hosting (Vercel):** The free tier is generous and can likely handle the first 10,000+ users. **Cost: $0**.
-   **Backend (Supabase):**
    -   The free tier includes 50,000 monthly active users and 500MB of database space.
    -   Each audit creates one report and potentially one lead. This is a very small amount of data.
    -   The free tier is more than sufficient. **Cost: $0**.
-   **AI Summary (Future Cost):**
    -   If we integrate a real AI model, this would be a variable cost.
    -   **Model:** GPT-3.5 Turbo.
    -   **Cost:** ~$0.0015 per 1,000 tokens (input + output).
    -   **Tokens per summary:** ~1,000 (including prompt).
    -   **Cost per user:** ~$0.0015.
    -   **Cost for 1,000 users:** **$1.50**.

**Total Cost per User (with AI):** ~$0.0015.

---

### Lifetime Value (LTV)

The LTV depends on the conversion rate to the paid consultation.

1.  **Percentage of users who see the CTA:**
    -   Let's assume 10% of users have savings > $500 and are shown the CTA.
    -   For 1,000 users, 100 will see the CTA.

2.  **Conversion to paid:**
    -   We assume a 1% conversion rate from seeing the CTA to purchasing.
    -   **Paid Customers:** 100 users * 1% = 1 customer.

3.  **Revenue:**
    -   **Revenue per 1,000 users:** 1 customer * $299/consultation = $299.

4.  **LTV per user:**
    -   **LTV:** $299 / 1,000 users = **$0.299 per user**.

### LTV:CAC Ratio

-   **LTV:** $0.299
-   **CAC:** $2.00

**Ratio:** 0.299 / 2.00 ≈ **0.15**

### Conclusion

With the current assumptions, the LTV:CAC ratio is **less than 1**. This means the business is not profitable. The time "cost" of acquiring users is higher than the revenue they generate.

**How to Improve This:**

1.  **Increase LTV:**
    -   **Increase the price:** A consultation for a business could easily be priced at $499 or higher.
    -   **Increase the conversion rate:** A more compelling CTA, social proof (testimonials), or a "limited time" offer could increase the 1% conversion rate.
    -   **Add a recurring revenue product:** A B2B dashboard for continuous monitoring would dramatically increase LTV.

2.  **Decrease CAC:**
    -   **Improve the viral loop:** If each user brings in 0.2 new users, the effective CAC drops significantly. This means making the shareable report even more compelling.
    -   **Lean into SEO:** Once the initial time investment in content is made, SEO can bring in users for a near-$0 marginal cost.

This analysis shows that while the tool is a great free resource, the path to a profitable business requires a clear focus on increasing the value extracted from high-intent users.
