import { createContext, useContext, useEffect, useState } from 'react';
import courseData from '../data/courses.json';

const AppContext = createContext();

// small helper so the useState initial values stay readable
function loadFromStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (err) {
    return fallback;
  }
}

export function AppProvider({ children }) {
  const [courses] = useState(courseData);
  const loading = false;
  const error = '';

  // ids of enrolled courses -> [1, 3]
  const [enrolled, setEnrolled] = useState(() => loadFromStorage('enrolled', []));
  // completed lessons per course -> { 1: [1, 2] }
  const [completed, setCompleted] = useState(() => loadFromStorage('completed', {}));
  // best quiz score per lesson -> { "1-2": 2 }
  const [quizScores, setQuizScores] = useState(() => loadFromStorage('quizScores', {}));

  // keep localStorage in sync with state
  useEffect(() => {
    localStorage.setItem('enrolled', JSON.stringify(enrolled));
  }, [enrolled]);

  useEffect(() => {
    localStorage.setItem('completed', JSON.stringify(completed));
  }, [completed]);

  useEffect(() => {
    localStorage.setItem('quizScores', JSON.stringify(quizScores));
  }, [quizScores]);

  function enroll(courseId) {
    if (!enrolled.includes(courseId)) {
      setEnrolled([...enrolled, courseId]);
    }
  }

  function isEnrolled(courseId) {
    return enrolled.includes(courseId);
  }

  function markLessonDone(courseId, lessonId) {
    const done = completed[courseId] || [];
    if (done.includes(lessonId)) return;
    setCompleted({ ...completed, [courseId]: [...done, lessonId] });
  }

  function isLessonDone(courseId, lessonId) {
    return (completed[courseId] || []).includes(lessonId);
  }

  function saveQuizScore(courseId, lessonId, score) {
    const key = courseId + '-' + lessonId;
    const oldScore = quizScores[key] || 0;
    if (score > oldScore) {
      setQuizScores({ ...quizScores, [key]: score });
    }
  }

  function getQuizScore(courseId, lessonId) {
    return quizScores[courseId + '-' + lessonId];
  }

  // returns a number from 0 to 100
  function getProgress(course) {
    const done = (completed[course.id] || []).length;
    return Math.round((done / course.lessons.length) * 100);
  }

  function resetProgress() {
    if (window.confirm('Reset all progress and enrollments?')) {
      setEnrolled([]);
      setCompleted({});
      setQuizScores({});
    }
  }

  const value = {
    courses,
    loading,
    error,
    enrolled,
    enroll,
    isEnrolled,
    markLessonDone,
    isLessonDone,
    saveQuizScore,
    getQuizScore,
    getProgress,
    resetProgress,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
