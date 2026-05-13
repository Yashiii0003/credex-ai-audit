# StackSave AI - Tests

This file outlines the testing strategy for the StackSave AI application, with a focus on the core audit engine. The tests are written in a format similar to `vitest` or `jest`.

To run these tests, you would typically have a `vitest.config.js` and run `npm test`.

### Testing the Audit Engine (`src/utils/auditEngine.js`)

The audit engine is the most critical piece of business logic in the application, making it the top priority for unit testing.

#### Test 1: Should suggest downgrading ChatGPT Team for a small team

This test ensures that the engine correctly identifies when a small team is using the more expensive ChatGPT Team plan instead of individual Plus plans.

```javascript
import { describe, it, expect } from 'vitest';
import { runAudit } from './src/utils/auditEngine';

describe('runAudit', () => {
  it('should suggest downgrading ChatGPT Team for a small team', () => {
    const formData = {
      teamSize: 2,
      tools: {
        'ChatGPT': {
          plan: 'Team',
          monthlySpend: 50, // 2 users * $25/user
          seats: 2,
        },
      },
    };

    const result = runAudit(formData);

    // 2 users * $20/user (Plus) = $40. Savings = $50 - $40 = $10
    expect(result.totalMonthlySavings).toBe(10);
    expect(result.totalAnnualSavings).toBe(120);
    expect(result.recommendations).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          tool: 'ChatGPT',
          recommendation: 'Consider switching 2 users to ChatGPT Plus plans instead of the Team plan.',
          savings: 10,
        }),
      ])
    );
  });
});
```

#### Test 2: Should not suggest changes for an optimized stack

This test verifies that the engine doesn't produce savings recommendations when the user's spending is already efficient.

```javascript
import { describe, it, expect } from 'vitest';
import { runAudit } from './src/utils/auditEngine';

describe('runAudit', () => {
  it('should return zero savings for an optimized stack', () => {
    const formData = {
      teamSize: 10,
      tools: {
        'GitHub Copilot': {
          plan: 'Business',
          monthlySpend: 190, // 10 users * $19/user
          seats: 10,
        },
      },
    };

    const result = runAudit(formData);

    expect(result.totalMonthlySavings).toBe(0);
    expect(result.recommendations).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                recommendation: "Your spending is already quite optimized!",
            }),
        ])
    );
  });
});
```

#### Test 3: Should suggest exploring bulk discounts for high API spend

This test checks the rule for high API usage, which should trigger a recommendation to investigate more cost-effective purchasing options.

```javascript
import { describe, it, expect } from 'vitest';
import { runAudit } from './src/utils/auditEngine';

describe('runAudit', () => {
  it('should recommend exploring discounts for high API spend', () => {
    const formData = {
      teamSize: 20,
      tools: {
        'OpenAI API': {
          plan: 'Pay-as-you-go',
          monthlySpend: 1500,
          seats: 20,
        },
      },
    };

    const result = runAudit(formData);

    // Assumes 10% savings potential
    expect(result.totalMonthlySavings).toBe(150);
    expect(result.recommendations).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          tool: 'OpenAI API',
          recommendation: 'Explore bulk credit purchases or committed use discounts for your OpenAI API usage.',
          savings: 150,
        }),
      ])
    );
  });
});
```

#### Test 4: Should handle multiple tools and aggregate savings correctly

This test ensures that the engine can process multiple tools in the same form and that the total savings are calculated correctly.

```javascript
import { describe, it, expect } from 'vitest';
import { runAudit } from './src/utils/auditEngine';

describe('runAudit', () => {
  it('should aggregate savings from multiple tools', () => {
    const formData = {
      teamSize: 3,
      tools: {
        'ChatGPT': {
          plan: 'Team',
          monthlySpend: 75, // 3 * $25
          seats: 3,
        },
        'OpenAI API': {
          plan: 'API',
          monthlySpend: 1200,
          seats: 3,
        },
      },
    };

    const result = runAudit(formData);

    // ChatGPT savings: (75 - (3 * 20)) = $15
    // API savings: 1200 * 0.1 = $120
    // Total = $135
    expect(result.totalMonthlySavings).toBe(135);
    expect(result.totalAnnualSavings).toBe(135 * 12);
    expect(result.recommendations.length).toBe(2);
  });
});
```

#### Test 5: Should return the "already optimized" message for low savings

This test ensures that if the calculated savings are minimal (less than $100), the engine provides an encouraging message instead of a minor recommendation.

```javascript
import { describe, it, expect } from 'vitest';
import { runAudit } from './src/utils/auditEngine';

describe('runAudit', () => {
  it('should show the optimized message if savings are very low', () => {
    const formData = {
      teamSize: 1,
      tools: {
        'ChatGPT': {
          plan: 'Team', // Technically an overspend, but a small one
          monthlySpend: 25,
          seats: 1,
        },
      },
    };

    const result = runAudit(formData);

    // Savings would be $5, which is less than the $100 threshold
    expect(result.totalMonthlySavings).toBe(5);
    expect(result.recommendations).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                recommendation: "Your spending is already quite optimized!",
            }),
        ])
    );
  });
});
```
