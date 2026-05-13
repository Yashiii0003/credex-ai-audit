# StackSave AI - Devlog

A log of the development process for the Credex Web Development Internship assignment.

---

### Day 1: Project Setup & Scaffolding

**Hours Worked:** 4

**What I did:**
-   Initialized a new React project using Vite.
-   Set up Tailwind CSS and configured `tailwind.config.js`.
-   Created the basic folder structure (`components`, `pages`, `utils`, etc.).
-   Set up `react-router-dom` for routing between the homepage and report pages.
-   Created placeholder components for `Navbar`, `Hero`, `AuditForm`, and `Footer`.
-   Pushed the initial commit to a new GitHub repository.

**Blockers:**
-   None today. The setup process with Vite and Tailwind is very smooth.

**Learnings:**
-   Refreshed my memory on the latest Vite and Tailwind CSS setup.

**Tomorrow's Plan:**
-   Build out the `Navbar` and `Hero` components with the final UI.
-   Start designing the `AuditForm` and `ToolCard` components.

---

### Day 2: Building the Form

**Hours Worked:** 6

**What I did:**
-   Completed the `Navbar` and `Hero` components with responsive design.
-   Built the `AuditForm` component, including the grid layout for tool cards.
-   Created the `ToolCard` component for individual tool inputs.
-   Implemented the `useLocalStorage` hook to persist form data, which is a huge UX win.

**Blockers:**
-   Spent some time figuring out the best way to manage state for a dynamic number of tool inputs. Decided on a nested object within the main form state.

**Learnings:**
-   Managing complex form state in React requires careful planning. The nested object approach is clean and scalable for this use case.

**Tomorrow's Plan:**
-   Develop the core `auditEngine.js` logic.
-   Start with a few simple rules for ChatGPT and GitHub Copilot.

---

### Day 3: The Audit Engine

**Hours Worked:** 5

**What I did:**
-   Wrote the first version of the `runAudit` function in `auditEngine.js`.
-   Implemented hardcoded pricing data and rules for detecting overpriced plans.
-   Calculated monthly and annual savings.
-   Added a basic recommendations array to the audit result.
-   Created the basic structure for the `ResultsDashboard` component.

**Blockers:**
-   Thinking through the "defensible" audit logic was challenging. It's easy to make assumptions, but I tried to base the rules on common scenarios (e.g., small teams on enterprise plans).

**Learnings:**
-   Business logic, even when simplified, is the core of an application. It's important to document the rules and their reasoning.

**Tomorrow's Plan:**
-   Build the UI for the `ResultsDashboard`.
-   Display the savings and recommendations in a clean, professional way.

---

### Day 4: Results UI & Supabase Integration

**Hours Worked:** 7

**What I did:**
-   Designed and built the `ResultsDashboard` component, including the main savings cards and the recommendations list.
-   Created the `SummaryCard` component.
-   Set up a new project on Supabase.
-   Created the `reports` table and integrated the Supabase client into the app.
-   Modified the form submission logic to save the audit result to Supabase and redirect to the report page.

**Blockers:**
-   Ran into some issues with Supabase environment variables in Vite. Realized they need to be prefixed with `VITE_`.

**Learnings:**
-   Supabase is incredibly fast to set up for simple use cases like this. The auto-generated API is a huge time-saver.

**Tomorrow's Plan:**
-   Build the public `ReportPage` to fetch and display data from Supabase.
-   Implement the email capture form and Supabase integration.

---

### Day 5: Public Reports & Email Capture

**Hours Worked:** 6

**What I did:**
-   Built the `ReportPage` component, which fetches a report by ID from Supabase.
-   Added loading and error states for the report fetching.
-   Created the `EmailCapture` component with fields for email, company, etc.
-   Set up the `leads` table in Supabase and integrated it with the email form.
-   Added a simple honeypot field for spam prevention.

**Blockers:**
-   None. The process was straightforward thanks to the work done yesterday.

**Learnings:**
-   The `isPublic` prop on the `ResultsDashboard` is a good way to reuse a component for slightly different contexts (showing/hiding the email form).

**Tomorrow's Plan:**
-   Write all the required markdown documentation (`README.md`, `ARCHITECTURE.md`, etc.).
-   Write tests for the audit engine.

---

### Day 6: Documentation & Testing

**Hours Worked:** 8

**What I did:**
-   Wrote the `README.md` with detailed setup instructions and trade-offs.
-   Created the `ARCHITECTURE.md` file with a Mermaid diagram.
-   Wrote the `TESTS.md` file with unit tests for the audit engine using `vitest`.
-   Wrote all other markdown files (`PROMPTS.md`, `GTM.md`, etc.), generating realistic content for each.
-   Set up the GitHub Actions CI workflow (`ci.yml`).

**Blockers:**
-   Writing good documentation is time-consuming but crucial. It took a while to articulate the trade-offs and architecture clearly.
-   Setting up `vitest` for the first time required a bit of reading, but it's very similar to Jest.

**Learnings:**
-   Thinking about the project from different perspectives (architecture, GTM, economics) for the markdown files was a great exercise.

**Tomorrow's Plan:**
-   Final UI polish and responsive design checks.
-   Review all code and documentation for clarity and completeness.
-   Prepare for deployment.

---

### Day 7: Final Polish & Deployment Prep

**Hours Worked:** 4

**What I did:**
-   Reviewed the entire application for UI consistency and responsiveness.
-   Added hover effects and transitions to buttons and cards.
-   Tested the form and report flow one last time.
-   Cleaned up the code, added comments, and removed console logs.
-   Prepared the `README.md` with deployment instructions for Vercel.

**Blockers:**
-   None. Just minor tweaks and fixes.

**Learnings:**
-   The final 10% of polish makes a huge difference in the perceived quality of an application.

**Project Complete!**
