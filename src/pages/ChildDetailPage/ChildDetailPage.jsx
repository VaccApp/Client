import "./ChildDetailPage.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import childService from "../../services/child.service";
import axios from "axios";
// import ChildCard from "../../components/ChildCard/ChildCard";

function ChildDetailPage() {
  const [child, setChild] = useState([]);
  const { id } = useParams();
  const { familyId } = useParams();

  

  const renderChild = () => {
    // return child.map((child) => <ChildCard key={child._id} {...child} />);
  };

  return (
    <div>
      <h1>Child Detail Page</h1>
      {child.length > 0 ? renderChild() : <p>No hay datos del niño.</p>}
    </div>
  );
}

export default ChildDetailPage;
