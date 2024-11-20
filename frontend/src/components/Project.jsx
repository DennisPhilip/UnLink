import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '../lib/axios';
import { Link } from 'react-router-dom';
import './Project.css'

const Project = ({project}) => {
  const {data: authUser} = useQuery({ queryKey: ["authUser"]});
  const isOwner = authUser._id === project.creator._id;

  const queryClient = useQueryClient();
  
  const {mutate: deleteProject} = useMutation({
    mutationFn: async () => {
        console.log('Deleting project with ID:', project._id);
        await axiosInstance.delete(`/projects/delete/${project._id}`);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['projects']});
        console.log("Project deleted successfully");
    },
    onError: (error) => {
        console.log("Error deleting project", project._id);
        console.log(error.message);
    }
  })

  const handleDeleteProject = () => {
    if(!window.confirm("Are you sure you want to delete this project?")) return;
    deleteProject();
  }

  return (
    <div className="post-container">
      <div className="post-padding">
        <div className="post-header">
          <div className="post-author">
            <Link to={`/profile/${project?.author?.username}`}>
              <img
                src={project.creator.profilePicture }
                className="author-image"
              />
            </Link>
          </div>
          <div className='midpart'>
            <h2>{project.title}</h2>
            <h3>Description: {project.description}</h3>
            <p>Open Roles: {project.roles}</p>
            
          </div>
          <div>
            <img
                src={project.creator.profilePicture }
                className="author-image"
              />
            <Link to={`/profile/${project?.creator?.username}`}>
              <h3 className="author-name">{project.creator.name}</h3>
            </Link>
            {isOwner && (
          <button onClick={handleDeleteProject} className="delete-button">
            Delete
          </button>
        )}
          </div>
          
        </div>
        {isOwner && (
          <button onClick={handleDeleteProject} className="delete-button">
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default Project


