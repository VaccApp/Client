import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";

import FamilyPage from "./pages/FamilyPage/FamilyPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import React from "react";
import FamilyDetails from "./components/Family/FamilyDetails";
import VaccinesPage from "./pages/VaccinesPage/VaccinesPage";
import VaccinePage from "./pages/VaccinesPage/VaccinePage";
import ChildrenPage from "./pages/ChildrenPage/ChildrenPage";
import ChildPage from "./pages/ChildrenPage/ChildPage";
import AddChildPage from "./pages/AddChildPage/AddChildPage";
import ChildDetailPage from "./pages/ChildDetailPage/ChildDetailPage";
import FamilyCreateForm from "./pages/FamilyCreateForm/FamilyCreateForm";
import EditVaccinePage from "./pages/VaccinesPage/EditVaccinePage";
import JoinFamily from "./pages/JoinFamily/JoinFamily";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";
import EditChildPage from "./pages/EditChildPage/EditChildPage";
import CentersPage from "./pages/CentersPage/CentersPage";
import ChildDetails from "./components/Child/ChildDetails";
import AppointmentsPage from "./pages/AppointmentsPage/AppointmentsPage";
import ChildVaccinePage from "./pages/ChildrenPage/ChildVaccinePage";
import VaccinationForm from "./pages/VaccinationForm/VaccinationForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/family" element={<FamilyPage />} />

        <Route path="/family/create" element={<FamilyCreateForm />} />

        <Route path="/family/:familyId" element={<FamilyDetails />} />

        <Route path="/family/:familyId/add-child" element={<AddChildPage />} />

        {/* <Route path="/child" element={<ChildrenPage />} /> */}

        <Route
          path="family/:familyId/children/:childId"
          element={<ChildDetailPage />}
        />

        <Route
          path="/family/:familyId/children/:childId/edit"
          element={<EditChildPage />}
        />
        <Route path="/family/:familyId/children" element={<ChildrenPage />} />

        <Route path="/child/:childId" element={<ChildDetails />} />

        <Route path="/child/:childId/vaccinate" element={<VaccinationForm />} />

        <Route path="/vaccines/:vaccineId/edit" element={<EditVaccinePage />} />

        <Route path="/vaccines" element={<VaccinesPage />} />

        <Route path="/vaccines/:vaccineId" element={<VaccinePage />} />

        <Route
          path="/child/vaccine/:vaccineId"
          element={<ChildVaccinePage />}
        />

        <Route
          path="/family/:familyId/appointments"
          element={<AppointmentsPage />}
        />

        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />

        <Route path="/profile/:userId/edit" element={<EditProfilePage />} />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route path="/join-family/:familyId" element={<JoinFamily />} />

        <Route path="/centers" element={<CentersPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Navbar />
    </div>
  );
}

export default App;
