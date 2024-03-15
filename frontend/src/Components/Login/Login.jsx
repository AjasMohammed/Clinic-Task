import React, { useState, useContext } from "react";
import axios from "../../Constants/axios";
import { userContext } from "../../Store/Context";
import { redirect } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const  [isLogged, setIsLogged]  = useContext(userContext);


  const handleData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    const userData = {
        email: formData.email,
        password: formData.password,
    }
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post("auth/login-user/", userData)
      .then((response) => {
        const data = response.data
        const access_token = data.access_token
        localStorage.setItem('access_token', access_token)
        setIsLogged(true)
        window.location.href = '/'
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input
            name="email"
            required
            onChange={handleData}
            id="email"
            type="text"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            name="password"
            required
            onChange={handleData}
            id="password"
            type="password"
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
