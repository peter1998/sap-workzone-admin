import React, { useState, useEffect } from "react";
import { User, Role, Application } from "../../types";
import "../../styles/RoleManagement.css";

const mockData = {
  users: [
    { id: "1", name: "John Doe", email: "john@example.com" },
    { id: "2", name: "Jane Smith", email: "jane@example.com" },
    { id: "3", name: "Mike Johnson", email: "mike@example.com" },
  ],
  roles: [
    { id: "1", name: "Admin", description: "Full access" },
    { id: "2", name: "User", description: "Limited access" },
    { id: "3", name: "Manager", description: "Department access" },
  ],
  applications: [
    { id: "1", name: "CRM", description: "Customer Management" },
    { id: "2", name: "HR", description: "Human Resources" },
    { id: "3", name: "Finance", description: "Financial System" },
  ],
};

const RoleManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedRoleForApp, setSelectedRoleForApp] = useState("");
  const [selectedApp, setSelectedApp] = useState("");

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setUsers(mockData.users);
      setRoles(mockData.roles);
      setApplications(mockData.applications);
      setLoading(false);
    }, 1000);
  }, []);

  const showMessage = (message: string, isError = false) => {
    if (isError) {
      setErrorMessage(message);
    } else {
      setSuccessMessage(message);
    }
    setTimeout(() => {
      isError ? setErrorMessage("") : setSuccessMessage("");
    }, 3000);
  };

  const handleAssignUserToRole = async () => {
    if (!selectedUser || !selectedRole) {
      showMessage("Please select both user and role", true);
      return;
    }

    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      showMessage("Successfully assigned user to role");
      setSelectedUser("");
      setSelectedRole("");
      setLoading(false);
    }, 500);
  };

  const handleAssignRoleToApp = async () => {
    if (!selectedRoleForApp || !selectedApp) {
      showMessage("Please select both role and application", true);
      return;
    }

    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      showMessage("Successfully assigned role to application");
      setSelectedRoleForApp("");
      setSelectedApp("");
      setLoading(false);
    }, 500);
  };

  if (loading) return <div className="loading">Loading...</div>;

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
            {users.map((user) => (
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
            {roles.map((role) => (
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
            {roles.map((role) => (
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
            {applications.map((app) => (
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
