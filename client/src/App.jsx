import ImageCard from './components/ImageCard';
import RocketCounter from './components/RocketCounter';
import CoinFlip from './components/CoinFlip';
import WhiskeyCounter from './components/WhiskeyCounter';

export default function App() {
  return (
    <div className="page">
      {/* Top row — 4 year recap images */}
      <div className="grid-top">
        <ImageCard src="/images/2022.png" alt="2022" />
        <ImageCard src="/images/2023.png" alt="2023" />
        <ImageCard src="/images/2024.png" alt="2024" />
        <ImageCard src="/images/2025.png" alt="2025" />
      </div>

      {/* Bottom row — interactive panels, no backgrounds */}
      <div className="grid-bottom">
        <RocketCounter />
        <CoinFlip />
        <WhiskeyCounter />
      </div>
    </div>
  );
}
