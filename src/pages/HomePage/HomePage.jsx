import { useContext } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function HomePage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div id="header">
      <img
        src="/FamilyCareLogoBig.png"
        alt="logo de Family Care"
        className="logo"
      />

      <div className="main">
        <h4>
          Tu herramienta digital para planificar y hacer seguimiento de la
          vacunación de tus hijos.
        </h4>
      </div>
      <div className="menu">
        {isLoggedIn && (
          <>
            <Link to={"/family"} className="btn btn-primary">
              <p>Tu familia</p>
            </Link>

            <Link to={"/profile"} className="btn btn-primary">
              <p>Tu perfil</p>
            </Link>

            <Link to={"/vaccines"} className="btn btn-primary">
              <p>Vacunación</p>
            </Link>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to={"/vaccines"}>
              <p>Vacunación</p>
            </Link>
            <Link to={"/signup"}>
              <p>Crear cuenta</p>
            </Link>
            <Link to={"/login"}>
              <p>Iniciar sesión</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
