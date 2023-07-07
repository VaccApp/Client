import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <Link to="/">
        <button class="btn btn-light">Home</button>
      </Link>

      {isLoggedIn && (
        <>
          <button class="btn btn-light" onClick={logOutUser}>
            Cerrar sesión
          </button>

          <Link to="/profile">
            <button class="btn btn-light">Perfil</button>
            {/* <img
              src="https://picsum.photos/id/402/200/300"
              style={{ width: 50, height: 50, borderRadius: 25 }}
              alt="profile"
            /> */}
          </Link>

          <Link to="/family">
            <button class="btn btn-light">Familia</button>
          </Link>

          <Link to="/child">
            <button class="btn btn-light">Descendientes</button>
          </Link>

          <Link to="/vaccines">
            <button class="btn btn-light">Vacunas</button>
          </Link>

          <span className="userIcon">{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}
            <button class="btn btn-light">Registrarse</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button class="btn btn-light">Iniciar sesión</button>{" "}
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
