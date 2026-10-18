import { TextTone, WritingMetrics } from '../types';

// Standard English stop words
export const COMMON_STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t',
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
  'can', 'can\'t', 'cannot', 'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing',
  'don\'t', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t',
  'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers',
  'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if',
  'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more', 'most', 'mustn\'t',
  'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our',
  'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s',
  'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs',
  'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re',
  'they\'ve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t',
  'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s',
  'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t',
  'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself',
  'yourselves'
]);

// Common corporate clichés & wordy fillers with direct cleaner replacements
export const FILLER_PHRASES: { phrase: string; replacement: string; reason: string }[] = [
  { phrase: 'in order to', replacement: 'to', reason: 'Wordy filler. "To" expresses identical intent.' },
  { phrase: 'due to the fact that', replacement: 'because', reason: 'Unnecessary padding.' },
  { phrase: 'at the end of the day', replacement: 'ultimately', reason: 'Overused corporate cliché.' },
  { phrase: 'needless to say', replacement: '', reason: 'If it is needless to say, do not say it.' },
  { phrase: 'at this point in time', replacement: 'now', reason: 'Overcomplicated temporal phrase.' },
  { phrase: 'circle back', replacement: 'revisit', reason: 'Corporate jargon.' },
  { phrase: 'touch base', replacement: 'contact', reason: 'Casual corporate cliché.' },
  { phrase: 'utilize', replacement: 'use', reason: 'Inflated vocabulary. "Use" is clearer.' },
  { phrase: 'utilization', replacement: 'use', reason: 'Nominalization. Prefer active verbs.' },
  { phrase: 'leverage', replacement: 'use', reason: 'Often overused as a vague buzzword.' },
  { phrase: 'synergy', replacement: 'collaboration', reason: 'Tired corporate buzzword.' },
  { phrase: 'paradigm shift', replacement: 'major change', reason: 'Overused hype term.' },
  { phrase: 'low hanging fruit', replacement: 'easy wins', reason: 'Corporate cliché.' },
  { phrase: 'first and foremost', replacement: 'first', reason: 'Redundant pairing.' },
  { phrase: 'completely eliminate', replacement: 'eliminate', reason: 'Eliminate is already absolute.' },
  { phrase: 'very unique', replacement: 'unique', reason: 'Unique is an absolute state; cannot be "very".' },
  { phrase: 'facilitate', replacement: 'help', reason: 'Academic jargon.' },
  { phrase: 'commence', replacement: 'begin', reason: 'Stilted language.' },
  { phrase: 'terminate', replacement: 'end', reason: 'Formalism where simple verbs work better.' },
  { phrase: 'endeavor to', replacement: 'try to', reason: 'Unnecessarily archaic.' },
  { phrase: 'with regards to', replacement: 'regarding', reason: 'Wordy preposition.' },
  { phrase: 'in the event that', replacement: 'if', reason: 'Inflated conditional phrase.' },
  { phrase: 'a large number of', replacement: 'many', reason: 'Wordy quantifier.' },
  { phrase: 'for the purpose of', replacement: 'for', reason: 'Padding phrase.' },
];

// Complex words dictionary with simple English alternatives
export const COMPLEX_WORDS: Record<string, string> = {
  cognizant: 'aware',
  ascertain: 'find out',
  delineate: 'describe',
  disseminate: 'spread',
  elucidate: 'clarify',
  expeditious: 'quick',
  implementation: 'launch',
  juxtaposition: 'contrast',
  multifaceted: 'complex',
  promulgate: 'announce',
  remuneration: 'pay',
  substantiate: 'prove',
  ubiquitous: 'widespread',
  ameliorate: 'improve',
};

// Hedging terms that reduce confidence
export const HEDGING_WORDS = new Set([
  'maybe', 'perhaps', 'possibly', 'somewhat', 'might', 'could', 'seem', 'seems',
  'fairly', 'likely', 'presumably', 'arguably', 'apparent', 'supposedly', 'kinda', 'sorta'
]);

// Assertive terms indicating high confidence
export const ASSERTIVE_WORDS = new Set([
  'demonstrates', 'confirms', 'proves', 'definitively', 'concludes', 'measured',
  'verified', 'guaranteed', 'established', 'evident', 'unquestionably', 'precisely', 'clearly'
]);

// Positive and negative sentiment lexicons
export const POSITIVE_SENTIMENT = new Set([
  'excellent', 'outstanding', 'superior', 'effective', 'efficient', 'reliable',
  'great', 'good', 'improved', 'breakthrough', 'success', 'successful', 'exceptional',
  'innovative', 'optimal', 'robust', 'seamless', 'delightful', 'clear', 'streamlined',
  'fast', 'valuable', 'gain', 'positive', 'beneficial', 'pioneering', 'resilient'
]);

