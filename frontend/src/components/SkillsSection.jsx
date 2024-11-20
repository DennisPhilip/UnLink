import { useState } from "react";
import "./SkillsSection.css";

const SkillsSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [skills, setSkills] = useState(userData.skills || []);
	const [newSkill, setNewSkill] = useState("");

	const handleAddSkill = () => {
		if (newSkill && !skills.includes(newSkill)) {
			setSkills([...skills, newSkill]);
			setNewSkill("");
		}
	};

	const handleDeleteSkill = (skill) => {
		setSkills(skills.filter((s) => s !== skill));
	};

	const handleSave = () => {
		onSave({ skills });
		setIsEditing(false);
	};

	return (
		<div className="skills-container">
			<h2 className="skills-title">Skills</h2>
			<div className="skills-list">
				{skills.map((skill, index) => (
					<span
						key={index}
						className="skill-tag"
					>
						{skill}
						{isEditing && (
							<button 
								onClick={() => handleDeleteSkill(skill)} 
								className="delete-skill-button"
							>
								✖
							</button>
						)}
					</span>
				))}
			</div>
			{isEditing && (
				<div className="add-skill-form">
					<input
						type='text'
						placeholder='New Skill'
						value={newSkill}
						onChange={(e) => setNewSkill(e.target.value)}
						className="skill-input"
					/>
					<button
						onClick={handleAddSkill}
						className="add-skill-button"
					>
						Add Skill
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
							Edit Skills
						</button>
					)}
				</>
			)}
		</div>
	);
};

export default SkillsSection;