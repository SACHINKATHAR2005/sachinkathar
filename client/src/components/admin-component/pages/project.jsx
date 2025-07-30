import React, { useEffect, useState } from "react";
import {
  createProject,
  deleteProject,
  getAllProject,
  updateProject,
} from "@/api/adminService";
import { toast } from "sonner";

const ProjectPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    blogLink: "",
    github: "",
    category: "project",
    techStack: "",
    startDate: "",
    endDate: "",
    file: null,
  });

  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // FETCH PROJECTS
  const fetchProjects = async () => {
    try {
      const res = await getAllProject();
      setProjects(res.data);
    } catch (err) {
      toast.error("Failed to load projects.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // HANDLE INPUTS
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) payload.append(key, value);
    });

    try {
      setLoading(true);
      if (editingId) {
        await updateProject(editingId, payload);
        toast.success("Project updated successfully!");
      } else {
        await createProject(payload);
        toast.success("Project created successfully!");
      }
      setFormData({
        title: "",
        description: "",
        link: "",
        blogLink: "",
        github: "",
        category: "project",
        techStack: "",
        startDate: "",
        endDate: "",
        file: null,
      });
      setEditingId(null);
      fetchProjects();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // EDIT HANDLER
  const handleEdit = (project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      description: project.description,
      link: project.link,
      blogLink: project.blogLink,
      github: project.github,
      category: project.category,
      techStack: project.techStack.join(","),
      startDate: project.startDate?.split("T")[0],
      endDate: project.endDate?.split("T")[0],
      file: null,
    });
  };

  // DELETE HANDLER
  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      toast.success("Project deleted successfully!");
      fetchProjects();
    } catch (err) {
      toast.error("Failed to delete.");
    }
  };

  return (
    <div className="p-4 space-y-8">
      <h2 className="text-xl font-bold">Create / Edit Project</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <input type="text" name="link" value={formData.link} onChange={handleChange} placeholder="Live Link" />
        <input type="text" name="blogLink" value={formData.blogLink} onChange={handleChange} placeholder="Blog Link" />
        <input type="text" name="github" value={formData.github} onChange={handleChange} placeholder="GitHub Link" />
        <input type="text" name="techStack" value={formData.techStack} onChange={handleChange} placeholder="Tech Stack (comma separated)" />
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="project">Project</option>
          <option value="internship">Internship</option>
        </select>
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
        <input type="file" name="file" accept="image/*" onChange={handleChange} />
        <button type="submit" disabled={loading}>
          {editingId ? "Update" : "Create"} Project
        </button>
      </form>

      <hr />

      <h2 className="text-xl font-bold">All Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((proj) => (
          <div key={proj._id} className="border p-4 rounded shadow-sm">
            {proj.image && (
              <img src={proj.image} alt={proj.title} className="w-full h-48 object-cover rounded" />
            )}
            <h3 className="text-lg font-semibold mt-2">{proj.title}</h3>
            <p>{proj.description}</p>
            <p><b>Category:</b> {proj.category}</p>
            <p><b>Tech Stack:</b> {proj.techStack.join(", ")}</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => handleEdit(proj)} className="px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
              <button onClick={() => handleDelete(proj._id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
