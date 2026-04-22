const PHOTOS = ["A.jpg", "C.jpg", "B.jpg", "D.jpg"];

export default function Mosaic() {
  return (
    <div className="mosaic-container">
      {PHOTOS.map((name) => (
        <img key={name} src={`/assets/images/photo/${name}`} alt={`Mosaic ${name}`} width="400" height="400" />
      ))}
    </div>
  );
}
