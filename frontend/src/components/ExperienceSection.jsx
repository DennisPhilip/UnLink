import { useState } from "react";
import { formatDate } from "../utils/dateUtils";
import "./ExperienceSection.css";

const ExperienceSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [experiences, setExperiences] = useState(userData.experience || []);
	const [newExperience, setNewExperience] = useState({
		title: "",
		company: "",
		startDate: "",
		endDate: "",
		description: "",
		currentlyWorking: false,
	});

	const handleAddExperience = () => {
		if (newExperience.title && newExperience.company && newExperience.startDate) {
			setExperiences([...experiences, newExperience]);

			setNewExperience({
				title: "",
				company: "",
				startDate: "",
				endDate: "",
				description: "",
				currentlyWorking: false,
			});
		}
	};

	const handleDeleteExperience = (id) => {
		setExperiences(experiences.filter((exp) => exp._id !== id));
	};

	const handleSave = () => {
		onSave({ experience: experiences });
		setIsEditing(false);
	};

	const handleCurrentlyWorkingChange = (e) => {
		setNewExperience({
			...newExperience,
			currentlyWorking: e.target.checked,
			endDate: e.target.checked ? "" : newExperience.endDate,
		});
	};

	return (
		<div className="experience-container">
			<h2 className="experience-title">Experience</h2>
			{experiences.map((exp) => (
				<div key={exp._id} className="experience-item">
					<div className="experience-content">
						<div className="icon-wrapper">📋</div>
						<div>
							<h3 className="job-title">{exp.title}</h3>
							<p className="company-name">{exp.company}</p>
							<p className="job-duration">
								{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
							</p>
							<p className="job-description">{exp.description}</p>
						</div>
					</div>
					{isEditing && (
						<button onClick={() => handleDeleteExperience(exp._id)} className="delete-button">
							✖
						</button>
					)}
				</div>
			))}

			{isEditing && (
				<div className="add-experience-form">
					<input
						type='text'
						placeholder='Title'
						value={newExperience.title}
						onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
						className="form-input"
					/>
					<input
						type='text'
						placeholder='Company'
						value={newExperience.company}
						onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
						className="form-input"
					/>
					<input
						type='date'
						placeholder='Start Date'
						value={newExperience.startDate}
						onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
						className="form-input"
					/>
					<div className="checkbox-wrapper">
						<input
							type='checkbox'
							id='currentlyWorking'
							checked={newExperience.currentlyWorking}
							onChange={handleCurrentlyWorkingChange}
							className="form-checkbox"
						/>
						<label htmlFor='currentlyWorking'>I currently work here</label>
					</div>
					{!newExperience.currentlyWorking && (
						<input
							type='date'
							placeholder='End Date'
							value={newExperience.endDate}
							onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
							className="form-input"
						/>
					)}
					<textarea
						placeholder='Description'
						value={newExperience.description}
						onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
						className="form-textarea"
					/>
					<button
						onClick={handleAddExperience}
						className="add-button"
					>
						Add Experience
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
							Edit Experiences
						</button>
					)}
				</>
			)}
		</div>
	);
};
export default ExperienceSection;