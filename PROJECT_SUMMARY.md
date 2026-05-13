# Project Summary: Credex AI Audit

This document provides a comprehensive overview of the Credex AI Audit application, detailing its functionality, technical architecture, core logic, and user interface enhancements.

---

### 1. Project Goal & Core Functionality

-   **Purpose:** To provide a free, instant audit of a company's or individual's spending on popular AI tools.
-   **Core Loop:**
    1.  A user selects an AI tool from a dropdown.
    2.  They enter their team size, current plan, and total monthly spend for that tool.
    3.  The application runs an audit, calculates potential savings, and provides actionable recommendations.
    4.  The results are displayed on a clean, professional dashboard.
    5.  A unique, shareable URL for the report is generated and stored in a database.
    6.  An optional email capture form allows users to save their report and provides a lead generation mechanism.

---

### 2. Technology Stack

-   **Frontend:**
    -   **Framework:** React with Vite for a fast development environment.
    -   **Language:** JavaScript (ES6+).
    -   **Styling:** Tailwind CSS for a utility-first, modern design system.
    -   **Routing:** `react-router-dom` for handling client-side navigation between the homepage and report pages.
    -   **Icons:** `lucide-react` for a clean and consistent icon set.
-   **Backend:**
    -   **Database:** Supabase (PostgreSQL) for storing audit reports and email leads.
    -   **API:** The Supabase client library (`@supabase/supabase-js`) is used for all database interactions.
-   **State Management:**
    -   React Hooks (`useState`, `useEffect`).
    -   `useLocalStorage` custom hook to persist form data, preventing data loss on page refresh.
-   **Deployment:**
    -   The project is configured for seamless deployment on Vercel.
    -   Environment variables are used for Supabase credentials (`.env` file).

---

### 3. Core Logic & Business Rules

#### a. Audit Engine (`src/utils/auditEngine.js`)

The audit logic is hardcoded in the frontend for speed and simplicity.

-   **Input:** Takes `formData` containing `teamSize` and a `tools` object.
-   **Pricing Data:** Contains a hardcoded `pricing` object for various plans (e.g., ChatGPT Plus vs. Team).
-   **Key Rules Implemented:**
    1.  **Over-specced Team Plans:** Detects when a small team (e.g., < 5 users) is on an expensive "Team" or "Business" plan when individual "Pro" plans would be cheaper.
        -   *Example:* A 2-person team on ChatGPT Team ($25/user) is advised to switch to ChatGPT Plus ($20/user), saving $10/month.
    2.  **High API Spend:** Identifies high monthly API spend (e.g., > $1000) and suggests a flat 10% saving, representing potential gains from bulk credits or committed-use discounts.
    3.  **"Already Optimized" Message:** If calculated savings are less than $100, it provides an encouraging message that the user's spending is efficient.
-   **Output:** Returns an object containing `totalMonthlySavings`, `totalAnnualSavings`, and an array of `recommendations` (each with a specific reason).

#### b. Report Generation & Sharing

1.  When a user submits the audit form, the `runAudit` function is called.
2.  A mock "AI Summary" is added to the results.
3.  The entire result object is inserted as a JSONB field into the `reports` table in Supabase.
4.  Supabase returns a unique `id` for the new row.
5.  The application navigates the user to `/report/:id`, creating a permanent, shareable link for that specific audit.

---

### 4. UI/UX Enhancements Implemented

-   **Modern SaaS Design:**
    -   **Theme:** Professional dark mode theme inspired by platforms like Vercel and Linear.
    -   **Color Palette:** Uses a minimal `slate` color palette for a clean, premium feel.
    -   **Layout:** Employs professional spacing, rounded `2xl` borders on cards, and a responsive grid system.
-   **Simplified User Flow (Single-Tool Audit):**
    -   The main form was redesigned from a complex, multi-card layout to a simple, single-dropdown system.
    -   Users select one tool, and the relevant input fields appear contextually. This reduces initial cognitive load and makes the form much more approachable.
-   **Interactive Elements:**
    -   **Buttons:** Feature smooth `transition-all` effects, `hover:scale-105` transforms, and subtle shadows to feel interactive and responsive.
    -   **Inputs:** Use `focus:ring-2` to provide clear visual feedback when a user is typing.
-   **Component-Based Architecture:**
    -   The UI is broken down into reusable components (`Navbar`, `Hero`, `AuditForm`, `ResultsDashboard`, `Footer`).
-   **Defensive UI & Error Handling:**
    -   **Loading States:** The app displays an animated loader while the audit is being processed.
    -   **Error States:** The report page shows a clear error message if the report can't be fetched or if Supabase is not configured, preventing the app from crashing.
    -   **Icon Safety:** Implemented fallbacks for icons to prevent crashes if a specific icon is missing from the installed library version.
-   **Responsive Design:**
    -   The entire application is fully responsive and provides a seamless experience on mobile, tablet, and desktop devices.
