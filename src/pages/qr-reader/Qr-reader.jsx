import "./Qr-reader.css";
import React, { useState, useEffect } from "react";
import QrReader from "react-qr-scanner";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import vaccineService from "../../services/vaccine.service";
import childService from "../../services/child.service";

function QRreader() {
  const [delay, setDelay] = useState(100);
  const [result, setResult] = useState("No result");

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

  const handleScan = (data) => {
    setResult(data);
  };

  const handleError = (err) => {
    console.error(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  console.log("QR", result);

  if (result !== null) {
    console.log("Objeto", result.text);
  }

  //   result.text es un objeto con las propiedades name, dose, disease, creator, vaccinationAge, batch, expires
  //   setea el estado de cada propiedad con el valor de cada propiedad de result.text
  //   si result.text es null, no se setea el estado de cada propiedad con el valor de cada propiedad de result.text

  const handleResult = () => {
    if (result !== null) {
      setName(result.text.name);
      setDose(result.text.dose);
      setDisease(result.text.disease);
      setCreator(result.text.creator);
      setVaccinationAge(result.text.vaccinationAge);
      setBatch(result.text.batch);
      setExpires(result.text.expires);
    }
  };

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
    <div>
      <Link to={`/child/${childId}`}>Volver a {child.name}</Link>
      <h1>Vacunar a {child.name}</h1>

      <QrReader
        className="qr-reader"
        delay={delay}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
      <p>{result !== null && result.text}</p>

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
  );
}

export default QRreader;
