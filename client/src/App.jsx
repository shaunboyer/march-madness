import ImageCard from './components/ImageCard';
import RocketCounter from './components/RocketCounter';
import CoinFlip from './components/CoinFlip';
import WhiskeyCounter from './components/WhiskeyCounter';
import OUCalculator from './components/OUCalculator';

const BELIEFS = [
  'Stay by the river',
  'No sugar Thursday',
  "Don't drink 12 coronas before noon",
  'Only sprites after midnight',
  'When Drew wants to go home, go home',
  "Sam's the man but he'll take all your money",
  'Chris is a bad man',
  'Whiskey lines change the tide per game',
  'Save rocket boosts for desperate situations',
  'Cherish yesterday, live today, dream tomorrow',
  'Thrive over survive',
];

const TENETS = [
  'Unit size is $200',
  '16s eighth unit ML, 15s quarter unit ML',
  '12s half unit ML, 11s half unit spread',
  "If we don't bet 16 ML, then take the 1 seed spread half unit",
  'Make bets for the next day while pregaming the night before',
  'Saturday pick teams you like and parlay even if -200',
  'Analytics first round, play the upsets and no YOLO bets until day 2',
  'Sometimes you need to feel alive… bet',
  'Stick to your guns',
];

export default function App() {
  return (
    <div className="page">

      {/* Page title */}
      <h1 className="page-title">March Madness 2026</h1>

      {/* Top row — 4 year recap images */}
      <div className="grid-top">
        <ImageCard src="/images/2022.png" alt="2022" year="2022" song="UCLA by RL Grime" />
        <ImageCard src="/images/2023.png" alt="2023" year="2023" song="Hypnotized by Purple Disco Machine" />
        <ImageCard src="/images/2024.png" alt="2024" year="2024" song="Coffee by Sylvan Esso" />
        <ImageCard src="/images/2025.png" alt="2025" year="2025" song="A Bar Song by Shaboozey" />
      </div>

      {/* Bottom row — interactive panels */}
      <div className="grid-bottom">
        <RocketCounter />
        <CoinFlip />
        <WhiskeyCounter />
      </div>

      {/* Live O/U Calculator */}
      <OUCalculator />

      {/* The Doctrine */}
      <section className="doctrine">
        <h2 className="doctrine-title">THE DOCTRINE</h2>
        <p className="doctrine-intro">
          The goal of the honey fund is inheritance for our kids to carry on the legacy and follow the doctrine.
        </p>
        <div className="doctrine-cols">
          <div className="doctrine-col">
            <h3 className="doctrine-subtitle">BELIEFS</h3>
            <ul className="doctrine-list">
              {BELIEFS.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </div>
          <div className="doctrine-col">
            <h3 className="doctrine-subtitle">TENETS</h3>
            <ul className="doctrine-list">
              {TENETS.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
