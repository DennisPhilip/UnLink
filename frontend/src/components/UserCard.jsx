import React from 'react';
import './usercard.css';

const UserProfile = ({ user }) => {
  return (
    <div className="profile-card">
      <div className="banner" style={{ backgroundImage: `url(${user.bannerImg})` }}></div>
      <div className="profile-picture" style={{ backgroundImage: `url(${user.profilePicture})` }}></div>
      <div className="profile-details">
        <h2>{user.name}</h2>
        <p>{user.headline}</p>
        <p>{user.connections.length} connections</p>
      </div>
    </div>
  );
};

export default UserProfile;
