import "./LoginPage.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
import logo from "../../images/family-care-logo.png";
import googleLogo from "../../images/google-logo.png";
import appleLogo from "../../images/apple-logo.png";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // Send a request to the server using axios
    /* 
    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`)
      .then((response) => {})
    */

    // Or using a service
    authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage">
      <h1>Login</h1>
      <img src={logo} alt="familyCare logo" className="logo" style={{ width: "200px" }} />

      <form onSubmit={handleLoginSubmit}>
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
        <button type="submit" className="btn btn-dark">Continuar ➜</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <hr />
      <button className="googleButton">
        <img src={googleLogo} alt="Google logo" />
        Continuar con Google</button>
      <br />
      <button className="appleButton">
        <img src={appleLogo} alt="Apple logo" />
        Continuar con Apple</button>
      <br />
      <p>¿Nuevo en familyCare?</p>
      <Link to={"/signup"}> REGÍSTRATE</Link>
    </div>
  );
}

export default LoginPage;
