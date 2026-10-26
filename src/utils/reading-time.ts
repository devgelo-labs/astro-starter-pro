const WORDS_PER_MINUTE = 200;

/** Estimated reading time in whole minutes (minimum 1) for raw Markdown text. */
export function getReadingTime(
  text: string,
  wordsPerMinute = WORDS_PER_MINUTE,
): number {
  const wordCount = text
    .split(/\s+/)
    .filter((token) => /[\p{L}\p{N}]/u.test(token)).length;

  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
