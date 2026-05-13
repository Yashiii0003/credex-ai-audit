# Credex AI Audit - Credex Web Development Internship Assignment

Credex AI Audit is a full-stack web application designed to help development teams and small companies audit their spending on AI tools. Users can input their current tool stack, and the application provides an instant analysis of potential savings, along with actionable recommendations.

This project was built for the Credex Web Development Internship assignment.

**Live URL:** [https://credex-ai-audit.vercel.app](https://credex-ai-audit.vercel.app) (placeholder)

## Screenshots

*(Section to be filled with actual screenshots of the application)*

- Homepage
- Audit Results
- Mobile View

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Supabase (for storing email leads and reports)
- **Deployment:** Vercel
- **Icons:** lucide-react

## Quick Start

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Yashiii0003/credex-ai-audit.git
    cd credex-ai-audit
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Supabase:**
    - Create a new project on [Supabase](https://supabase.com/).
    - In the SQL Editor, create a `reports` table and a `leads` table.
      ```sql
      -- For reports
      CREATE TABLE reports (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
        data JSONB
      );

      -- For email leads
      CREATE TABLE leads (
        id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
        email TEXT,
        company_name TEXT,
        role TEXT,
        team_size TEXT,
        report_id UUID REFERENCES reports(id)
      );
      ```
    - In `src/services/supabase.js`, replace `YOUR_SUPABASE_URL` and `YOUR_SUPABASE_ANON_KEY` with your project's URL and anon key.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Deployment

This project is configured for easy deployment on Vercel.

1.  Push your code to a GitHub repository.
2.  Create a new project on Vercel and import your repository.
3.  Vercel will automatically detect the Vite configuration.
4.  Add your Supabase URL and anon key as environment variables in the Vercel project settings.
5.  Deploy!

## Trade-offs Made

1.  **Hardcoded Audit Logic:** The audit engine in `src/utils/auditEngine.js` is hardcoded for simplicity and speed of development. A real-world application would use a database of pricing plans and a more robust rules engine to provide more accurate and scalable recommendations.
2.  **No User Authentication:** The application is designed to be used without an account to reduce friction. This means users cannot save their audit history. The trade-off is for ease of use and to encourage initial engagement.
3.  **Simulated AI Summary:** The AI-generated summary is currently a static string to avoid the complexity and cost of integrating a real AI model for this assignment. In a production environment, this would be an API call to a service like OpenAI or Anthropic.
4.  **Client-Side Report Generation:** The audit is performed entirely on the client. This is fast and free, but it exposes the audit logic. A server-side approach would protect the business logic but increase server costs and complexity.
5.  **Limited Tool Support:** The form only supports a handful of popular AI tools. This was a conscious decision to limit the scope of the project and focus on delivering a polished experience for a core set of tools.

