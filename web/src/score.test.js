import test from "node:test";
import assert from "node:assert/strict";
import { scoreTest } from "./score.js";

test("single_number questions compare numeric values", () => {
  const questions = [{ type: "single_number", question: "What is 6 × 7?", correct: 42 }];
  const { correct, details } = scoreTest(questions, [42]);

  assert.equal(correct, 1);
  assert.equal(details[0].isCorrect, true);
});

test("single_term questions accept case-insensitive variants", () => {
  const questions = [{ type: "single_term", question: "Capital of France?", correct: ["paris", "Paris"] }];
  const { correct, details } = scoreTest(questions, [" PARIS "]);

  assert.equal(correct, 1);
  assert.equal(details[0].isCorrect, true);
});
