import { describe, expect, it } from "vitest";
import { getReadingTime } from "./reading-time";

const words = (count: number) => Array(count).fill("word").join(" ");

describe("getReadingTime", () => {
  it("returns at least one minute for short or empty text", () => {
    expect(getReadingTime("")).toBe(1);
    expect(getReadingTime(words(10))).toBe(1);
  });

  it("rounds up to the next full minute at 200 words per minute", () => {
    expect(getReadingTime(words(200))).toBe(1);
    expect(getReadingTime(words(201))).toBe(2);
    expect(getReadingTime(words(1000))).toBe(5);
  });

  it("ignores markdown syntax and extra whitespace", () => {
    const markdown = `# Title\n\n- **one**   two\n\n> three\n\n---\n`;
    expect(getReadingTime(markdown, 4)).toBe(1);
    expect(getReadingTime(markdown, 3)).toBe(2);
  });

  it("accepts a custom words-per-minute rate", () => {
    expect(getReadingTime(words(300), 100)).toBe(3);
  });
});
