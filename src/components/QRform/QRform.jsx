import "./QRform.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import vaccineService from "../../services/vaccine.service";
import childService from "../../services/child.service";

function QRform({ result }) {
  const [name, setName] = useState("Vacuna");
  const [dose, setDose] = useState(1);
  const [disease, setDisease] = useState("Enfermedad");
  const [creator, setCreator] = useState("Pfizer");
  const [vaccinationAge, setVaccinationAge] = useState(12);
  const [batch, setBatch] = useState("");
  const [expires, setExpires] = useState("2060-12-31");

  const [status, setStatus] = useState("");
  const [vaccinationDate, setVaccinationDate] = useState(Date.now());

  const [errorMessage, setErrorMessage] = useState(undefined);
  const { childId } = useParams();
  const [child, setChild] = useState([]);
  const navigate = useNavigate();


//   qr "name: Hexavalente, dose: 1, disease: 6 enf, creator: Pfizer, vaccinationAge: 2, batch: ADW3010, expires: 2025-12-31"
//   useEffect(() => {
//     const handleResult = () => {
//       if (result !== null) {
//         setName(result.text.slice(7,18));
//         setDose(result.text.slice(26,27));
//         setDisease(result.text.slice(38,43));
//         setCreator(result.text.slice(54,60));
//         setVaccinationAge(result.text.slice(78,79));
//         setBatch(result.text.slice(88,95));
//         setExpires(result.text.slice(106,116));
//       }
//     };
//     handleResult();
//   }, [result]);

  const handleStatus = (e) => setStatus(e.target.value);
  const handleVaccinationDate = (e) => setVaccinationDate(e.target.value);

  const handleVaccinationFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      dose,
      disease,
      creator,
      vaccinationAge,
      batch,
      expires,
      status,
      vaccinationDate,
    };

    vaccineService
      .vaccinate(childId, requestBody)
      .then((response) => {
        console.log("Vaccination created", response);
      })
      .then(() => {
        navigate(`/child/${childId}`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  useEffect(() => {
    const getChild = () => {
      childService
        .getOne(childId)
        .then((response) => setChild(response.data))
        .catch((error) => console.log(error));
    };
    getChild();
  }, [childId]);

  return (
    // result !== null && (
      <div>
        <Link to={`/child/${childId}`}>Volver a {child.name}</Link>
        <h1>Vacunar a {child.name}</h1>
        <form onSubmit={handleVaccinationFormSubmit}>
          <label className="form-label">Nombre de la vacuna</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            readOnly
          />
          <label className="form-label">Dosis</label>
          <input
            type="text"
            className="form-control"
            name="dose"
            value={dose}
            readOnly
          />
          <label className="form-label">Enfermedad</label>
          <input
            type="text"
            className="form-control"
            name="disease"
            value={disease}
            readOnly
          />
          <label className="form-label">Creador</label>
          <input
            type="text"
            className="form-control"
            name="creator"
            value={creator}
            readOnly
          />
          <label className="form-label">Edad de vacunación</label>
          <input
            type="text"
            className="form-control"
            name="vaccinationAge"
            value={vaccinationAge}
            readOnly
          />
          <label className="form-label">Lote</label>
          <input
            type="text"
            className="form-control"
            name="batch"
            value={batch}
            readOnly
          />
          <label className="form-label">Fecha de caducidad</label>
          <input
            type="text"
            className="form-control"
            name="expires"
            value={expires}
            readOnly
          />
          <label className="form-label">Estado</label>
          <select
            className="form-select"
            name="status"
            value={status}
            onChange={handleStatus}
          >
            <option value="PENDIENTE">Pendiente</option>
            <option value="PUESTA">Puesta</option>
            <option value="PROGRAMADA">Programada</option>
          </select>
          <label className="form-label">Fecha de vacunación</label>
          <input
            type="date"
            className="form-control"
            name="vaccinationDate"
            value={vaccinationDate}
            onChange={handleVaccinationDate}
          />
          <br></br>
          <button type="submit" className="btn btn-primary">
            Vacunar
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    // )
  );
}

export default QRform;
