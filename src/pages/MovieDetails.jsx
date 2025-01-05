import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const KEY = "745de33f";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState();

  useEffect(() => {
    // fetchMovieByID();
  }, []);

  async function fetchMovieByID() {
    try {
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${id}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      setMovie(data);
      console.log(res);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  if (!movie) return;

  const {
    Actors,
    Director,
    Genre,
    imdbRating,
    Released,
    Plot,
    Poster,
    Writer,
    Runtime,
    Language,
    BoxOffice,
    Title,
    Year,
  } = movie;

  return (
    <div className="flex">
      <div className="w-[30%] border border-white">
        <img src={Poster} alt={Title} />
      </div>
      <div className="w-[70%] border border-white"></div>
    </div>
  );
}

export default MovieDetails;
