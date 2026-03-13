export default function ImageCard({ src, alt }) {
  return (
    <div className="image-card">
      <img src={src} alt={alt} />
    </div>
  );
}
