import axios from "axios";
import React, { useEffect, useState } from "react";
// import bcrypt from "bcryptjs";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [ formValues, setFormValues ] = useState({
    Username: "",
    Email: "",
    Password: "",
    cPassword: "",
    ProfileImage: "",
    Designation: "",
  });

  const navigate = useNavigate();
  var EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const SubmitHandler = (e) => {
    e.preventDefault();
    var users = JSON.parse(localStorage.getItem("Users"));
    if (
      formValues.Username === "" ||
      formValues.Email === "" ||
      formValues.Password === "" ||
      formValues.cPassword === "" ||
      formValues.ProfileImage === "" ||
      formValues.Designation === ""
    ) {
      alert("All Fields Required");
    } else if (!formValues.Email.match(EmailRegex)) {
      alert("Enter Valid Email");
    } else if (formValues.Password.length < 2) {
      alert("Password too short");
    } else if (formValues.Password !== formValues.cPassword) {
      alert("Passwords don't Match ");
    } else {
      var formData = new FormData();
      formData.append("username", formValues.Username);
      formData.append("password", formValues.Password);
      formData.append("email", formValues.Email);
      formData.append("profile_image", formValues.ProfileImage);
      formData.append("designation", formValues.Designation);

      //Uncomment this code to check the form data values in console
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ", " + pair[1]);
      // }


      //axios api call here
      axios({
        method: 'post',
        url: process.env.REACT_APP_API_URL + "/accounts/create-user/",
        data: formData,
      })
        .then(function (response) {
          console.log(response);
          alert("Registration Success");
          navigate("/login");
        })
        .catch(function (error) {
          if (error.response.status === 400) {
            alert("something went wrong");
            console.log(error.response.data.detail);
          }
        }).finally(() => {
          setFormValues({
            Username: '',
            Email: '',
            Password: '',
            cPassword: '',
            ProfileImage: '',
            Designation: '',
          });
        });

    }
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("LOGGED"))) {
      navigate("/profile");
    } else {
      navigate("/register");
    }
  }, [ navigate ]);
  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <form className="card p-3">
          <h2 className="text-center">SignUp</h2>
          <div className="form-group my-2" style={{ margin: "20px" }}>
            <label htmlFor="Username">UserName</label>
            <input
              type="text"
              className="form-control"
              aria-describedby="username"
              placeholder="Enter Username"
              value={formValues.Username}
              onChange={(e) => {
                setFormValues({ ...formValues, Username: e.target.value });
              }}
            />
          </div>

          <div className="form-group my-2" style={{ margin: "20px" }}>
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={formValues.Email}
              onChange={(e) => {
                setFormValues({ ...formValues, Email: e.target.value });
              }}
            />
          </div>
          <div className="form-group my-2" style={{ margin: "20px" }}>
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={formValues.Password}
              onChange={(e) => {
                setFormValues({ ...formValues, Password: e.target.value });
              }}
            />
          </div>
          <div className="form-group my-2" style={{ margin: "20px" }}>
            <label htmlFor="CPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={formValues.cPassword}
              onChange={(e) => {
                setFormValues({ ...formValues, cPassword: e.target.value });
              }}
            />
          </div>
          <div className="form-group my-2" style={{ margin: "20px" }}>
            <label htmlFor="designation">Designation</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Designation"
              value={formValues.Designation}
              onChange={(e) => {
                setFormValues({ ...formValues, Designation: e.target.value });
              }}
            />
          </div>
          <div className="form-group my-2" style={{ margin: "20px" }}>
            <label for="exampleFormControlFile1">ProfileImage</label>
            <input
              type="file"
              className="form-control-file"
              id="exampleFormControlFile1"
              style={{ marginLeft: "10px" }}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  ProfileImage: e.target.files[ 0 ],
                });
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary m-2"
            onClick={SubmitHandler}
          >
            Submit
          </button>
          <br></br>
          <Link id="emailHelp" to="/login" className="form-text text-muted m-2">
            Already has an account?
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignUpPage;
