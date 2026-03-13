import { useState, useRef, useEffect } from 'react';

export default function CoinFlip() {
  const [spinning, setSpinning] = useState(false);
  const coinRef  = useRef(null);
  const rafRef   = useRef(null);
  const angleRef = useRef(180); // start showing tails (180deg)

  // Set initial tails position on mount
  useEffect(() => {
    if (coinRef.current) {
      coinRef.current.style.transform = `rotateY(180deg)`;
    }
  }, []);

  const flip = () => {
    if (spinning) return;

    const outcome    = Math.random() < 0.5 ? 'heads' : 'tails';
    const duration   = 5000;
    const startAngle = angleRef.current;

    // Figure out how many extra degrees to add to land on the correct face
    const currentMod = ((startAngle % 360) + 360) % 360;
    const targetMod  = outcome === 'heads' ? 0 : 180;
    let   extraDeg   = targetMod - currentMod;
    if (extraDeg < 0) extraDeg += 360;

    const finalAngle = startAngle + 8 * 360 + extraDeg;

    setSpinning(true);

    const start = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const angle    = startAngle + eased * (finalAngle - startAngle);

      if (coinRef.current) {
        coinRef.current.style.transform = `rotateY(${angle}deg)`;
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        angleRef.current = finalAngle;
        setSpinning(false);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  return (
    <div className="panel">
      <div className="coin-scene">
        <div
          ref={coinRef}
          className={`coin${spinning ? ' spinning' : ''}`}
          onClick={flip}
          role="button"
          aria-label="Flip coin"
          title={spinning ? undefined : 'Click to flip'}
        >
          <div className="coin-face coin-heads">
            <img src="/images/coin-heads.png" alt="Heads" />
          </div>
          <div className="coin-face coin-tails">
            <img src="/images/coin-tails.png" alt="Tails" />
          </div>
        </div>
      </div>
      <span className="counter-label">{spinning ? 'Flipping…' : 'Tap to flip'}</span>
    </div>
  );
}
