// src/components/TaleCard.jsx
import { Link } from "react-router-dom";

export default function TaleCard({ id, title, description }) {
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-[1.03] hover:shadow-2xl bg-cover bg-center"
      style={{
        backgroundImage: "url('/parchment-bg.jpg')",
        minHeight: "250px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <div className="p-5 bg-white bg-opacity-80 backdrop-blur-sm h-full flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-brown-800">{title}</h3>
          <p className="text-gray-700 text-sm">{description?.slice(0, 100)}...</p>
        </div>
        <Link
          to={`/tales/${id}`}
          className="mt-4 inline-block text-center bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Читать сказку
        </Link>
      </div>
    </div>
  );
}
