import React from 'react';
import '../styles/teampage.css';
import arnavImage from '../social/arnav.png';
import ashmithImage from '../social/ashmith.png';
import dennisImage from '../social/dennis.png';

const TeamPage = () => {
  return (
    <div className="leadership-team">
      <h2 className="leadership-team__title">Our leadership team</h2>
      <p className="leadership-team__description">
        We help you network where you can find others and find yourself. We are here to season your tech journey to success.
        <br /> -Unlock Your Potential, Ignite Your Tech Rise: Discover Your Network-
      </p>
      <div className="leadership-team__members">
        <div className="leadership-team__member">
          <div className="leadership-team__member-image-arnav">
            <img src= {arnavImage} alt="Arnav Thakur" />
          </div>
          <div className="leadership-team__member-info">
            <h3 className="leadership-team__member-name">Arnav Thakur</h3>
            <p className="leadership-team__member-title">CFO & API TESTER</p>
          </div>
        </div>
        <div className="leadership-team__member">
          <div className="leadership-team__member-image-den">
            <img src={dennisImage} alt="Dennis Philip" width={20} height={1}/>
          </div>
          <div className="leadership-team__member-info">
            <h3 className="leadership-team__member-name">Dennis Philip</h3>
            <p className="leadership-team__member-title">CO-FOUNDER & CEO</p>
          </div>
        </div>
        <div className="leadership-team__member">
          <div className="leadership-team__member-image">
            <img src={ashmithImage} alt="Ashmith Reddy" width={20} height={10} />
          </div>
          <div className="leadership-team__member-info">
            <h3 className="leadership-team__member-name">Ashmith Reddy</h3>
            <p className="leadership-team__member-title">EXECUTIVE & BACKEND DEVELOPER </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;