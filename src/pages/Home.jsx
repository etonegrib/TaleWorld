// src/pages/Home.jsx
import { ways } from "../data/ways";
import BossOf from "../components/BossOf";

export default function Home() {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {ways.map((tale) => (
        <BossOf
          key={tale.id}
          id={tale.id}
          title={tale.title}
          description={tale.description}
        />
      ))}
    </ul>
  );
}
