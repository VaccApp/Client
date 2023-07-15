import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import familyService from "../../services/family.service";

export default function AppointmentsPage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const id = user._id;
  const [calendar, setCalendar] = useState([]);

  const getFamily = (id) => {
    familyService
      .list()
      .then((response) => setCalendar(response.data))
      .catch((error) => console.log(error));
  };

  const renderChildren = () => {
    return calendar.map((cal) => {
      <div>
        <p>{cal.surname}</p>
      </div>;
    });
  };
  console.log("calendar", calendar);

  useEffect(() => {
    getFamily();
  }, []);

  return calendar && <h1>Página de citas médicas</h1>;
}
