import "./App.css";
import React from "react";
import Navbar from "./Components/Navbar";
import LoginPage from "./Components/LoginPage";
import SignUpPage from "./Components/SignUpPage";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import UserProfile from "./Components/UserProfile";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/profile" replace />} />
          <Route
            path="/profile"
            exact
            element={
              <React.Suspense
                fallback={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "200px",
                    }}
                  >
                    <div className="loader"></div>
                  </div>
                }
              >
                <UserProfile />
              </React.Suspense>
            }
          />
          <Route
            path="/register"
            exact
            element={
              <React.Suspense
                fallback={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "200px",
                    }}
                  >
                    <div className="loader"></div>
                  </div>
                }
              >
                <SignUpPage />
              </React.Suspense>
            }
          />
          <Route
            path="/login"
            exact
            element={
              <React.Suspense
                fallback={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "200px",
                    }}
                  >
                    <div className="loader"></div>
                  </div>
                }
              >
                <LoginPage />
              </React.Suspense>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
