import React from 'react';
import '../styles/clubpage.css';
import nexusImage from '../social/nexus.png';
import auraImage from '../social/aura.png';
import appexImage from '../social/appex.png';
import gronitImage from '../social/gronit.png';
import embrionImage from '../social/embrione.png';
import pixelImage from '../social/pixels.png';
import hopesImage from '../social/hopes.png';
import tedxImage from '../social/tedx.png';

const Club = ({ image, name, headline, backgroundColor }) => {
  return (
    <div className="carda" style={{ backgroundColor }}>
      <img src={image} alt={name} className="card-imagea" />
      <h3 className="card-namea">{name}</h3>
      <p className="card-headlinea">{headline}</p>
    </div>
  );
};

const ClubPage = () => {
  const clubData = [
    {
      image: nexusImage,
      name: 'Nexus',
      headline: 'Web-dev & Hackathons',
      backgroundColor: 'rgba(18, 13, 48, 1)',
    },
    {
      image: auraImage,
      name: 'Aura',
      headline: 'AI-ML hackathons',
      backgroundColor: 'rgba(127, 60, 22, 1)',
    },
    {
      image: appexImage,
      name: 'Appex',
      headline: 'App Dev Hackathons',
      backgroundColor: 'rgba(25, 57, 67, 1)',
    },
    {
      image: gronitImage,
      name: 'GronIT',
      headline: 'Green Computing Club',
      backgroundColor: 'rgba(50, 100, 33, 1)',
    },
    {
      image: embrionImage,
      name: 'Embrione',
      headline: 'National Level Hackathons',
      backgroundColor: 'rgba(59, 32, 223, 1)',
    },
    {
      image: tedxImage,
      name: 'TEDxPESU',
      headline: 'TEDx events',
      backgroundColor: 'rgba(96, 3, 3, 1)',
    },
    {
      image: pixelImage,
      name: 'Pixels',
      headline: 'Photography',
      backgroundColor: 'rgba(3, 112, 136, 1)',
    },
    {
      image: hopesImage,
      name: 'Hopes',
      headline: 'Media Club',
      backgroundColor: 'rgba(4, 2, 18, 1)',
    },
  ];

  return (
    <div className="ap">
      <div className="contenta">
        <h1 className="titlea">Clubs</h1>
        <div className="cardsa">
          {clubData.map((club, index) => (
            <Club
              key={index}
              image={club.image}
              name={club.name}
              headline={club.headline}
              backgroundColor={club.backgroundColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClubPage;