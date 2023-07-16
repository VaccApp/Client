import "./EditVaccineForm.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import vaccineService from "../../services/vaccine.service";

function EditVaccineForm() {
  const [vaccine, setVaccine] = useState({});
  const [name, setName] = useState("");
  const [dose, setDose] = useState(1);
  const [disease, setDisease] = useState("");
  const [creator, setCreator] = useState("");
  const [expires, setExpires] = useState("");
  const [batch, setBatch] = useState("");
  const [status, setStatus] = useState("");
  const [vaccinationAge, setVaccinationAge] = useState("");
  const [vaccinationDate, setVaccinationDate] = useState(Date.now());
  const { vaccineId } = useParams();
  const { childId } = useParams();
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

  const handleEditVaccineSubmit = (e) => {
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
    };

    vaccineService
      .edit(vaccineId, requestBody)
      .then((response) => {
        console.log("Vaccine edited", response);
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
    const getVaccine = () => {
      vaccineService
        .getOne(vaccineId)
        .then((response) => {
          setVaccine(response.data);
          setName(response.data.name);
          setDose(response.data.dose);
          setDisease(response.data.disease);
          setCreator(response.data.creator);
          setExpires(response.data.expires);
          setBatch(response.data.batch);
          setStatus(response.data.status);
          setVaccinationAge(response.data.vaccinationAge);
          setVaccinationDate(response.data.vaccinationDate);
        })
        .catch((error) => console.log(error));
    };
    getVaccine();
  }, [vaccineId]);

  return (
    vaccinationAge &&
    vaccinationDate && (
      <div className="EditVaccinePage">
        <h1>Editar vacuna</h1>
        <form onSubmit={handleEditVaccineSubmit}>
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleName}
            className="form-control"
          />
          <label className="form-label">Dosis</label>
          <input
            type="number"
            name="dose"
            value={dose}
            onChange={handleDose}
            className="form-control"
          />
          <label className="form-label">Enfermedad</label>
          <input
            type="text"
            name="disease"
            value={disease}
            onChange={handleDisease}
            className="form-control"
          />
          <label className="form-label">Farmacéutica</label>
          <input
            type="text"
            name="creator"
            value={creator}
            onChange={handleCreator}
            className="form-control"
          />
          <label className="form-label">Fecha de expiración</label>
          <input
            type="date"
            name="expires"
            value={expires.slice(0, 10)}
            onChange={handleExpires}
            className="form-control"
          />
          <label className="form-label">Lote</label>
          <input
            type="text"
            name="batch"
            value={batch}
            onChange={handleBatch}
            className="form-control"
          />
          <label className="form-label">Estado</label>
          <input
            type="text"
            name="status"
            value={status}
            onChange={handleStatus}
            className="form-control"
          />
          <label className="form-label">Edad de vacunación</label>
          <input
            type="number"
            name="vaccinationAge"
            value={vaccinationAge}
            onChange={handleVaccinationAge}
            className="form-control"
          />
          <label className="form-label">Fecha de vacunación</label>
          <input
            type="date"
            name="vaccinationDate"
            value={vaccinationDate.slice(0, 10)}
            onChange={handleVaccinationDate}
            className="form-control"
          />
          <button type="submit" className="btn btn-primary">
            Editar vacuna
          </button>
          <Link to={`/child/${childId}`} className="btn btn-link">
            Volver
          </Link>
        </form>
      </div>
    )
  );
}

export default EditVaccineForm;
