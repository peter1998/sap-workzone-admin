import React, { useState, useEffect } from "react";
import { User, Role, Application } from "../../types";
import Pagination from "../Pagination";
import "../../styles/RoleManagement.css";

const mockData = {
  users: Array.from({ length: 50 }, (_, i) => ({
    id: `${i + 1}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
  })),
  roles: Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 1}`,
    name: `Role ${i + 1}`,
    description: `Description for Role ${i + 1}`,
  })),
  applications: Array.from({ length: 15 }, (_, i) => ({
    id: `${i + 1}`,
    name: `App ${i + 1}`,
    description: `Description for App ${i + 1}`,
  })),
};

const ITEMS_PER_PAGE = 5;

const RoleManagement = () => {
  // Entity states
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  // UI states
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Selection states
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedRoleForApp, setSelectedRoleForApp] = useState("");
  const [selectedApp, setSelectedApp] = useState("");

  // Search states
  const [userSearch, setUserSearch] = useState("");
  const [roleSearch, setRoleSearch] = useState("");
  const [appSearch, setAppSearch] = useState("");

  // Pagination states
  const [userPage, setUserPage] = useState(1);
  const [rolePage, setRolePage] = useState(1);
  const [appPage, setAppPage] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setUsers(mockData.users);
      setRoles(mockData.roles);
      setApplications(mockData.applications);
      setLoading(false);
    }, 1000);
  }, []);

  const paginateData = <T extends any>(
    items: T[],
    currentPage: number,
    searchValue: string,
    filterFn: (item: T) => boolean
  ) => {
    const filtered = items.filter(filterFn);
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return {
      items: filtered.slice(startIndex, endIndex),
      totalPages,
    };
  };

  const getFilteredUsers = () => {
    return paginateData(
      users,
      userPage,
      userSearch,
      (user) =>
        user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearch.toLowerCase())
    );
  };

  const getFilteredRoles = () => {
    return paginateData(
      roles,
      rolePage,
      roleSearch,
      (role) =>
        role.name.toLowerCase().includes(roleSearch.toLowerCase()) ||
        (role.description?.toLowerCase().includes(roleSearch.toLowerCase()) ??
          false)
    );
  };

  const getFilteredApps = () => {
    return paginateData(
      applications,
      appPage,
      appSearch,
      (app) =>
        app.name.toLowerCase().includes(appSearch.toLowerCase()) ||
        (app.description?.toLowerCase().includes(appSearch.toLowerCase()) ??
          false)
    );
  };

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

    setLoading(true);
    setTimeout(() => {
      showMessage("Successfully assigned role to application");
      setSelectedRoleForApp("");
      setSelectedApp("");
      setLoading(false);
    }, 500);
  };

  const handleSearch = (
    value: string,
    setSearch: (value: string) => void,
    setPage: (page: number) => void
  ) => {
    setSearch(value);
    setPage(1); // Reset to first page when searching
  };

  if (loading) return <div className="loading">Loading...</div>;

  const { items: filteredUsers, totalPages: userTotalPages } =
    getFilteredUsers();
  const { items: filteredRoles, totalPages: roleTotalPages } =
    getFilteredRoles();
  const { items: filteredApps, totalPages: appTotalPages } = getFilteredApps();

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
          <input
            type="text"
            placeholder="Search users..."
            value={userSearch}
            onChange={(e) =>
              handleSearch(e.target.value, setUserSearch, setUserPage)
            }
            className="search-input"
          />
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Choose a user...</option>
            {filteredUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
          <Pagination
            currentPage={userPage}
            totalPages={userTotalPages}
            onPageChange={setUserPage}
          />
        </div>

        <div className="select-group">
          <label>Select Role</label>
          <input
            type="text"
            placeholder="Search roles..."
            value={roleSearch}
            onChange={(e) =>
              handleSearch(e.target.value, setRoleSearch, setRolePage)
            }
            className="search-input"
          />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">Choose a role...</option>
            {filteredRoles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name} - {role.description}
              </option>
            ))}
          </select>
          <Pagination
            currentPage={rolePage}
            totalPages={roleTotalPages}
            onPageChange={setRolePage}
          />
        </div>

        <button className="button" onClick={handleAssignUserToRole}>
          Assign Role to User
        </button>
      </div>

      <div className="section">
        <h2>Assign Role to Application</h2>
        <div className="select-group">
          <label>Select Role</label>
          <input
            type="text"
            placeholder="Search roles..."
            value={roleSearch}
            onChange={(e) =>
              handleSearch(e.target.value, setRoleSearch, setRolePage)
            }
            className="search-input"
          />
          <select
            value={selectedRoleForApp}
            onChange={(e) => setSelectedRoleForApp(e.target.value)}
          >
            <option value="">Choose a role...</option>
            {filteredRoles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name} - {role.description}
              </option>
            ))}
          </select>
          <Pagination
            currentPage={rolePage}
            totalPages={roleTotalPages}
            onPageChange={setRolePage}
          />
        </div>

        <div className="select-group">
          <label>Select Application</label>
          <input
            type="text"
            placeholder="Search applications..."
            value={appSearch}
            onChange={(e) =>
              handleSearch(e.target.value, setAppSearch, setAppPage)
            }
            className="search-input"
          />
          <select
            value={selectedApp}
            onChange={(e) => setSelectedApp(e.target.value)}
          >
            <option value="">Choose an application...</option>
            {filteredApps.map((app) => (
              <option key={app.id} value={app.id}>
                {app.name} - {app.description}
              </option>
            ))}
          </select>
          <Pagination
            currentPage={appPage}
            totalPages={appTotalPages}
            onPageChange={setAppPage}
          />
        </div>

        <button className="button" onClick={handleAssignRoleToApp}>
          Assign Role to Application
        </button>
      </div>
    </div>
  );
};

export default RoleManagement;
