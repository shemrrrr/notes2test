const renderers = {
  single_choice: renderSingleChoice,
  multiple_choice: renderMultipleChoice,
};

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

export function renderQuestion(q, index) {
  const fn = renderers[q.type];
  if (!fn) throw new Error(`Unknown question type: ${q.type}`);
  return fn(q, index);
}

export function collectAnswers(form, questions) {
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
    return null;
  });
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
