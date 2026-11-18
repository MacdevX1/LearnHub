import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar.jsx';
import { useApp } from '../context/AppContext.jsx';
import styles from './CourseCard.module.css';

function CourseCard({ course }) {
  const { isEnrolled, getProgress } = useApp();
  const enrolled = isEnrolled(course.id);

  return (
    <Link to={'/course/' + course.id} className={styles.card}>
      <div className={styles.thumb}>{course.emoji}</div>
      <div className={styles.body}>
        <span className={styles.tag}>{course.category}</span>
        <h3>{course.title}</h3>
        <p className={styles.meta}>
          {course.instructor} | {course.level}
        </p>
        <p className={styles.meta}>{course.lessons.length} lessons</p>
        {enrolled && <ProgressBar percent={getProgress(course)} />}
      </div>
    </Link>
  );
}

export default CourseCard;
