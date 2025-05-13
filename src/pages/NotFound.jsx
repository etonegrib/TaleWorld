import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        background: "url('/parchment-bg.jpg') repeat",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'UnifrakturCook', cursive",
        color: "#5e3b3b",
        padding: "2rem",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.85)",
          border: "2px solid #d8b0d8",
          borderRadius: "16px",
          boxShadow: "0 6px 14px rgba(0,0,0,0.2)",
          padding: "3rem 2rem",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "4rem", marginBottom: "1rem" }}>🧚‍♀️ 404</h1>
        <h2 style={{ fontSize: "2rem", marginBottom: "1.2rem" }}>
          Ой! Такой страницы не существует
        </h2>
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
          Похоже, вы заблудились в волшебном лесу...
        </p>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            backgroundColor: "#d8b0d8",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "12px",
            fontSize: "1.1rem",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#c294c2")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#d8b0d8")}
        >
          🔙 Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
