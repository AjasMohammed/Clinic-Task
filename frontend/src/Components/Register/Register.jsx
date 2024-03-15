import React, { useState } from "react";
import axios from "../../Constants/axios";

function Login() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    const userData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
    }
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post("auth/register-user/", userData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="first-name">
          First Name
          <input name="firstName" required onChange={handleData} id="first-name" type="text" />
        </label>
        <label htmlFor="last-name">
          Last name
          <input name="lastName" required onChange={handleData} id="last-name" type="text" />
        </label>
        <label htmlFor="email">
          Email
          <input name="email" required onChange={handleData} id="email" type="text" />
        </label>
        <label htmlFor="password">
          Password
          <input name="password" required onChange={handleData} id="password" type="text" />
        </label>
        <button type="submit">SignUp</button>
      </form>
    </div>
  );
}

export default Login;
