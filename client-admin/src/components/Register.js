import React, { useState, useEffect } from "react";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser } from '../store/actions/userAction'
import swal from 'sweetalert'

function Register() {
  const [newAdmin, setNewAdmin] = useState({
    email: "",
    password: "",
    role: "admin",
    address: "",
    phoneNumber: "",
  });

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { email, password, address, phoneNumber } = newAdmin;

  const onInputChangeForAdmin = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  const addAdmin =  (e) => {
    e.preventDefault()
    dispatch(addUser(newAdmin))
      .then((data) => {
        if (!data.message) {
          swal({title: `Success to Register ${data.email}`, icon: 'success'})
        } else {
          if (Array.isArray(data.message)) {
            swal({title: 'Invalid Input', text: data.message.join('\n'), icon: 'error'})
          } else {
            swal({title: 'Invalid Input', text: data.message, icon: 'error'})
          }
        }
      })
      .then(() => setNewAdmin({
        email: "",
        password: "",
        role: "admin",
        address: "",
        phoneNumber: "",
        })
      )
  };

  const cancelRegister = () => {
    navigate('/')
  }

  return (
    <>
      {/* Register New Admin Form */}
      <div className="details" id="movie-list">
        <div className="movieList">
          <div className="movieHeader">
            <h2>Register New Admin</h2>
          </div>
          <br></br>
          <span className="text-2xl font-bold">Personal Information</span>
          <span className="text-gray-500">
            Please input new data correctly and real address. Information will
            be kept strictly confidential.
          </span>
          <br></br>
          <div className="flex justify-center items-center">
            <div className="w-4/5">
              <form onSubmit={(e) => addAdmin(e)}>
                <Input
                  type="text"
                  color="lightBlue"
                  size="lg"
                  outline={false}
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => onInputChangeForAdmin(e)}
                />
                <br></br>
                <Input
                  type="password"
                  color="lightBlue"
                  size="lg"
                  outline={false}
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => onInputChangeForAdmin(e)}
                />
                <br></br>
                <Input
                  type="text"
                  color="lightBlue"
                  size="lg"
                  outline={false}
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => onInputChangeForAdmin(e)}
                />
                <br></br>
                <Input
                  type="text"
                  color="lightBlue"
                  size="lg"
                  outline={false}
                  placeholder="Address"
                  name="address"
                  value={address}
                  onChange={(e) => onInputChangeForAdmin(e)}
                />
                <br></br>
                <div className="flex justify-end items-center gap-5">
                  <button
                    type="button"
                    className="text-red-800 font-bold hover:bg-red-100 hover:shadow-xl focus:outline-none py-2 px-5 rounded-lg"
                    onClick={() => cancelRegister()}
                  >
                    Cancel
                  </button>
                  <Button
                    color="teal"
                    buttonType="filled"
                    size="regular"
                    rounded={false}
                    block={false}
                    iconOnly={false}
                    ripple="light"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
