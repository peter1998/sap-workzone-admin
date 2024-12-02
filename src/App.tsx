import React from "react";
import UserProfileForm from "./components/UserProfileForm";
import RoleManagement from "./components/RoleManagement";
import "./styles/index.css";

function App() {
  return (
    <div>
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          padding: "20px",
          color: "#333",
        }}
      >
        SAP Work Zone Admin
      </h1>
      <div>
        <RoleManagement />
        <UserProfileForm />
      </div>
    </div>
  );
}

export default App;
