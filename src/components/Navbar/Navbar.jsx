import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      {isLoggedIn && (
        <>
          <button onClick={logOutUser}>Cerrar sesión</button>

          <Link to="/profile">
            <button>Perfil</button>
            {/* <img
              src="https://picsum.photos/id/402/200/300"
              style={{ width: 50, height: 50, borderRadius: 25 }}
              alt="profile"
            /> */}
          </Link>

          <Link to="/family">
            <button>Familia</button>
          </Link>

          <Link to="/child">
            <button>Descendientes</button>
          </Link>

          <Link to="/vaccines">
            <button>Vacunas</button>
          </Link>

          <span className="userIcon">{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}
            <button>Registrarse</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button>Iniciar sesión</button>{" "}
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
