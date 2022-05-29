import React, { useState, useEffect } from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import { useSelector, useDispatch } from 'react-redux'
import { loadCasts, deleteCast, addCast } from '../store/actions/castAction'
import { useNavigate } from 'react-router-dom'
import swal from "sweetalert"

function Cast() {
  const { casts } = useSelector((state) => state.cast)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      dispatch(loadCasts())
        .then((data) => {
          setIsCastLoaded(false)
          if (data.message) {
            localStorage.removeItem("access_token")
            swal({title: data.message, icon: 'error'})
            navigate('/login')
          }
        })
    }, 500)
  }, []);

  const [showModalCast, setShowModalCast] = useState(false);
  const [showModalCastConfirmation, setShowModalCastConfirmation] = useState(false);
  const [isCastLoaded, setIsCastLoaded] = useState(true);
  const [castIdToDelete, setCastIdToDelete] = useState();
  const [newCast, setNewCast] = useState({
    name: "",
    profilePict: "",
  });

  const { name, profilePict } = newCast;

  const onInputChangeCast = (e) => {
    setNewCast({ ...newCast, [e.target.name]: e.target.value });
  };

  const deletConfirmation = (e, id) => {
    e.preventDefault()
    setCastIdToDelete(id)
    setShowModalCastConfirmation(true)
  };

  const deleteCastData = (e) => {
    dispatch(deleteCast(castIdToDelete))
      .then(() => {
        swal({title: 'Success to Delete', icon: 'success', timer: 1500, buttons: false})
        setShowModalCastConfirmation(false)
      })
  }

  const addCastData = (e) => {
    e.preventDefault()
    dispatch(addCast(newCast))
      .then((data) => {
        if (data.message) {
          if (Array.isArray(data.message)) {
            swal({title: 'Invalid Input', text: data.message.join('\n'), icon: 'error'})
          } else {
            swal({title: 'Invalid Input', text: data.message, icon: 'error'})
          }
        } else {
          swal({title: 'Success to Add Cast', icon: 'success', timer: 1500, buttons: false})
          setShowModalCast(false)
        }
      })
      .then(() => setNewCast({
          name: "",
          profilePict: "",
        })
      )
  };

  if (isCastLoaded) {
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
            <h2>Cast List</h2>
            <Button
              color="lightBlue"
              type="button"
              onClick={(e) => setShowModalCast(true)}
              ripple="light"
            >
              Add Cast
            </Button>
          </div>
          <table>
            <thead>
              <tr>
                <th>NO</th>
                <th>PROFILE PICTURE</th>
                <th>NAME</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {casts.map((cast, index) => (
                <tr key={index}>
                  <td>
                    <div className="flex justify-center items-center gap-2 flex-wrap">
                      <p>{index + 1}</p>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center items-center gap-2 flex-wrap">
                      <img
                        src={cast.profilePict}
                        className="object-cover w-20 h-20 rounded-full m-0"
                      />
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center items-center gap-2 flex-wrap">
                      <p>{cast.name}</p>
                    </div>
                  </td>
                  <td>
                    <div
                      className="flex justify-center items-center gap-2 flex-wrap"
                      onClick={(e) => deletConfirmation(e, cast.id)}
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
        active={showModalCast}
        toggler={() => setShowModalCast(false)}
        className="w-2/3"
      >
        <ModalHeader toggler={() => setShowModalCast(false)}>
          Add Cast{" "}
          <span className="text-white">--------------------------</span>
        </ModalHeader>
        <form onSubmit={(e) => addCastData(e)}>
          <ModalBody>
            <Input
              type="text"
              color="lightBlue"
              size="regular"
              outline={true}
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => onInputChangeCast(e)}
            />
            <br></br>
            <Input
              type="text"
              color="lightBlue"
              size="regular"
              outline={true}
              placeholder="Profile Picture URL"
              name="profilePict"
              value={profilePict}
              onChange={(e) => onInputChangeCast(e)}
            />
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              onClick={(e) => setShowModalCast(false)}
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
        active={showModalCastConfirmation}
        toggler={() => setShowModalCastConfirmation(false)}
        className="w-2/3"
      >
        <ModalHeader toggler={() => setShowModalCastConfirmation(false)}>
          Delete Cast{" "}
          <span className="text-white">--------------------------</span>
        </ModalHeader>
        <ModalBody>
          <h1>Are you sure you want to delete this cast?</h1>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            onClick={(e) => setShowModalCastConfirmation(false)}
            className="text-red-800 hover:bg-red-100 hover:shadow-xl focus:outline-none py-2 px-5 rounded-lg"
          >
            No
          </button>

          <Button color="green" ripple="light" onClick={(e) => deleteCastData(e)}>
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Cast;
