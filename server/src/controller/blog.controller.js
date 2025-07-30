import blog from "../model/blog/index.js";

export const addblog = async (req, res) => {
    try {
        const { title, description, link, category } = req.body;
        const image = req.file?.path || req.file?.filename;

        // Handle missing title by generating a unique one
        const blogTitle = title || `Blog ${Date.now()}`;

        const newBlog = await blog.create({
            title: blogTitle,
            description,
            link,
            category: category || "general",
            image
        });

        return res.status(201).json({
            message: "Blog created successfully",
            success: true,
            data: newBlog
        });

    } catch (error) {
        // Handle duplicate key error specifically
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Blog with this title already exists",
                success: false,
                error: "Duplicate title"
            });
        }

        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false
        });
    }
}

export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, link, category } = req.body;
        const image = req.file?.path || req.file?.filename;

        const blogExists = await blog.findById(id);
        if (!blogExists) {
            return res.status(404).json({
                message: "Blog not found",
                success: false
            });
        }

        // Only update fields that are provided
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (link !== undefined) updateData.link = link;
        if (category !== undefined) updateData.category = category;
        if (image !== undefined) updateData.image = image;

        const updatedBlog = await blog.findByIdAndUpdate(id, updateData, { new: true });

        return res.status(200).json({
            message: "Blog updated successfully",
            success: true,
            data: updatedBlog
        });

    } catch (error) {
        // Handle duplicate key error specifically
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Blog with this title already exists",
                success: false,
                error: "Duplicate title"
            });
        }

        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false
        });
    }
}

export const getSingleBlog = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Single query instead of two
        const blogData = await blog.findById(id);
        
        if (!blogData) {
            return res.status(404).json({
                message: "Blog not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Blog fetched successfully",
            success: true,
            data: blogData
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false
        });
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await blog.find();
        return res.status(200).json({
            message: "Blogs fetched successfully",
            success: true,
            data: blogs
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false
        });
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Single query - findByIdAndDelete returns null if not found
        const deletedBlog = await blog.findByIdAndDelete(id);
        
        if (!deletedBlog) {
            return res.status(404).json({
                message: 'Blog not found',
                success: false
            });
        }

        return res.status(200).json({
            message: "Blog deleted successfully",
            success: true,
            data: deletedBlog
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false
        });
    }
}