import React, { useState, useEffect, useCallback } from "react";
import { User, Role, Application } from "../../types";
import Pagination from "../Pagination";
import { useDebounce } from "../../hooks/useDebounce";
import "../../styles/RoleManagement.css";

// Extended mock data to demonstrate pagination and filtering
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

// Configuration constants
const ITEMS_PER_PAGE = 5;
const DEBOUNCE_DELAY = 300;
const MESSAGE_DURATION = 3000;

const RoleManagement = () => {
  // Entity states
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  // UI states
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState({
    users: false,
    roles: false,
    apps: false,
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Selection states
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedRoleForApp, setSelectedRoleForApp] = useState("");
  const [selectedApp, setSelectedApp] = useState("");

  // Search states with debouncing
  const [userSearch, setUserSearch] = useState("");
  const [roleSearch, setRoleSearch] = useState("");
  const [appSearch, setAppSearch] = useState("");

  // Debounced search values to prevent excessive filtering
  const debouncedUserSearch = useDebounce(userSearch, DEBOUNCE_DELAY);
  const debouncedRoleSearch = useDebounce(roleSearch, DEBOUNCE_DELAY);
  const debouncedAppSearch = useDebounce(appSearch, DEBOUNCE_DELAY);

  // Pagination states
  const [userPage, setUserPage] = useState(1);
  const [rolePage, setRolePage] = useState(1);
  const [appPage, setAppPage] = useState(1);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setUsers(mockData.users);
        setRoles(mockData.roles);
        setApplications(mockData.applications);
      } catch (error) {
        showMessage("Failed to load initial data", true);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Optimized pagination function
  const paginateData = useCallback(
    <T extends any>(
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
    },
    []
  );

  // Memoized filter functions
  const getFilteredUsers = useCallback(() => {
    return paginateData(
      users,
      userPage,
      debouncedUserSearch,
      (user) =>
        user.name.toLowerCase().includes(debouncedUserSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedUserSearch.toLowerCase())
    );
  }, [users, userPage, debouncedUserSearch]);

  const getFilteredRoles = useCallback(() => {
    return paginateData(
      roles,
      rolePage,
      debouncedRoleSearch,
      (role) =>
        role.name.toLowerCase().includes(debouncedRoleSearch.toLowerCase()) ||
        (role.description
          ?.toLowerCase()
          .includes(debouncedRoleSearch.toLowerCase()) ??
          false)
    );
  }, [roles, rolePage, debouncedRoleSearch]);

  const getFilteredApps = useCallback(() => {
    return paginateData(
      applications,
      appPage,
      debouncedAppSearch,
      (app) =>
        app.name.toLowerCase().includes(debouncedAppSearch.toLowerCase()) ||
        (app.description
          ?.toLowerCase()
          .includes(debouncedAppSearch.toLowerCase()) ??
          false)
    );
  }, [applications, appPage, debouncedAppSearch]);

  // Message handling
  const showMessage = useCallback((message: string, isError = false) => {
    if (isError) {
      setErrorMessage(message);
    } else {
      setSuccessMessage(message);
    }
    setTimeout(() => {
      isError ? setErrorMessage("") : setSuccessMessage("");
    }, MESSAGE_DURATION);
  }, []);

  // Assignment handlers
  const handleAssignUserToRole = async () => {
    if (!selectedUser || !selectedRole) {
      showMessage("Please select both user and role", true);
      return;
    }

    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      showMessage("Successfully assigned user to role");
      setSelectedUser("");
      setSelectedRole("");
    } catch (error) {
      showMessage("Failed to assign user to role", true);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignRoleToApp = async () => {
    if (!selectedRoleForApp || !selectedApp) {
      showMessage("Please select both role and application", true);
      return;
    }

    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      showMessage("Successfully assigned role to application");
      setSelectedRoleForApp("");
      setSelectedApp("");
    } catch (error) {
      showMessage("Failed to assign role to application", true);
    } finally {
      setLoading(false);
    }
  };

  // Search handling with loading states
  const handleSearch = useCallback(
    (
      value: string,
      setSearch: (value: string) => void,
      setPage: (page: number) => void,
      type: "users" | "roles" | "apps"
    ) => {
      setSearch(value);
      setPage(1);
      setSearchLoading((prev) => ({ ...prev, [type]: true }));

      setTimeout(() => {
        setSearchLoading((prev) => ({ ...prev, [type]: false }));
      }, DEBOUNCE_DELAY + 100);
    },
    []
  );

  if (loading)
    return <div className="loading loading-animation">Loading...</div>;

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
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search users..."
              value={userSearch}
              onChange={(e) =>
                handleSearch(
                  e.target.value,
                  setUserSearch,
                  setUserPage,
                  "users"
                )
              }
              className="search-input"
            />
            {searchLoading.users && (
              <div className="search-loading-indicator">Searching...</div>
            )}
          </div>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="select-input"
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
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search roles..."
              value={roleSearch}
              onChange={(e) =>
                handleSearch(
                  e.target.value,
                  setRoleSearch,
                  setRolePage,
                  "roles"
                )
              }
              className="search-input"
            />
            {searchLoading.roles && (
              <div className="search-loading-indicator">Searching...</div>
            )}
          </div>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="select-input"
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

        <button
          className="button"
          onClick={handleAssignUserToRole}
          disabled={loading}
        >
          {loading ? "Assigning..." : "Assign Role to User"}
        </button>
      </div>

      <div className="section">
        <h2>Assign Role to Application</h2>
        <div className="select-group">
          <label>Select Role</label>
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search roles..."
              value={roleSearch}
              onChange={(e) =>
                handleSearch(
                  e.target.value,
                  setRoleSearch,
                  setRolePage,
                  "roles"
                )
              }
              className="search-input"
            />
            {searchLoading.roles && (
              <div className="search-loading-indicator">Searching...</div>
            )}
          </div>
          <select
            value={selectedRoleForApp}
            onChange={(e) => setSelectedRoleForApp(e.target.value)}
            className="select-input"
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
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search applications..."
              value={appSearch}
              onChange={(e) =>
                handleSearch(e.target.value, setAppSearch, setAppPage, "apps")
              }
              className="search-input"
            />
            {searchLoading.apps && (
              <div className="search-loading-indicator">Searching...</div>
            )}
          </div>
          <select
            value={selectedApp}
            onChange={(e) => setSelectedApp(e.target.value)}
            className="select-input"
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

        <button
          className="button"
          onClick={handleAssignRoleToApp}
          disabled={loading}
        >
          {loading ? "Assigning..." : "Assign Role to Application"}
        </button>
      </div>
    </div>
  );
};

export default RoleManagement;
