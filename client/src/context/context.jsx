import { axiosInstance } from "@/api/api";


import { createContext, useEffect, useState } from "react";

export const authContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [project, setProject] = useState([]);
  const [certificates,setCertificates]=useState([]);
  const [blog,setBlog]= useState([]);
  const [leetcode,setLeetCode] = useState(null);
  const [hero,setHero] = useState([]);
  const [admin ,setAdmin] = useState({
    authnticated:false,
    user:null
  })
  const [loading,setLoading] = useState(true);
  
  const getProject = async () => {
    try {
      const res = await axiosInstance.get("/project/get");
      setProject(res.data.data);
      // console.log(res.data);
      return res.data;
    } catch (err) {
      console.error("Error fetching project:", err);
    }
  };
  const getCertificates = async ()=>{
    try {
        const res = await axiosInstance.get("/certificate/get");
        setCertificates(res.data.certificates);
        // console.log(res?.data?.certificates);
        
    } catch (error) {
        console.error("Error fetching certificates:", error);
    }
  }
  const getBlog= async()=>{
    try {
        const res = await axiosInstance.get('/blog/get');
        // console.log(res?.data?.data);
        setBlog(res?.data?.data);
   

        
    } catch (error) {
         console.error("Error fetching blogs:", error);
    }
  }

  const getBlogById = (id) => {
  return blog.find((b) => b._id === id);
};

const getCertificateId= async (id)=>{
    return certificates.find((c)=>c._id===id);
}

const fetchLeetcodeRes = async ()=>{
  const res = await axiosInstance.get('/dsa/leetcode-stats');
  setLeetCode(res.data);
  // console.log(res.data)
}
const getchHero = async ()=>{
  const res = await axiosInstance.get("/hero")
   setHero(res.data.data)
  //  console.log(res.data.data)
}

const loginUser = async (formdata)=>{
  try {
    const res = await axiosInstance.post('/user/login',formdata);
    // console.log(res.data)
    return res.data;
  } catch (error) {
    console.error('got error while login in',error);
    
  }
}

const authMe = async () => {
  try {
    const res = await axiosInstance.get("/user/me",{
    withCredentials:true
  });
  console.log(res?.data?.user);
  if(res?.data?.success){
     setAdmin({
    authnticated: true,
    user: res?.data?.user, 
  });
  }

 
    
  } catch (error) {
    console.error('got error while login in',error);
  }
};

// useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axiosInstance.get("/auth/me", {
//           withCredentials: true,
//         });

//         if(res.data.success){
//           setAdmin({
//             authnticated:true,
//             user:res?.data?.data
//           })
//         }
      
//       } catch (err) {
//         setLoading(false)
//         setAdmin({
//           authnticated:false,
//           user:null
//         })
      
//     }finally {
//         setLoading(false); 
//       }
//     };

//     fetchUser();
//   }, []);

console.log("admin",admin.authnticated);
console.log("admin",admin.user)
 
  useEffect(() => {
    getProject();
    getCertificates();
    getBlog();
    fetchLeetcodeRes();
    getchHero();
    authMe();
  }, []);


  return (
    <authContext.Provider
      value={{
        getProject,
        project,
        certificates,
        blog,
        getBlogById,
        getCertificateId,
        leetcode,
        hero,
         loginUser,
         admin,
         loading
      }}
    >
      {children}
    </authContext.Provider>
  );
};
