import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import logo from "../../images/family-care-logo.png";
import googleLogo from "../../images/google-logo.png";
import appleLogo from "../../images/apple-logo.png";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dni, setDni] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleSurname = (e) => setSurname(e.target.value);
  const handleDni = (e) => setDni(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name, surname, dni };

    // Send a request to the server using axios
    /* 
    const authToken = localStorage.getItem("authToken");
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/signup`, 
      requestBody, 
      { headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((response) => {})
    */

    // Or using a service
    authService
      .signup(requestBody)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        navigate("/login");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage">
      <h1>Signup</h1>
      <img src={logo} alt="familyCare logo" className="logo" style={{ width: "200px" }} />

      <form onSubmit={handleSignupSubmit}>
        <label className="form-label">Usuario</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
          placeholder="Tu email"
          className="form-control"
        />
        <br />
        <label className="form-label">Contraseña</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          placeholder="Tu contraseña"
          className="form-control"
        />
        <br />
        <label className="form-label">Nombre</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleName}
          placeholder="Tu nombre"
          className="form-control"
        />
        <br />
        <label className="form-label">Apellido</label>
        <input
          type="text"
          name="surname"
          value={surname}
          onChange={handleSurname}
          placeholder="Tu apellido"
          className="form-control"
        />
        <br />
        <label className="form-label">DNI</label>
        <input
          type="text"
          name="dni"
          value={dni}
          onChange={handleDni}
          placeholder="Tu DNI"
          className="form-control"
        />
        <br />
        <p>
          Al registrarte, aceptas nuestras Condiciones de uso y Política de
          privacidad.
        </p>
        <button type="submit" className="btn btn-dark">Continuar ➜</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <hr />
      <button className="googleButton">
        <img src={googleLogo} alt="google logo" />
        Continuar con Google</button>
      <br />
      <button className="appleButton">
        <img src={appleLogo} alt="apple logo" />
        Continuar con Apple</button>
      <br />
      <p>¿Ya tienes cuenta en familyCare?</p>
      <Link to={"/login"}> INICIA SESIÓN</Link>
    </div>
  );
}

export default SignupPage;
