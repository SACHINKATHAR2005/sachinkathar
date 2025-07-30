import Skill from "../model/skill/index.js"

export const addSkill = async (req,res)=>{
    try {
        const{name,category} = req.body;
         const icon = req.file?.path || req.file?.filename;
        if(!name|| !icon|| !category ){
            return res.status(400).json({
                message:"name and icon are required",
                success:false
            })
        }
       const skillExists = await Skill.findOne({name})
       if(skillExists){
        return res.status(400).json({
                message:"Skill already exists",
                success:false
            })
       }
        const skill = await Skill.create({
            name,
            icon,
            category
        })
        return res.status(201).json({
            message:"Skill added successfully",
            success:true,
            data:skill
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error",
            error:error.message,
            success:false
        })
    }
}

export const getSkills = async(req,res)=>{
try {
    const skill = await Skill.find();
    return res.status(200).json({
        message:"Skills fetched successfully",
        success:true,
        data:skill
    })
    
} catch (error) {
    return res.status(500).json({
        message:"Internal Server Error",
        error:error.message,
        success:false
    })
}
}

export const updateSkill = async (req,res)=>{
    try {
        const {name,category}=req.body;
         const icon = req.file?.path || req.file?.filename;
        const skillid = req.params.id;
        
        const skillExists = await Skill.findById(skillid);
        if(!skillExists){
            return res.status(400).json({
                message:"skill not found",
                success:false
            })
        }
        const skill = await Skill.findByIdAndUpdate(skillid,{
            name,
            icon,
            category
        },{new:true})
        return res.status(200).json({
            message:"Skill updated successfully",
            success:true,
            data:skill
        })

        
    } catch (error) {
       return res.status(500).json({
        message:"internal server error",
        error:error.message,
        success:false
       } )
    }
}

export const deleteSkill = async (req,res)=>{
    try {
        const skillId = req.params.id;
        const deleteSkill = await Skill.findByIdAndDelete(skillId);
        return res.status(200).json({
            message:"skill delete successfully !",
            success:true,
            date :deleteSkill
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error",
            error:error.message,
            success:false
        })
    }
}