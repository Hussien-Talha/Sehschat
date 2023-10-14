import React, { useState, useEffect } from 'react';
import ProfileService from '../services/ProfileService';

function Profile({ user }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const userProfile = await ProfileService.getProfile(user.id);
      setProfile(userProfile);
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Profile</h1>
      <div className="row">
        <div className="col-md-4">
          <img src={profile?.photo} alt="Profile" className="img-fluid" />
        </div>
        <div className="col-md-8">
          <h3>{profile?.name}</h3>
          <p>Status: {profile?.status}</p>
          <p>Bio: {profile?.bio}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
