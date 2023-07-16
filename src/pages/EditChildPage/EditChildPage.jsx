import "./EditChildPage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import childService from "../../services/child.service";

function EditChildPage() {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [childPic, setChildPic] = useState("");
  const { childId } = useParams();
  const { familyId } = useParams();
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleName = (e) => setName(e.target.value);
  const handleBirthdate = (e) => setBirthdate(e.target.value);
  const handleChildPic = (e) => setChildPic(e.target.value);

  const handleEditChildSubmit = (e) => {
    e.preventDefault();
    const requestBody = { name, birthdate, childPic };

    childService
      .edit(childId, requestBody)
      .then((response) => {
        console.log("Child edited", response);
      })
      .then(() => {
        navigate(`/family/${familyId}`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  useEffect(() => {
    const getChild = () => {
      childService
        .getOne(childId)
        .then((response) => {
          setName(response.data.name);
          setBirthdate(response.data.birthdate);
          setChildPic(response.data.childPic);
        })
        .catch((error) => console.log(error));
    };
    getChild();
  }, [childId]);

  return (
    <div className="EditChildPage">
      <h1>Editar child</h1>
      <form onSubmit={handleEditChildSubmit}>
        <label className="form-label">Nombre</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleName}
          className="form-control"
          required={true}
        />
        <label className="form-label">Fecha de nacimiento</label>
        <input
          type="date"
          name="birthdate"
          value={birthdate.slice(0, 10)}
          onChange={handleBirthdate}
          className="form-control"
          required={true}
        />
        <label className="form-label">Foto</label>
        <input
          type="text"
          name="childPic"
          value={childPic}
          onChange={handleChildPic}
          className="form-control"
        />
        <button type="submit" className="btn btn-dark">
          Guardar cambios
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Link
        to={`/family/${familyId}/children/${childId}`}
        className="btn btn-dark"
      >
        Volver
      </Link>
    </div>
  );
}

export default EditChildPage;
