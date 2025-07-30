import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
        unique: true,   
        trim: true      
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        
    },
    link: {
        type: String,
        
    },
    category: {
        type: String,
        default: "general"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.model("Blog", blogSchema);


// title, description, image, link, category