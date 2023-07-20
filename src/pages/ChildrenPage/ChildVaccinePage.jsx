import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Link, useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import childService from "../../services/child.service";

const API_URL = "https://vaccapp.fly.dev";
const REALAPI_URL = "https://vaccapp.fly.dev";

export default function ChildVaccinePage() {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { vaccineId } = useParams();

  const navigate = useNavigate();

  const getChildAndVaccine = () => {
    childService
      .getBoth(vaccineId)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  };

  const handleDate = (e) => {
    setSelectedDate(e.target.value);
  };

  console.log("SELECTED DATE: ", selectedDate);

  const handleDateSubmit = (e) => {
    e.preventDefault();
    const vaccineDate = { selectedDate };
    childService
      .addDate(vaccineId, vaccineDate)
      .then((response) => {
        console.log("RESPONSE: ", vaccineDate);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getChildAndVaccine();
  }, [vaccineId]);

  console.log("DATE: ", selectedDate);

  const [child, vaccine] = data;

  function edad(b) {
    let a = moment();
    b = moment(child?.birthdate.slice(0, 10));

    let years = a.diff(b, "year");
    let months = a.diff(b, "months");

    let days = a.diff(b, "days");

    let diffObj = {
      days: days,
      months: months,
      years: years,
    };

    return diffObj;
  }

  let as = edad(child?.birthdate.slice(0, 10));

  return (
    data &&
    child &&
    vaccine && (
      <div>
        <h1>
          Vacuna {vaccine.name} de {child.name}
        </h1>
        <p>
          {vaccine.status === "PENDIENTE"
            ? child.name + " tiene esta vacuna pendiente."
            : vaccine.status === "PROGRAMADA"
            ? "Recuerde su cita para vacunar a " + child.name
            : child.name + " ya tiene puesta esta vacuna"}
        </p>
        {/* <p>Julio tiene {as.years} años.</p>
        <p>
          Esta vacuna se recomienda a los{" "}
          {vaccine.vaccinationAge > 15
            ? vaccine.vaccinationAge / 12 + " años"
            : vaccine.vaccinationAge + " meses"}
        </p>
        <p>{as.months}</p> */}

        <p>Vacuna: {vaccine.name}</p>
        <p>Dosis: {vaccine.dose}</p>
        <p>Edad de vacunación: {vaccine.vaccinationAge}</p>
        {/* <h4>Cita vacunación</h4> */}
        <form onSubmit={handleDateSubmit}>
          <label className="form-label">
            Cita de vacunación:{" "}
            {vaccine.vaccinationDate
              ? vaccine.vaccinationDate.slice(0, 10)
              : selectedDate
              ? selectedDate
              : "Pendiente de programar"}
          </label>
          <input
            type="date"
            name="selectedDate"
            value={selectedDate}
            onChange={handleDate}
            className="form-control"
          />
          {/* <DatePicker
          value={selectedDate}
          selected={selectedDate}
          onChange={handleDate}
          dateFormat={"dd/MM/yyyy"}
          minDate={new Date()}
          filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
          isClearable
        /> */}
          {/* <form onSubmit={handleDateSubmit}> */}
          {/* <input
            type="date"
            name="selectedDate"
            value={
              vaccine.vaccinationDate ? vaccine.vaccinationDate : selectedDate
            }
          ></input> */}

          <button type="submit" className="btn btn-dark">
            Agendar
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    )
  );
}
