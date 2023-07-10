import "./ChildDetailPage.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import childService from "../../services/child.service";
import ChildCard from "../../components/Child/ChildCard";

function ChildDetailPage() {
  const [child, setChild] = useState([]);
  const { id } = useParams();
  const { familyId } = useParams();

  const getChild = () => {
    childService
      .getOne(id)
      .then((response) => setChild(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getChild();
  }, [id]);

  return (
    <div>
      <h1>Child Detail Page</h1>
      <ChildCard key={child._id} {...child} />
    </div>
  );
}

export default ChildDetailPage;
