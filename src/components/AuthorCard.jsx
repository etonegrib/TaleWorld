import { useNavigate } from "react-router-dom";

export default function AuthorCard({ id, name, image }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/authors/${id}`)}
      className="group cursor-pointer flex items-center justify-between transition-transform duration-300 hover:scale-105 hover:shadow-lg"
      style={{
        width: "100%",
        maxWidth: "680px",
        height: "160px",
        border: "2px solid #d8b0d8",
        borderRadius: "12px",
        padding: "1.2rem",
        marginBottom: "1.5rem",
        backgroundColor: "#faf5f9",
        boxShadow: "0 2px 6px rgba(200, 162, 200, 0.2)",
        fontFamily: "'UnifrakturCook', cursive",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Текстовая часть */}
      <div style={{ flex: 1, paddingRight: "1rem", zIndex: 2 }}>
        <h3
          style={{
            margin: 0,
            color: "#884d9e",
            fontSize: "1.7rem",
            fontWeight: "bold",
          }}
        >
          {name}
        </h3>
        <p style={{ marginTop: "0.6rem", color: "#555", fontSize: "1.1rem" }}>
          📖 Нажмите, чтобы прочитать биографию
        </p>
      </div>

      {/* Фото справа с размытым левым краем */}
      <div
        style={{
          width: "160px",
          height: "100%",
          position: "absolute",
          top: 0,
          right: 0,
          overflow: "hidden",
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          {/* Основное изображение */}
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

          {/* Размытый наложенный слой слева */}
          <div
            style={{
              content: '""',
              position: "absolute",
              left: "-40px",
              top: 0,
              height: "100%",
              width: "60px",
              background: `linear-gradient(to left, rgba(250,245,249,0) 0%, #faf5f9 100%)`,
              zIndex: 1,
              filter: "blur(12px)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
