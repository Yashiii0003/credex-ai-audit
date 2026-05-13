// src/utils/auditEngine.js

import { pricingData, toolCategories } from './pricingData';

const DEFAULT_CATEGORY = toolCategories.GENERAL;

const PLAN_RANK = {
  free: 0,
  basic: 1,
  individual: 2,
  plus: 3,
  pro: 3,
  advanced: 3,
  business: 4,
  team: 4,
  enterprise: 5,
};

const CATEGORY_FALLBACKS = [
  { category: toolCategories.API, patterns: ['api', 'openai', 'anthropic'] },
  { category: toolCategories.CODING, patterns: ['copilot', 'cursor', 'windsurf', 'code'] },
  { category: toolCategories.RESEARCH, patterns: ['claude', 'gemini', 'perplexity', 'research'] },
  { category: toolCategories.GENERAL, patterns: ['chatgpt', 'gpt', 'assistant'] },
];

const FALLBACK_PRICING = {
  [toolCategories.GENERAL]: {
    plans: {
      pro: { monthly_cost: 20 },
      team: { monthly_cost: 30, min_seats: 5 },
    },
  },
  [toolCategories.CODING]: {
    plans: {
      individual: { monthly_cost: 20 },
      business: { monthly_cost: 30, min_seats: 5 },
    },
  },
  [toolCategories.RESEARCH]: {
    plans: {
      pro: { monthly_cost: 20 },
      team: { monthly_cost: 30, min_seats: 5 },
    },
  },
};

const API_OPTIMIZATION_TIERS = [
  { minSpend: 10000, savingsRate: 0.22, label: 'contract pricing, caching, routing, and workload commitments' },
  { minSpend: 2000, savingsRate: 0.18, label: 'committed-use discounts, prompt caching, and model routing' },
  { minSpend: 500, savingsRate: 0.14, label: 'batching, cache reuse, and lower-cost model routing' },
  { minSpend: 150, savingsRate: 0.08, label: 'usage alerts, prompt trimming, and cheaper models for low-risk tasks' },
];

function toCurrency(value) {
  return `$${Math.round(value).toLocaleString()}`;
}

function toNumber(value, fallback = 0) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toSeats(teamSize) {
  return Math.max(1, Math.round(toNumber(teamSize, 1)));
}

function normalizePlan(plan) {
  return String(plan || '').trim().toLowerCase();
}

function inferCategory(toolName) {
  const normalizedName = String(toolName || '').toLowerCase();
  const match = CATEGORY_FALLBACKS.find(({ patterns }) =>
    patterns.some(pattern => normalizedName.includes(pattern))
  );

  return match?.category || DEFAULT_CATEGORY;
}

function getCatalogEntry(toolName) {
  const explicit = pricingData[toolName] || {};
  const category = explicit.category || inferCategory(toolName);
  const fallback = FALLBACK_PRICING[category] || {};

  return {
    name: toolName,
    category,
    plans: {
      ...(fallback.plans || {}),
      ...(explicit.plans || {}),
    },
  };
}

function getPlanRank(planName) {
  return PLAN_RANK[normalizePlan(planName)] ?? 99;
}

function getPlanOptions(priceInfo) {
  return Object.entries(priceInfo.plans || {})
    .map(([name, details]) => ({
      name,
      monthlyCost: toNumber(details?.monthly_cost),
      minSeats: toSeats(details?.min_seats || 1),
      rank: getPlanRank(name),
    }))
    .filter(plan => plan.monthlyCost > 0)
    .sort((a, b) => a.rank - b.rank || a.monthlyCost - b.monthlyCost);
}

function estimatePlanSpend(plan, seats) {
  if (!plan) return null;
  return Math.max(seats, plan.minSeats) * plan.monthlyCost;
}

function findCurrentPlan(planOptions, selectedPlan) {
  const normalized = normalizePlan(selectedPlan);

  return planOptions.find(plan => normalizePlan(plan.name) === normalized)
    || planOptions.find(plan => normalized.includes(normalizePlan(plan.name)))
    || null;
}

function findRightSizedPlan(planOptions, currentPlan, seats) {
  const currentRank = currentPlan?.rank ?? 99;

  return planOptions
    .filter(plan => plan.rank < currentRank || (currentPlan && plan.monthlyCost < currentPlan.monthlyCost))
    .filter(plan => seats >= plan.minSeats || plan.minSeats <= 5)
    .map(plan => ({ ...plan, estimatedSpend: estimatePlanSpend(plan, seats) }))
    .sort((a, b) => a.estimatedSpend - b.estimatedSpend)[0] || null;
}