export const NEGATIVE_SENTIMENT = new Set([
  'failure', 'failed', 'broken', 'slow', 'bottleneck', 'inefficient', 'error',
  'bug', 'vulnerability', 'severe', 'terrible', 'bad', 'poor', 'degraded', 'regression',
  'flaw', 'risk', 'danger', 'costly', 'problem', 'unstable', 'outdated', 'latency',
  'frustration', 'difficult', 'tedious', 'loss'
]);

/**
 * Counts syllables in an English word using phonetic heuristics
 */
export function countSyllables(word: string): number {
  const cleaned = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!cleaned) return 0;
  if (cleaned.length <= 3) return 1;

  // Remove common trailing non-syllables
  let formatted = cleaned
    .replace(/(?:[^laeiouy]|ed|es|e)$/, '')
    .replace(/^y/, '');

  if (formatted.length === 0) return 1;

  const matches = formatted.match(/[aeiouy]{1,2}/g);
  return matches ? Math.max(1, matches.length) : 1;
}

/**
 * Splits text into individual sentences accurately handling decimal numbers & abbreviations
 */
export function splitSentences(text: string): string[] {
  if (!text || !text.trim()) return [];
  // Negative lookbehind prevents splitting on common abbreviations like e.g., i.e., Dr., etc.
  const regex = /(?<=[.?!])\s+(?=[A-Z0-9])/g;
  return text
    .split(regex)
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

/**
 * Tokenizes text into lowercase clean words
 */
export function tokenizeWords(text: string): string[] {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^a-z0-9'\s-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 0);
}

/**
 * Detects passive voice constructions in sentences
 */
export function detectPassiveVoice(sentences: string[]): { sentenceIndex: number; text: string; match: string }[] {
  const passivePattern = /\b(am|is|are|was|were|be|been|being)\s+([a-z]+ed|done|seen|taken|written|built|chosen|given|made|known|held|found)\b/i;
  const results: { sentenceIndex: number; text: string; match: string }[] = [];

  sentences.forEach((s, idx) => {
    const match = s.match(passivePattern);
    if (match) {
      results.push({
        sentenceIndex: idx,
        text: s,
        match: match[0],
      });
    }
  });

  return results;
}

/**
 * Detects filler phrases in text
 */
export function detectFillers(text: string): { phrase: string; replacement: string; reason: string; index: number }[] {
  const lower = text.toLowerCase();
  const results: { phrase: string; replacement: string; reason: string; index: number }[] = [];

  for (const item of FILLER_PHRASES) {
    let pos = 0;
    while ((pos = lower.indexOf(item.phrase, pos)) !== -1) {
      // Ensure word boundary
      const before = pos === 0 || /\s|[.,;!?]/.test(lower[pos - 1]);
      const after = pos + item.phrase.length >= lower.length || /\s|[.,;!?]/.test(lower[pos + item.phrase.length]);
      if (before && after) {
        results.push({
          phrase: item.phrase,
          replacement: item.replacement,
          reason: item.reason,
          index: pos,
        });
      }
      pos += item.phrase.length;
    }
  }

  return results;
}

/**
 * Computes full writing metrics (Flesch, Grade, words, reading time)
 */
export function analyzeWriting(text: string): { metrics: WritingMetrics; tone: TextTone; passiveList: { text: string; match: string }[]; fillersList: { phrase: string; replacement: string; reason: string }[] } {
  if (!text.trim()) {
    return {
      metrics: {
        words: 0,
        characters: 0,
        charactersNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTimeMinutes: 0,
        speakingTimeMinutes: 0,
        fleschReadingEase: 100,
        fleschKincaidGrade: 0,
        averageSentenceLength: 0,
        passiveVoiceCount: 0,
        fillerWordCount: 0,
        complexWordCount: 0,
      },
      tone: {
        formality: 'Neutral',
        formalityScore: 50,
        sentiment: 'Neutral',
        sentimentScore: 0,
        confidenceScore: 50,
      },
      passiveList: [],
      fillersList: [],
    };
  }

  const words = tokenizeWords(text);
  const sentences = splitSentences(text);
  const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0);

  const totalWords = words.length || 1;
  const totalSentences = sentences.length || 1;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;

  let totalSyllables = 0;
  let complexWords = 0;
  let positiveScore = 0;
  let negativeScore = 0;
  let hedgingCount = 0;
  let assertiveCount = 0;

  for (const word of words) {
    const syl = countSyllables(word);
    totalSyllables += syl;
    if (syl >= 3) complexWords++;

    if (POSITIVE_SENTIMENT.has(word)) positiveScore++;
    if (NEGATIVE_SENTIMENT.has(word)) negativeScore++;
    if (HEDGING_WORDS.has(word)) hedgingCount++;
    if (ASSERTIVE_WORDS.has(word)) assertiveCount++;
  }

  // Flesch Reading Ease Formula: 206.835 - 1.015 * (words/sentences) - 84.6 * (syllables/words)
  const avgWordsPerSentence = totalWords / totalSentences;
  const avgSyllablesPerWord = totalSyllables / totalWords;
  const fleschRaw = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;
  const fleschReadingEase = Math.round(Math.min(100, Math.max(0, fleschRaw)));

  // Flesch-Kincaid Grade Level: 0.39 * (words/sentences) + 11.8 * (syllables/words) - 15.59
  const gradeLevelRaw = 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;
  const fleschKincaidGrade = Math.max(1, Math.min(18, Math.round(gradeLevelRaw * 10) / 10));

  const readingTimeMinutes = Math.max(0.1, Math.round((totalWords / 225) * 10) / 10);
  const speakingTimeMinutes = Math.max(0.1, Math.round((totalWords / 140) * 10) / 10);

  const passive = detectPassiveVoice(sentences);
  const fillers = detectFillers(text);

  // Formality score calculation (0 - 100)
  // Higher complex words, passive voice, long sentences boost formality; contractions, slang reduce it.
  const contractionMatches = text.match(/\b(don't|can't|won't|it's|I'm|you're|we're|they're|couldn't|shouldn't)\b/gi) || [];
  const formalityDelta = (complexWords / totalWords) * 150 + (avgWordsPerSentence > 18 ? 15 : 0) - (contractionMatches.length / totalWords) * 200;
  const formalityScore = Math.round(Math.max(10, Math.min(95, 50 + formalityDelta)));

  let formalityLabel: TextTone['formality'] = 'Neutral';
  if (formalityScore >= 75) formalityLabel = 'Highly Academic';
  else if (formalityScore >= 60) formalityLabel = 'Formal';
  else if (formalityScore <= 35) formalityLabel = 'Casual';

  // Sentiment calculation (-1 to +1)
  const sentimentNet = (positiveScore - negativeScore) / Math.max(1, positiveScore + negativeScore);
  let sentimentLabel: TextTone['sentiment'] = 'Neutral';
  if (sentimentNet > 0.25) sentimentLabel = 'Positive';
  else if (sentimentNet < -0.25) sentimentLabel = 'Negative';

  // Confidence calculation (0 - 100)
  const confidenceDelta = assertiveCount * 8 - hedgingCount * 12;
  const confidenceScore = Math.round(Math.max(15, Math.min(95, 60 + confidenceDelta)));

  return {
    metrics: {
      words: totalWords,
      characters,
      charactersNoSpaces,
      sentences: totalSentences,
      paragraphs: paragraphs.length || 1,
      readingTimeMinutes,
      speakingTimeMinutes,
      fleschReadingEase,
      fleschKincaidGrade,
      averageSentenceLength: Math.round(avgWordsPerSentence * 10) / 10,
      passiveVoiceCount: passive.length,
      fillerWordCount: fillers.length,
      complexWordCount: complexWords,
    },
    tone: {
      formality: formalityLabel,
      formalityScore,
      sentiment: sentimentLabel,
      sentimentScore: Math.round(sentimentNet * 100) / 100,
      confidenceScore,
    },
    passiveList: passive.map(p => ({ text: p.text, match: p.match })),
    fillersList: fillers.map(f => ({ phrase: f.phrase, replacement: f.replacement, reason: f.reason })),
  };
}

