import "./JoinFamily.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import familyService from "../../services/family.service";
import logo from "../../images/family-care-logo.png";

function JoinFamily() {
  const { familyId } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dni, setDni] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [familySurname, setFamilySurname] = useState("");

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleSurname = (e) => setSurname(e.target.value);
  const handleDni = (e) => setDni(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name, surname, dni };

    familyService
      .joinFamily(familyId, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  useEffect(() => {
    familyService
      .detail(familyId)
      .then((response) => {
        setFamilySurname(response.data.surname);
      })
      .catch((error) => console.log(error));
  }, [familyId]);

  return (
    <div className="JoinFamily">
      <h1>Unirse a la familia {familySurname}</h1>
      <img src={logo} alt="familyCare logo" className="logo" />
      <form onSubmit={handleSignupSubmit}>
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
          className="form-control"
          placeholder="Introduce tu email"
        />
        <label className="form-label">Contraseña</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          className="form-control"
          placeholder="Introduce tu contraseña"
        />
        <label className="form-label">Nombre</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleName}
          className="form-control"
          placeholder="Introduce tu nombre"
        />
        <label className="form-label">Apellido</label>
        <input
          type="text"
          name="surname"
          value={surname}
          onChange={handleSurname}
          className="form-control"
          placeholder="Introduce tu apellido"
        />
        <label className="form-label">DNI</label>
        <input
          type="text"
          name="dni"
          value={dni}
          onChange={handleDni}
          className="form-control"
          placeholder="Introduce tu DNI"
        />
        <button type="submit" className="btn btn-dark">
          Unirse a la familia
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default JoinFamily;
