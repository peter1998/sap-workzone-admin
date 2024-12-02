import React, { useState, useEffect } from "react";
import { User, Role, Application } from "../../types";
import { api } from "../../services/api";

const RoleManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Selected items for assignments
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedApp, setSelectedApp] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersRes, rolesRes, appsRes] = await Promise.all([
          api.getUsers(),
          api.getRoles(),
          api.getApplications(),
        ]);

        setUsers(usersRes.data);
        setRoles(rolesRes.data);
        setApplications(appsRes.data);
      } catch (err) {
        setError("Failed to load data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAssignUserToRole = async () => {
    if (!selectedUser || !selectedRole) return;

    try {
      await api.assignUserToRole(selectedUser, selectedRole);
      // Show success message or update UI
    } catch (err) {
      setError("Failed to assign user to role");
    }
  };

  const handleAssignRoleToApp = async () => {
    if (!selectedRole || !selectedApp) return;

    try {
      await api.assignRoleToApplication(selectedRole, selectedApp);
      // Show success message or update UI
    } catch (err) {
      setError("Failed to assign role to application");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Role Management</h1>

      {/* User to Role Assignment Section */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Assign User to Role</h2>
        <div className="grid grid-cols-2 gap-4">
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleAssignUserToRole}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Assign User to Role
        </button>
      </div>

      {/* Role to Application Assignment Section */}
      <div className="p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          Assign Role to Application
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          <select
            value={selectedApp}
            onChange={(e) => setSelectedApp(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Select Application</option>
            {applications.map((app) => (
              <option key={app.id} value={app.id}>
                {app.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleAssignRoleToApp}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Assign Role to Application
        </button>
      </div>
    </div>
  );
};

export default RoleManagement;
