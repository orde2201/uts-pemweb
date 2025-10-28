import "./componentStyle.css";

function CardResep({ data, image }) {
  return (
    <div className="card">
      {image && <img src={image} className="cardImage" alt={data} />}
      <div className="container">
        <h4>
          <b>{data}</b>
        </h4>
        <p>Deskripsi makanan</p>
      </div>
    </div>
  );
}
