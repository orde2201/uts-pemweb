import "./componentStyle.css";

// contoh sederhana Card
export default function Card({ data, image, onClick, category, area }) {
  return (
    <div className="card" onClick={onClick} style={{ cursor: "pointer" }}>
      <img src={image} alt={data} className="cardImage" />
      <h3 id="cardName">{data}</h3>
      <div id="tagsCard">
        <h5 className="tags">{category}</h5>
        <h5 className="tags">{area}</h5>
      </div>
    </div>
  );
}
