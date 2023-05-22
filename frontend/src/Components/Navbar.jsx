/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  const location = useLocation();

  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  const handleLogout = () => {
    const token = JSON.parse(localStorage.getItem("token"))

    axios({
      method: 'post',
      url: process.env.REACT_APP_API_URL + "/accounts/logout/",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then(function (response) {
        console.log(response);
        JSON.parse(localStorage.removeItem("token"))
        navigate("/login");

      })
      .catch(function (error) {
        console.log('error: ', error);
      });
  }

  useEffect(() => {
    setTimeout(() => {
      if (JSON.parse(localStorage.getItem("token"))) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }, 1000);

  }, [ location.pathname ])

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark justify-content-space px-3">
        <a className="navbar-brand"><Link
          className="my-2 my-sm-0"
          style={{ marginRight: "20px", textDecoration: "none", color: "#fff" }}
          to="/profile"
        >
          User Profile
        </Link></a>
        <div>
          <Link
            className="btn btn-outline-success my-2 my-sm-0"
            style={{ marginRight: "20px" }}
            to="/profile"
          >
            Profile
          </Link>

          {isLoggedIn ?

            <Link
              className="btn btn-outline-success my-2 my-sm-0"
              onClick={() => {
                handleLogout()
              }}
              to="/login"
              style={{ marginRight: "20px" }}
            >
              Logout
            </Link>
            :
            <Link
              className="btn btn-outline-success my-2 my-sm-0"
              to="/login"
              style={{ marginRight: "20px" }}
            >
              Login
            </Link>
          }
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
