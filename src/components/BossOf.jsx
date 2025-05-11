import { useNavigate } from "react-router-dom";

export default function BossOf({ id, title, description }) {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(`/tale/${id}`)} // ✅ исправлено
      style={{
        border: "2px solid #d8b0d8",
        borderRadius: "12px",
        padding: "1.2rem",
        marginBottom: "1.2rem",
        cursor: "pointer",
        backgroundColor: "#faf5f9",
        boxShadow: "0 2px 6px rgba(200, 162, 200, 0.2)",
        transition: "all 0.25s ease-in-out",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow =
          "0 4px 10px rgba(200, 162, 200, 0.4)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow =
          "0 2px 6px rgba(200, 162, 200, 0.2)")
      }
    >
      <h3 style={{ margin: 0, color: "#884d9e", fontSize: "1.4rem" }}>
        {title}
      </h3>
      <p style={{ marginTop: "0.5rem", color: "#555" }}>{description}</p>
    </li>
  );
}
