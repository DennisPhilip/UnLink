// ConnectionCard.jsx
import React from 'react';
import './connection.css'
import { Link } from 'react-router-dom';

const ConnectionCard = ({ user, isConnection }) => {
    return (
        <div className="connection-card">
            <img 
                src={user.profilePicture} 
                alt={`${user.name}'s profile`} 
                className="profile-image"
            />
            <div className="user-info">
                <Link to={`/profile/${user.username}`}>
                    <h3 className="user-name">{user.name}</h3>
                </Link>
                <p className="user-semester">{user.semester}</p>
                <p className="user-headline">{user.headline}</p>
            </div>
        </div>
    );
};

export default ConnectionCard;