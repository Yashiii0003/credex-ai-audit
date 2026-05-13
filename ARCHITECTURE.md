# StackSave AI - Architecture

This document outlines the architecture of the StackSave AI application, including the technology stack, data flow, and scalability considerations.

## Mermaid Diagram

```mermaid
graph TD
    A[User's Browser] -->|HTTP Request| B(Vercel);
    B -->|Serves Static Files| A;
    A -->|Fills Form| C{React App};
    C -->|Saves to localStorage| D[localStorage];
    C -->|Runs Audit| E[Audit Engine (JS)];
    E -->|Generates Report| C;
    C -->|Saves Report| F(Supabase);
    F -->|Returns Report ID| C;
    C -->|Navigates to Report URL| A;
    A -->|Captures Email| G[Email Form];
    G -->|Saves Lead| F;

    subgraph "Frontend (Vite + React on Vercel)"
        C
        E
        G
    end

    subgraph "Backend (Supabase)"
        F
    end
```

## Technology Stack

-   **Frontend:**
    -   **React:** A JavaScript library for building user interfaces. Chosen for its component-based architecture and vast ecosystem.
    -   **Vite:** A modern frontend build tool that provides an extremely fast development experience.
    -   **Tailwind CSS:** A utility-first CSS framework that allows for rapid UI development without leaving the HTML.
    -   **react-router-dom:** For client-side routing.

-   **Backend:**
    -   **Supabase:** A backend-as-a-service platform that provides a PostgreSQL database, authentication, and auto-generated APIs. It was chosen for its generous free tier and ease of use, allowing for quick setup of a database and APIs without managing a server.

-   **Deployment:**
    -   **Vercel:** A platform for deploying frontend applications. It offers seamless integration with GitHub, automatic builds, and a global CDN, making it ideal for a project like this.

## Data Flow

1.  **Landing & Form Interaction:**
    -   A user visits the site, which is a static React application hosted on Vercel.
    -   As the user fills out the audit form, the data is persisted in the browser's `localStorage` using a custom hook (`useLocalStorage`). This prevents data loss on page refresh.

2.  **Audit Generation:**
    -   When the user submits the form, the `auditEngine.js` utility is run entirely on the client side.
    -   This engine contains hardcoded business logic to calculate potential savings based on the user's input.

3.  **Report Creation & Storage:**
    -   The generated audit result (a JSON object) is saved to the `reports` table in Supabase. This is done via an API call from the client.
    -   Supabase returns a unique ID for the newly created report.
    -   The application then navigates the user to a public report page, e.g., `/report/<unique-id>`.

4.  **Email Capture:**
    -   On the results page, the user has the option to enter their email to "capture" the report.
    -   This form submission creates a new entry in the `leads` table in Supabase, linking the lead to the report ID.

## Scalability

-   **Frontend:** The frontend is a static build served from Vercel's global CDN. This is highly scalable and can handle large amounts of traffic with low latency.
-   **Backend:** Supabase is built on top of PostgreSQL and is designed to be scalable. The free tier has limitations, but it can be upgraded to handle millions of requests. Since the most intensive work (the audit) is done on the client, the load on Supabase is minimal, primarily consisting of simple read/write operations.
-   **Bottlenecks:** The main potential bottleneck would be the client-side AI summary generation if a real AI model were integrated. This would involve API calls to a third-party service, which could be rate-limited or incur costs. The current implementation with a fallback summary mitigates this. The database is another potential bottleneck, but given the simple data model, it's unlikely to be an issue for a long time.
