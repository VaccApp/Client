import "./VaccinationForm.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import vaccineService from "../../services/vaccine.service";
import childService from "../../services/child.service";
import centerService from "../../services/center.service";

function VaccinationForm() {
  const [name, setName] = useState("Vacuna");
  const [dose, setDose] = useState(1);
  const [disease, setDisease] = useState("Enfermedad");
  const [creator, setCreator] = useState("Pfizer");
  const [expires, setExpires] = useState("");
  const [batch, setBatch] = useState("");
  const [status, setStatus] = useState("");
  const [vaccinationAge, setVaccinationAge] = useState("");
  const [vaccinationDate, setVaccinationDate] = useState(Date.now());
  const [center, setCenter] = useState("");
  const [healthCenters, setHealthCenters] = useState("");
  const { childId } = useParams();
  const [child, setChild] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleName = (e) => setName(e.target.value);
  const handleDose = (e) => setDose(e.target.value);
  const handleDisease = (e) => setDisease(e.target.value);
  const handleCreator = (e) => setCreator(e.target.value);
  const handleExpires = (e) => setExpires(e.target.value);
  const handleBatch = (e) => setBatch(e.target.value);
  const handleStatus = (e) => setStatus(e.target.value);
  const handleVaccinationAge = (e) => setVaccinationAge(e.target.value);
  const handleVaccinationDate = (e) => setVaccinationDate(e.target.value);

  const handleVaccinationFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      dose,
      disease,
      creator,
      expires,
      batch,
      status,
      vaccinationAge,
      vaccinationDate,
      center,
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

  useEffect(() => {
    const getCenters = () => {
      centerService
        .getAll()
        .then((response) => setHealthCenters(response.data))
        .catch((error) => console.log(error));
    };
    getCenters();
  }, []);

  return (
    <div className="VaccinationForm saveBottom">
      <Link to={`/child/${childId}`}>
        <button>Volver a {child.name}</button>
      </Link>
      <h1>Vacunar a {child.name}</h1>

      <form onSubmit={handleVaccinationFormSubmit}>
        <label className="form-label">Centro de salud</label>
        <select
          className="form-select"
          name="center"
          value={center}
          onChange={(e) => {
            setCenter(e.target.value);
          }}
        >
          <option value="">Selecciona un centro de salud</option>
          {healthCenters &&
            healthCenters["@graph"].map((center) => {
              return (
                <option key={center["@id"]} value={center.title}>
                  {center.title}
                </option>
              );
            })}
        </select>
        <Link
          to={`/centers`}
          role="button"
          className="btn btn-secondary"
          style={{ marginTop: "10px" }}
        >
          Info Centros
        </Link>
        <hr />
        <label className="form-label">Nombre de la vacuna</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleName}
          className="form-control"
          required={true}
        />
        <label className="form-label">Dosis</label>
        <select
          name="dose"
          value={dose}
          onChange={handleDose}
          className="form-control"
          required={true}
        >
          <option value="1">Primera</option>
          <option value="2">Segunda</option>
          <option value="3">Tercera</option>
        </select>
        <label className="form-label">Enfermedad</label>
        <select
          name="disease"
          value={disease}
          onChange={handleDisease}
          className="form-control"
          required={true}
        >
          <option value="Hexavalente">Hexavalente</option>
          <option value="Neumococo">Neumococo</option>
          <option value="Meningococo B">Meningococo B</option>
          <option value="Meningococo C">Meningococo C</option>
          <option value="Triple vírica">Triple vírica</option>
          <option value="Varicela">Varicela</option>
          <option value="Tetravírica">Tetravírica</option>
          <option value="DTPa-VPI">DTPa-VPI</option>
          <option value="Meningoc. ACWY">Meningoc. ACWY</option>
          <option value="Varicela*">Varicela*</option>
          <option value="Papilomavirus">Papilomavirus</option>
          <option value="Tétanos-difteria">Tétanos-difteria</option>
          <option value="COVID-19">COVID-19</option>
          <option value="Otras">Otras</option>
        </select>
        <label className="form-label">Farmacéutica</label>
        <input
          type="text"
          name="creator"
          value={creator}
          onChange={handleCreator}
          className="form-control"
          required={true}
        />
        <label className="form-label">Fecha de caducidad</label>
        <input
          type="date"
          name="expires"
          value={expires}
          onChange={handleExpires}
          className="form-control"
          required={true}
        />
        <label className="form-label">Lote</label>
        <input
          type="text"
          name="batch"
          value={batch}
          onChange={handleBatch}
          className="form-control"
          required={true}
        />
        <label className="form-label">Estado</label>
        <select
          name="status"
          value={status}
          onChange={handleStatus}
          className="form-control"
          required={true}
        >
          <option value="PENDIENTE">Pendiente</option>
          <option value="PROGRAMADA">Programada</option>
          <option value="PUESTA">Puesta</option>
        </select>
        <label className="form-label">Edad de vacunación</label>
        <input
          type="number"
          name="vaccinationAge"
          value={vaccinationAge}
          onChange={handleVaccinationAge}
          className="form-control"
          required={true}
        />
        <label className="form-label">Fecha de vacunación</label>
        <input
          type="date"
          name="vaccinationDate"
          value={vaccinationDate}
          onChange={handleVaccinationDate}
          className="form-control"
          required={true}
        />
        <button type="submit" className="btn btn-primary vaccineButton">
          Vacunar
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <aside>*Powered by VaccApp</aside>
    </div>
  );
}

export default VaccinationForm;
