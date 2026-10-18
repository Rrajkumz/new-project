export interface PromptCriterionScore {
  name: string;
  score: number; // 0 - 20
  status: 'optimal' | 'moderate' | 'needs-work';
  feedback: string;
  suggestion: string;
}

export interface PromptAnalysisReport {
  overallScore: number; // 0 - 100
  ratingLabel: 'Production Ready' | 'Good Foundation' | 'Ambiguous' | 'High Risk of Drift';
  criteria: PromptCriterionScore[];
  detectedModelTarget: string;
  enhancedPrompt: string;
  missingElements: string[];
}

/**
 * Analyzes a raw prompt against frontier prompt engineering standards
 * and synthesizes a production-grade structured version.
 */
export function evaluateAndOptimizePrompt(rawPrompt: string): PromptAnalysisReport {
  const prompt = rawPrompt.trim();

  if (!prompt) {
    return {
      overallScore: 0,
      ratingLabel: 'High Risk of Drift',
      criteria: [
        { name: 'Role & Persona', score: 0, status: 'needs-work', feedback: 'No role or persona detected.', suggestion: 'Define who the model should act as.' },
        { name: 'Task Specificity', score: 0, status: 'needs-work', feedback: 'No prompt entered.', suggestion: 'Provide your core objective.' },
        { name: 'Context & Background', score: 0, status: 'needs-work', feedback: 'No background provided.', suggestion: 'Provide operational boundaries.' },
        { name: 'Output Schema', score: 0, status: 'needs-work', feedback: 'No formatting rules specified.', suggestion: 'Specify JSON, Markdown, or bullet list format.' },
        { name: 'Constraints & Guardrails', score: 0, status: 'needs-work', feedback: 'No negative constraints present.', suggestion: 'State what the model must never do.' },
      ],
      detectedModelTarget: 'Universal',
      enhancedPrompt: '',
      missingElements: ['Role', 'Task', 'Context', 'Format', 'Constraints'],
    };
  }

  const lower = prompt.toLowerCase();
  const missingElements: string[] = [];

  // 1. Role & Persona Assessment (0 - 20)
  let roleScore = 4;
  let roleFeedback = 'No explicit role or persona defined. Model will default to generic conversational tone.';
  let roleSuggestion = 'Add an explicit persona (e.g., "You are a Principal Software Architect with 15+ years experience...").';

  if (/\b(you are|act as|assume the role of|expert in|senior|principal|specialist|consultant)\b/i.test(prompt)) {
    roleScore = 18;
    roleFeedback = 'Clear persona detected, providing focused domain perspective.';
    roleSuggestion = 'Consider qualifying their specific domain standards or framework versions.';
  } else if (/\b(as a|pretend to be)\b/i.test(prompt)) {
    roleScore = 12;
    roleFeedback = 'Basic role mentioned, but could specify deeper expertise constraints.';
    roleSuggestion = 'Explicitly state the depth of knowledge (e.g. "Senior Staff Level").';
  } else {
    missingElements.push('Role / Persona');
  }

  // 2. Task Specificity Assessment (0 - 20)
  let taskScore = 8;
  let taskFeedback = 'General request detected, but action verb lacks tight boundaries.';
  let taskSuggestion = 'Use unambiguous imperative verbs: "Extract", "Refactor", "Synthesize", "Calculate".';

  const strongVerbs = /\b(refactor|synthesize|extract|transcribe|calculate|audit|validate|generate|convert|categorize|benchmark)\b/i;
  if (strongVerbs.test(prompt) && prompt.length > 50) {
    taskScore = 19;
    taskFeedback = 'Strong, actionable imperative directive with unambiguous intent.';
    taskSuggestion = 'Ensure task has defined acceptance criteria.';
  } else if (/\b(help me|write|tell me|make|create|give me)\b/i.test(prompt)) {
    taskScore = 12;
    taskFeedback = 'Conversational request; model may guess intermediate assumptions.';
    taskSuggestion = 'Replace generic "help me" with precise outcome requirements.';
  } else {
    missingElements.push('Strict Task Directive');
  }

  // 3. Context & Background Assessment (0 - 20)
  let contextScore = 6;
  let contextFeedback = 'Minimal operational context provided.';
  let contextSuggestion = 'Include target audience, environment (e.g. Node 22, React 19), or background situation.';

  if (prompt.length > 180 || /\b(context|background|target audience|environment|stack|domain|user is|prerequisites)\b/i.test(prompt)) {
    contextScore = 18;
    contextFeedback = 'Rich context provided; allows the model to anchor nuance accurately.';
    contextSuggestion = 'Separate context into its own Markdown block or XML tag.';
  } else if (prompt.length > 90) {
    contextScore = 13;
    contextFeedback = 'Moderate context provided.';
    contextSuggestion = 'Clarify edge cases or specific business environment constraints.';
  } else {
    missingElements.push('Operational Context');
  }

  // 4. Output Schema & Formatting (0 - 20)
  let formatScore = 5;
  let formatFeedback = 'No output structure specified. Output format will be unpredictable.';
  let formatSuggestion = 'Specify target syntax: "Output strictly valid JSON with keys { title, findings, diff }".';

  if (/\b(json|markdown|table|bullet points|schema|format:|xml|diff|yaml|csv)\b/i.test(prompt)) {
    formatScore = 20;
    formatFeedback = 'Clear structural output format specified (JSON, Markdown, or tables).';
    formatSuggestion = 'Provide a sample skeleton if strict key matching is critical.';
  } else if (/\b(list|steps|summary)\b/i.test(prompt)) {
    formatScore = 12;
    formatFeedback = 'General format mentioned (list/steps), but lacks syntax rigidity.';
    formatSuggestion = 'Specify whether output should be bulleted, numbered, or formatted as a table.';
  } else {
    missingElements.push('Output Schema / Format');
  }

  // 5. Constraints & Guardrails (0 - 20)
  let constraintScore = 4;
  let constraintFeedback = 'No negative guardrails detected. Model is prone to conversational filler and hallucinations.';
  let constraintSuggestion = 'Add negative constraints: "Do not explain your steps", "Never extrapolate beyond the text".';

  if (/\b(do not|never|avoid|without|restrict|strictly|no conversational|zero jargon|prohibit)\b/i.test(prompt)) {
    constraintScore = 19;
    constraintFeedback = 'Strong negative constraints present to prevent common failure modes.';
    constraintSuggestion = 'Ensure constraints do not contradict required output format.';
  } else if (/\b(only|keep it short|concise)\b/i.test(prompt)) {
    constraintScore = 11;
    constraintFeedback = 'Brevity requested, but missing safety and accuracy guardrails.';
    constraintSuggestion = 'Explicitly prohibit unsolicited commentary or speculation.';
  } else {
    missingElements.push('Negative Guardrails (Do Not)');
  }

  const overallScore = Math.min(100, roleScore + taskScore + contextScore + formatScore + constraintScore);

  let ratingLabel: PromptAnalysisReport['ratingLabel'] = 'Production Ready';
  if (overallScore < 50) ratingLabel = 'High Risk of Drift';
  else if (overallScore < 70) ratingLabel = 'Ambiguous';
  else if (overallScore < 85) ratingLabel = 'Good Foundation';

  // Helper to determine status
  const getStatus = (s: number): PromptCriterionScore['status'] => {
    if (s >= 16) return 'optimal';
    if (s >= 11) return 'moderate';
    return 'needs-work';
  };

  const criteria: PromptCriterionScore[] = [
    { name: 'Role & Persona', score: roleScore, status: getStatus(roleScore), feedback: roleFeedback, suggestion: roleSuggestion },
    { name: 'Task Actionability', score: taskScore, status: getStatus(taskScore), feedback: taskFeedback, suggestion: taskSuggestion },
    { name: 'Operational Context', score: contextScore, status: getStatus(contextScore), feedback: contextSuggestion, suggestion: contextSuggestion },
    { name: 'Output Schema', score: formatScore, status: getStatus(formatScore), feedback: formatFeedback, suggestion: formatSuggestion },
    { name: 'Guardrails & Constraints', score: constraintScore, status: getStatus(constraintScore), feedback: constraintFeedback, suggestion: constraintSuggestion },
  ];

  // Synthesize an optimized structured prompt
  const detectedSubject = prompt.slice(0, 100).replace(/\n/g, ' ').trim();
  const enhancedPrompt = `# Role
You are an authoritative domain expert and senior specialist with pragmatic, production-tested experience.

# Context & Objective
${prompt}

# Operational Directives
1. Execute the primary task methodically without skipping intermediary logical deductions.
2. Maintain high informational density and precise technical terminology.
3. Address any non-obvious failure modes or boundary conditions directly.

# Guardrails & Invariants
- DO NOT generate introductory pleasantries or closing boilerplate (e.g. "Certainly!", "I hope this helps").
- DO NOT invent unverified metrics, libraries, or citations. If uncertain, state the exact limitation.
- Strictly adhere to the requested schema.

# Expected Output Format
Deliver your response using clean, structured Markdown with clear section headers and concise bullet points where appropriate.`;

  return {
    overallScore,
    ratingLabel,
    criteria,
    detectedModelTarget: lower.includes('midjourney') ? 'Midjourney' : lower.includes('claude') ? 'Claude' : 'Universal',
    enhancedPrompt,
    missingElements,
  };
}
