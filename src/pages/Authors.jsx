import { authors } from "../data/authors";
import AuthorCard from "../components/AuthorCard";

export default function Authors() {
  const knownAuthors = authors.filter(author => author.name !== "Народный фольклор");

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {knownAuthors.map(author => (
        <AuthorCard
          key={author.id}
          id={author.id}
          name={author.name}
          image={author.image}
        />
      ))}
    </div>
  );
}
