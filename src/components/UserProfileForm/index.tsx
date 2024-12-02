import React, { useState } from "react";
import "../../styles/UserProfile.css";

interface UserProfileFormData {
  name: string;
  email: string;
  bio: string;
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
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: ValidationErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.bio) {
      newErrors.bio = "Bio is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  return (
    <div className="user-profile-form">
      <h2>User Profile</h2>
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
            />
          </label>
          {errors.email && <p className="error-message">{errors.email}</p>}
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
            />
          </label>
          {errors.bio && <p className="error-message">{errors.bio}</p>}
        </div>

        <button type="submit" className="submit-button">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfileForm;
