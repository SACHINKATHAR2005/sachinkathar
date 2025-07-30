import { useParams } from "react-router-dom";
import { useContext } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { authContext } from "@/context/context";
import ProfilePanel from "@/components/user-component/ProfilePanel";


const BlogPage = () => {
  const { id } = useParams();
  const { getBlogById } = useContext(authContext);

  const blog = getBlogById(id);

  if (!blog) {
    return (
      <p className="text-center text-muted-foreground">Blog not found.</p>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen text-black dark:text-white bg-white dark:bg-black">
      {/* Left profile section for desktop */}
      
        <ProfilePanel />
    

      {/* Right blog content section */}
      <div className="md:w-[70%] w-full h-screen overflow-y-auto px-6 md:px-10 py-6 space-y-6">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-background border-none shadow-none">
            <CardContent className="p-6 space-y-4">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover rounded-sm"
              />

              <h1 className="text-2xl font-bold">{blog.title}</h1>
             

              <div className="text-base leading-relaxed">
                {blog.description}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
