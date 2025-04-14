// src/components/BossOf.jsx
export default function BossOf({ title, description }) {
    return (
      <li className="boss-of">
        <p>
          <strong>{title}</strong> {description}
        </p>
      </li>
    )
  }