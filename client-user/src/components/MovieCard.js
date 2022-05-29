import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

function MovieCard(props) {
  const { movie } = props;
  const [formattedGenre, setFormattedGenre] = useState("");

  const convertGenre = () => {
    let newFormat = [];
    movie.Genres.forEach((el) => {
      newFormat.push(el.name);
    });
    setFormattedGenre(newFormat.join(", "));
  };

  useEffect(() => {
    convertGenre();
  }, []);

  return (
    <div className="movieCard">
      <img src={movie.imgUrl} />
      <div className="info">
        <h1 className="font-bold">{movie.title}</h1>
        <p>{movie.synopsis.slice(0, 60)}...</p>
        <br />
        <p>Genre : {formattedGenre}</p>
        <br />
        <p>Rating : {movie.rating}/10</p>
        <br />
        <Link to={"/detail/" + movie.id}>
          <p className="bg-gray-500 text-white p-1 w-[128px] cursor-pointer mb-2.5 text-center">
            DETAIL MOVIE
          </p>
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;
