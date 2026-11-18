import { Link, useParams } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar.jsx';
import { useApp } from '../context/AppContext.jsx';
import styles from './Pages.module.css';

function CourseDetail() {
  const { courseId } = useParams();
  const { courses, loading, error, isEnrolled, enroll, isLessonDone, getProgress } = useApp();

  if (loading) return <p>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  const course = courses.find((c) => c.id === Number(courseId));
  if (!course) return <p>Course not found. <Link to="/">Back to courses</Link></p>;

  const enrolled = isEnrolled(course.id);
  const hasAccess = enrolled || course.openAccess;

  return (
    <div>
      <Link to="/" className={styles.back}>
        &larr; Back to courses
      </Link>

      <div className={styles.box}>
        <h1>
          {course.emoji} {course.title}
        </h1>
        <p>{course.description}</p>
        <p className={styles.meta}>
          Instructor: {course.instructor} | Level: {course.level} | {course.lessons.length} lessons
        </p>

        {hasAccess ? (
          <ProgressBar percent={getProgress(course)} />
        ) : (
          <button className="btn" onClick={() => enroll(course.id)}>
            Enroll now
          </button>
        )}
        {course.openAccess && <p className={styles.meta}>Open access — no enrollment required.</p>}
      </div>

      <h2>Lessons</h2>
      <div className={styles.box}>
        {course.lessons.map((lesson, index) => (
          <div key={lesson.id} className={styles.lessonRow}>
            <div>
              <strong>
                {index + 1}. {lesson.title}
              </strong>
              <p className={styles.meta}>{lesson.duration}</p>
            </div>

            {hasAccess ? (
              <div className={styles.rowRight}>
                {isLessonDone(course.id, lesson.id) && <span className={styles.done}>Completed</span>}
                <Link to={'/course/' + course.id + '/lesson/' + lesson.id} className="btn btn-outline">
                  {isLessonDone(course.id, lesson.id) ? 'Watch again' : 'Start'}
                </Link>
              </div>
            ) : (
              <span className={styles.meta}>Enroll to watch</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseDetail;
