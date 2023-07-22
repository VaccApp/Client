import "./InviteParent.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import familyService from "../../services/family.service";
import logo from "../../images/family-care-logo.png";

function InviteParent() {
  const { familyId } = useParams();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email };

    familyService
      .inviteParent(familyId, requestBody)
      .then((response) => {
        navigate(`/family/${familyId}/children`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="InviteParent">
      <h1 style={{ margin: "5%" }}>Invitar a progenitor</h1>
      <img src={logo} alt="familyCare logo" className="logo" />
      <form onSubmit={handleInviteSubmit}>
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
          className="form-control"
          placeholder="Introduce el email del progenitor"
          required
        />
        <button type="submit" className="btn btn-dark" style={{ marginTop: "5%" }}>
          Invitar
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default InviteParent;
