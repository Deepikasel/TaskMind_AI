import { useEffect, useState } from "react";
import "./Profile.css";

import Loader from "../../components/Loader/Loader";
import { getProfile } from "../../services/authService";

function Profile() {
  const [loading, setLoading] =
    useState(true);

  const [user, setUser] =
    useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

     const response =
await getProfile();
setUser(response.data);
    } catch (error) {
      console.log(error);

      setUser({
        name: "Demo User",
        email:
          "demo@taskmindai.com",
        role: "User",
        joined:
          "January 2026",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="profile-page">
      <div className="container">

        <div className="profile-card">

          <div className="profile-avatar">
            {user?.name?.charAt(0)}
          </div>

          <h1>{user?.name}</h1>

          <p>{user?.email}</p>

          <div className="profile-info">

            <div className="info-box">
              <h3>Role</h3>
              <p>
                {user?.role || "User"}
              </p>
            </div>

            <div className="info-box">
              <h3>Member Since</h3>
              <p>
                {user?.joined ||
                  "2026"}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;