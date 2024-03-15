import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../Constants/axios";


function Appointment() {
  const { id } = useParams();

  const [data, setData] = useState({
    patient_name: "",
    age: "",
    appointment_date: "",
    doctor: id
  });

  const handleData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('appointments/create-appointment/', data).then((response) => {
      console.log(response.data);
      window.location.href = '/'
    }).catch((error) => {
      console.log(error);
      if (error.response.status == 400){
        alert(error.response.data.appointment_date)
      }
    })
    
  };
  return (
    <div>
      <h1>Book Appointment</h1>
      <h5>Doctor ID: {id}</h5>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="patient_name">
          Patient Name
          <input required onChange={handleData} id="patient_name" name="patient_name" type="text" />
        </label>
        <label htmlFor="age">
          Age
          <input required onChange={handleData} id="age" name="age" type="number" />
        </label>
        <label htmlFor="appointment_date">
          Appointment Date
          <input required onChange={handleData} id="appointment_date" name="appointment_date" type="date" />
        </label>

        <button type="submit">Book</button>
      </form>
    </div>
  );
}

export default Appointment;
