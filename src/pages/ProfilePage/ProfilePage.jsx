import "./ProfilePage.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";

function ProfilePage() {
  const { user } = useContext(AuthContext);
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
      <div className="align-left">
        <div>
          <div className="profileHeader">
            <img
              src={profile.profilePic}
              alt="Profile"
              className="profilePic"
            />
            <h1>Hola, {user.name}</h1>
          </div>
          <h2>Información personal</h2>
          <p><b>Nombre:</b> {profile.name}</p>
          <p><b>Apellido:</b> {profile.surname}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>DNI:</b> {profile.dni}</p>
        </div>
        <hr />
        <div>
          <h2>Tus familias</h2>
          {profile.family &&
            profile.family.map((fam) => (
              <div key={fam._id}>
                <h3>
                  <Link to={`/family/${fam._id}`}>{fam.surname}</Link>
                </h3>
                <p>Creada el: {fam.createdAt.split("T")[0]}</p>
                <hr />
              </div>
            ))}
        </div>
        <div>
          <h2>Cuenta</h2>
          <Link
            to={`/profile/${user._id}/edit`}
            role="button"
            className="btn btn-dark"
            style={{ marginLeft: "30px", marginBottom: "10px" }}
          >
            Editar perfil
          </Link>
          <br />
          <Link
            to={`/profile/${user._id}/delete`}
            role="button"
            className="btn btn-danger"
            style={{ marginLeft: "30px", marginBottom: "10px" }}
          >
            Eliminar cuenta
          </Link>
        </div>
      </div>
    )
  );
}

export default ProfilePage;
