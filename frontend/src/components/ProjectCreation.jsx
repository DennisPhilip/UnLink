import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import './createproject.css';

const ProjectCreation = ({user}) => {
    const [title, setTitle ] = useState("");
    const [description, setDescription ] = useState("");
    const [roles, setRoles ] = useState("");

    const queryClient = useQueryClient();

    const { mutate: createProjectMutation} = useMutation({
        mutationFn: async (projectData) => {
            const res = await axiosInstance.post("/projects/create", projectData, {
                headers: {
                    "Content-Type": "application/json",
                },
            }); 
            return res.data;    
        },
        onSuccess: () => {
            console.log("Project created successfully");
            resetProject();
            queryClient.invalidateQueries({ queryKey: ['projects'] });

        },
        onError: () => {    
            console.log("Error creating project");
        },
    });

    const handleProjectCreation = async () => {
        try {
            const projectData = {
                title,
                description,
                roles,}
            createProjectMutation(projectData);
        } catch (error) {
            console.log("Error in handleProjectCreation: ", error);
        }
    }

    const resetProject = () => {    
        setTitle("");
        setDescription("");
        setRoles("");
    }

    return (
        <div className="post-form">
          <img src={user.profilePicture} alt={user.name} className="profile-picture" />
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Open Roles"
            value={roles}
            onChange={(e) => setRoles(e.target.value)}
            className="input-field"
          />
          <button className="post-button" onClick={handleProjectCreation}>Post</button>
        </div>
    );
};

export default ProjectCreation;
