import React, { useState, useEffect } from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import { useSelector, useDispatch } from "react-redux";
import {
  loadGenres,
  deleteGenre,
  addGenre,
} from "../store/actions/genreAction";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function Genre() {
  const { genres } = useSelector((state) => state.genre);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [genreIdToDelete, setGenreIdToDelete] = useState();
  const [showModalGenre, setShowModalGenre] = useState(false);
  const [showModalGenreConfirmation, setShowModalGenreConfirmation] =
    useState(false);
  const [isGenreLoaded, setIsGenreLoaded] = useState(true);
  const [newGenre, setNewGenre] = useState({
    name: "",
  });

  const { name } = newGenre;

  const deletConfirmation = (e, id) => {
    e.preventDefault();
    setGenreIdToDelete(id);
    setShowModalGenreConfirmation(true);
  };

  const deleteGenreData = (e) => {
    dispatch(deleteGenre(genreIdToDelete)).then(() => {
      swal({
        title: "Success to Delete",
        icon: "success",
        timer: 1500,
        buttons: false,
      });
      setShowModalGenreConfirmation(false);
    });
  };

  const onInputChange = (e) => {
    setNewGenre({ ...newGenre, [e.target.name]: e.target.value });
  };

  const addGenreData = (e) => {
    e.preventDefault();
    dispatch(addGenre(newGenre))
      .then((data) => {
        if (data.message) {
          if (Array.isArray(data.message)) {
            swal({
              title: "Invalid Input",
              text: data.message.join("\n"),
              icon: "error",
            });
          } else {
            swal({ title: "Invalid Input", text: data.message, icon: "error" });
          }
        } else {
          swal({
            title: "Success to Add Genre",
            icon: "success",
            timer: 1500,
            buttons: false,
          });
          setShowModalGenre(false);
        }
      })
      .then(() =>
        setNewGenre({
          name: "",
        })
      );
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(loadGenres()).then((data) => {
        setIsGenreLoaded(false);
        if (data.message) {
          localStorage.removeItem("access_token");
          swal({ title: data.message, icon: "error" });
          navigate("/login");
        }
      });
    }, 500);
  }, []);

  if (isGenreLoaded) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)]">
        <h1 className="text-white text-5xl animate-spin">
          <ion-icon name="reload-outline"></ion-icon>
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className="details" id="movie-list">
        <div className="movieList">
          <div className="movieHeader">
            <h2>Genre List</h2>
            <Button
              color="lightBlue"
              type="button"
              onClick={(e) => setShowModalGenre(true)}
              ripple="light"
            >
              Add Genre
            </Button>
          </div>
          <table>
            <thead>
              <tr>
                <th>NO</th>
                <th>NAME</th>
                <th>CREATED AT</th>
                <th>UPDATED AT</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {genres.map((genre, index) => (
                <tr key={index}>
                  <td>
                    <div className="flex justify-center items-center gap-2 flex-wrap">
                      <p>{index + 1}</p>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center items-center gap-2 flex-wrap">
                      <p>{genre.name}</p>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center items-center gap-2 flex-wrap">
                      <p>
                        {new Date(genre.createdAt).toLocaleDateString("en-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                        })}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center items-center gap-2 flex-wrap">
                      <p>
                        {new Date(genre.updatedAt).toLocaleDateString("en-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                        })}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div
                      className="flex justify-center items-center gap-2 flex-wrap"
                      onClick={(e) =>
                        deletConfirmation(e, genre.id)
                      }
                    >
                      <a className="bg-red-700 p-2 rounded-lg text-white cursor-pointer m-3">
                        Delete
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        size="regular"
        active={showModalGenre}
        toggler={() => setShowModalGenre(false)}
        className="w-2/3"
      >
        <ModalHeader toggler={() => setShowModalGenre(false)}>
          Add Genre{" "}
          <span className="text-white">--------------------------</span>
        </ModalHeader>
        <form onSubmit={(e) => addGenreData(e)}>
          <ModalBody>
            <Input
              type="text"
              color="lightBlue"
              size="regular"
              outline={true}
              placeholder="Genre"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
            />
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              onClick={(e) => setShowModalGenre(false)}
              className="text-red-800 hover:bg-red-100 hover:shadow-xl focus:outline-none py-2 px-5 rounded-lg"
            >
              Close
            </button>

            <Button color="green" ripple="light">
              Save
            </Button>
          </ModalFooter>
        </form>
      </Modal>

      <Modal
        size="regular"
        active={showModalGenreConfirmation}
        toggler={() => setShowModalGenreConfirmation(false)}
        className="w-2/3"
      >
        <ModalHeader toggler={() => setShowModalGenreConfirmation(false)}>
          Delete Genre{" "}
          <span className="text-white">--------------------------</span>
        </ModalHeader>
        <ModalBody>
          <h1>Are you sure you want to delete this genre?</h1>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            onClick={(e) => setShowModalGenreConfirmation(false)}
            className="text-red-800 hover:bg-red-100 hover:shadow-xl focus:outline-none py-2 px-5 rounded-lg"
          >
            No
          </button>

          <Button
            color="green"
            ripple="light"
            onClick={(e) => deleteGenreData(e)}
          >
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Genre;
