import "./ChildDetailPage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import childService from "../../services/child.service";
import ChildCard from "../../components/Child/ChildCard";
import VaccineAlert from "../../components/VaccineAlert/VaccineAlert";

function ChildDetailPage() {
  const [child, setChild] = useState([]);
  const { id } = useParams();
  const { familyId } = useParams();

  useEffect(() => {
    const getChild = () => {
      childService
        .getOne(id)
        .then((response) => setChild(response.data))
        .catch((error) => console.log(error));
    };
    getChild();
  }, [id]);

  const renderChild = () => {
    return <ChildCard key={child._id} {...child} />;
  };

  return (
    <div>
      <Link to={`/family/${familyId}/children/`}>Volver a hijos</Link>
      <h1>Child Detail Page</h1>
      {child && renderChild()}
      <VaccineAlert childId={id} childName={child.name} />
    </div>
  );
}

export default ChildDetailPage;
