import styles from './ProgressBar.module.css';

function ProgressBar({ percent }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: percent + '%' }}></div>
      </div>
      <span className={styles.label}>{percent}%</span>
    </div>
  );
}

export default ProgressBar;
