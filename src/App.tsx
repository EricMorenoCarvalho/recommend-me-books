import { useState } from "react";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [booksArray, setBooksArray] = useState<any[]>([]);
  const [noResults, setNoResults] = useState(false);

  const searchBooks = async () => {
    if (isSearching && searchQuery.length > 2) {
      const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.items && data.items.length > 0) {
            const updatedBookArray = data.items.slice(0, 3).map((item: any) => [
              item.volumeInfo.title,
              item.volumeInfo.authors
                ? item.volumeInfo.authors.join(", ")
                : "No disponibles",
              item.volumeInfo.imageLinks
                ? item.volumeInfo.imageLinks.thumbnail
                : "No disponible",
            ]);
            setBooksArray(updatedBookArray);
            setNoResults(false);
          } else {
            setNoResults(true);
          }
        })
        .catch((error) => {
          console.error("Error al hacer la solicitud:", error);
          setNoResults(true);
        });
    } else {
      console.log("Not searching");
    }
  };

  function handleSearchQuery(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    setSearchQuery(query);
    setIsSearching(query.length >= 3);
  }

  const limitString = (str: string, length: number) => {
    return str.length > length ? str.slice(0, length) + "..." : str;
  };

  return (
    <div className="font w-full h-full flex min-h-screen items-center justify-center">
      <div className="text-center w-[75%]">
        <h1 className="text-2xl font-bold mb-4">Welcome to the book recommender 📚</h1>
        <input
          type="text"
          className="border p-2 w-[80%] rounded-lg"
          placeholder="Search for a book, author, phrase..."
          value={searchQuery}
          onChange={handleSearchQuery}
        />
        <button className="border p-2 rounded-lg mx-2 mt-2" onClick={searchBooks}>
          Search
        </button>

        {noResults && <p className="text-red-500 mt-4">No se encontraron resultados.</p>}

        <div className="grid grid-cols-3 gap-4 mt-4 mx-auto w-[87.5%]">
          {booksArray.map((book, index) => (
            <div key={index} className="flex flex-col items-center justify-between border rounded-lg p-4">
              <div className="flex items-center space-x-4 mb-2">
                <span>{limitString(book[0], 25)}</span>
                <span>{limitString(book[1], 25)}</span>
              </div>
              {book[2] != "No disponible" ? <img src={book[2]} alt="" className="max-h-20" /> : <span>No disponible</span>}
              <button className="border p-2 rounded-lg mt-2">✔️</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}