export default function ImageCard({ src, alt, year, song }) {
  return (
    <div className="image-col">
      {year && <span className="year-label">{year}</span>}
      <div className="image-card">
        <img src={src} alt={alt} />
      </div>
      {song && <span className="song-label">{song}</span>}
    </div>
  );
}
