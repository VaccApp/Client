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

import FamilyCreateForm from "./pages/FamilyCreateForm/FamilyCreateForm";
import EditVaccinePage from "./pages/VaccinesPage/EditVaccinePage";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/family"
          element={
            <IsPrivate>
              <FamilyPage />
            </IsPrivate>
          }
        />

        <Route path="/family/create" element={<FamilyCreateForm />} />

        <Route path="/family/:familyId" element={<FamilyDetails />} />

        <Route path="/child" element={<ChildrenPage />} />

        <Route path="/child/:childId" element={<ChildPage />} />

        <Route path="/vaccines" element={<VaccinesPage />} />

        <Route path="/vaccines/:vaccineId" element={<VaccinePage />} />

        <Route path="/vaccines/:vaccineId/edit" element={<EditVaccinePage />} />

        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />

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

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
