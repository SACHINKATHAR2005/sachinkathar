import Message from "../model/contect/index.js";
import Hero from "../model/hero/index.js";
import axios from "axios";

// ✅ CREATE - Add Hero
export const addHero = async (req, res) => {
  try {
    const {
      name,
      titles,
      about,
      education, 
      profileImage,
      location,
      socialLinks,
    } = req.body;


    const resume = {
    url: req.file?.path,
    publicId: req.file?.filename,
};
    // if (!name || !titles || !Array.isArray(titles)) {
    //   return res.status(400).json({
    //     message: "Name and titles are required, and titles must be an array.",
    //     success: false,
    //   });
    // }

    const hero = new Hero({
      name,
      titles,
      about,
      education,
      resume,
      profileImage,
      location,
      socialLinks,
    });

    await hero.save();

    return res.status(201).json({
      message: "Hero created successfully",
      success: true,
      data: hero,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

// ✅ GET - Fetch Latest Hero
export const getHero = async (req, res) => {
  try {
    const hero = await Hero.findOne().sort({ createdAt: -1 });

    if (!hero) {
      return res.status(404).json({
        message: "Hero not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Hero fetched successfully",
      success: true,
      data: hero,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

// ✅ GET - Fetch All Heroes
export const getAllHeroes = async (req, res) => {
  try {
    const heroes = await Hero.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: "All heroes fetched successfully",
      success: true,
      data: heroes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

// ✅ DOWNLOAD - Stream latest hero resume as attachment
export const downloadResume = async (req, res) => {
  try {
    const hero = await Hero.findOne().sort({ createdAt: -1 });
    const resumeUrl = hero?.resume?.url;
    if (!resumeUrl) {
      return res.status(404).json({ message: "Resume not found", success: false });
    }
    const filename = `${hero?.name || 'resume'}.pdf`;
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/pdf');
    const response = await axios.get(resumeUrl, { responseType: 'stream' });
    response.data.pipe(res);
  } catch (error) {
    return res.status(500).json({ message: "Failed to download resume", success: false, error: error.message });
  }
};

// ✅ UPDATE - Update Hero
export const updateHero = async (req, res) => {
  try {
    const {
      name,
      titles,
      about,
      education,
      profileImage,
      location,
      socialLinks,
    } = req.body;

    // Build update object with only provided fields
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (titles !== undefined) updateData.titles = titles;
    if (about !== undefined) updateData.about = about;
    if (education !== undefined) updateData.education = education;
    if (profileImage !== undefined) updateData.profileImage = profileImage;
    if (location !== undefined) updateData.location = location;
    if (socialLinks !== undefined) updateData.socialLinks = socialLinks;

    // Handle resume file upload if provided
    if (req.file) {
      updateData.resume = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }

    const hero = await Hero.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!hero) {
      return res.status(404).json({
        message: "Hero not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Hero updated successfully",
      success: true,
      data: hero,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

// ✅ DELETE - Delete Hero
export const deleteHero = async (req, res) => {
  try {
    const hero = await Hero.findByIdAndDelete(req.params.id);

    if (!hero) {
      return res.status(404).json({
        message: "Hero not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Hero deleted successfully",
      success: true,
      data: hero,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

// ✅ PATCH - Remove a specific title from Hero
export const deleteHeroTitle = async (req, res) => {
  try {
    const { heroId, title } = req.body;

    if (!heroId || !title) {
      return res.status(400).json({
        message: "heroId and title are required",
        success: false,
      });
    }

    const hero = await Hero.findById(heroId);
    if (!hero) {
      return res.status(404).json({
        message: "Hero not found",
        success: false,
      });
    }

    hero.titles = hero.titles.filter((t) => t !== title);
    await hero.save();

    return res.status(200).json({
      message: "Title removed successfully",
      success: true,
      data: hero,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

// (duplicate definition removed)

export const contectInfo = async(req,res)=>{
  try {
    const {name,email,message}=req.body;
    const newContect = new Message({
      name,
      email,
      message
    })
    await newContect.save();
    
  } catch (error) {
    return res.status(500).json({
      message:"Internal Server Error",
      success:false,
      error:error.message,
    })
  }
}