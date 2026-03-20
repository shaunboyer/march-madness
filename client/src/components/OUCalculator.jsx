import { useState, useMemo } from 'react';

// ── Math helpers ─────────────────────────────────────────────────
function erf(x) {
  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * x);
  const y =
    1 -
    (((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t +
      0.254829592) *
      t) *
      Math.exp(-x * x);
  return sign * y;
}

function normalCDF(x, mean, std) {
  if (std <= 0) return x >= mean ? 1 : 0;
  return 0.5 * (1 + erf((x - mean) / (std * Math.sqrt(2))));
}

const FULL_GAME_SIGMA = 14;
const TOTAL_MINUTES   = 40;

export default function OUCalculator() {
  const [score1,  setScore1]  = useState('');
  const [score2,  setScore2]  = useState('');
  const [line,    setLine]    = useState('');
  const [half,    setHalf]    = useState('1');
  const [minLeft, setMinLeft] = useState('');
  const [secLeft, setSecLeft] = useState('');

  const result = useMemo(() => {
    const s1 = parseFloat(score1);
    const s2 = parseFloat(score2);
    const ln = parseFloat(line);
    const ml = parseFloat(minLeft) || 0;
    const sl = parseFloat(secLeft) || 0;
    const h  = parseInt(half);

    if ([s1, s2, ln].some(isNaN)) return null;
    if (minLeft === '' && secLeft === '') return null;
    if (sl < 0 || sl > 59) return null;
    if (ml < 0 || ml > 20) return null;

    const totalMinLeft   = ml + sl / 60;
    const minutesElapsed = h === 1 ? (20 - totalMinLeft) : (40 - totalMinLeft);
    const minutesLeft    = TOTAL_MINUTES - minutesElapsed;

    if (minutesElapsed <= 0) return null;

    const pace           = (s1 + s2) / minutesElapsed;
    const expectedRemain = pace * minutesLeft;
    const projectedFinal = (s1 + s2) + expectedRemain;
    const pointsNeeded   = ln - (s1 + s2);
    const sigmaRemaining = FULL_GAME_SIGMA * Math.sqrt(minutesLeft / TOTAL_MINUTES);

    const probUnder = normalCDF(ln, projectedFinal, sigmaRemaining);
    const probOver  = 1 - probUnder;

    return {
      currentTotal:   s1 + s2,
      projectedFinal: Math.round(projectedFinal * 10) / 10,
      pointsNeeded:   Math.round(pointsNeeded * 10) / 10,
      pace:           Math.round(pace * 10) / 10,
      probOver:       Math.round(probOver * 1000) / 10,
      probUnder:      Math.round(probUnder * 1000) / 10,
    };
  }, [score1, score2, line, half, minLeft, secLeft]);

  return (
    <section className="calc-section">
      <h2 className="calc-title">LIVE O/U CALCULATOR</h2>
      <p className="calc-subtitle">College Basketball · Two 20-min halves</p>

      <div className="calc-inputs">
        <label className="calc-field">
          <span>Team 1</span>
          <input className="calc-input" type="number" min="0" placeholder="0"
            value={score1} onChange={(e) => setScore1(e.target.value)} />
        </label>
        <label className="calc-field">
          <span>Team 2</span>
          <input className="calc-input" type="number" min="0" placeholder="0"
            value={score2} onChange={(e) => setScore2(e.target.value)} />
        </label>
        <label className="calc-field">
          <span>O/U Line</span>
          <input className="calc-input" type="number" min="0" placeholder="150"
            value={line} onChange={(e) => setLine(e.target.value)} />
        </label>
        <label className="calc-field">
          <span>Half</span>
          <select className="calc-input" value={half} onChange={(e) => setHalf(e.target.value)}>
            <option value="1">1st</option>
            <option value="2">2nd</option>
          </select>
        </label>

        {/* Time remaining — min : sec */}
        <div className="calc-field">
          <span>Time Left</span>
          <div className="calc-time">
            <input className="calc-input calc-input-sm" type="number" min="0" max="20"
              placeholder="10" value={minLeft}
              onChange={(e) => setMinLeft(e.target.value)} />
            <span className="calc-colon">:</span>
            <input className="calc-input calc-input-sm" type="number" min="0" max="59"
              placeholder="00" value={secLeft}
              onChange={(e) => setSecLeft(e.target.value)} />
          </div>
        </div>
      </div>

      {result && (
        <div className="calc-results">
          <div className="calc-stat">
            <span className="calc-stat-value">{result.currentTotal}</span>
            <span className="calc-stat-label">Current Total</span>
          </div>
          <div className="calc-stat">
            <span className="calc-stat-value">{result.pointsNeeded > 0 ? `+${result.pointsNeeded}` : result.pointsNeeded}</span>
            <span className="calc-stat-label">Pts Needed</span>
          </div>
          <div className="calc-stat">
            <span className="calc-stat-value">{result.projectedFinal}</span>
            <span className="calc-stat-label">Projected Final</span>
          </div>
          <div className="calc-stat">
            <span className="calc-stat-value">{result.pace}</span>
            <span className="calc-stat-label">Pts / Min</span>
          </div>
          <div className={`calc-stat calc-over ${result.probOver >= 50 ? 'hot' : ''}`}>
            <span className="calc-stat-value">{result.probOver}%</span>
            <span className="calc-stat-label">Over</span>
          </div>
          <div className={`calc-stat calc-under ${result.probUnder >= 50 ? 'hot' : ''}`}>
            <span className="calc-stat-value">{result.probUnder}%</span>
            <span className="calc-stat-label">Under</span>
          </div>
        </div>
      )}

      {!result && (
        <p className="calc-empty">Enter the score, line, and time to see projections</p>
      )}
    </section>
  );
}
