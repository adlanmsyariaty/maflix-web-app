import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { login } from '../store/actions/userAction'
import { useDispatch } from 'react-redux'
import swal from 'sweetalert'

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const { email, password } = user;

  const onInputChangeForLogin = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginProcess = (e) => {
    e.preventDefault()
    dispatch(login(user))
      .then((data) => {
        if (data.message) {
          swal({title: data.message, icon: "error"})
        } else {
          swal({title: `Welcome, ${user.email}`, icon: "success"})
          navigate('/')
        }
      })
  }

  return (
    <div className="flex justify-center h-screen items-center bg-cover bg-[url('https://image.tmdb.org/t/p/original/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg')]">

        <form className="w-full max-w-sm" onSubmit={(e) => loginProcess(e)}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
              >
                Email
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-white-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-600"
                id="inline-full-name"
                type="text"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => onInputChangeForLogin(e)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
              >
                Password
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-600"
                id="inline-password"
                type="password"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={(e) => onInputChangeForLogin(e)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-red-600 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
    </div>
  );
}

export default Login;
