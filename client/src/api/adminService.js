import { axiosInstance } from "./api";


export const createProject = async (data) => {
  const formData = new FormData();
  
  // Append all values from data
  for (let key in data) {
    formData.append(key, data[key]);
  }

  const res = await axiosInstance.post("/project/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateProject = async (id, data) => {
  const formData = new FormData();
  
  for (let key in data) {
    formData.append(key, data[key]);
  }

  const res = await axiosInstance.put(`/project/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};


export const deleteProject = async (id)=>{
    const res =await axiosInstance.delete(`/project/delete/${id}`)
    return res.data;
} 

export const getAllProject = async ()=>{
    const res = await axiosInstance.get("/project/get")
    return res.data;
}