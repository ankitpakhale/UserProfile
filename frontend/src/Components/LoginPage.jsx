import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [ formValues, setFormValues ] = useState({
    Email: "",
    Password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const LoginHandler = (e) => {
    e.preventDefault();
    var EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (formValues.Email === "" || formValues.Password === "") {
      alert("Enter all Fields");
    } else if (!formValues.Email.match(EmailRegex)) {
      alert("Enter Valid Email");
    } else {
      var formData = new FormData();
      formData.append("email", formValues.Email);
      formData.append("password", formValues.Password);

      console.info(formValues, ": formValues");

      //axios api call here
      axios({
        method: 'post',
        url: process.env.REACT_APP_API_URL + "/accounts/login/",
        data: formData,
      })
        .then(function (response) {
          console.log(response);
          localStorage.setItem("token", JSON.stringify(response.data.token));
          navigate("/profile");
        })
        .catch(function (error) {
          console.log(error.response.data.non_field_errors);
          alert(error.response.data.non_field_errors);

        }).finally(() => {
          setFormValues({
            Email: '',
            Password: '',
          });
        });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (JSON.parse(localStorage.getItem("token"))) {
        navigate("/profile");
      } else {
        navigate("/login");
      }
    }, 1000);

  }, [ location.pathname ]);

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-3">
          <h2 className="text-center">Login</h2>
          <form>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => setFormValues({ ...formValues, Email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={(e) => setFormValues({ ...formValues, Password: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block" onClick={LoginHandler}>
              Submit
            </button>
            <div className="text-center mt-3">
              <Link to="/register" className="text-muted">
                Don't have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>


    </>
  );
};

export default LoginPage;
