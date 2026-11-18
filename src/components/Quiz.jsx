import { useState } from 'react';
import styles from './Quiz.module.css';

function Quiz({ questions, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[current];
  const answered = selected !== null;

  function handleSelect(index) {
    if (answered) return; // can't change after answering
    setSelected(index);
    if (index === question.answer) {
      setScore(score + 1);
    }
  }

  function handleNext() {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setFinished(true);
      onFinish(score);
    }
  }

  function retry() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  // pick the css class for each option after the user answers
  function optionClass(index) {
    if (!answered) return styles.option;
    if (index === question.answer) return styles.correct;
    if (index === selected) return styles.wrong;
    return styles.option;
  }

  if (finished) {
    return (
      <div className={styles.quiz}>
        <h3>Quiz complete</h3>
        <p>
          You scored {score} out of {questions.length}.
        </p>
        <button className="btn btn-outline" onClick={retry}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.quiz}>
      <p className={styles.count}>
        Question {current + 1} of {questions.length}
      </p>
      <h3>{question.question}</h3>

      {question.options.map((opt, index) => (
        <button key={index} className={optionClass(index)} onClick={() => handleSelect(index)}>
          {opt}
        </button>
      ))}

      {answered && (
        <p className={selected === question.answer ? styles.msgGood : styles.msgBad}>
          {selected === question.answer
            ? 'Correct!'
            : 'Wrong. The right answer is: ' + question.options[question.answer]}
        </p>
      )}

      {answered && (
        <button className="btn" onClick={handleNext}>
          {current + 1 < questions.length ? 'Next question' : 'Finish quiz'}
        </button>
      )}
    </div>
  );
}

export default Quiz;
