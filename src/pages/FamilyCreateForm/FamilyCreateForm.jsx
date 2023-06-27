import "./FamilyCreateForm.css";
import { useState } from "react";
import familyService from "../../services/family.service";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

export default function FamilyCreateForm() {
  const [family, setFamily] = useState({
    name: "",
    parents: [],
  });

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFamily({ ...family, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    familyService
      .create(family)
      .then((response) => {
        console.log(response);
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
            value={family.surname}
            onChange={handleInputChange}
          />
          <br />
          {/* <label htmlFor="parents">Progenitor </label>
          <input
            type="text"
            name="parents"
            id="parents"
            value={user.name}
            onChange={handleInputChange}
            placeholder={user.name}
            readonly
          /> */}
        </div>
        <br />
        <button type="submit">Crear Familia</button>
      </form>
    </div>
  );
}
