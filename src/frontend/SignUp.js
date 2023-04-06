import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import "bootstrap/dist/css/bootstrap.css";
import NavBar1 from "./NavBar1";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc, doc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

import { auth, db } from "../backend/firebase";

const SignUp = () => {
  const navigate = useNavigate();
  var id;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const images = [
    "fball.jpeg",
    "fball3.jpeg",
    "basketball.jpg",
    "tennis3.jpeg",
    "tennis2.jpeg",
    "cricket.jpeg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index <= images.length - 2) setIndex(index + 1);
      else setIndex(0);
    }, 4000);
    return () => clearInterval(interval);
  }, [index]);

  const er = error || "";
  const handleSubmit = async (e) => {
    e.preventDefault();

    var credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
      .then((userCredential) => {
        //Signed in
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: name,
          FavSport: "Cricket",
          ChatRooms: [],
        })
          .then(() => {
            // Profile updated!
            // ...
            console.log(name);
          })
          .catch((error) => {
            console.log(error);
            // An error occurred
            // ...
          });
        console.log(user.uid);
        id = user.uid;
        console.log(id);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode.substring(5));
        console.log(errorCode, errorMessage);
      });
    await setDoc(doc(db, "Users", id), {
      Chatrooms: [],
    });
  };
  return (
    <section>
      <div className="row">
        <div className="col-8 img-log">
          <img
            src={images[parseInt(index)]}
            alt=""
            width="1200"
            height="1053"
          ></img>
        </div>
        <div className="col-4">
          <div className="container1">
            <div
              className="card1"
              style={{
                width: "700px",
                left: "25%",
              }}
            >
              <img className="logo-signup" src="logo.jpeg" height="120px"></img>
              <h1 className="card1-title" style={{ color: "gray" }}>
                Sign Up
              </h1>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 mt-3">
                    <label
                      style={{ fontSize: "25px", color: "gray" }}
                      htmlFor="Name"
                      className="form-label"
                    >
                      Name
                    </label>
                    <input
                      type="name"
                      className="form-control"
                      id="Name"
                      style={{
                        borderTop: "0px solid",
                        borderLeft: "0px solid",
                        borderRight: "0px solid",
                      }}
                      placeholder="Type the name you want yourself to be called with"
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </div>
                  <div className="mb-3 mt-3">
                    <label
                      style={{ fontSize: "25px", color: "gray" }}
                      htmlFor="email"
                      className="form-label"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      style={{
                        borderTop: "0px solid",
                        borderLeft: "0px solid",
                        borderRight: "0px solid",
                      }}
                      placeholder="Type Your Email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                  </div>
                  <div className="mb-3 mt-3">
                    <label
                      style={{ fontSize: "25px", color: "gray" }}
                      htmlFor="username"
                      className="form-label"
                    >
                      Username
                    </label>
                    <input
                      type="username"
                      className="form-control"
                      style={{
                        borderTop: "0px solid",
                        borderLeft: "0px solid",
                        borderRight: "0px solid",
                      }}
                      id="username"
                      placeholder="Type Your Username"
                      name="Username"
                    ></input>
                  </div>
                  <div className="mb-3">
                    <label
                      style={{ fontSize: "25px", color: "gray" }}
                      htmlFor="pwd"
                      className="form-label"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="pwd"
                      style={{
                        borderTop: "0px solid",
                        borderLeft: "0px solid",
                        borderRight: "0px solid",
                      }}
                      placeholder="Type Your Password"
                      name="pswd"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="btn btn-dark btn-login">
                      Sign Up
                    </button>
                    <p style={{ color: "red", fontSize: "15px" }}>
                      {er.toUpperCase()}
                    </p>
                    <h6 style={{ color: "gray" }}>Already Have an Account?</h6>
                    <Link to="/" className="btn btn-dark ">
                      Log In
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
