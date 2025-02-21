

export default function App() {
  return (
    <div className="font w-full h-full flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to the book recommender 📚
        </h1>
        <input
          type="text"
          className="border p-2 rounded-lg"
          placeholder="Search for a book..."
        />
      </div>
    </div>
  );
}