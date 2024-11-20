import { useState } from "react";
import "./EducationSection.css";

const EducationSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [educations, setEducations] = useState(userData.education || []);
	const [newEducation, setNewEducation] = useState({
		school: "",
		fieldOfStudy: "",
		startYear: "",
		endYear: "",
	});

	const handleAddEducation = () => {
		if (newEducation.school && newEducation.fieldOfStudy && newEducation.startYear) {
			setEducations([...educations, newEducation]);
			setNewEducation({
				school: "",
				fieldOfStudy: "",
				startYear: "",
				endYear: "",
			});
		}
	};

	const handleDeleteEducation = (id) => {
		setEducations(educations.filter((edu) => edu._id !== id));
	};

	const handleSave = () => {
		onSave({ education: educations });
		setIsEditing(false);
	};

	return (
		<div className="education-container">
			<h2 className="education-title">Education</h2>
			{educations.map((edu) => (
				<div key={edu._id} className="education-item">
					<div className="education-content">
						<div className="icon-wrapper">🎓</div>
						<div>
							<h3 className="field-of-study">{edu.fieldOfStudy}</h3>
							<p className="school-name">{edu.school}</p>
							<p className="education-duration">
								{edu.startYear} - {edu.endYear || "Present"}
							</p>
						</div>
					</div>
					{isEditing && (
						<button 
							onClick={() => handleDeleteEducation(edu._id)} 
							className="delete-button"
						>
							✖
						</button>
					)}
				</div>
			))}

			{isEditing && (
				<div className="add-education-form">
					<input
						type='text'
						placeholder='School'
						value={newEducation.school}
						onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
						className="form-input"
					/>
					<input
						type='text'
						placeholder='Field of Study'
						value={newEducation.fieldOfStudy}
						onChange={(e) => setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })}
						className="form-input"
					/>
					<input
						type='number'
						placeholder='Start Year'
						value={newEducation.startYear}
						onChange={(e) => setNewEducation({ ...newEducation, startYear: e.target.value })}
						className="form-input"
					/>
					<input
						type='number'
						placeholder='End Year'
						value={newEducation.endYear}
						onChange={(e) => setNewEducation({ ...newEducation, endYear: e.target.value })}
						className="form-input"
					/>
					<button
						onClick={handleAddEducation}
						className="add-button"
					>
						Add Education
					</button>
				</div>
			)}

			{isOwnProfile && (
				<>
					{isEditing ? (
						<button
							onClick={handleSave}
							className="save-button"
						>
							Save Changes
						</button>
					) : (
						<button
							onClick={() => setIsEditing(true)}
							className="edit-button"
						>
							Edit Education
						</button>
					)}
				</>
			)}
		</div>
	);
};

export default EducationSection;