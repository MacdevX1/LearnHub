import { Link, useParams, Navigate } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer.jsx';
import Quiz from '../components/Quiz.jsx';
import { useApp } from '../context/AppContext.jsx';
import styles from './Pages.module.css';

function LessonPage() {
  const { courseId, lessonId } = useParams();
  const { courses, loading, error, isEnrolled, isLessonDone, markLessonDone, saveQuizScore, getQuizScore } = useApp();

  if (loading) return <p>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  const course = courses.find((c) => c.id === Number(courseId));
  if (!course) return <p>Course not found.</p>;

  // users must enroll before watching
  if (!isEnrolled(course.id) && !course.openAccess) {
    return <Navigate to={'/course/' + course.id} />;
  }

  const lessonIndex = course.lessons.findIndex((l) => l.id === Number(lessonId));
  const lesson = course.lessons[lessonIndex];
  if (!lesson) return <p>Lesson not found.</p>;

  const prevLesson = course.lessons[lessonIndex - 1];
  const nextLesson = course.lessons[lessonIndex + 1];
  const done = isLessonDone(course.id, lesson.id);
  const bestScore = getQuizScore(course.id, lesson.id);

  function handleQuizFinish(score) {
    saveQuizScore(course.id, lesson.id, score);
  }

  return (
    <div>
      <Link to={'/course/' + course.id} className={styles.back}>
        &larr; {course.title}
      </Link>

      <h1>{lesson.title}</h1>

      {/* key makes the player reset when the lesson changes */}
      <VideoPlayer
        key={`${course.id}-${lesson.id}`}
        url={lesson.videoUrl}
        onEnded={() => markLessonDone(course.id, lesson.id)}
      />

      <div className={styles.lessonStatus}>
        {done ? (
          <span className={styles.done}>Lesson completed</span>
        ) : (
          <button className="btn btn-outline" onClick={() => markLessonDone(course.id, lesson.id)}>
            Mark as complete
          </button>
        )}
        {bestScore !== undefined && (
          <span className={styles.meta}>
            Best quiz score: {bestScore}/{lesson.quiz.length}
          </span>
        )}
      </div>

      <h2>Quiz</h2>
      <Quiz key={lesson.id} questions={lesson.quiz} onFinish={handleQuizFinish} />

      <div className={styles.navButtons}>
        {prevLesson ? (
          <Link to={'/course/' + course.id + '/lesson/' + prevLesson.id} className="btn btn-outline">
            &larr; Previous
          </Link>
        ) : (
          <span></span>
        )}
        {nextLesson && (
          <Link to={'/course/' + course.id + '/lesson/' + nextLesson.id} className="btn">
            Next lesson &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}

export default LessonPage;
