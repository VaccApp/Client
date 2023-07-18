import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import familyService from "../../services/family.service";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const [families, setFamilies] = useState([]);

  const getAllFamilies = () => {
    familyService
      .list()
      .then((response) => setFamilies(response.data[0]._id))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllFamilies();
  }, []);

  return (
    families &&
    user && (
      <nav className="navbar fixed-bottom">
        <div className="container-fluid">
          {isLoggedIn && (
            <>
              {/* <button className="btn btn-light" onClick={logOutUser}>
              Cerrar sesión
            </button> */}

              <div className="navbar navbar-el">
                <Link to={`/family/${families}/appointments`}>
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
                <Link to={`/family/${families}/children`}>
                  <img
                    src="/Family.png"
                    alt="calendar"
                    className="navbar-img"
                  />
                  <br></br>
                  <button className=" navbar-text">Familia</button>
                </Link>
              </div>
              <div className="navbar-el">
                <Link to={`/family/${families}/children`}>
                  <img src="/Add.png" alt="calendar" className="navbar-img" />
                  <br></br>
                  <button className=" navbar-text">Vacunar</button>
                </Link>
              </div>
              <div className="navbar navbar-el">
                <Link to="/vaccines">
                  <img
                    src="/vacuna.png"
                    alt="calendar"
                    className="navbar-img"
                  />
                  <br></br>
                  <button className="navbar-text">Info</button>
                </Link>
              </div>
              <div className="navbar navbar-el">
                <Link to="/profile">
                  <img
                    src="/usuario.png"
                    alt="calendar"
                    className="navbar-img"
                  />
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
    )
  );
}

export default Navbar;
