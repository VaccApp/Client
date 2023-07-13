import "./InviteParent.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import familyService from "../../services/family.service";

function InviteParent() {
  const [email, setMail] = useState("");
  const { familyId } = useParams();

  const navigate = useNavigate();

  const handleMail = (e) => setMail(e.target.value);

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email };

    familyService
      .inviteParent(familyId, requestBody)
      .then((response) => {
        console.log("New parent", response);
        navigate(`/family/${familyId}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="InviteParent">
      <h1>Invitar a progenitor</h1>
      <form onSubmit={handleInviteSubmit}>
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleMail}
          className="form-control"
          placeholder="Introduce el email del progenitor"
        />
        <button type="submit" className="btn btn-dark">
          Enviar invitación
        </button>
      </form>
    </div>
  );
}

export default InviteParent;
