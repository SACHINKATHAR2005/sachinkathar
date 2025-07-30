import Project from "../model/project/index.js";



export const addProject = async(req,res)=>{
    try {
        const {title,description,link,github,blogLink,company,category,techStack,startDate,endDate} = req.body;
         const image = req.file?.path || req.file?.filename;
        if(!title || !link){
            return res.status(400).json({
                message:"All fields are required",
                success:false
            })
        }
    const allowedCategories = ["project", "internship"];
    if (category && !allowedCategories.includes(category)) {
      return res.status(400).json({
        message: "Invalid category",
        success: false,
      });
    }
    if(!image){
        return res.status(400).json({
            message:"image is required !",
            success:false
        })
    }
       
        const newProject = new Project({
            title,
            image,
            description,
            link,
            blogLink,
            github,
            company,
            category:category||"project",
            techStack,
            startDate,
            endDate

        })
        const savedProject = await newProject.save();
        return res.status(201).json({
            message:"project created successfully",
            success:true,
            data:savedProject,
        })
        
    } catch (error) {
       return res.status(500).json({
        message:"Internal server error",
        error:error.message,
        successs:false
       }) 
    }

}

export const getProjects = async(req,res)=>{
    try {
        
        const projects = await Project.find().sort({ createdAt: -1 });;
        return res.status(200).json({
            message:"projects fetuched successfully",
            success:true,
            data:projects
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error",
            error:error.message,
            success:false
        })
    }
}

export const updateProject = async(req,res)=>{
    try {
        const {id} = req.params;
       const {title,description,link,github,blogLink,company,category,techStack,startDate,endDate} = req.body;
         const image = req.file?.path || req.file?.filename;
        const existProject = await Project.findById(id);
        if(!existProject){
            return res.status(404).json({
                message:"project not found",
                success:false
            })
        }
        
        const updateProject = await Project.findByIdAndUpdate(id,{
            title,
            image,
            description,
            link,
            blogLink,
            github,
            company,
            category:category||"project",
            techStack,
            startDate,
            endDate
        },{new:true});
        return res.status(200).json({
            message:"project updated successfully",
            success:true,
            data:updateProject
        })
    } catch (error) {
        return res.status(500).json({
            message:"internal server error",
            error:error.message,
            success:false

        })
    }
}

export const getSingleProject = async(req,res)=>{
    try {
        const {id} = req.params;
        const singleProject = await Project.findById(id);
        if(!singleProject){
            return res.status(404).json({
                message:"project not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"project fetched successfully",
            success:true,
            data:singleProject
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"internal server error",    
            error:error.message,
            success:false
        })
    }
}

export const deleteProject = async(req,res)=>{
    try {
        const {id} = req.params;
        const existingSingleProject = await Project.findById(id);
        if(!existingSingleProject){
            return res.status(404).json({
                message:"project not found",
                success:false
            })
        }
        const deleteProject = await Project.findByIdAndDelete(id);
        return res.status(200).json({
            message:"project deleted successfully",
            success:true,
            data:deleteProject
        })

        
    } catch (error) {
        return res.status(500).json({
            message:"internal server error",
            error:error.message,
            success:false
        })
    }
}