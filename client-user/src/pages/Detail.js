import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MovieDetail from "../components/MovieDetail";
import { loadMovieDetail } from "../store/actions/movieAction";

function Detail() {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  const [formattedGenre, setFormattedGenre] = useState('');
  const [isMovieDetailLoaded, setIsMovieDetailLoaded] = useState(true)

  useEffect(() => {
    dispatch(loadMovieDetail(movieId)).then((data) => {
      setMovie(data);
      genreConverter(data.Genres);
      setIsMovieDetailLoaded(false)
    });
  }, []);

  const genreConverter = (genres) => {
    let newFormat = [];
    if (genres.length > 0) {
      genres.forEach((el) => {
          newFormat.push(el.name);
        });
        setFormattedGenre(newFormat.join(' · '))
    }
  };

  return (
    <div className="h-[100vh] flex justify-center items-center text-white">
      <div className="w-2/3 h-[100vh] pt-[40px]">
        <div className="px-5 pb-8 pt-8 w-full h-full">
          <iframe
            className="w-full h-full"
            src={movie.trailerUrl}
            frameBorder="0"
            allow="autoplay"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="w-1/3 h-[100vh] pt-[70px] px-5">
        <div className="flex justify-center h-full flex-wrap">
          <MovieDetail movie={movie} formattedGenre={formattedGenre} isMovieDetailLoaded={isMovieDetailLoaded}/>
        </div>
      </div>
    </div>
  );
}

export default Detail;
