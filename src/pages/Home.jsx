import { useState } from 'react';
import CourseCard from '../components/CourseCard.jsx';
import { useApp } from '../context/AppContext.jsx';
import styles from './Pages.module.css';

function Home() {
  const { courses, loading, error } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  // build category list from the data
  const categories = ['All', ...new Set(courses.map((c) => c.category))];

  const filtered = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || c.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <h1>All Courses</h1>

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.input}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={styles.input}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>No courses match your search.</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
