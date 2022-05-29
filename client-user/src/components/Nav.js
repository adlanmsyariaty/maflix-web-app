import React, { useState, useEffect } from "react";
  import { Outlet, Link, useNavigate } from "react-router-dom";

function Nav() {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 600) {
        handleShow(true);
      } else handleShow(false);
    });
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="flex justify-between ml-10 mr-10">
        <Link to={"/"}>
          <h1 className="left-[140px] text-red-600 font-bold position-fixed text-3xl italic">
            MAFLIX
          </h1>
        </Link>

        <div className="flex justify-end items-center gap-7">
          <Link to={"/home"}>
            <h1 className="left-[140px] text-red-600 font-bold position-fixed text-xl">
              HOME
            </h1>
          </Link>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Avatar logo"
            className="w-[30px]"
          />
        </div>
      </div>
    </div>
  );
}

export default Nav;
