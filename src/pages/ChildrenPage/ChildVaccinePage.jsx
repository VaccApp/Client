import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import childService from "../../services/child.service";

const API_URL = "http://localhost:5005";
const REALAPI_URL = "http://localhost:4001/api";

export default function ChildVaccinePage() {
  const [data, setData] = useState();
  const { vaccineId } = useParams();

  console.log(vaccineId);

  const getChildAndVaccine = () => {
    childService
      .getBoth(vaccineId)
      .then((response) => setData("respues", response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getChildAndVaccine();
  }, []);
  console.log("222", data);

  const child = data[0][0];

  const vaccine = data[1];
  console.log("vacunamatata", vaccine, "niñodejavivir", child);
  // function getAge() {
  //   let hoy = new Date();
  //   let cumple = new Date(child.birthdate);
  //   let edad = hoy.getFullYear() - cumple.getFullYear();
  //   var m = hoy.getMonth() - cumple.getMonth();

  //   if (m < 0 || (m === 0 && hoy.getDate() < cumple.getDate())) {
  //     edad--;
  //   }
  //   return edad;
  // }

  function edad(b) {
    let a = moment();
    b = moment(child.birthdate.slice(0, 10));

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

  let as = edad(child.birthdate.slice(0, 10));

  console.log("as", as);

  // let nextVaccine = as.months -

  return (
    data && (
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
        <p>Julio tiene {as.years} años.</p>
        <p>
          Esta vacuna se recomienda a los{" "}
          {vaccine.vaccinationAge > 15
            ? vaccine.vaccinationAge / 12 + " años"
            : vaccine.vaccinationAge + " meses"}
        </p>
        <p>{as.months}</p>
      </div>
    )
  );
}
