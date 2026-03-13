import { useState, useRef, useEffect } from 'react';

export default function CoinFlip() {
  const [phase,  setPhase]  = useState('idle');   // 'idle' | 'spinning' | 'result'
  const [result, setResult] = useState(null);      // 'heads' | 'tails'
  const coinRef = useRef(null);
  const rafRef  = useRef(null);

  const flip = () => {
    if (phase !== 'idle') return;

    const outcome    = Math.random() < 0.5 ? 'heads' : 'tails';
    const duration   = 5000;
    const finalAngle = 8 * 360 + (outcome === 'tails' ? 180 : 0);

    setPhase('spinning');
    setResult(null);

    const start = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      if (coinRef.current) {
        coinRef.current.style.transform = `rotateY(${eased * finalAngle}deg)`;
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setResult(outcome);
        setPhase('result');
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  const reset = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (coinRef.current) coinRef.current.style.transform = 'rotateY(0deg)';
    setPhase('idle');
    setResult(null);
  };

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  return (
    <div className="panel">
      {/* The coin IS the button */}
      <div className="coin-scene">
        <div
          ref={coinRef}
          className={`coin${phase === 'spinning' ? ' spinning' : ''}`}
          onClick={flip}
          role="button"
          aria-label="Flip coin"
          title={phase === 'idle' ? 'Click to flip' : undefined}
        >
          <div className="coin-face coin-heads">
            <img src="/images/coin-heads.png" alt="Heads" />
          </div>
          <div className="coin-face coin-tails">
            <img src="/images/coin-tails.png" alt="Tails" />
          </div>
        </div>
      </div>

      {phase === 'idle'     && <span className="counter-label">Tap to flip</span>}
      {phase === 'spinning' && <span className="counter-label">Flipping…</span>}
      {phase === 'result'   && result && (
        <span className={`coin-result ${result}`}>
          {result === 'heads' ? '🪙 Heads!' : '🔄 Tails!'}
        </span>
      )}

      {phase === 'result' && (
        <button className="btn btn-ghost" onClick={reset}>Again</button>
      )}
    </div>
  );
}
