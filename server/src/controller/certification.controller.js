import Certificate from "../model/certification/index.js";



export const addCertificate = async(req,res)=>{
    try {
        const {title,date,description,link,category,issuer}=req.body;
        const image = req.file.path ;
        if(!title || !image ){
            return res.status(400).json({
                message:"all fields are required",
                success:false
            })
        }
        
        const newCertificate = await Certificate.create({
                title,
                date:date || new Date(),
                image,
                description,
                link,
                category,
                issuer
        })

        return res.status(200).json({
            message:"Certificate added successfully",
            success:true,
            newCertificate
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error",
            success:false,
            error:error.message
        })
    }
}

export const getCertificates = async(req,res)=>{
    try {
        const certificates = await Certificate.find();
        return res.status(200).json({
            message:"Certificates fetched successfully",
            success:true,
            certificates
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error",
            success:false,
            error:error.message
        })
    }
}
export const getSingleCertificate = async(req,res)=>{
    try {
        const{id} = req.params;
        const certificate= await Certificate.findById(id);
        if(!certificate){
            return res.status(404).json({
                message:"certificate not found",
                success:false
                
            })
        }
        return res.status(200).json({
            message:"Certificate fetched successfully",
            success:true,
            certificate
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error",
            success:false,
            error:error.message
        })
    }
}

 export const updateCertificate = async (req, res) => {
  try {
    const { id } = req.params;

    // Use optional chaining in case req.body is undefined
    const {
      title,
      date,
      description,
      link,
      category,
      issuer,
    } = req.body || {};

    // Use optional chaining to avoid crash if no file is sent
    const image = req.file?.path;

    const isCertificateExist = await Certificate.findById(id);
    if (!isCertificateExist) {
      return res.status(404).json({
        message: "Certificate not found",
        success: false,
      });
    }

    // Build update object dynamically (only update sent fields)
    const updateFields = {
      ...(title && { title }),
      ...(date && { date }),
      ...(description && { description }),
      ...(link && { link }),
      ...(category && { category }),
      ...(issuer && { issuer }),
      ...(image && { image }),
    };

    const updatedCertificate = await Certificate.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );

    return res.status(200).json({
      message: "Certificate updated successfully",
      success: true,
      data: updatedCertificate,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const deleteCertificate = async(req,res)=>{
    try {
        const {id} = req.params;
        const isCertificateExist = await Certificate.findById(id);
        if(!isCertificateExist){
            return res.status(404).json({
                message:"certificate not found",
                success:false
            })
        }

        const deleteCertificate = await Certificate.findByIdAndDelete(id);
        return res.status(200).json({
            message:"certificate deleted successfully",
            success:true,
            deleteCertificate
        })
        
    } catch (error) {
       return res.status(500).json({
        message:"Internal server error",
        success:false,
       }) 
    }
}
