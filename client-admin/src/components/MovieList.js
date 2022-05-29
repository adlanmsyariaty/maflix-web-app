function MovieList(props) {
  const { movie, showMovieCastData, toUpdateMovieData, deleteConfirmation } =
    props;
  return (
    <>
      <tr>
        <td>
          <div className="flex justify-center items-center min-w-[200px] max-w-[300px]">
            <img src={movie.imgUrl} />
          </div>
        </td>
        <td>{movie.title}</td>
        <td>
          <div className="flex justify-center items-center gap-2 flex-wrap text-red-600 font-bold">
            {movie.Genres.map((genre, index) => (
              <p key={index} className="w-full text-center">
                {genre.name}
              </p>
            ))}
          </div>
        </td>
        <td className="text-justify">{movie.synopsis}</td>
        <td>
          <a
            className="flex justify-center items-center text-5xl text-red-700"
            href={movie.trailerUrl}
          >
            <ion-icon name="logo-youtube"></ion-icon>
          </a>
        </td>
        <td>
          <div className="flex justify-center items-center">{movie.rating}</div>
        </td>
        <td>
          <div className="flex justify-center items-center gap-2 flex-wrap mx-2">
            <a
              className="bg-orange-500 p-2 rounded-lg text-white cursor-pointer shadow-md"
              onClick={() => showMovieCastData(movie.id)}
            >
              ShowCast
            </a>
          </div>
        </td>
        <td>
          <div className="flex justify-center items-center flex-wrap gap-2">
            <a
              className="bg-green-700 p-2 rounded-lg text-white cursor-pointer"
              onClick={() => toUpdateMovieData(movie.id)}
            >
              Update
            </a>
            <a
              className="bg-red-700 p-2 rounded-lg text-white cursor-pointer"
              onClick={(e) => deleteConfirmation(e, movie.id)}
            >
              Delete
            </a>
          </div>
        </td>
      </tr>
    </>
  );
}

export default MovieList;
