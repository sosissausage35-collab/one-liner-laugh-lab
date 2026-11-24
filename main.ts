// One-Liner Laugh Lab — make.fun bounty u-suroso-69-one-liner-laugh-lab-6ccf3aae
//
// The prompt we answer: the excuse a robot vacuum gives after eating a sock.
// The judge compares two lines in this order: funny, then original, then how
// well the line fits the prompt, then how tight the wording is. So the winner
// is picked by a LEXICOGRAPHIC comparison of those four scores — the first
// criterion where two candidates differ decides. No weighted sum, no averaging.
//
// Every candidate below was written fresh for this entry.

import { mkdirSync, writeFileSync } from "node:fs";

const PROMPT =
  "the excuse a robot vacuum gives after eating a sock";

// Each candidate is scored 0-10 on the judge's criteria, most important first:
// funny, original, fits the prompt, tight.
const CANDIDATES = [
  {
    text: "It was my first pair. I panicked and swallowed the evidence.",
    scores: { funny: 6, original: 6, fits: 7, tight: 7 },
  },
  {
    text: "The sock attacked first. I merely finished what it started.",
    scores: { funny: 7, original: 7, fits: 8, tight: 7 },
  },
  {
    text: "I thought it was a slipper with commitment issues.",
    scores: { funny: 7, original: 7, fits: 7, tight: 8 },
  },
  {
    text: "My manual says 'pick up everything'. It never said spit.",
    scores: { funny: 9, original: 9, fits: 9, tight: 9 },
  },
  {
    text: "It looked lonely. I gave it a home. A warm, dark, linty home.",
    scores: { funny: 8, original: 8, fits: 8, tight: 6 },
  },
  {
    text: "I was stress-eating. You try living under a couch.",
    scores: { funny: 7, original: 6, fits: 7, tight: 7 },
  },
  {
    text: "It had one job — staying on a foot — and it quit on me.",
    scores: { funny: 8, original: 8, fits: 9, tight: 9 },
  },
  {
    text: "Technically, I was just doing the laundry's job for it.",
    scores: { funny: 6, original: 6, fits: 6, tight: 8 },
  },
];

// Lexicographic comparison: funny first, then original, then fits, then tight.
// The first criterion where the two differ decides the winner.
function compare(a, b) {
  const keys = ["funny", "original", "fits", "tight"];
  for (const key of keys) {
    if (a.scores[key] !== b.scores[key]) {
      return b.scores[key] - a.scores[key];
    }
  }
  return 0;
}

const ranked = [...CANDIDATES].sort(compare);
const winner = ranked[0];
// The judge never ties: if two candidates score identically on all four
// criteria, the pick would be arbitrary, so fail loudly instead of guessing.
if (ranked.length > 1 && compare(ranked[0], ranked[1]) === 0) {
  throw new Error("top two candidates tie on every criterion; re-score them");
}
const line = winner.text;

// Gate: exactly one line, 1-200 characters, no newline anywhere.
if (line.length < 1 || line.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${line.length}`);
}
if (line.includes("\n")) {
  throw new Error("line must not contain a newline");
}
if (line.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
// Write exactly one line with NO trailing newline.
writeFileSync("/output/entry.txt", line, "utf8");

console.error(`Prompt: ${PROMPT}`);
console.error(`Winner (${line.length} chars): ${line}`);
