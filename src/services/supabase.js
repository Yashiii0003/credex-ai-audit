import { createClient } from '@supabase/supabase-js';

// Use environment variables for Supabase credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase URL or Anon Key is missing. Supabase features will be disabled.");
}

// Export the client, which will be null if credentials are not provided
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

/**
 * Saves a lead (email, company, role, team size) to Supabase.
 * Includes basic validation and error handling.
 * @param {object} leadData - Object containing email, company_name, role, team_size, report_id.
 * @returns {object} { success: boolean, message: string }
 */
export async function saveLead(leadData) {
  if (!supabase) {
    return { success: false, message: "Supabase is not configured." };
  }

  const { email, company_name, role, team_size, report_id } = leadData;

  // Basic email validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: "Please provide a valid email address." };
  }

  try {
    // Attempt to insert the lead data
    // For duplicate submissions, you'd typically have a unique constraint on the 'email' column
    // in your Supabase table, and use .upsert() or .insert(..., { onConflict: 'email' })
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          email,
          company_name,
          role,
          team_size,
          report_id,
        },
      ])
      .select(); // Select the inserted data to confirm

    if (error) {
      // Handle specific Supabase errors, e.g., duplicate key error
      if (error.code === '23505') { // PostgreSQL unique violation error code
        return { success: false, message: "This email has already been submitted." };
      }
      console.error("Supabase lead save error:", error);
      return { success: false, message: `Failed to save lead: ${error.message}` };
    }

    return { success: true, message: "Lead saved successfully!", data };
  } catch (err) {
    console.error("Unexpected error saving lead:", err);
    return { success: false, message: "An unexpected error occurred." };
  }
}

// --- Conceptual Improvements (Server-side/Database) ---
// Rate Limiting:
// For production, client-side lead capture should be protected by server-side rate limiting
// (e.g., using Supabase Edge Functions, a Vercel serverless function, or a proxy)
// to prevent abuse and spam. This cannot be effectively done purely client-side.

// Duplicate Submissions:
// Ensure your 'leads' table in Supabase has a UNIQUE constraint on the 'email' column
// to prevent duplicate entries at the database level. The saveLead function above
// includes basic handling for the error code, but the constraint must be set in Supabase.
