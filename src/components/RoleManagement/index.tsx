import React, { useState } from "react";
import "../../styles/RoleManagement.css";

const mockData = {
  users: [
    { id: "1", name: "John Doe", email: "john@example.com" },
    { id: "2", name: "Jane Smith", email: "jane@example.com" },
    { id: "3", name: "Mike Johnson", email: "mike@example.com" },
  ],
  roles: [
    { id: "1", name: "Admin", description: "Full system access" },
    { id: "2", name: "User", description: "Basic access" },
    { id: "3", name: "Manager", description: "Department management" },
  ],
  applications: [
    { id: "1", name: "CRM System", description: "Customer management" },
    { id: "2", name: "HR Portal", description: "Employee management" },
    { id: "3", name: "Finance App", description: "Financial management" },
  ],
};

const RoleManagement = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedRoleForApp, setSelectedRoleForApp] = useState("");
  const [selectedApp, setSelectedApp] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAssignUserToRole = () => {
    if (!selectedUser || !selectedRole) {
      setErrorMessage("Please select both user and role");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    setSuccessMessage("User successfully assigned to role!");
    setTimeout(() => setSuccessMessage(""), 3000);
    setSelectedUser("");
    setSelectedRole("");
  };

  const handleAssignRoleToApp = () => {
    if (!selectedRoleForApp || !selectedApp) {
      setErrorMessage("Please select both role and application");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    setSuccessMessage("Role successfully assigned to application!");
    setTimeout(() => setSuccessMessage(""), 3000);
    setSelectedRoleForApp("");
    setSelectedApp("");
  };

  return (
    <div className="role-management">
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="section">
        <h2>Assign User to Role</h2>
        <div className="select-group">
          <label>Select User</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Choose a user...</option>
            {mockData.users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <div className="select-group">
          <label>Select Role</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">Choose a role...</option>
            {mockData.roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name} - {role.description}
              </option>
            ))}
          </select>
        </div>

        <button className="button" onClick={handleAssignUserToRole}>
          Assign Role to User
        </button>
      </div>

      <div className="section">
        <h2>Assign Role to Application</h2>
        <div className="select-group">
          <label>Select Role</label>
          <select
            value={selectedRoleForApp}
            onChange={(e) => setSelectedRoleForApp(e.target.value)}
          >
            <option value="">Choose a role...</option>
            {mockData.roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name} - {role.description}
              </option>
            ))}
          </select>
        </div>

        <div className="select-group">
          <label>Select Application</label>
          <select
            value={selectedApp}
            onChange={(e) => setSelectedApp(e.target.value)}
          >
            <option value="">Choose an application...</option>
            {mockData.applications.map((app) => (
              <option key={app.id} value={app.id}>
                {app.name} - {app.description}
              </option>
            ))}
          </select>
        </div>

        <button className="button" onClick={handleAssignRoleToApp}>
          Assign Role to Application
        </button>
      </div>
    </div>
  );
};

export default RoleManagement;
