import React, { useState, useEffect } from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  loadMovies,
  deleteMovie,
  addMovie,
  updateMovie,
  changeFormStatus,
  showMovieCast,
  setNewMovieData,
  toUpdateMovie,
  checkedDataCast,
  checkedDataGenre,
  setNewGenreData,
  setNewCastData,
  setMovieLoadedStatus,
  setMovieKeyword
} from "../store/actions/movieAction";
import { loadGenres } from "../store/actions/genreAction";
import { loadCasts } from "../store/actions/castAction";
import AddUpdateForm from "./AddUpdateForm";
import MovieList from "./MovieList";
import swal from 'sweetalert'
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce"

function Movie() {
  const {
    movies,
    formStatus,
    movieCast,
    updateById,
    updateData,
    newMovie,
    newGenres,
    newCasts,
    checkedItemsCast,
    checkedItemsGenre,
    movieKeyword,
    isMovieLoaded
  } = useSelector((state) => state.movie);
  const { genres } = useSelector((state) => state.genre);
  const { casts } = useSelector((state) => state.cast);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [showModal, setShowModal] = useState(false);
  const [showModalCast, setShowModalCast] = useState(false);
  const { title, trailerUrl, imgUrl, rating, synopsis } = newMovie;
  const [searchCast, setSearchCast] = useState("");
  const [debouncedCast] = useDebounce(searchCast, 500)
  const [debouncedMovie] = useDebounce(movieKeyword, 500)
  const [showModalMovieConfirmation, setShowModalMovieConfirmation] = useState(false)
  const [movieIdToDelete, setMovieIdToDelete] = useState();
  const [isCastLoaded, setIsCastLoaded] = useState(true);

  useEffect(() => {
    setIsCastLoaded(true)
    setTimeout(() => {
      dispatch(loadMovies(debouncedMovie))
        .then((data) => {
          if (data.message) {
            localStorage.removeItem("access_token")
            swal({title: data.message, icon: 'error'})
            navigate('/login')
          } else {
            dispatch(setMovieLoadedStatus(false))
          }
        })
      dispatch(loadGenres());
      dispatch(loadCasts(debouncedCast))
        .then(() => setIsCastLoaded(false))
      }, 1000)
  }, [debouncedCast, debouncedMovie]);

  const deleteConfirmation = (e, id) => {
    e.preventDefault()
    setMovieIdToDelete(id)
    setShowModalMovieConfirmation(true)
  };

  const deleteMovieData = (e) => {
    e.preventDefault();
    dispatch(deleteMovie(movieIdToDelete))
      .then(() => {
        swal({title: 'Success to Delete', icon: 'success', timer: 1500, buttons: false})
        setShowModalMovieConfirmation(false)
      });
  };

  const searchForCast = (e) => {
    setSearchCast(e.target.value);
    setIsCastLoaded(true)
  };

  const checkMethod = (e) => {
    e.preventDefault();
    if (formStatus == "Add") {
      dispatch(addMovie(newMovie, newGenres, newCasts))
        .then((data) => {
          if (data.error) {
            if (Array.isArray(data.error)) {
              swal({title: 'Invalid Input', text: data.error.join('\n'), icon: 'error'})
            } else {
              swal({title: 'Invalid Input', text: data.error, icon: 'error'})
            }
          } else {
            swal({title: 'Success to Add Movie', icon: 'success', timer: 1500, buttons: false})
            dispatch(
              setNewMovieData({
                title: "",
                trailerUrl: "",
                imgUrl: "",
                rating: "",
                synopsis: "",
              })
            );
            dispatch(setNewGenreData([]));
            dispatch(setNewCastData([]));
            dispatch(checkedDataGenre({}));
            dispatch(checkedDataCast({}));
            setShowModal(false);
          }
        })
    } else if (formStatus == "Update") {
      dispatch(
        updateMovie(newMovie, newGenres, newCasts, updateById, updateData)
      ).then((data) => {
        if (data.error) {
          if (Array.isArray(data.error)) {
            swal({title: 'Invalid Input', text: data.error.join('\n'), icon: 'error'})
          } else {
            swal({title: 'Invalid Input', text: data.error, icon: 'error'})
          }
        } else {
          swal({title: 'Success to Update Movie', icon: 'success', timer: 1500, buttons: false})
          setShowModal(false);
        }
      });
    }
  };

  const toUpdateMovieData = (id) => {
    setSearchCast("");
    dispatch(toUpdateMovie(id)).then(() => setShowModal(true));
  };

  const toAddMovie = () => {
    setSearchCast("");
    dispatch(setNewGenreData([]));
    dispatch(setNewCastData([]));
    dispatch(checkedDataGenre({}));
    dispatch(checkedDataCast({}));
    dispatch(
      setNewMovieData({
        title: "",
        trailerUrl: "",
        imgUrl: "",
        rating: "",
        synopsis: "",
      })
    );
    dispatch(changeFormStatus("Add"));
    setShowModal(true);
  };

  const closeAddForm = () => {
    setMovieKeyword('')
    setSearchCast('')
    setShowModal(false);
    dispatch(checkedDataGenre({}));
    dispatch(checkedDataCast({}));
  };

  const showMovieCastData = (id) => {
    dispatch(showMovieCast(id)).then(() => setShowModalCast(true));
  };

  const onInputChangeForGenre = (e) => {
    const { value, checked, name } = e.target;
    if (checked) {
      dispatch(setNewGenreData([...newGenres, value]));
    } else {
      dispatch(
        setNewGenreData(newGenres.filter((genreId) => genreId != value))
      );
    }
    dispatch(checkedDataGenre({ ...checkedItemsGenre, [name]: checked }));
  };

  const onInputChangeForCast = (e) => {
    const { value, checked, name } = e.target;
    if (checked) {
      dispatch(setNewCastData([...newCasts, value]));
    } else {
      dispatch(setNewCastData(newCasts.filter((castId) => castId != value)));
    }
    dispatch(checkedDataCast({ ...checkedItemsCast, [name]: checked }));
  };

  const onInputChange = (e) => {
    dispatch(setNewMovieData({ ...newMovie, [e.target.name]: e.target.value }));
  };

  if (isMovieLoaded) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)]">
        <h1 className="text-white text-5xl animate-spin">
          <ion-icon name="reload-outline"></ion-icon>
        </h1>
      </div>
    );
  }

  if (movies.length < 1) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)]">
        <h1 className="text-white text-5xl">
          <p>Movie not found</p>
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className="details" id="movie-list">
        <div className="movieList">
          <div className="movieHeader">
            <h2>Movie List</h2>
            <Button
              color="lightBlue"
              type="button"
              onClick={(e) => toAddMovie()}
              ripple="light"
            >
              Add Movie
            </Button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Synopsis</th>
                <th>Trailer</th>
                <th>Rating</th>
                <th>Cast</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie, index) => (
                <MovieList
                  key={index}
                  movie={movie}
                  showMovieCastData={showMovieCastData}
                  toUpdateMovieData={toUpdateMovieData}
                  deleteMovieData={deleteMovieData}
                  deleteConfirmation={deleteConfirmation}
                  setShowModalMovieConfirmation={setShowModalMovieConfirmation}
                  showModalMovieConfirmation={showModalMovieConfirmation}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddUpdateForm
        showModal={showModal}
        closeAddForm={closeAddForm}
        formStatus={formStatus}
        checkMethod={checkMethod}
        onInputChange={onInputChange}
        title={title}
        trailerUrl={trailerUrl}
        imgUrl={imgUrl}
        synopsis={synopsis}
        rating={rating}
        genres={genres}
        checkedItemsGenre={checkedItemsGenre}
        onInputChangeForGenre={onInputChangeForGenre}
        casts={casts}
        checkedItemsCast={checkedItemsCast}
        onInputChangeForCast={onInputChangeForCast}
        searchCast={searchCast}
        searchForCast={searchForCast}
        isCastLoaded={isCastLoaded}
      />

      <Modal
        size="regular"
        active={showModalCast}
        toggler={() => setShowModalCast(false)}
        className="w-2/3"
      >
        <ModalHeader toggler={() => setShowModalCast(false)}>
          Cast <span className="text-white">--------------------------</span>
        </ModalHeader>
        <ModalBody>
          <div className="flex justify-around items-center flex-wrap gap-x-0 gap-y-5">
            {movieCast.map((mCast, index) => (
              <div
                key={index}
                className="flex justify-center items-center flex-wrap w-1/4"
              >
                <p className="w-full text-center p-0">{mCast.name}</p>
                <br></br>
                <img
                  src={mCast.profilePict}
                  className="object-cover w-20 h-20 rounded-full m-0"
                />
              </div>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            onClick={(e) => setShowModalCast(false)}
            className="text-red-800 hover:bg-red-100 hover:shadow-xl focus:outline-none py-2 px-5 rounded-lg"
          >
            Close
          </button>
        </ModalFooter>
      </Modal>

      <Modal
        size="regular"
        active={showModalMovieConfirmation}
        toggler={() => setShowModalMovieConfirmation(false)}
        className="w-2/3"
      >
        <ModalHeader toggler={() => setShowModalMovieConfirmation(false)}>
          Delete Movie{" "}
          <span className="text-white">--------------------------</span>
        </ModalHeader>
        <ModalBody>
          <h1>Are you sure you want to delete this movie?</h1>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            onClick={(e) => setShowModalMovieConfirmation(false)}
            className="text-red-800 hover:bg-red-100 hover:shadow-xl focus:outline-none py-2 px-5 rounded-lg"
          >
            No
          </button>

          <Button
            color="green"
            ripple="light"
            onClick={(e) => deleteMovieData(e)}
          >
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Movie;
