import { useState, useEffect } from 'react';

export default function WhiskeyCounter() {
  const [count,   setCount]   = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/counters')
      .then((r) => r.json())
      .then((d) => { setCount(d.whiskey ?? 0); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const call = (action) =>
    fetch(`/api/counters/whiskey/${action}`, { method: 'POST' })
      .then((r) => r.json())
      .then((d) => setCount(d.value));

  return (
    <div className="feature-card">
      <img className="banner-img" src="/images/whiskey.png" alt="Whiskey" />
      <div className="card-body">
        <span className="counter-label">Whiskey Line</span>
        <div className="counter-controls">
          <button
            className="btn btn-icon"
            onClick={() => call('decrement')}
            disabled={loading || count === 0}
            aria-label="Decrease"
          >−</button>
          <span className="counter-value">{loading ? '–' : count}</span>
          <button
            className="btn btn-icon"
            onClick={() => call('increment')}
            disabled={loading}
            aria-label="Increase"
          >+</button>
        </div>
        <button
          className="btn btn-ghost"
          onClick={() => call('reset')}
          disabled={loading || count === 0}
        >Reset</button>
      </div>
    </div>
  );
}
