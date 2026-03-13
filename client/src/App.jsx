import ImageCard from './components/ImageCard';
import RocketCounter from './components/RocketCounter';
import CoinFlip from './components/CoinFlip';
import WhiskeyCounter from './components/WhiskeyCounter';

export default function App() {
  return (
    <div className="page">
      <div className="grid">
        {/* Top row — year recap images */}
        <ImageCard src="/images/2022.png" alt="2022" />
        <ImageCard src="/images/2023.png" alt="2023" />
        <ImageCard src="/images/2024.png" alt="2024" />

        {/* Bottom row — interactive panels */}
        <RocketCounter />
        <CoinFlip />
        <WhiskeyCounter />
      </div>
    </div>
  );
}