function pushRecommendation(recommendations, recommendation) {
  const savings = Math.max(0, Math.round(toNumber(recommendation.savings)));
  if (savings < 10) return;

  recommendations.push({
    ...recommendation,
    savings,
  });
}

function buildToolInfo(tools) {
  return Object.keys(tools || {}).map(name => {
    const input = tools[name] || {};
    const priceInfo = getCatalogEntry(name);

    return {
      ...priceInfo,
      monthlySpend: Math.max(0, toNumber(input.monthlySpend)),
      selectedPlan: normalizePlan(input.plan),
    };
  });
}

function addPlanRecommendations(recommendations, toolInfo, seats) {
  for (const tool of toolInfo) {
    if (tool.monthlySpend <= 0) continue;

    const planOptions = getPlanOptions(tool);
    if (planOptions.length < 2) continue;

    const currentPlan = findCurrentPlan(planOptions, tool.selectedPlan)
      || planOptions
        .map(plan => ({ ...plan, estimatedSpend: estimatePlanSpend(plan, seats) }))
        .filter(plan => plan.estimatedSpend <= tool.monthlySpend * 1.25)
        .sort((a, b) => b.rank - a.rank || b.estimatedSpend - a.estimatedSpend)[0];

    if (!currentPlan || currentPlan.rank < PLAN_RANK.business) continue;

    const rightSizedPlan = findRightSizedPlan(planOptions, currentPlan, seats);
    if (!rightSizedPlan) continue;

    const practicalSavings = Math.min(
      tool.monthlySpend - rightSizedPlan.estimatedSpend,
      tool.monthlySpend * 0.65
    );

    pushRecommendation(recommendations, {
      tool: tool.name,
      recommendation: `Right-size ${tool.name} from ${currentPlan.name} to ${rightSizedPlan.name}.`,
      reasoning: `At ${seats} seat${seats === 1 ? '' : 's'}, the lower tier is a better fit unless you rely on admin controls, shared workspaces, or security features unique to the current plan.`,
      savings: practicalSavings,
      type: 'DOWNGRADE_PLAN',
    });
  }
}

function getConsolidationGroups(toolInfo) {
  const paidTools = toolInfo.filter(tool => tool.monthlySpend > 0);

  return [
    {
      category: toolCategories.CODING,
      label: 'coding assistants',
      tools: paidTools.filter(tool => tool.category === toolCategories.CODING),
    },
    {
      category: toolCategories.RESEARCH,
      label: 'research and writing tools',
      tools: paidTools.filter(tool => tool.category === toolCategories.RESEARCH),
    },
    {
      category: toolCategories.GENERAL,
      label: 'general AI assistants',
      tools: paidTools.filter(tool => tool.category === toolCategories.GENERAL),
    },
  ];
}

function addConsolidationRecommendations(recommendations, toolInfo) {
  for (const group of getConsolidationGroups(toolInfo)) {
    if (group.tools.length < 2) continue;

    const sortedBySpend = [...group.tools].sort((a, b) => b.monthlySpend - a.monthlySpend);
    const primary = sortedBySpend[0];
    const redundantTools = sortedBySpend.slice(1);
    const redundantSpend = redundantTools.reduce((total, tool) => total + tool.monthlySpend, 0);
    const migrationBuffer = Math.max(10, primary.monthlySpend * 0.1);
    const estimatedSavings = Math.max(0, redundantSpend * 0.8 - migrationBuffer);

    pushRecommendation(recommendations, {
      tool: sortedBySpend.map(tool => tool.name).join(', '),
      recommendation: `Consolidate ${group.label} around ${primary.name}.`,
      reasoning: `You are paying for ${group.tools.length} overlapping ${group.label}. Keep the strongest primary tool and retire or limit ${redundantTools.map(tool => tool.name).join(' and ')} after validating workflow coverage.`,
      savings: estimatedSavings,
      type: 'CONSOLIDATE_TOOLS',
    });
  }
}

function addApiRecommendations(recommendations, toolInfo) {
  const apiTools = toolInfo.filter(tool => tool.category === toolCategories.API && tool.monthlySpend > 0);

  for (const tool of apiTools) {
    const tier = API_OPTIMIZATION_TIERS.find(candidate => tool.monthlySpend >= candidate.minSpend);
    if (!tier) continue;

    pushRecommendation(recommendations, {
      tool: tool.name,
      recommendation: `Optimize ${tool.name} usage and pricing.`,
      reasoning: `At ${toCurrency(tool.monthlySpend)}/month, realistic savings usually come from ${tier.label}.`,
      savings: tool.monthlySpend * tier.savingsRate,
      type: 'OPTIMIZE_API',
    });
  }
}