/**
 * Real client-side text rewrite transforms
 */
export function transformText(
  text: string,
  mode: 'concise' | 'simplify' | 'formalize' | 'bulletize'
): string {
  if (!text.trim()) return '';

  let result = text;

  if (mode === 'concise') {
    // Replace fillers and wordy phrases
    for (const item of FILLER_PHRASES) {
      const regex = new RegExp(`\\b${item.phrase}\\b`, 'gi');
      result = result.replace(regex, item.replacement);
    }
    // Clean double spaces
    result = result.replace(/\s{2,}/g, ' ');
  } else if (mode === 'simplify') {
    // Replace complex vocabulary
    for (const [complex, simple] of Object.entries(COMPLEX_WORDS)) {
      const regex = new RegExp(`\\b${complex}\\b`, 'gi');
      result = result.replace(regex, simple);
    }
  } else if (mode === 'formalize') {
    // Expand contractions
    const contractions: Record<string, string> = {
      "can't": 'cannot',
      "won't": 'will not',
      "don't": 'do not',
      "doesn't": 'does not',
      "isn't": 'is not',
      "aren't": 'are not',
      "wasn't": 'was not',
      "weren't": 'were not',
      "it's": 'it is',
      "that's": 'that is',
      "what's": 'what is',
      "there's": 'there is',
      "i'm": 'I am',
      "you're": 'you are',
      "we're": 'we are',
      "they're": 'they are',
      "haven't": 'have not',
      "hasn't": 'has not',
    };
    for (const [short, expanded] of Object.entries(contractions)) {
      const regex = new RegExp(`\\b${short}\\b`, 'gi');
      result = result.replace(regex, expanded);
    }
  } else if (mode === 'bulletize') {
    const sentences = splitSentences(text);
    return sentences
      .filter(s => s.trim().length > 10)
      .map(s => `• ${s.trim()}`)
      .join('\n');
  }

  return result.trim();
}
