// src/utils/pricingData.js

/**
 * This file centralizes all pricing and tool-specific data.
 * In a real-world application, this data would likely live in a database 
 * and be fetched at runtime to allow for dynamic updates without redeploying the app.
 */

export const pricingData = {
  "ChatGPT": {
    plans: {
      plus: { monthly_cost: 20 },
      team: { monthly_cost: 25 },
    },
    category: "General",
  },
  "GitHub Copilot": {
    plans: {
      individual: { monthly_cost: 10 },
      business: { monthly_cost: 19 },
    },
    category: "Coding",
  },
  "Cursor": {
    plans: {
      pro: { monthly_cost: 20 },
    },
    category: "Coding",
  },
  "Claude": {
    plans: {
      pro: { monthly_cost: 20 },
      team: { monthly_cost: 30, min_seats: 5 },
    },
    category: "Research",
  },
  "Gemini": {
    plans: {
      advanced: { monthly_cost: 20 },
    },
    category: "Research",
  },
  "OpenAI API": {
    category: "API",
  },
  "Anthropic API": {
    category: "API",
  },
  "Windsurf": { // Assuming this is a fictional or niche tool
    category: "General",
  }
};

export const toolCategories = {
  CODING: "Coding",
  RESEARCH: "Research",
  GENERAL: "General",
  API: "API",
};
