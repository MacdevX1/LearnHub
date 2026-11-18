import { Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar.jsx';
import { useApp } from '../context/AppContext.jsx';
import styles from './Pages.module.css';

function Dashboard() {
  const { courses, loading, error, enrolled, getProgress, isLessonDone, resetProgress } = useApp();

  if (loading) return <p>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  const myCourses = courses.filter(
    (course) =>
      enrolled.includes(course.id) ||
      (course.openAccess && course.lessons.some((lesson) => isLessonDone(course.id, lesson.id)))
  );
  const finishedCount = myCourses.filter((c) => getProgress(c) === 100).length;

  if (myCourses.length === 0) {
    return (
      <div>
        <h1>My Learning</h1>
        <p>You have not enrolled in any course yet.</p>
        <Link to="/" className="btn">
          Browse courses
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>My Learning</h1>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <strong>{myCourses.length}</strong>
          <span>Courses</span>
        </div>
        <div className={styles.stat}>
          <strong>{finishedCount}</strong>
          <span>Completed</span>
        </div>
        <div className={styles.stat}>
          <strong>{myCourses.length - finishedCount}</strong>
          <span>In progress</span>
        </div>
      </div>

      {myCourses.map((course) => {
        const percent = getProgress(course);
        // find the first lesson that isn't finished so we can link to it
        const nextLesson = course.lessons.find((l) => !isLessonDone(course.id, l.id));

        return (
          <div key={course.id} className={styles.box}>
            <h3>
              {course.emoji} {course.title}
            </h3>
            <ProgressBar percent={percent} />
            <div className={styles.rowRight}>
              {nextLesson ? (
                <Link to={'/course/' + course.id + '/lesson/' + nextLesson.id} className="btn">
                  Continue
                </Link>
              ) : (
                <Link to={'/course/' + course.id} className="btn btn-outline">
                  Review course
                </Link>
              )}
            </div>
          </div>
        );
      })}

      <button className="btn btn-outline" onClick={resetProgress}>
        Reset all progress
      </button>
    </div>
  );
}

export default Dashboard;
