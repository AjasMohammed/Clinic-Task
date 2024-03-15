import React, { useEffect, useState } from "react";
import axios from "../../Constants/axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [doctors, setDoctors] = useState([]);
  const [prevAppointments, setPrevAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("auth/doctors-list/").then((response) => {
      console.log(response.data);
      setDoctors(response.data);
    });

    axios.get('appointments/').then(response => {
        console.log(response.data);
        setPrevAppointments(response.data);
    })
  }, []);

  const handleClick = (id) => {
    navigate(`/appointment/${id}`);
  };
  return (
    <div>
      <h1>Doctors</h1>
      <table>
        <tr>
            <th>ID</th>
            <th>Doctor</th>
            <th>Speciality</th>
            <th>Book</th>
        </tr>
        {
            doctors && doctors.map((doctor) => {
                return (
                    <tr key={doctor.id}>
                        <td>{doctor.id}</td>
                        <td>{doctor.name}</td>
                        <td>{doctor.speciality}</td>
                        <td><button onClick={() => handleClick(doctor.id)}>Book</button></td>
                    </tr>
                )
            })
        }
      </table>
      <div id="previous_appointments">
        <h4>All Appointments</h4>
        <table>
            <tr>
                <th>Patient</th>
                <th>Age</th>
                <th>Date</th>
                <th>Doctor ID</th>
            </tr>
            {
                prevAppointments && prevAppointments.map((appointment) => {
                    return (
                        <tr key={appointment.id}>
                            <td>{appointment.patient_name} </td>
                            <td>{appointment.age} </td>
                            <td>{appointment.appointment_date} </td>
                            <td>{appointment.doctor} </td>
                        </tr>
                    )
                })
            }
        </table>
      </div>
    </div>
  );
}

export default Home;
