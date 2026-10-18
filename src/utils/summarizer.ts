import { SummaryResult } from '../types';
import { COMMON_STOP_WORDS, splitSentences, tokenizeWords } from './textAnalysis';

export interface SummarizerOptions {
  compressionPercentage: number; // e.g. 20 - 75
  mode: 'paragraphs' | 'bullets';
  minSentences?: number;
}

/**
 * Robust Extractive Summarization Engine running 100% in browser.
 * Uses an information-density graph weighting model (TF-IDF + Positional Bias + Entity Multiplier).
 */
export function summarizeText(
  rawText: string,
  options: SummarizerOptions = { compressionPercentage: 40, mode: 'paragraphs' }
): SummaryResult {
  const text = rawText.trim();
  if (!text) {
    return {
      originalWordCount: 0,
      summaryWordCount: 0,
      compressionRatio: 0,
      sentences: [],
      bulletPoints: [],
      keyConcepts: [],
      highlightedIndices: [],
    };
  }

  const allWords = tokenizeWords(text);
  const rawSentences = splitSentences(text);

  if (rawSentences.length <= 2) {
    return {
      originalWordCount: allWords.length,
      summaryWordCount: allWords.length,
      compressionRatio: 0,
      sentences: rawSentences,
      bulletPoints: rawSentences.map(s => `• ${s}`),
      keyConcepts: [],
      highlightedIndices: rawSentences.map((_, i) => i),
    };
  }

  // 1. Calculate word frequencies across the whole document
  const wordFreq = new Map<string, number>();
  for (const word of allWords) {
    if (!COMMON_STOP_WORDS.has(word) && word.length > 2) {
      wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    }
  }

  // Find max frequency for normalization
  let maxFreq = 1;
  wordFreq.forEach(count => {
    if (count > maxFreq) maxFreq = count;
  });

  // 2. Score individual sentences based on multiple heuristic dimensions
  interface ScoredSentence {
    index: number;
    text: string;
    score: number;
    wordCount: number;
  }

  const scoredSentences: ScoredSentence[] = rawSentences.map((sentence, index) => {
    const sWords = tokenizeWords(sentence);
    if (sWords.length < 4) {
      return { index, text: sentence, score: 0, wordCount: sWords.length };
    }

    // A. Term frequency score
    let tfScore = 0;
    for (const w of sWords) {
      if (!COMMON_STOP_WORDS.has(w) && wordFreq.has(w)) {
        tfScore += (wordFreq.get(w)! / maxFreq);
      }
    }
    const normalizedTf = tfScore / Math.max(sWords.length, 5);

    // B. Positional bias: First 20% of text and initial sentences usually define main thesis
    const positionRatio = index / rawSentences.length;
    let positionMultiplier = 1.0;
    if (positionRatio < 0.15) {
      positionMultiplier = 1.45; // Opening thesis boost
    } else if (positionRatio > 0.85) {
      positionMultiplier = 1.25; // Closing conclusion boost
    }

    // C. Entity / Numerical boost: presence of numbers, percentages, acronyms
    const hasNumbers = /\b\d+(\.\d+)?%?\b/.test(sentence);
    const hasProperNouns = /(?:[A-Z][a-z]+\s+){1,2}[A-Z][a-z]+/.test(sentence);
    let entityMultiplier = 1.0;
    if (hasNumbers) entityMultiplier += 0.2;
    if (hasProperNouns) entityMultiplier += 0.15;

    // D. Length balance penalty (penalize excessively brief or runaway fragments)
    let lengthFactor = 1.0;
    if (sWords.length < 8) lengthFactor = 0.7;
    else if (sWords.length > 40) lengthFactor = 0.85;

    const totalScore = normalizedTf * positionMultiplier * entityMultiplier * lengthFactor;

    return {
      index,
      text: sentence,
      score: totalScore,
      wordCount: sWords.length,
    };
  });

  // 3. Determine target sentence count based on compression percentage
  // E.g., 30% compression means summary length is ~30% of original
  const targetFraction = Math.max(0.15, Math.min(0.85, options.compressionPercentage / 100));
  const rawTargetCount = Math.round(rawSentences.length * targetFraction);
  const targetCount = Math.max(
    options.minSentences || 2,
    Math.min(rawSentences.length, rawTargetCount)
  );

  // 4. Select the highest scoring sentences
  const sortedByScore = [...scoredSentences].sort((a, b) => b.score - a.score);
  const selectedSentences = sortedByScore.slice(0, targetCount);

  // 5. Restore original chronological order for natural reading flow
  selectedSentences.sort((a, b) => a.index - b.index);

  const selectedTexts = selectedSentences.map(s => s.text);
  const highlightedIndices = selectedSentences.map(s => s.index);

  // 6. Generate bullet points
  const bulletPoints = selectedTexts.map(s => {
    // Clean leading conjunctions for concise bullet output
    const cleaned = s.replace(/^(however|moreover|furthermore|consequently|therefore|additionally|thus),?\s*/i, '');
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  });

  // 7. Extract top key concepts / keywords
  const sortedConcepts = Array.from(wordFreq.entries())
    .filter(([word]) => word.length > 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([word, count]) => ({
      word: word.charAt(0).toUpperCase() + word.slice(1),
      count,
      score: Math.round((count / maxFreq) * 100),
    }));

  const summaryWords = tokenizeWords(selectedTexts.join(' ')).length;
  const originalWords = allWords.length || 1;
  const compressionRatio = Math.round(((originalWords - summaryWords) / originalWords) * 100);

  return {
    originalWordCount: originalWords,
    summaryWordCount: summaryWords,
    compressionRatio: Math.max(0, compressionRatio),
    sentences: selectedTexts,
    bulletPoints,
    keyConcepts: sortedConcepts,
    highlightedIndices,
  };
}
