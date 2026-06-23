# Project Context

**Purpose:** Help users who keep school or university notes test themselves from that material. An AI agent generates tests from the given educational content—no more and no less.

**Notes workflow (Obsidian recommended):**
- Every note must have two hashtags: `#ready` or `#notready`, and `#test` or `#notest`.
- New notes start as `#notready` and `#notest`.
- The user decides when a note is ready and changes the hashtag to `#ready`.
- Only the agent may change `#notest` to `#test` (after generating a test for a ready note).
- A ready note with a test includes a link to the test immediately after the hashtags. If missing, check the note and add the link.

**Storage:** The web app and tests are stored locally on the user's PC only.

**In the case the user uses Obsidian:** DON'T TOUCH .obsdian.

# Technical details of the project
- /web folder keeps only the code for the web application.
- Web application loads tests from `/alltests`. Each test is one JSON file.
- Each file has a `questions` array. Every question has a `type` field so new question types can be added without changing the file format.
- For now, use `type: "multiple_choice"` with `question` (string), `options` (array of strings), and `correct` (0-based index into `options`).

Example:

```json
{
  "questions": [
    {
      "type": "multiple_choice",
      "question": "How many countries are there in the world?",
      "options": ["190", "155", "205", "195"],
      "correct": 3
    }
  ]
}
```

# Rules For Codind
## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.