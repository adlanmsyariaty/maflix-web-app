import MovieList from "../components/MovieList";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMovie,
  loadMovies,
  loadMoviesByGenre,
  loadMoviesByCast,
} from "../store/actions/movieAction";
import { loadGenres } from "../store/actions/genreAction";
import { loadCasts } from "../store/actions/castAction";

import Button from "@material-tailwind/react/Button";
import GenreList from "../components/GenreList";

function Home() {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movie);
  const { genres } = useSelector((state) => state.genre);
  const { casts } = useSelector((state) => state.cast);
  const [genreTitle, setGenreTitle] = useState("All");
  const [genreId, setGenreId] = useState();
  const [castId, setCastId] = useState();
  const [statusGenre, setStatusGenre] = useState("All");
  const [isMovieLoaded, setIsMovieLoaded] = useState(true);
  const [isGenreLoaded, setIsGenreLoaded] = useState(true);

  useEffect(() => {
    dispatch(loadMovies()).then(() => setIsMovieLoaded(false));
    dispatch(loadGenres()).then(() => setIsGenreLoaded(false));
    dispatch(loadCasts());
  }, []);

  const fetchAllMovie = () => {
    setIsMovieLoaded(true)
    setStatusGenre("All");
    setGenreId();
    setCastId();
    setGenreTitle("All");
    dispatch(loadMovies())
      .then(() => setIsMovieLoaded(false))
  };

  const filteredByGenre = (id, title) => {
    setIsMovieLoaded(true)
    setGenreTitle(title);
    setGenreId(id);
    dispatch(loadMoviesByGenre(id, castId)).then((data) => {
      dispatch(fetchMovie(data));
      setIsMovieLoaded(false)
    });
  };

  const searchMovie = () => {
    if (!genreId && !castId) {
      dispatch(loadMovies());
    } else if (genreId && !castId) {
      dispatch(loadMoviesByGenre(genreId, castId)).then((data) => {
        dispatch(fetchMovie(data));
      });
    } else if (!genreId && castId) {
      dispatch(loadMoviesByCast(castId)).then((data) => {
        dispatch(fetchMovie(data));
      });
    } else {
      dispatch(loadMoviesByGenre(genreId, castId)).then((data) => {
        dispatch(fetchMovie(data));
      });
      setIsMovieLoaded(false)
    }
  };

  return (
    <>
      <header className='text-white object-contain bg-cover h-[650px] bg-[url("https://image.tmdb.org/t/p/original/gFZriCkpJYsApPZEF3jhxL4yLzG.jpg")]'>
        <div className="h-[120px]" />
        <div className="h-[400px] w-[500px] ml-[50px]">
          <h1 className="text-[80px] font-bold text-center text-red-700">
            MONEY HEIST
          </h1>
          <p>
            To carry out the biggest heist in history, a myste…suicide wager
            will lead to everything or nothing. (SAMPLE ONLY)
          </p>
          <div className="flex flex-nowrap justify-start items-center mt-3">
            <button className="banner__button">Play</button>
            <button className="banner__button">My List</button>
          </div>
        </div>
        <div className="h-[130px] bg-gradient-to-b from-transparent to-[#111]" />
      </header>

      <div className="bg-[#111] h-16 flex justify-center items-center">
        <div className="text-white text-center flex flex-wrap gap-x-10 gap-y-5 justify-center items-center text-lg font-semibold">
          <GenreList
            genres={genres}
            statusGenre={statusGenre}
            setStatusGenre={setStatusGenre}
            filteredByGenre={filteredByGenre}
            isGenreLoaded={isGenreLoaded}
            fetchAllMovie={fetchAllMovie}
          />
        </div>
      </div>

      <div className="h-[70px] bg-gradient-to-t from-[#222] to-[#111]" />

      <div className="flex justify-center flex-wrap pb-10">
        <div className="flex flex-wrap w-1/4 justify-center">
          <div className="text-white flex flex-wrap justify-start items-start w-full mx-5 border-2 rounded-xl h-[150px] border-red-600 bg-[#111] shadow-red-600">
            <select
              value={castId || ""}
              className="text-black p-2 rounded-md focus:outline-none mt-8 mx-9 w-full"
              onChange={(e) => setCastId(e.target.value)}
            >
              <option value="" disabled>
                Choose Movie by Cast
              </option>
              {casts.map((cast) => (
                <option value={cast.id} key={cast.id}>
                  {cast.name}
                </option>
              ))}
            </select>

            <div className="w-full items-center ml-9">
              <Button
                color="red"
                buttonType="outline"
                size="sm"
                rounded={false}
                block={false}
                iconOnly={false}
                ripple="dark"
                onClick={() => {
                  searchMovie();
                }}
              >
                Search
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap w-3/4 justify-center">
          <div className="w-full ml-8 text-white">
            <h1>{genreTitle} Movies</h1>
          </div>
          <MovieList movies={movies} isMovieLoaded={isMovieLoaded} />
        </div>
      </div>
    </>
  );
}

export default Home;
