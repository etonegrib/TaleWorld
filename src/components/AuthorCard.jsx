import { useNavigate } from "react-router-dom";

export default function AuthorCard({ id, name, image }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/authors/${id}`)}
      className="group cursor-pointer"
      style={{
        width: "100%",
        maxWidth: "680px",
        minHeight: "160px",
        border: "2px solid #d8b0d8",
        borderRadius: "16px",
        padding: "1.2rem",
        marginBottom: "1.5rem",
        backgroundColor: "#faf5f9",
        boxShadow: "0 2px 6px rgba(200, 162, 200, 0.2)",
        fontFamily: "'UnifrakturCook', cursive",
        display: "flex",
        alignItems: "center",
        gap: "1.2rem",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(136, 77, 158, 0.3)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 2px 6px rgba(200, 162, 200, 0.2)";
      }}
      onMouseDown={e => {
        e.currentTarget.style.transform = "scale(0.98)";
      }}
      onMouseUp={e => {
        e.currentTarget.style.transform = "scale(1.03)";
      }}
    >
      {/* Текстовая часть */}
      <div style={{ flex: 1 }}>
        <h3
          style={{
            margin: 0,
            color: "#884d9e",
            fontSize: "1.7rem",
            fontWeight: "bold",
            transition: "color 0.3s ease",
          }}
        >
          {name}
        </h3>
        <p style={{ marginTop: "0.6rem", color: "#555", fontSize: "1.1rem" }}>
          📖 Нажмите, чтобы прочитать биографию
        </p>
      </div>

      {/* Фото в рамке */}
      <div
        style={{
          width: "130px",
          height: "130px",
          flexShrink: 0,
          border: "3px solid #d8b0d8",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(136, 77, 158, 0.2)",
          backgroundColor: "#fff",
          transition: "transform 0.3s ease",
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}
