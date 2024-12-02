// src/App.tsx

import React from "react";
import UserProfileForm from "./components/UserProfileForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto">
        <UserProfileForm />
      </div>
    </div>
  );
}

export default App;
