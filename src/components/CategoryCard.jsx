// src/components/CategoryCard.jsx
import { useNavigate } from "react-router-dom";

export default function CategoryCard({ tag, image }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${encodeURIComponent(tag)}`);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        height: "150px",
        background: `url(${image}) center/cover`,
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        transition: "transform 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
      }}
    >
      <span style={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: "6px 12px",
        borderRadius: "8px",
        fontSize: "1.2rem",
        fontWeight: "bold",
        color: "#4b2e2e",
        textAlign: "center"
      }}>
        #{tag}
      </span>
    </div>
  );
}
