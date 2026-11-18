import { NavLink, Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          LearnHub
        </Link>
        <nav className={styles.links}>
          <NavLink to="/" end className={({ isActive }) => (isActive ? styles.active : '')}>
            Courses
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.active : '')}>
            My Learning
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
