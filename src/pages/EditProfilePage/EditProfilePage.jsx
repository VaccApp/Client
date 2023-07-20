import "./EditProfilePage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import authService from "../../services/auth.service";

function EditProfilePage() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const { userId } = useParams();
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleName = (e) => setName(e.target.value);
  const handleSurname = (e) => setSurname(e.target.value);
  const handleProfilePic = (e) => setProfilePic(e.target.value);

  const handleEditProfileSubmit = (e) => {
    e.preventDefault();
    const requestBody = { name, surname, profilePic };

    authService
      .edit(userId, requestBody)
      .then((response) => {
        console.log("Profile edited", response);
      })
      .then(() => {
        navigate(`/profile`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  useEffect(() => {
    const getProfile = () => {
      authService
        .profile(userId)
        .then((response) => {
          setName(response.data.name);
          setSurname(response.data.surname);
          setProfilePic(response.data.profilePic);
        })
        .catch((error) => console.log(error));
    };
    getProfile();
  }, [userId]);

  return (
    <div className="EditProfilePage saveBottom">
      <h1>Editar perfil</h1>
      <form onSubmit={handleEditProfileSubmit}>
        <label className="form-label">Nombre</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleName}
          className="form-control"
          required={true}
        />
        <label className="form-label">Apellido</label>
        <input
          type="text"
          name="surname"
          value={surname}
          onChange={handleSurname}
          className="form-control"
          required={true}
        />
        <label className="form-label">Foto de perfil</label>
        <input
          type="text"
          name="profilePic"
          value={profilePic}
          onChange={handleProfilePic}
          className="form-control"
          required={true}
        />
        <button type="submit" className="btn btn-dark">
          Guardar cambios
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Link to={`/profile`} className="btn btn-dark">
        Volver
      </Link>
    </div>
  );
}

export default EditProfilePage;
