import "./AddChildPage.css";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import childService from "../../services/child.service";

function AddChildPage() {
  const { familyId } = useParams();
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [healthcard, setHealthcard] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const handleName = (e) => setName(e.target.value);
  const handleBirthdate = (e) => setBirthdate(e.target.value);
  const handleHealthcard = (e) => setHealthcard(e.target.value);

  const handleChildSubmit = (e) => {
    e.preventDefault();
    const requestBody = { name, birthdate, healthcard };

    childService
      .addChild(familyId, requestBody)
      .then((response) => {
        console.log("New child", response);
        navigate("/child/:id");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddChildPage">
      <h1>Añadir miembro de la familia</h1>
      <form onSubmit={handleChildSubmit}>
        <label className="form-label">Nombre</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleName}
          className="form-control"
        />
        <label className="form-label">Fecha de nacimiento</label>
        <input
          type="date"
          name="birthdate"
          value={birthdate}
          onChange={handleBirthdate}
          className="form-control"
        />
        <label className="form-label">Tarjeta sanitaria</label>
        <input
          type="text"
          name="healthcard"
          value={healthcard}
          onChange={handleHealthcard}
          className="form-control"
        />
        <button type="submit" className="btn btn-dark">
          Continuar ➜
        </button>
      </form>
    </div>
  );
}

export default AddChildPage;
