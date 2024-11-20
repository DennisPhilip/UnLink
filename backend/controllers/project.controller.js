import Project from "../models/project.model.js";

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ creator: {$in: [...req.user.connections, req.user._id]}}).populate("creator","name profilePicture headline").sort({ createdAt: -1 });

        res.status(200).json(projects);
    } catch (error) {
        console.log("Error in getProjects controller: ", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const createProject = async (req, res) => {
    try {
        const { title, description, roles }= req.body;
        
        let newProject;

        newProject = new Project({
            creator: req.user._id,
            title,
            description,
            roles,
        })

        await newProject.save();

        res.status(201).json(newProject);
    } catch (error) {
        console.log("Error in createProject controller: ", error);  
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const userId = req.user._id;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        if (project.creator.toString() !== userId.toString()) {
            return res.status(401).json({ message: "Unauthorized" });
        }        
        await Project.findByIdAndDelete(projectId);
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        console.log("Error in deleteProject controller: ", error);
        res.status(500).json({ message: "Server error" });
    }    
};

export const getProjectsById = async (req, res) => {
    try {
        const projectId = req.params.id;

        const project = await Project.findById(projectId).populate("creator","name username headline");
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(project);
    } catch (error) {
        console.log("Error in getProjectsById controller: ", error);
        res.status(500).json({ message: "Server error" });
    }
}