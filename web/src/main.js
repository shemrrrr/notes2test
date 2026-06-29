const app = document.getElementById("app");
const params = new URLSearchParams(window.location.search);
const testId = params.get("test");

// Decide whether to show the test list or a single test page.
if (testId) {
  renderTestPage(testId);
} else {
  renderIndexPage();
}

// Render the landing page that lists available tests.
function renderIndexPage() {
  app.innerHTML = `<h1>Notes2Test</h1><p class="subtitle">Your tests</p>`;

  if (testCatalog.length === 0) {
    app.innerHTML += `<p class="empty-state">No tests yet.</p>`;
    return;
  }

  const items = testCatalog
    .map(
      (t) =>
        `<li><a href="?test=${encodeURIComponent(t.id)}">${escapeHtml(t.title)}</a></li>`,
    )
    .join("");

  app.innerHTML += `
      <ul class="test-list">${items}</ul>`;
}

// Load and render one test, including the form and submission handler.
function renderTestPage(id) {
  const test = testsById[id];
  if (!test) {
    app.innerHTML = `
      <a class="back-link" href="/">← All tests</a>
      <p class="error">Test "${escapeHtml(id)}" not found</p>`;
    return;
  }

  const title = test.title ?? id;
  const questionsHtml = test.questions
    .map((q, i) => renderQuestion(q, i))
    .join("");

  app.innerHTML = `
      <a class="back-link" href="index.html">← All tests</a>
      <h1>${escapeHtml(title)}</h1>
      <p class="subtitle">${test.questions.length} questions</p>
      <form id="test-form">
        ${questionsHtml}
        <button type="submit" class="submit-btn">Submit</button>
      </form>
      <div id="results"></div>`;

  document.getElementById("test-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const answers = collectAnswers(e.target, test.questions);
    showResults(test.questions, answers);
  });
}

// Display the scored results and the per-question feedback.
function showResults(questions, answers) {
  const { correct, total, details } = scoreTest(questions, answers);
  const resultsEl = document.getElementById("results");

  const items = details
    .map((d, i) => {
      const cls = d.isCorrect ? "result-correct" : "result-wrong";
      const status = d.isCorrect ? "Correct" : "Incorrect";
      const correctAnswer = formatCorrectAnswer(d.question);
      const extra = d.isCorrect
        ? ""
        : `<br><small>Correct answer: ${escapeHtml(correctAnswer ?? "N/A")}</small>`;
      return `
        <div class="result-item ${cls}">
          <strong>Q${i + 1}:</strong> ${status}${extra}
        </div>`;
    })
    .join("");

  resultsEl.innerHTML = `
    <div class="results">
      <p class="results-score">Score: ${correct} / ${total}</p>
      ${items}
    </div>`;

  resultsEl.scrollIntoView({ behavior: "smooth" });
}

// Escape text so it can be inserted safely into HTML markup.
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Build a human-readable correct answer summary for the feedback panel.
function formatCorrectAnswer(question) {
  if (question.type === "multiple_choice") {
    return question.correct.map((index) => question.options[index]).join(", ");
  }
  if (question.type === "single_choice") {
    return question.options[question.correct];
  }
  if (question.type === "single_number") {
    return question.correct;
  }
  if (question.type === "single_term") {
    return Array.isArray(question.correct) ? question.correct[0] : question.correct;
  }
  return null;
}
