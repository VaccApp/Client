import "./ProfilePage.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";

function ProfilePage() {
  const { user, logOutUser } = useContext(AuthContext);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const getProfile = () => {
      authService
        .profile(user._id)
        .then((response) => setProfile(response.data))
        .catch((error) => console.log(error));
    };
    getProfile();
  }, [user._id]);

  return (
    user &&
    profile && (
      <div className="align-left saveBottom">
        <div>
          <div className="profileHeader">
            <img
              src={profile.profilePic}
              alt="Profile"
              className="profilePic"
            />
            <h1>Hola, {user.name}</h1>
          </div>
          <h2 className="subtitle">Información personal</h2>
          <p className="data">
            <b>Nombre:</b> {profile.name}
          </p>
          <p className="data">
            <b>Apellido:</b> {profile.surname}
          </p>
          <p className="data">
            <b>Email:</b> {user.email}
          </p>
          <p className="data">
            <b>DNI:</b> {profile.dni}
          </p>
        </div>
        <hr />
        <div>
          <h2 className="subtitle">Tus familias</h2>
          {profile.family &&
            profile.family.map((fam) => (
              <div key={fam._id}>
                <h3 className="butono">
                  <Link to={`/family/${fam._id}`} className="btn btn-primary">
                    {fam.surname}
                  </Link>
                  <Link to={`/family/${fam._id}/invite`}>
                    <button
                      className="btn btn-secondary"
                      style={{ marginLeft: "20px" }}
                    >
                      Invitar
                    </button>
                  </Link>
                </h3>
                <p className="data">Creada el: {fam.createdAt.split("T")[0]}</p>
                <hr />
              </div>
            ))}
        </div>
        <div>
          <h2 className="subtitle">Centros de salud</h2>
          <h3 className="butono">
            <Link to={`/centers`} className="btn btn-primary">
              Info Centros
            </Link>
          </h3>
          <hr />
        </div>
        <div>
          <h2 className="subtitle">Cuenta</h2>
          <Link
            to={`/profile/${user._id}/edit`}
            role="button"
            className="btn btn-secondary"
            style={{ marginLeft: "30px", marginBottom: "10px" }}
          >
            Editar perfil
          </Link>
          <br />
          <button
            onClick={logOutUser}
            className="btn btn-danger"
            style={{ marginLeft: "30px", marginBottom: "10px" }}
          >
            Desconectarse
          </button>
        </div>
      </div>
    )
  );
}

export default ProfilePage;
