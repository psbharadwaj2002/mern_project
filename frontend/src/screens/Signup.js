import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import Navbar from "../components/Navbar";

function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch(
      "https://mern-project-hxtl.onrender.com/api/createUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation,
        }),
      }
    );

    const json = await res.json();
    console.log(json);

    if (json.success) {
      window.location.href = "https://steady-pothos-ab81dd.netlify.app/login";
    } else {
      alert("Enter valid credentials");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  // const handleSignup = () => {
  //   alert(
  //     "Signup completed successfully, now click on already a user to login"
  //   );
  // };

  //   <label for="exampleColorInput" class="form-label">Color picker</label>
  // <input type="color" class="form-control form-control-color" id="exampleColorInput" value="#563d7c" title="Choose your color"></input>

  return (
    <>
      <Navbar />
      <div
        className="container mt-3"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control form-control-color"
              id="name"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
            />
          </div>

          <div className="container" style={{ display: "flex" }}>
            <button type="submit" className="m-3 btn btn-success">
              Submit
            </button>
            <Link to="/login" className="m-3 btn btn-danger">
              Already a user
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
