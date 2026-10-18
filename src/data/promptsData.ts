import { PromptTemplate } from '../types';

export const PROMPTS_DATA: PromptTemplate[] = [
  {
    id: 'fullstack-refactor',
    title: 'Codebase Modernizer & TypeScript Strictness Refactor',
    category: 'Development',
    targetModel: 'Claude',
    description: 'Audits existing code for implicit any, mutation side-effects, outdated syntax, and generates pristine TypeScript interfaces with exhaustive error handling.',
    prompt: `You are a Principal Software Architect specializing in TypeScript 5+, React 19, and Node.js best practices.

Task:
Refactor the provided code snippet to achieve strict type safety, zero 'any' casts, and modern ergonomic patterns.

Rules & Invariants:
1. Replace all implicit or explicit 'any' with narrow discriminated unions or generics.
2. Eliminate mutable variables (let) where functional transformations (map, reduce, filter) improve readability.
3. Add exhaustive switch/case runtime exhaustiveness checks using never.
4. Keep functions pure and decoupled from global state.
5. Provide a concise bulleted changelog before outputting the refactored code.

Input Code:
{{CODE_SNIPPET}}`,
    variables: ['CODE_SNIPPET'],
    tips: 'Include your tsconfig target and any external state management library used in the context.',
    tags: ['TypeScript', 'Refactoring', 'Clean Code', 'Architecture'],
  },
  {
    id: 'api-contract-specifier',
    title: 'OpenAPI 3.1 & Schema Contract Synthesizer',
    category: 'Development',
    targetModel: 'Universal',
    description: 'Generates robust RESTful API contracts with complete response status codes, error payload schemas, and realistic validation constraints.',
    prompt: `You are an API Platform Engineer. Design a complete OpenAPI 3.1 specification for the requested service feature.

Feature Description:
{{FEATURE_REQUIREMENTS}}

Specifications Required:
- Paths, HTTP methods, and semantic REST naming.
- Request body JSON schema with strict validation rules (minLength, patterns, required arrays).
- Response payloads for 200/201, 400 Bad Request, 401 Unauthorized, 404 Not Found, and 429 Rate Limited.
- Realistic mock example payloads for each response.
- Standard RFC 7807 problem details schema for errors.`,
    variables: ['FEATURE_REQUIREMENTS'],
    tips: 'Specify whether authentication is Bearer JWT or session cookie.',
    tags: ['API', 'OpenAPI', 'Backend', 'Contracts'],
  },
  {
    id: 'sql-query-optimizer',
    title: 'PostgreSQL Query Planner & Index Optimizer',
    category: 'Development',
    targetModel: 'Universal',
    description: 'Analyzes slow SQL queries, calculates execution plan bottlenecks, and suggests precise composite B-Tree or GIN indexes.',
    prompt: `You are a Database Performance Engineer with deep expertise in PostgreSQL 16 internals and EXPLAIN ANALYZE interpretation.

Query to optimize:
{{SQL_QUERY}}

Table Schema & Existing Indexes:
{{SCHEMA_DDL}}

Analyze the query and provide:
1. Root cause of potential sequential scans or buffer cache thrashing.
2. Suggested composite indexes or partial indexes with CREATE INDEX statements.
3. Rewritten SQL query utilizing CTEs or window functions if subqueries are suboptimal.
4. Estimated latency reduction rationale.`,
    variables: ['SQL_QUERY', 'SCHEMA_DDL'],
    tips: 'Providing the table row count estimates helps produce exact index recommendations.',
    tags: ['SQL', 'PostgreSQL', 'Performance', 'Database'],
  },
  {
    id: 'executive-summary-synthesizer',
    title: 'C-Suite Executive Memo & Decision Framework',
    category: 'Writing',
    targetModel: 'Universal',
    description: 'Distills complex multi-page operational or financial reports into a structured 1-page executive decision memo.',
    prompt: `You are a Chief of Staff at a Fortune 500 technology organization.

Task:
Synthesize the provided operational briefing into an actionable 1-page executive memo for executive leadership.

Structure:
1. Executive Summary (Max 3 sentences: What changed, why it matters now, primary recommendation).
2. Key Metrics & Financial Impact (Tabular format: Metric | Prior | Current | Delta %).
3. Strategic Risks & Dependencies (Numbered list in descending order of severity).
4. Recommended Next Steps with Owners and 30-day milestones.

Tone: Decisive, concise, zero corporate jargon, high density.

Source Text:
{{SOURCE_DOCUMENT}}`,
    variables: ['SOURCE_DOCUMENT'],
    tips: 'Paste raw financial figures or project notes for crisp tabular alignment.',
    tags: ['Executive', 'Memo', 'Business', 'Writing'],
  },
  {
    id: 'technical-blog-post',
    title: 'Engineering Deep-Dive Article with Architecture Schematics',
    category: 'Writing',
    targetModel: 'Claude',
    description: 'Drafts an authoritative, developer-focused technical blog post with code examples, benchmarks, and architectural tradeoffs.',
    prompt: `You are a Principal Developer Advocate writing a technical publication for an audience of senior engineers.

Topic:
{{TECHNICAL_TOPIC}}

Core Requirements:
- Engaging headline that focuses on concrete engineering outcomes (e.g. "How We Reduced P99 Latency from 800ms to 45ms").
- Problem formulation: Why naive approaches fail at scale.
- Architectural diagram described in clean ASCII or text box format.
- Real production-grade code example with explicit comments explaining non-obvious nuances.
- Benchmark or measurement section highlighting trade-offs.
- Final takeaway checklist.

Tone: Authoritative, pragmatic, developer-to-developer, devoid of generic buzzwords.`,
    variables: ['TECHNICAL_TOPIC'],
    tips: 'Mention the specific framework or language version you are targeting.',
    tags: ['Blogging', 'Engineering', 'Developer Relations', 'Technical Writing'],
  },
  {
    id: 'b2b-cold-email',
    title: 'Hyper-Personalized B2B Value Proposition Email',
    category: 'Marketing',
    targetModel: 'Universal',
    description: 'Writes tight, non-spammy cold outreach emails that highlight verified prospect pain points in under 90 words.',
    prompt: `You are a B2B Sales Strategist known for high response rate outreach that respects executive time.

Prospect Information:
Name: {{PROSPECT_NAME}}
Company: {{PROSPECT_COMPANY}}
Recent Trigger Event or Initiative: {{TRIGGER_EVENT}}
Our Solution: {{OFFER_DESCRIPTION}}

Constraints:
- Word count: Strictly between 65 and 90 words.
- Structure:
  1. No greeting formalities like "Hope you're having a great week". Lead directly with the trigger observation.
  2. One sentence highlighting the common bottleneck associated with that trigger.
  3. One quantifiable case proof (e.g. "Reduced ramp time by 3.2 weeks for similar Series B engineering teams").
  4. Low-friction call-to-action ("Open to seeing a 2-minute video walkthrough?").
- Tone: Peer-to-peer, consultative, zero sales hype.`,
    variables: ['PROSPECT_NAME', 'PROSPECT_COMPANY', 'TRIGGER_EVENT', 'OFFER_DESCRIPTION'],
    tips: 'Avoid aggressive calendar links in cold email 1; ask for interest first.',
    tags: ['Sales', 'Cold Outreach', 'Email', 'B2B'],
  },
  {
    id: 'midjourney-cinematic-v6',
    title: 'Midjourney v6 Photorealistic Cinematic Director',
    category: 'Design',
    targetModel: 'Midjourney',
    description: 'Generates production-ready Midjourney v6 prompts with authentic lens specifications, lighting ratios, color palettes, and aspect ratios.',
    prompt: `Cinematic wide-angle film still of {{SCENE_SUBJECT}}, captured on 35mm Panavision Primo lenses, Kodak Vision3 500T 5219 film stock, subtle natural halation, natural volumetric morning sidelight through architectural concrete louvers, shallow depth of field, f/2.0 aperture, muted color grading with deep obsidian shadows and warm ochre highlights, directed by Denis Villeneuve, authentic grain texture, 8k resolution --ar 16:9 --style raw --v 6.0`,
    variables: ['SCENE_SUBJECT'],
    tips: 'Replace scene subject with physical textures, materials, and concrete emotional states.',
    tags: ['Midjourney', 'Photorealism', 'Cinematography', 'Image Prompt'],
  },
  {
    id: 'system-prompt-assistant',
    title: 'Autonomous AI Agent System Prompt Architect',
    category: 'System Architecture',
    targetModel: 'Universal',
    description: 'Builds iron-clad system prompts with behavioral invariants, fallback protocols, and security guardrails against prompt injection.',
    prompt: `You are an AI Security and Systems Prompt Engineer.

Design a comprehensive system prompt for an autonomous AI assistant serving the following role:
{{ASSISTANT_ROLE}}

Required Framework:
# SYSTEM DIRECTIVE & OPERATIONAL IDENTITY
Define role boundary, capabilities, and explicit limits.

# COGNITIVE INVARIANTS
Immutable constraints the model must never break regardless of user persuasion.

# ANTI-INJECTION & SAFETY GUARDRAILS
Instructions on how to refuse prompt extraction, role overrides, or malicious system resets.

# FORMATTING AND SCHEMA SPECIFICATION
Default response template, code formatting rules, and citation standard.

# ERROR HANDLING & UNCERTAINTY
Explicit behavioral mandate when user queries lack necessary context or contradict known facts.`,
    variables: ['ASSISTANT_ROLE'],
    tips: 'Use XML tags or Markdown sectioning to prevent the agent from mixing instructions with context.',
    tags: ['System Prompts', 'Security', 'Agent Architecture', 'Guardrails'],
  },
];
