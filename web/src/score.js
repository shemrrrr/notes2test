export function scoreTest(questions, answers) {
  let correct = 0;
  const details = questions.map((q, i) => {
    const selected = answers[i];
    const isCorrect = selected === q.correct;
    if (isCorrect) correct++;
    return { question: q, selected, isCorrect };
  });
  return { correct, total: questions.length, details };
}
