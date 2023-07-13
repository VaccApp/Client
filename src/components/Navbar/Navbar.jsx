import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar fixed-bottom">
      <div className="container-fluid">
        {isLoggedIn && (
          <>
            {/* <button className="btn btn-light" onClick={logOutUser}>
              Cerrar sesión
            </button> */}

            <div className="navbar navbar-el">
              <Link to="/">
                <img
                  src="/Calendar.png"
                  alt="calendar"
                  className="navbar-img"
                />
                <br></br>
                <button className=" navbar-text">Citas</button>
              </Link>
            </div>
            <div className="navbar navbar-el">
              <Link to="/family">
                <img src="/Family.png" alt="calendar" className="navbar-img" />
                <br></br>
                <button className=" navbar-text">Familia</button>
              </Link>
            </div>
            <div className="navbar-el">
              <Link to="/:familyId/vaccines">
                <img src="/Add.png" alt="calendar" className="navbar-img" />
                <br></br>
                <button className=" navbar-text">Vacunar</button>
              </Link>
            </div>
            <div className="navbar navbar-el">
              <Link to="/vaccines">
                <img src="/vacuna.png" alt="calendar" className="navbar-img" />
                <br></br>
                <button className="navbar-text">Info</button>
              </Link>
            </div>
            <div className="navbar navbar-el">
              <Link to="/profile">
                <img src="/usuario.png" alt="calendar" className="navbar-img" />
                <br></br>
                <button className="navbar-text">Perfil</button>
              </Link>
            </div>

            {/* <span classNameName="userIcon">{user && user.name}</span> */}
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
      </div>
    </nav>
  );
}

export default Navbar;

{
  /* <Link to="/">
          <button className="btn btn-light">Home</button>
        </Link> */
}

// {!isLoggedIn && (
//   <>
//     <Link to="/signup">
//       {" "}
//       <button className="btn btn-light">Registrarse</button>{" "}
//     </Link>
//     <Link to="/login">
//       {" "}
//       <button className="btn btn-light">Iniciar sesión</button>{" "}
//     </Link>
//   </>
// )}
