import "../styles/PageReveal.css";

const SPARK_COUNT = 20;

// burstKey: change this value to re-mount the overlay and replay all animations
const PageReveal = ({ active, burstKey = 0 }) => {
  if (!active) return null;

  // Generate sparks at render time so they randomize on each burst
  const sparks = Array.from({ length: SPARK_COUNT }, (_, i) => ({
    id: i,
    angle: `${(360 / SPARK_COUNT) * i}deg`,
    dist: `${120 + Math.random() * 220}px`,
    dur: `${0.7 + Math.random() * 0.5}s`,
    delay: `${Math.random() * 0.15}s`,
    size: `${3 + Math.random() * 5}px`,
    color: ["#c084fc", "#a855f7", "#e879f9", "#7c3aed"][Math.floor(Math.random() * 4)],
  }));

  return (
    <div className="pr-root" key={burstKey}>
      <div className="pr-scanline-enter" />
      <div className="pr-overlay">
        <div className="pr-flash" />
        <div className="pr-burst" />
        <div className="pr-shockwave" />
        <div className="pr-shockwave" />
        <div className="pr-shockwave" />
        <div className="pr-sparks">
          {sparks.map(({ id, angle, dist, dur, delay, size, color }) => (
            <div
              key={id}
              className="pr-spark"
              style={{
                "--spark-angle": angle,
                "--spark-dist": dist,
                "--spark-dur": dur,
                "--spark-delay": delay,
                width: size,
                height: size,
                background: color,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageReveal;