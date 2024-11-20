import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { axiosInstance } from '../lib/axios'
import ProjectCreation from '../components/ProjectCreation'
import Project from '../components/Project'


const ProjectsPage = () => {
    const {data: authUser} = useQuery({ queryKey: ["authUser"]});
    const {data: projects} = useQuery({
        queryKey: ["projects"],
        queryFn: async () => {
            const res = await axiosInstance.get("/projects")
            return res.data;
        } 
    })

    console.log("projects", projects);

  return (
    <div>
        <div style={{ marginLeft: "15rem"}}><h1 style={{ textAlign: "center", }}>Projects</h1></div>
        <div className='postcard'><ProjectCreation user={authUser} /></div>

        {projects?.map(project => <Project key={project._id} project={project} />)}

        {projects?.length === 0 && (
            <div style={{ textAlign: "center", color: "orange", padding: "4rem" }}> 
                <h2>No Projects Yet</h2>
                <p>Connect with other techies to start seeing projects in your feed!</p>
            </div>
        )}
    </div>

    
  )
}

export default ProjectsPage

