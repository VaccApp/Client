import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Link, useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import childService from "../../services/child.service";
import "./ChildVaccinePage.css";

const API_URL = "http://localhost:5005";
const REALAPI_URL = "http://localhost:4001/api";

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
  }, [selectedDate]);

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
      <div className="saveBottom">
        <div className="vacunaCard">
          <img src={child.childPic} alt="child" className="childPicRound" />
          <h1 className="vacuTitle">{child.name}</h1>
          <p>
            <b>Edad: </b>
            <br></br>
            {as.years > 0
              ? as.years + " años"
              : as.months > 0
              ? as.months + " meses"
              : as.days + " días"}
          </p>
        </div>

        <div className="vacunaCard">
          <img src="/Syringe.png" alt="vacuna" className="vacuna4" />
          <h2 className="vacuTitle">Vacuna {vaccine.name}</h2>
        </div>

        <div className="left">
          {/* <p>Julio tiene {as.years} años.</p>
        <p>
          Esta vacuna se recomienda a los{" "}
          {vaccine.vaccinationAge > 15
            ? vaccine.vaccinationAge / 12 + " años"
            : vaccine.vaccinationAge + " meses"}
        </p>
        <p>{as.months}</p> */}

          <p>Dosis: {vaccine.dose}</p>
          <p>
            Edad de vacunación:{" "}
            {vaccine.vaccinationAge < 16
              ? vaccine.vaccinationAge + " meses"
              : vaccine.vaccinationAge / 12 + " años"}
          </p>
          {/* <h4>Cita vacunación</h4> */}
          <p>
            {vaccine.status === "PENDIENTE"
              ? child.name + " tiene esta vacuna pendiente."
              : vaccine.status === "PROGRAMADA"
              ? "Recuerde su cita para vacunar a " + child.name
              : child.name + " ya tiene puesta esta vacuna"}
          </p>

          <p>
            {vaccine.vaccinationDate
              ? "Tiene cita el día " + vaccine.vaccinationDate.slice(0, 10)
              : "Selecciona una fecha para agendar su cita: "}
          </p>
          <form onSubmit={handleDateSubmit}>
            <label className="form-label">Cita de vacunación: </label>
            <input
              type="date"
              name="selectedDate"
              value={selectedDate ? selectedDate : vaccine.vaccinationDate}
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

            <button type="submit" className="btn btn-dark btn-margin">
              Agendar
            </button>
          </form>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    )
  );
}
