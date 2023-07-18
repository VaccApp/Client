import "./FamilyCreateForm.css";
import { useState } from "react";
import familyService from "../../services/family.service";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

export default function FamilyCreateForm() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  //Aquí hay que volver
  // const [family, setFamily] = useState({
  //   name: "",
  //   parents: [],
  // });
  const [parents, setParents] = useState([user.name]);
  const [surname, setSurname] = useState("");

  const navigate = useNavigate();

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setSurname({ ...family, [name]: value });
  // };
  const handleSurnameInput = (e) => setSurname(e.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    familyService
      .create(parents, surname)
      .then((response) => {
        console.log("Response CREADA", response);
        navigate("/family");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Crear Familia</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="surname">Nombre de la familia </label>
          <input
            type="text"
            name="surname"
            id="surname"
            value={surname}
            onChange={handleSurnameInput}
          />
          <br />
          <label htmlFor="parents">Nombre del progenitor </label>
          <input
            type="text"
            name="parents"
            id="parents"
            // defaultValue={user.name}
            value={parents}
            placeholder={parents}
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Crear Familia
        </button>
      </form>
    </div>
  );
}
