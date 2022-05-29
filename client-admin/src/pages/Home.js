import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMovieKeyword } from "../store/actions/movieAction";
import swal from "sweetalert"

function Home() {
  const [sidebarStatus, setStatus] = useState(false);
  const [pageStatus, setPageStatus] = useState('movies');
  const {movieKeyword} = useSelector((state) => state.movie)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeStatus = () => {
    if (!sidebarStatus) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem("access_token");
    setPageStatus("")
    swal({title: 'Success to Logout', icon: 'success'})
    navigate("/login");
  };

  const movieSearchFn = (e) => {
    dispatch(setMovieKeyword(e.target.value))
  }

  return (
    <>
      <div className="container-dashboard">
        <div className="navigation">
          <ul>
            <li>
              <a>
                <span className="icon">
                  <ion-icon name="home-outline"></ion-icon>
                </span>
                <span className="title">Dashboard</span>
              </a>
            </li>
            <li>
              <Link to={""} onClick={() => {
                  dispatch(setMovieKeyword(''))
                  setPageStatus('movies')
                }}>
                <span className="icon">
                  <ion-icon name="film-outline"></ion-icon>
                </span>
                <span className="title">Show Movie List</span>
              </Link>
            </li>
            <li>
              <Link to={"casts"} onClick={() => {
                  dispatch(setMovieKeyword(''))
                  setPageStatus('casts')
                }}>
                <span className="icon">
                  <ion-icon name="people-outline"></ion-icon>
                </span>
                <span className="title">Casts</span>
              </Link>
            </li>
            <li>
              <Link to={"genres"} onClick={() => {
                  dispatch(setMovieKeyword(''))
                  setPageStatus('genres')
                }}>
                <span className="icon">
                  <ion-icon name="list-outline"></ion-icon>
                </span>
                <span className="title">Genres</span>
              </Link>
            </li>
            <li>
              <Link to={"register"} onClick={() => {
                  dispatch(setMovieKeyword(''))
                  setPageStatus('register')
                }}>
                <span className="icon">
                  <ion-icon name="person-add-outline"></ion-icon>
                </span>
                <span className="title">Register Admin</span>
              </Link>
            </li>
            <li>
              <a onClick={() => signOut()}>
                <span className="icon">
                  <ion-icon name="log-out-outline"></ion-icon>
                </span>
                <span className="title">Sign Out</span>
              </a>
            </li>
          </ul>
        </div>

        <div className={"main-page " + (sidebarStatus ? "active" : "")}>
          <div className="topbar">
            <div className="toggle" onClick={() => changeStatus()}>
              <ion-icon name="menu-outline"></ion-icon>
            </div>

            {pageStatus == 'movies' &&
              <div className="w-2/6">
                <input
                  className="py-1 px-4 rounded-xl"
                  type="text"
                  color="white"
                  size="sm"
                  placeholder="Search By Movie"
                  name="searchMovie"
                  value={movieKeyword}
                  onChange={(e) => movieSearchFn(e)}
                />
              </div>
            }

            <div className="user">
              <div>
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" />
              </div>
            </div>

          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Home;
