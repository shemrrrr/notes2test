import { renderQuestion, collectAnswers } from "./questions.js";
import { scoreTest } from "./score.js";

const app = document.getElementById("app");
const params = new URLSearchParams(window.location.search);
const testId = params.get("test");

if (testId) {
  renderTestPage(testId);
} else {
  renderIndexPage();
}

async function renderIndexPage() {
  app.innerHTML = `<h1>Notes2Test</h1><p class="subtitle">Your tests</p><p>Loading…</p>`;

  try {
    const res = await fetch("/alltests/index.json");
    if (!res.ok) throw new Error("Could not load test list");
    const { tests } = await res.json();

    if (tests.length === 0) {
      app.innerHTML = `
        <h1>Notes2Test</h1>
        <p class="subtitle">Your tests</p>
        <p class="empty-state">No tests yet.</p>`;
      return;
    }

    const items = tests
      .map(
        (t) =>
          `<li><a href="?test=${encodeURIComponent(t.id)}">${escapeHtml(t.title)}</a></li>`,
      )
      .join("");

    app.innerHTML = `
      <h1>Notes2Test</h1>
      <p class="subtitle">Your tests</p>
      <ul class="test-list">${items}</ul>`;
  } catch (err) {
    app.innerHTML = `
      <h1>Notes2Test</h1>
      <p class="error">${escapeHtml(err.message)}</p>`;
  }
}

async function renderTestPage(id) {
  app.innerHTML = `<p>Loading…</p>`;

  try {
    const res = await fetch(`/alltests/${encodeURIComponent(id)}.json`);
    if (!res.ok) throw new Error(`Test "${id}" not found`);
    const test = await res.json();
    const title = test.title ?? id;

    const questionsHtml = test.questions
      .map((q, i) => renderQuestion(q, i))
      .join("");

    app.innerHTML = `
      <a class="back-link" href="/">← All tests</a>
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
  } catch (err) {
    app.innerHTML = `
      <a class="back-link" href="/">← All tests</a>
      <p class="error">${escapeHtml(err.message)}</p>`;
  }
}

function showResults(questions, answers) {
  const { correct, total, details } = scoreTest(questions, answers);
  const resultsEl = document.getElementById("results");

  const items = details
    .map((d, i) => {
      const cls = d.isCorrect ? "result-correct" : "result-wrong";
      const status = d.isCorrect ? "Correct" : "Incorrect";
      const correctAnswer = d.question.options[d.question.correct];
      const extra = d.isCorrect
        ? ""
        : `<br><small>Correct answer: ${escapeHtml(correctAnswer)}</small>`;
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

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
