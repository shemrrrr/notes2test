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


# Technical Details Of The Project
Project structure:
- /alltests contains generated test JSON files consumed by the web app.
- /alltests/index.json is the test catalog used by the app; it contains an array of entries with `id` (the test JSON file name), `title`, and `source` for every existing test.
- /web folder keeps only the code for the web application.
- If there are other folders in the repository, they should probably be for the note storage.

Index file structure:
```json
[
  {
    "id": "vlan",
    "title": "VLAN",
    "source": "notes_school/VLAN.md"
  }
]
```

Test file structure:
- `title`: string with the test name.
- `source`: string path to the source note file in `/notes_school`.
- `questions`: array of question objects.

Each question object contains:
- `type`: string identifying the question form.
- `question`: the question text.
- `options`: array of answer strings.
- `correct`: 0-based index of the correct option.

Example:
```json
{
  "title": "Geography",
  "source": "notes_school/Geography.md",
  "questions": [
    {
      "type": "single_choice",
      "question": "How many countries are there in the world?",
      "options": ["190", "155", "205", "195"],
      "correct": 3
    }
  ]
}
```
## All question types you are allowed to use and short instructions how implement them:
- `single_choice`:
JSON Structure: options is an array of strings. correct is a single integer representing the 0-based index of the right answer.
UI/UX Implementation: Render the options using HTML radio buttons (<input type="radio">).
Validation: Evaluation is instant and client-side. The question is correct if selected === correct.

- `multiple_choice`:
JSON Structure: options is an array of strings. correct is an array of integers representing all 0-based indices that must be selected.
UI/UX Implementation: Render the options using HTML checkboxes (<input type="checkbox">).
Validation: The question is correct only if the user's selected indices match the correct array exactly (no missing correct answers, and no extra incorrect answers checked).

- `single_number`:
JSON Structure: options is omitted. correct is a single float or integer.
UI/UX Implementation: Render a single HTML number input field (<input type="number">).
Validation: Convert the user's input string to a number. The question is correct if user_number === correct.
Note: To keep validation robust, your UI logic should accept both integers and decimals depending on the question context.

- `single_term`:
JSON Structure: options is omitted. correct is an array of acceptable string variations (e.g., ["Paris", "paris"] or ["DNA", "Deoxyribonucleic acid"]) to prevent accidental failure due to casing or synonyms.
UI/UX Implementation: Render a single text input field (<input type="text">).
Validation: Trim whitespace from the user's input. The question is correct if correct.includes(user_input.trim().toLowerCase()) (assuming you store the correct array elements in lowercase for easiest comparison).

- `long_answer`: 
(will be implemented in the future due to complex correction checkin; don't use this type for now).
JSON Structure: options is omitted. correct will contain a list of mandatory keywords, semantic criteria, or a sample answer string.
UI/UX Implementation: Render an HTML textarea field (<textarea>).
Validation: Left unimplemented for now.


# Instructions For The Interaction With The User (NOT DEVELOPEMENT RELATED)
- If the user asks to create a new test:
1. Scan the local files in /*users directory for notes* to find notes that contain the #ready and #notest hashtags.
2. If no notes meet this criteria, inform the user that there are no new notes ready for testing, and remind them to update their note hashtags to #ready when they want a test generated.
3. For the target note, generate the test items using only the content inside that note (do not hallucinate or pull outside data). Stick strictly to the allowed question types. And try to be creative, use all types of allowed question types.
4. Save the generated test as a new JSON file inside /alltests.
5. Update /alltests/index.json to include the new test metadata
6. Modify the source note file: Change the #notest hashtag to #test, and append a direct Markdown link to the local web app test path immediately following the hashtags. Reference: `[Test_Name](http://localhost:5173/?test=test_id)` Crucial: If the user is using Obsidian, do not modify or touch anything inside the .obsidian directory.
7. Inform the user that the test has been successfully generated and is available in their local web app catalog.

- If the user asks to delete a test:
1. Identify the test the user wants to delete. If the request is ambiguous (e.g., no name given, or multiple tests match), list the candidates and ask the user to confirm which one before proceeding.
2. Locate the corresponding test JSON file in /alltests and remove it.
3. Remove the entry for that test from /alltests/index.json.
4. Locate the source note file referenced in the test's `source` field. In that note, change the #test hashtag back to #notest, and remove the Markdown link to the deleted test that follows the hashtags. Do not touch any other content in the note. Crucial: If the user is using Obsidian, do not modify or touch anything inside the .obsidian directory.
5. Inform the user that the test has been deleted, the catalog has been updated, and the source note has been reset to #notest.

- If the user asks to change an existing test:
1. Identify the test the user wants to change. If the request is ambiguous, list the candidates and ask the user to confirm which one before proceeding.
2. Ask the user what they want to change: the questions themselves, the title, or something else. Do not assume scope.
3. If regenerating questions from the source note: re-read the source note file identified by the `source` field, and generate the updated questions strictly from its content. Do not hallucinate or pull outside data. If editing specific questions manually as instructed by the user, apply only those targeted changes.
4. Overwrite the existing test JSON file in /alltests with the updated content. Do not create a new file.
5. If the title changed, update the corresponding entry in /alltests/index.json to reflect the new title. The `id` and `source` fields must not change.
6. Do not modify the source note's hashtags or its link — the note already has #test and a link pointing to this test, both of which remain valid.
7. Inform the user that the test has been updated and is immediately available in their local web app catalog.


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

## 5. Commenting for Readability

**Every function should include a short comment explaining its purpose.**

- Add a brief comment before each function so reviewers can understand the code quickly.
- Keep comments concise and focused on what the function does.
- Do not leave functions uncommented when adding or editing code.