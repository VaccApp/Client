import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const API_URL = "https://vaccapp.fly.dev/";

export default function EditVaccinePage(props) {
  const [name, setName] = useState("");
  const [dose, setDose] = useState(0);
  const [disease, setDisease] = useState("");
  const [creator, setCreator] = useState("");
  const [expires, setExpires] = useState(null);
  const [batch, setBatch] = useState("");
  const [status, setStatus] = useState("PENDIENTE");

  const vaccineId = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/vaccines/${vaccineId}`)
      .then((response) => {
        const oneVaccine = response.data;
        setName(oneVaccine.name);
        setDose(oneVaccine.dose);
        setDisease(oneVaccine.disease);
        setCreator(oneVaccine.creator);
        setExpires(oneVaccine.expires);
        setBatch(oneVaccine.batch);
        setStatus(oneVaccine.status);
      })
      .catch((error) => console.log(error));
  }, [vaccineId]);

  //   const handleDateUpdate = (e) => {
  //     const expires = e.target.value;
  //     setExpires(expires);
  //   };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      dose,
      disease,
      creator,
      expires,
      batch,
      status,
    };

    axios
      .put(`${API_URL}/vaccines/${vaccineId}`, requestBody)
      .then((response) => {
        navigate(`/vaccines/${vaccineId}`);
      });
  };

  return (
    <div className="EditVaccinePage">
      <h3>Edit vaccine;</h3>
      <form onSubmit={handleFormSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Dosis:</label>
        <input
          type="number"
          name="dose"
          value={dose}
          onChange={(e) => setDose(e.target.value)}
        />
        <label>Enfermedad:</label>
        <input
          type="text"
          name="disease"
          value={disease}
          onChange={(e) => setDisease(e.target.value)}
        />
        <label>Fabricante:</label>
        <input
          type="text"
          name="creator"
          value={creator}
          onChange={(e) => setCreator(e.target.value)}
        />
        <label>Caducidad:</label>
        <input
          type="text"
          name="expires"
          value={expires}
          onChange={(e) => setExpires(e.target.value)}
        />
        <label>Nº serie:</label>
        <input
          type="text"
          name="batch"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
        />
        <label>Estado:</label>
        <input
          type="text"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <button type="submit" value="submit">
          EDITAR
        </button>
      </form>

      <Link to={`/vaccines/${vaccineId}`}>
        <button className="volver">Atrás</button>
      </Link>
    </div>
  );
}
