import { useContext } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function HomePage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div>
      <h1>VaccApp</h1>
      <div>
        <h4>
          Tu herramienta digital para planificar y hacer seguimiento de la
          vacunación de tus hijos.
        </h4>
        {isLoggedIn && (
          <>
            <Link to={"/family"}>
              <p>Tu familia</p>
            </Link>

            <Link to={"/profile"}>
              <p>Tu perfil</p>
            </Link>

            <Link to={"/vaccines"}>
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