function addFallbackRecommendations(recommendations, toolInfo, seats) {
  const paidTools = toolInfo.filter(tool => tool.monthlySpend > 0);
  if (paidTools.length === 0) return;

  const totalSpend = paidTools.reduce((total, tool) => total + tool.monthlySpend, 0);
  const spendPerSeat = totalSpend / seats;
  const uncategorizedPaidTools = paidTools.filter(tool => !pricingData[tool.name]);

  if (spendPerSeat > 75) {
    pushRecommendation(recommendations, {
      tool: paidTools.map(tool => tool.name).join(', '),
      recommendation: 'Review seat assignment and monthly usage before renewing.',
      reasoning: `${toCurrency(spendPerSeat)}/seat/month is high for a mixed AI stack. Remove inactive seats, convert occasional users to shared workflows where allowed, and require usage justification for premium tiers.`,
      savings: totalSpend * 0.12,
      type: 'OPTIMIZE_SEATS',
    });
  }

  if (uncategorizedPaidTools.length > 0) {
    pushRecommendation(recommendations, {
      tool: uncategorizedPaidTools.map(tool => tool.name).join(', '),
      recommendation: 'Validate pricing and ownership for tools outside the standard catalog.',
      reasoning: 'Some tools were not found in the pricing catalog, so the audit used category fallbacks. Confirm actual contract terms and remove duplicate or unowned subscriptions.',
      savings: uncategorizedPaidTools.reduce((total, tool) => total + tool.monthlySpend, 0) * 0.1,
      type: 'VERIFY_PRICING',
    });
  }
}

function dedupeAndPrioritizeRecommendations(recommendations) {
  const seen = new Set();

  return recommendations
    .sort((a, b) => b.savings - a.savings)
    .filter(recommendation => {
      const key = `${recommendation.type}:${recommendation.tool}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 6);
}

/**
 * Generates a personalized summary of the audit results.
 * @param {object} auditResults - The calculated results from the audit.
 * @param {object} formData - The original user input.
 * @returns {string} A personalized summary.
 */
function generateAISummary(auditResults, formData) {
  const { totalAnnualSavings, recommendations } = auditResults;
  const seats = toSeats(formData?.teamSize);

  if (recommendations.length === 0 || totalAnnualSavings < 120) {
    return `Your AI spending looks reasonably optimized for a team of ${seats}. The audit did not find a material savings opportunity from the current inputs.`;
  }

  const roundedSavings = Math.round(totalAnnualSavings / 100) * 100;
  const topRecommendation = recommendations[0];
  let summary = `For a team of ${seats}, the audit estimates about ${toCurrency(roundedSavings)} in annual savings. `;

  if (topRecommendation.type === 'DOWNGRADE_PLAN') {
    summary += `The strongest opportunity is right-sizing ${topRecommendation.tool} so you are not paying for higher-tier features the team may not need.`;
  } else if (topRecommendation.type === 'CONSOLIDATE_TOOLS') {
    summary += `The strongest opportunity is tool consolidation, especially where multiple products cover the same workflow.`;
  } else if (topRecommendation.type === 'OPTIMIZE_API') {
    summary += `The strongest opportunity is API cost control through usage optimization and pricing commitments.`;
  } else {
    summary += `The strongest opportunity is improving governance around seats, pricing, and renewal ownership.`;
  }

  return summary;
}

/**
 * The main audit function. It analyzes the user's tool stack and generates savings recommendations.
 * @param {object} formData - The user's input, including teamSize and tools.
 * @returns {object} A comprehensive audit report.
 */
export function runAudit(formData = {}) {
  const seats = toSeats(formData.teamSize);
  const tools = formData.tools || {};
  const recommendations = [];
  const toolInfo = buildToolInfo(tools);

  addPlanRecommendations(recommendations, toolInfo, seats);
  addConsolidationRecommendations(recommendations, toolInfo);
  addApiRecommendations(recommendations, toolInfo);
  addFallbackRecommendations(recommendations, toolInfo, seats);

  const prioritizedRecommendations = dedupeAndPrioritizeRecommendations(recommendations);
  const totalMonthlySavings = prioritizedRecommendations.reduce(
    (total, recommendation) => total + recommendation.savings,
    0
  );
  const totalAnnualSavings = totalMonthlySavings * 12;

  const auditResult = {
    totalMonthlySavings,
    totalAnnualSavings,
    recommendations: prioritizedRecommendations,
    createdAt: new Date().toISOString(),
    reportVersion: '2.0',
  };

  auditResult.aiSummary = generateAISummary(auditResult, formData);

  return auditResult;
}
