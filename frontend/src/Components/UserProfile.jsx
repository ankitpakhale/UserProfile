import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";

const UserProfile = () => {
  const [ modalIsOpen, setIsOpen ] = useState(false);
  const [ currentUser, setcurrentUser ] = useState({});
  const [ loginerror, setLoginError ] = useState(false);
  const navigate = useNavigate();

  const [ formValues, setFormValues ] = useState({
    id: currentUser.id,
    username: currentUser.username,
    email: currentUser.email,
    profile_image: currentUser.profile_image,
    designation: currentUser.designation,
  });
  Modal.setAppElement("#root");

  function openModal() {
    setIsOpen(true);
    setFormValues({
      id: currentUser.id,
      username: currentUser.username,
      email: currentUser.email,
      profile_image: currentUser.profile_image,
      designation: currentUser.designation,
    });
  }

  function closeModal() {
    setIsOpen(false);
  }

  const UpdateData = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("id", formValues.id);
    formData.append("username", formValues.username);
    formData.append("email", formValues.email);
    formData.append("profile_image", formValues.profile_image);
    formData.append("designation", formValues.designation);

    // Display the key/value pairs
    // for (var pair of formData.entries()) {
    //   console.log(pair[ 0 ] + ", " + pair[ 1 ]);
    // }

    //axios update call
    const token = JSON.parse(localStorage.getItem("token"))
    axios({
      method: 'put',
      url: process.env.REACT_APP_API_URL + "/accounts/update-user/",
      data: formData,
      headers: {
        Authorization: `Token ${token}`,
      },
    }).then(function (response) {
      console.info(formValues, ": formValues");

      // This will give error while updating profile image
      // Solution is to call get api again but that is not feasible option
      // Another solution is to destructure image and create manual image url but that is lengthy process and not good for production level code
      setcurrentUser(formValues)
      console.log("Response of user data: ", response);
      alert("Changes Saved");

    }).catch(function (error) {
      if (error.response && error.response.status === 500) {
        alert("Something went wrong");
        console.log(error.response.data.detail);
      }
    });

    closeModal();
  };

  const handleUserData = () => {
    const token = JSON.parse(localStorage.getItem("token"))
    axios({
      method: 'get',
      url: process.env.REACT_APP_API_URL + "/accounts/get-user/",
      headers: {
        Authorization: `Token ${token}`,
      },
    }).then(function (response) {
      setcurrentUser(response.data)
      console.log("Response of user data: ", response);
    }).catch(function (error) {
      if (error.response && error.response.status === 400) {
        alert("Something went wrong");
        console.log(error.response.data.detail);
      }
    });
  };


  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token"))) {
      setLoginError(false);
      handleUserData()
    } else {
      setLoginError(true);
      navigate("/login");
    }
  }, [ navigate ]);

  return (
    <div
      className="contanier"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="card">
        <img
          src={process.env.REACT_APP_API_URL + currentUser.profile_image}
          className="card-img-top"
          alt="profile_image"
          loading="lazy"
        />
        <div className="card-body">
          <div className="card-text">
            <p>
              <strong>Username:</strong> {currentUser.username}
            </p>
            <p>
              <strong>Email:</strong> {currentUser.email}
            </p>
            <p>
              <strong>Designation:</strong> {currentUser.designation}
            </p>
          </div>
          <button className="btn btn-primary" onClick={openModal}>
            Edit
          </button>
        </div>
      </div>


      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div className="container">
          <div className="modal-header">
            <h5 className="modal-title">User Profile</h5>
            <button type="button" className="close" onClick={closeModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-container p-4">
              <form>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={formValues.email}
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => {
                      setFormValues({
                        ...formValues,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Designation</label>
                  <input
                    type="text"
                    value={formValues.designation}
                    className="form-control"
                    placeholder="Designation"
                    onChange={(e) => {
                      setFormValues({
                        ...formValues,
                        designation: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    value={formValues.username}
                    className="form-control"
                    placeholder="Username"
                    onChange={(e) => {
                      setFormValues({
                        ...formValues,
                        username: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Profile Image</label>
                  <input
                    type="file"
                    className="form-control-file"
                    placeholder="profile_image"
                    onChange={(e) => {
                      setFormValues({
                        ...formValues,
                        profile_image: e.target.files[ 0 ],
                      });
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-primary"
              onClick={UpdateData}
            >
              Save Changes
            </button>
            <button className="btn btn-secondary" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </Modal>
      {loginerror && <h3 style={{ color: "red" }}> Login First</h3>}
    </div>
  );
};

export default UserProfile;
