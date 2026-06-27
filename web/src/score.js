// Compare the submitted answers to the expected answers and return scoring details.
export function scoreTest(questions, answers) {
  let correct = 0;
  const details = questions.map((q, i) => {
    const selected = answers[i];
    const isCorrect = isAnswerCorrect(q, selected);
    if (isCorrect) correct++;
    return { question: q, selected, isCorrect };
  });
  return { correct, total: questions.length, details };
}

// Check whether a submitted answer matches the expected answer for the given question type.
function isAnswerCorrect(question, selected) {
  if (question.type === "single_choice" || question.type === "single_number") {
    return selected != null && selected === question.correct;
  }

  if (question.type === "multiple_choice") {
    return Array.isArray(selected) && arraysEqual(selected, question.correct);
  }

  if (question.type === "single_term") {
    if (selected == null || typeof selected !== "string") return false;
    const normalizedSelected = selected.trim().toLowerCase();
    const acceptedAnswers = Array.isArray(question.correct)
      ? question.correct
      : [question.correct];

    return acceptedAnswers.some(
      (answer) => String(answer).trim().toLowerCase() === normalizedSelected,
    );
  }

  return false;
}

// Compare two value arrays element-by-element.
function arraysEqual(left, right) {
  if (!Array.isArray(left) || !Array.isArray(right)) return false;
  if (left.length !== right.length) return false;
  return left.every((value, index) => value === right[index]);
}
