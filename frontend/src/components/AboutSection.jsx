import { useState } from "react";
import './aboutsection.css'

const AboutSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState(userData.about || "");

  const handleSave = () => {
    setIsEditing(false);
    onSave({ about });
  };

  return (
    <div className="about-section">
      <h2 className="about-section__title">About</h2>
      {isOwnProfile && (
        <>
          {isEditing ? (
            <>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="about-section__textarea"
                rows="4"
              />
              <button
                onClick={handleSave}
                className="about-section__save-button"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <p className="about-section__text">{userData.about}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="about-section__edit-button"
              >
                Edit
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AboutSection;