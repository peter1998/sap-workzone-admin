// src/App.tsx
import React from "react";
import UserProfileForm from "./components/UserProfileForm";
import RoleManagement from "./components/RoleManagement";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8">
          {/* Role Management Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              SAP Work Zone Admin
            </h1>
            <RoleManagement />
          </div>

          {/* User Profile Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              User Profile Management
            </h2>
            <UserProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
