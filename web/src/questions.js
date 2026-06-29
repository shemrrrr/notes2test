// Map each supported question type to the renderer that builds its HTML.
const renderers = {
  single_choice: renderSingleChoice,
  multiple_choice: renderMultipleChoice,
  single_number: renderSingleNumber,
  single_term: renderSingleTerm,
};

// Render a single-choice question as a radio-group form element.
function renderSingleChoice(q, index) {
  const options = q.options
    .map(
      (opt, i) => `
      <label class="option">
        <input type="radio" name="q${index}" value="${i}" required />
        <span>${escapeHtml(opt)}</span>
      </label>`,
    )
    .join("");

  return `
    <div class="question" data-index="${index}">
      <div class="question-number">Question ${index + 1}</div>
      <p class="question-text">${escapeHtml(q.question)}</p>
      <div class="options">${options}</div>
    </div>`;
}

// Render a multiple-choice question as a checkbox-group form element.
function renderMultipleChoice(q, index) {
  const options = q.options
    .map(
      (opt, i) => `
      <label class="option">
        <input type="checkbox" name="q${index}" value="${i}" />
        <span>${escapeHtml(opt)}</span>
      </label>`,
    )
    .join("");

  return `
    <div class="question" data-index="${index}">
      <div class="question-number">Question ${index + 1}</div>
      <p class="question-text">${escapeHtml(q.question)}</p>
      <div class="options">${options}</div>
    </div>`;
}

// Render a numeric input question.
function renderSingleNumber(q, index) {
  return `
    <div class="question" data-index="${index}">
      <div class="question-number">Question ${index + 1}</div>
      <p class="question-text">${escapeHtml(q.question)}</p>
      <input type="number" name="q${index}" step="any" />
    </div>`;
}

// Render a text input question.
function renderSingleTerm(q, index) {
  return `
    <div class="question" data-index="${index}">
      <div class="question-number">Question ${index + 1}</div>
      <p class="question-text">${escapeHtml(q.question)}</p>
      <input type="text" name="q${index}" />
    </div>`;
}

// Choose the correct renderer for a question and return its HTML.
function renderQuestion(q, index) {
  const fn = renderers[q.type];
  if (!fn) throw new Error(`Unknown question type: ${q.type}`);
  return fn(q, index);
}

// Collect the selected answers from the submitted form.
function collectAnswers(form, questions) {
  return questions.map((q, i) => {
    if (q.type === "single_choice") {
      const selected = form.querySelector(`input[name="q${i}"]:checked`);
      return selected ? Number(selected.value) : null;
    }
    if (q.type === "multiple_choice") {
      return [...form.querySelectorAll(`input[name="q${i}"]:checked`)].map(
        (el) => Number(el.value),
      );
    }
    if (q.type === "single_number") {
      const input = form.querySelector(`input[name="q${i}"]`);
      if (!input || input.value === "") return null;
      const numericValue = Number(input.value);
      return Number.isNaN(numericValue) ? null : numericValue;
    }
    if (q.type === "single_term") {
      const input = form.querySelector(`input[name="q${i}"]`);
      if (!input) return null;
      const value = input.value.trim();
      return value ? value : null;
    }
    return null;
  });
}

// Escape user-provided text so it can be safely injected into HTML.
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

window.renderQuestion = renderQuestion;
window.collectAnswers = collectAnswers;
