import { lazy, Suspense, useState } from 'react';
import styles from './VideoPlayer.module.css';

const speeds = [0.5, 1, 1.5, 2];
const ReactPlayer = lazy(() => import('react-player'));

function VideoPlayer({ url, onEnded }) {
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(0.8);
  const [watched, setWatched] = useState(0);
  const [hasError, setHasError] = useState(false);

  return (
    <div>
      <div className={styles.playerBox}>
        <Suspense fallback={<div className={styles.playerLoading} role="status">Loading video player...</div>}>
          <ReactPlayer
            src={url}
            wrapper="div"
            width="100%"
            height="100%"
            playing={playing}
            playbackRate={speed}
            volume={volume}
            controls
            onReady={() => setHasError(false)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={() => setHasError(true)}
            onTimeUpdate={(event) => {
              const { currentTime, duration } = event.currentTarget;
              if (Number.isFinite(duration) && duration > 0) {
                setWatched(Math.round((currentTime / duration) * 100));
              }
            }}
            onEnded={() => {
              setPlaying(false);
              onEnded();
            }}
          />
        </Suspense>
      </div>

      {hasError && (
        <p className={styles.error}>This video could not be loaded. Check your connection and try again.</p>
      )}

      <div className={styles.controls}>
        <button className="btn" onClick={() => setPlaying(!playing)}>
          {playing ? 'Pause' : 'Play'}
        </button>

        <div className={styles.group} role="group" aria-label="Playback speed">
          <span>Speed:</span>
          {speeds.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={s === speed}
              className={s === speed ? styles.speedActive : styles.speedBtn}
              onClick={() => setSpeed(s)}
            >
              {s}x
            </button>
          ))}
        </div>

        <div className={styles.group}>
          <label htmlFor="video-volume">Volume:</label>
          <input
            id="video-volume"
            aria-label="Volume"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
        </div>

        <span className={styles.watched}>Watched: {watched}%</span>
      </div>
    </div>
  );
}

export default VideoPlayer;
