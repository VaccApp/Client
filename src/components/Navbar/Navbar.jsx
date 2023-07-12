import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <Link to="/">
        <button className="btn btn-light">Home</button>
      </Link>

      {isLoggedIn && (
        <>
          <button className="btn btn-light" onClick={logOutUser}>
            Cerrar sesión
          </button>

          <Link to="/profile">
            <button className="btn btn-light">Perfil</button>
            {/* <img
              src="https://picsum.photos/id/402/200/300"
              style={{ width: 50, height: 50, borderRadius: 25 }}
              alt="profile"
            /> */}
          </Link>

          <Link to="/family">
            <button className="btn btn-light">Familia</button>
          </Link>

          <Link to="/child">
            <button className="btn btn-light">Descendientes</button>
          </Link>

          <Link to="/vaccines">
            <button className="btn btn-light">Vacunas</button>
          </Link>

          <span className="userIcon">{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}
            <button className="btn btn-light">Registrarse</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button className="btn btn-light">Iniciar sesión</button>{" "}
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
