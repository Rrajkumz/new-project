import { Guide } from '../types';

export const GUIDES_DATA: Guide[] = [
  {
    id: 'prompt-engineering-masterclass',
    title: 'The 2026 Guide to Prompt Engineering: From Zero-Shot to Chain-of-Thought',
    slug: 'prompt-engineering-masterclass',
    subtitle: 'Systematic frameworks, markdown schema architectures, and temperature calibration for modern reasoning models.',
    category: 'Techniques & Craft',
    readTime: '7 min read',
    publishedDate: 'March 2026',
    author: {
      name: 'Elena Rostova',
      role: 'Staff AI Systems Architect',
    },
    coverImage: '/src/assets/images/guide_prompt_engineering_1792353407044.jpg',
    summary: 'Prompt engineering has evolved from vague conversational phrasing into structured, deterministic programming. Learn how to architect robust prompts with role decomposition, explicit boundary constraints, and few-shot formatting.',
    tags: ['Prompt Engineering', 'LLM Architecture', 'Chain-of-Thought', 'System Prompts'],
    sections: [
      {
        id: 'the-anatomy-of-a-production-prompt',
        heading: '1. The Anatomy of a Production-Grade Prompt',
        content: `Early adopters interacted with LLMs like search engines, entering loose fragments. High-reliability applications, however, demand structural decomposition. Every prompt should be separated into five distinct, unblended components:

1. **Role / Identity Persona**: Declares the operational expertise level, foundational perspective, and tone.
2. **Context & Invariants**: Outlines background constraints, domain rules, and immutable facts that the model must not violate.
3. **Primary Directive (Task)**: An active, single-action verb defining the exact transformation or synthesis required.
4. **Negative Constraints (Guardrails)**: What the model must NEVER do (e.g., "Do not extrapolate beyond the text", "Never use markdown bolding in data values").
5. **Output Specification (Schema)**: Precise syntactic targets such as JSON, Markdown table, or standardized XML tags.`,
        keyTakeaway: 'Structure beats length. Models perform significantly better when role, task, and constraints are visually isolated with clear Markdown headers.',
      },
      {
        id: 'chain-of-thought-and-scratchpads',
        heading: '2. Thinking Blocks: Zero-Shot vs. Structured Chain-of-Thought',
        content: `When models jump immediately to generating final tokens, they frequently commit to premature conclusions before calculating intermediary states. Introducing an explicit reasoning or "scratchpad" phase improves multi-step logic benchmarks by up to 34%.

In your prompts, instruct the model: "Before generating your final response, write out your step-by-step reasoning inside <thinking> tags. Once the logic is verified, provide only the final clean output inside <result> tags."

This allows the attention mechanism to attend back to its own intermediate deduction steps without contaminating the user-facing output payload.`,
        codeSnippet: {
          language: 'markdown',
          code: `# Role: Senior Security Auditor
## Objective: Review the following authentication middleware for race conditions.

<context>
Node.js 22 runtime, Redis session storage with 15-minute TTL.
</context>

<instructions>
1. Identify potential state mutations occurring outside of transactions.
2. Formulate 2 minimal reproduction cases.
3. Output final patches in standard unified diff format.
</instructions>

## Execution Flow
First, outline your chronological reasoning inside <thinking> blocks.
Then, emit the verified patch inside <diff> blocks.`,
          caption: 'Example of an isolated scratchpad prompt structure.',
        },
        keyTakeaway: 'Scratchpads and XML blocks isolate cognitive computation from final programmatic output.',
      },
      {
        id: 'few-shot-calibration',
        heading: '3. Few-Shot In-Context Learning: The Quality Multiplier',
        content: `Zero-shot prompts rely entirely on the model's pre-trained distribution. By supplying even 2 or 3 curated input-output demonstrations ("few-shot exemplars"), you anchor the stylistic nuance, token distribution, and strict edge-case handling.

Always ensure your exemplars contain edge cases: include an input where the appropriate response is "Unknown", "Data Insufficient", or an error state. This drastically mitigates overconfident hallucinations.`,
        keyTakeaway: 'Always include at least one negative or boundary exemplar in few-shot prompt libraries.',
      },
    ],
  },
  {
    id: 'extractive-vs-abstractive-summarization',
    title: 'Extractive vs. Abstractive Summarization: How NLP Works Under the Hood',
    slug: 'extractive-vs-abstractive-summarization',
    subtitle: 'Why extractive sentence scoring remains the gold standard for high-integrity, zero-hallucination document synthesis.',
    category: 'NLP & Algorithms',
    readTime: '6 min read',
    publishedDate: 'February 2026',
    author: {
      name: 'Dr. Marcus Vance',
      role: 'Principal NLP Researcher',
    },
    coverImage: '/src/assets/images/guide_nlp_architecture_1792353408231.jpg',
    summary: 'While modern generative transformers rewrite passages with abstractive prose, extractive algorithms like TextRank and TF-IDF sentence weighting preserve original source truth with mathematical precision and zero hallucination risk.',
    tags: ['NLP', 'Algorithms', 'Summarization', 'TF-IDF', 'Information Retrieval'],
    sections: [
      {
        id: 'the-two-paradigms',
        heading: '1. The Fundamental Architectural Divide',
        content: `Text summarization in computational linguistics is divided into two distinct paradigms:

- **Extractive Summarization**: Identifies and extracts the most salient, information-dense sentences directly from the source text without altering the original vocabulary. It is deterministic, mathematically verifiable, and immune to hallucination.
- **Abstractive Summarization**: Reads the source into an internal latent representation and generates novel sentences from scratch, akin to a human paraphrasing. While fluent, it introduces non-zero risk of subtle factual distortion, misattributed quotes, or statistical inversion.`,
        keyTakeaway: 'For medical, legal, and financial audits where verbatim accuracy is mandatory, extractive summarization is structurally superior to generative LLM paraphrasing.',
      },
      {
        id: 'sentence-graph-algorithms',
        heading: '2. Mechanics of Graph-Based Sentence Weighting',
        content: `Our in-browser summarizer uses an optimized client-side scoring pipeline combining three core heuristics:

1. **Term Frequency-Inverse Document Frequency (TF-IDF)**: Sentences containing rare domain-specific words (high TF-IDF) are scored higher than sentences dominated by general vocabulary.
2. **Positional Lead Bias**: Journalistic and academic texts overwhelmingly place core thesis statements in the initial 20% of sections. Sentences at the beginning of paragraphs receive a mathematical multiplier.
3. **Named Entity Density**: Capitalized proper nouns, figures, and technical acronyms reflect high informational payload and boost the sentence salience score.`,
        codeSnippet: {
          language: 'typescript',
          code: `// Conceptual sentence scoring heuristic
function scoreSentence(sentence: string, wordFrequencies: Map<string, number>, position: number): number {
  const words = tokenize(sentence.toLowerCase());
  let tfScore = 0;
  
  for (const word of words) {
    if (!STOP_WORDS.has(word)) {
      tfScore += (wordFrequencies.get(word) || 0);
    }
  }
  
  // Positional weight: early paragraph sentences carry higher thesis weight
  const positionalBoost = 1 / Math.sqrt(position + 1);
  return (tfScore / Math.max(words.length, 5)) * (1 + 0.4 * positionalBoost);
}`,
          caption: 'Pure client-side extractive sentence scoring heuristic.',
        },
        keyTakeaway: 'Extractive NLP scoring operates in milliseconds inside the client browser with zero network latency and total data privacy.',
      },
    ],
  },
  {
    id: 'choosing-the-right-ai-model',
    title: 'Choosing the Right AI Model: Latency, Reasoning, and Context Windows',
    slug: 'choosing-the-right-ai-model',
    subtitle: 'A practical framework for evaluating cost-per-token, time-to-first-token (TTFT), and cognitive reasoning demands.',
    category: 'Architecture',
    readTime: '5 min read',
    publishedDate: 'January 2026',
    author: {
      name: 'Kai Takahashi',
      role: 'Cloud AI Infrastructure Lead',
    },
    summary: 'Not every task warrants an expensive frontier reasoning model. Explore the matrix of small fast models (Flash, Haiku, Mini) versus high-capacity reasoning architectures for enterprise workloads.',
    tags: ['Model Selection', 'Benchmarks', 'Latency', 'Token Economics'],
    sections: [
      {
        id: 'the-three-tiers',
        heading: '1. The Modern Three-Tier Model Hierarchy',
        content: `Current generative AI models fall cleanly into three functional operational tiers:

- **Tier 1: High-Speed Sub-Second Engines (Gemini Flash, Claude 3.5 Haiku, GPT-4o Mini)**: Optimized for sub-300ms time-to-first-token. Ideal for inline autocomplete, real-time classification, routing, and UI micro-interactions.
- **Tier 2: Workhorse Generalists (Claude 3.5 Sonnet, GPT-4o)**: The default for software engineering, multi-turn reasoning, creative writing, and complex schema parsing.
- **Tier 3: Extended Reasoning & Massive Context (o1, Gemini 1.5 Pro)**: Designed for multi-million token ingestion (entire code repositories, archival books) or autonomous multi-step reasoning.`,
        keyTakeaway: 'Always benchmark your application with a Tier 1 fast model first. Only escalate to Tier 2 or 3 if semantic accuracy fails validation.',
      },
      {
        id: 'cost-and-latency-tradeoffs',
        heading: '2. Latency vs. Reasoning Trade-offs in User Interfaces',
        content: `In interactive applications, a 1.5-second latency delay causes noticeable user drop-off. If a feature only requires extracting 3 tags from a paragraph, calling a large reasoning model creates unnecessary delay and burns compute cost.

For high-throughput applications, implement a tiered fallback: try a fast local or edge model first, and fall back to heavy cloud reasoning only when confidence falls below 85%.`,
        keyTakeaway: 'User perceived speed often matters more than marginal increments in benchmark nuance.',
      },
    ],
  },
  {
    id: 'client-side-ai-privacy',
    title: 'Client-Side AI vs. Cloud APIs: Privacy, Cost, and Architecture',
    slug: 'client-side-ai-privacy',
    subtitle: 'Why the next wave of developer tooling runs NLP models and heuristics entirely within the user browser runtime.',
    category: 'Privacy & Security',
    readTime: '6 min read',
    publishedDate: 'March 2026',
    author: {
      name: 'Sophia Patel',
      role: 'Privacy Engineering Advocate',
    },
    summary: 'Cloud AI models offer immense linguistic fluency, but send proprietary enterprise IP and private customer data to remote servers. Discover why client-side browser NLP is surging for privacy-conscious workflows.',
    tags: ['Privacy', 'Edge Computing', 'Client-Side', 'Security', 'GDPR'],
    sections: [
      {
        id: 'the-cloud-dilemma',
        heading: '1. The Data Security Challenge with Cloud APIs',
        content: `Every time a user pastes confidential text, financial statements, or internal code into a cloud AI assistant, sensitive data leaves their device. Even with zero-data-retention enterprise SLAs, regulatory bodies (GDPR, HIPAA, SOC 2) require stringent data processing audits.

Client-side execution solves this at the architectural root: because computation takes place in WebAssembly, JavaScript, or WebGPU directly on the client machine, no payload ever crosses the network boundary.`,
        keyTakeaway: 'Client-side processing provides mathematical proof of privacy: if no packets are sent over the wire, zero data can be intercepted.',
      },
      {
        id: 'hybrid-architectures',
        heading: '2. The Emerging Hybrid Architecture',
        content: `Modern applications are moving toward a hybrid posture:
1. **Local Pre-Flight**: Fast client-side regex, TF-IDF summarization, and rule-based linguistic checking occur instantly in the browser.
2. **Selective Escalation**: Only sanitized or user-approved tasks that strictly demand frontier reasoning are dispatched to cloud APIs.

This drastically cuts API operational expenditure while offering users uncompromised peace of mind.`,
        keyTakeaway: 'Smart applications do client-side pre-processing first, preserving user confidentiality and saving compute budgets.',
      },
    ],
  },
  {
    id: 'developers-ai-stack',
    title: 'The Developer AI Stack: Copilots, Autonomous Agents & Spec-Driven Dev',
    slug: 'developers-ai-stack',
    subtitle: 'How high-velocity engineering teams pair Cursor, GitHub Copilot, and specification docs to build 5x faster.',
    category: 'Engineering',
    readTime: '7 min read',
    publishedDate: 'February 2026',
    author: {
      name: 'David Chen',
      role: 'DevOps & Tooling Architect',
    },
    summary: 'AI code editors are only as effective as the engineering context they are provided. Learn how to write tight specification files, utilize codebase indexing, and maintain clean software architecture with AI pair programmers.',
    tags: ['Developer Tools', 'Cursor', 'Copilot', 'Software Engineering', 'Productivity'],
    sections: [
      {
        id: 'spec-driven-development',
        heading: '1. Specification-Driven AI Engineering',
        content: `The most common mistake engineers make with AI copilots is prompting blindly without documentation. An AI copilot is essentially a compiler that translates natural language specifications into TypeScript or Go.

If your specification lacks clear database schemas, interface types, and error invariants, the AI will guess—and introduce architectural drift. Writing an exhaustive \`spec.md\` or maintaining strict TypeScript types before generating code eliminates 90% of copilot hallucinations.`,
        keyTakeaway: 'Write the types and the spec first. Let the AI implement the boilerplate between the lines.',
      },
      {
        id: 'codebase-indexing-best-practices',
        heading: '2. Maximizing Repository Context in Modern IDEs',
        content: `Modern AI editors like Cursor and Copilot Workspace construct local vector embeddings over your repository files. To maximize their accuracy:
- Keep files modular and under 300 lines of code.
- Write descriptive function and type names (avoiding cryptic single-letter abbreviations).
- Maintain an updated \`.cursorrules\` or \`AI_GUIDELINES.md\` file detailing your framework versions, state management patterns, and forbidden anti-patterns.`,
        keyTakeaway: 'Well-structured codebases produce vastly superior AI completions than monolithic legacy files.',
      },
    ],
  },
];
