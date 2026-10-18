export type ToolCategory =
  | 'All'
  | 'Coding & Dev'
  | 'Writing & Content'
  | 'Image & Design'
  | 'Audio & Speech'
  | 'Video & Motion'
  | 'Productivity & Search'
  | 'Research & Data';

export type ToolPricing = 'All' | 'Free' | 'Freemium' | 'Paid' | 'Open Source';

export interface AITool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: Exclude<ToolCategory, 'All'>;
  pricing: Exclude<ToolPricing, 'All'>;
  website: string;
  features: string[];
  pros: string[];
  cons: string[];
  rating: number;
  ratingCount: number;
  popular?: boolean;
  featured?: boolean;
  isOpenSource?: boolean;
  primaryUse: string;
  releaseYear: number;
}

export interface GuideSection {
  id: string;
  heading: string;
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
    caption?: string;
  };
  keyTakeaway?: string;
}

export interface Guide {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  category: string;
  readTime: string;
  publishedDate: string;
  author: {
    name: string;
    role: string;
  };
  coverImage?: string;
  summary: string;
  sections: GuideSection[];
  tags: string[];
}

export interface PromptTemplate {
  id: string;
  title: string;
  category: 'Development' | 'Writing' | 'Marketing' | 'Research' | 'Design' | 'System Architecture';
  targetModel: 'Universal' | 'Gemini' | 'Claude' | 'ChatGPT' | 'Midjourney' | 'Cursor';
  description: string;
  prompt: string;
  variables: string[];
  tips: string;
  tags: string[];
}

export interface WritingMetrics {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
  fleschReadingEase: number;
  fleschKincaidGrade: number;
  averageSentenceLength: number;
  passiveVoiceCount: number;
  fillerWordCount: number;
  complexWordCount: number;
}

export interface TextTone {
  formality: 'Casual' | 'Neutral' | 'Formal' | 'Highly Academic';
  formalityScore: number; // 0 - 100
  sentiment: 'Negative' | 'Neutral' | 'Positive';
  sentimentScore: number; // -1 to 1
  confidenceScore: number; // 0 - 100
}

export interface SummaryResult {
  originalWordCount: number;
  summaryWordCount: number;
  compressionRatio: number;
  sentences: string[];
  bulletPoints: string[];
  keyConcepts: { word: string; count: number; score: number }[];
  highlightedIndices: number[];
}

export interface UserSubmittedTool {
  name: string;
  website: string;
  category: string;
  pricing: string;
  tagline: string;
  description: string;
}
