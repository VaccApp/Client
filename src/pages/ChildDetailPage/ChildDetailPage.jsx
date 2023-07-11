import "./ChildDetailPage.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import childService from "../../services/child.service";
import ChildCard from "../../components/Child/ChildCard";
import axios from "axios";
const API_URL = "http://localhost:5005";

// import ChildCard from "../../components/ChildCard/ChildCard";

function ChildDetailPage() {
  const [child, setChild] = useState([]);
  const { childId } = useParams();

  const getAChild = (id) => {
    axios
      .get(`${API_URL}/child/${childId}`)
      .then((response) => setChild(response.data))
      .catch((error) => console.log(error));
  };

  console.log("MEEEE", child);

  const renderChild = () => {
    return child.map((child) => <ChildCard key={child._id} {...child} />);
  };

  return (
    <div>
      <h1>Child Detail Page</h1>
      {child.length > 0 ? renderChild() : <p>No hay datos del niño.</p>}
    </div>
  );
}

export default ChildDetailPage;
