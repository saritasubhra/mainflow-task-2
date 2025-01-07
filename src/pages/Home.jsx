import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import MovieCard from "../components/MovieCard";

function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("superman");

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(import.meta.env.VITE_KEY);

  async function fetchMovies() {
    try {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_KEY}&s=${query}`
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      setMovies(data.Search);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleQuery() {
    fetchMovies();
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-6xl text-[#ddc2a2]">MovieApp</h1>
      <div className="flex gap-4 items-center justify-between py-4 px-8 bg-slate-700 w-[30%] rounded-full">
        <input
          type="text"
          placeholder="Search movies here"
          className="bg-transparent focus:outline-none w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleQuery}>
          <FaSearch fill="white" />
        </button>
      </div>
      <ul className="max-w-screen-lg grid grid-cols-3 gap-16">
        {movies.map((movie) => (
          <MovieCard key={movie.Title} movie={movie} />
        ))}
      </ul>
    </div>
  );
}

export default Home;
