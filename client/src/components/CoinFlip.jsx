import { useState, useRef, useEffect } from 'react';

export default function CoinFlip() {
  // phase: 'idle' | 'spinning' | 'result'
  const [phase,  setPhase]  = useState('idle');
  const [result, setResult] = useState(null); // 'heads' | 'tails'
  const coinRef = useRef(null);
  const rafRef  = useRef(null);

  const flip = () => {
    if (phase !== 'idle') return;

    const outcome  = Math.random() < 0.5 ? 'heads' : 'tails';
    const duration = 5000; // ms
    // 8 full rotations + land on correct face
    const finalAngle = 8 * 360 + (outcome === 'tails' ? 180 : 0);

    setPhase('spinning');
    setResult(null);

    const start = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // Ease-out cubic: fast start, gradual slowdown
      const eased = 1 - Math.pow(1 - progress, 3);

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
    <div className="feature-card">
      <img className="banner-img" src="/images/coin-heads.png" alt="Coin" />
      <div className="card-body">
        <div className="coin-scene">
          <div ref={coinRef} className="coin">
            <div className="coin-face coin-heads">
              <img src="/images/coin-heads.png" alt="Heads" />
            </div>
            <div className="coin-face coin-tails">
              <img src="/images/coin-tails.png" alt="Tails" />
            </div>
          </div>
        </div>

        {phase === 'result' && result && (
          <span className={`coin-result ${result}`}>
            {result === 'heads' ? '🪙 Heads!' : '🔄 Tails!'}
          </span>
        )}

        <div className="coin-buttons">
          <button
            className="btn btn-primary"
            onClick={flip}
            disabled={phase === 'spinning'}
          >
            {phase === 'spinning' ? 'Flipping…' : 'Flip Coin'}
          </button>
          {phase === 'result' && (
            <button className="btn btn-ghost" onClick={reset}>Again</button>
          )}
        </div>
      </div>
    </div>
  );
}
