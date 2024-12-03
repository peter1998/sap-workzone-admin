import React, { useState } from "react";
import { api } from "../../services/api";
import "../../styles/UserProfile.css";

interface UserProfileFormData {
  name: string;
  email: string;
  bio: string;
  preferredLanguage?: string;
  preferredRegion?: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  bio?: string;
}

const UserProfileForm = () => {
  const [formData, setFormData] = useState<UserProfileFormData>({
    name: "",
    email: "",
    bio: "",
    preferredLanguage: "",
    preferredRegion: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: ValidationErrors = {};

    // Validation
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.bio) newErrors.bio = "Bio is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit to API
    try {
      setLoading(true);
      await api.users.create(formData);
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrors({ name: "Failed to update profile. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  return (
    <div className="user-profile-form">
      <h2>User Profile</h2>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your name"
              disabled={loading}
            />
          </label>
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="username@domain.com"
              disabled={loading}
            />
          </label>
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">
            Preferred Language
            <select
              name="preferredLanguage"
              value={formData.preferredLanguage}
              onChange={handleChange}
              className="form-input"
              disabled={loading}
            >
              <option value="">Select language...</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">
            Preferred Region
            <select
              name="preferredRegion"
              value={formData.preferredRegion}
              onChange={handleChange}
              className="form-input"
              disabled={loading}
            >
              <option value="">Select region...</option>
              <option value="na">North America</option>
              <option value="eu">Europe</option>
              <option value="asia">Asia</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">
            Bio
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Tell us about yourself"
              rows={4}
              disabled={loading}
            />
          </label>
          {errors.bio && <p className="error-message">{errors.bio}</p>}
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

export default UserProfileForm;
