import { Link, useParams } from "react-router-dom";
import { useContext } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { authContext } from "@/context/context";
import ProfilePanel from "@/components/user-component/ProfilePanel";
import { Button } from "@/components/ui/button";
import ReactMarkdown from 'react-markdown';

const BlogPage = () => {
  const { id } = useParams();
  const { getBlogById, hero } = useContext(authContext);

  const blog = getBlogById(id);

  if (!blog) {
    return <p className="text-center text-muted-foreground">Blog not found.</p>;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen text-black dark:text-white bg-white dark:bg-black">
  {/* Profile Panel */}
  
    <ProfilePanel hero={hero} />
 

  {/* Blog Content */}
  <div className="md:w-[70%] w-full h-screen overflow-y-auto px-6 md:px-10 py-6 space-y-6">
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Blog Card */}
      <Card className="bg-background border-none shadow-none">
        <CardContent className="p-6 space-y-4">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover rounded-sm"
          />
          <h1 className="text-2xl font-bold">{blog.title}</h1>
          <Button
                        variant="secondary"
                        size="lg"
                        className="rounded-full text-lg px-4 py-1  hover:bg-muted/80 bg-amber-300 text-black"
                       
                      >
                        <Link to={blog.link}>Link of project</Link>
                      </Button>
          <div className="text-base leading-relaxed">
            <ReactMarkdown>{blog.description}</ReactMarkdown>
          </div>
        </CardContent>
      </Card>

      {/* Go Back Button */}
      <div className="flex justify-start">
        <a href="/" target="_self" rel="noreferrer">
          <Button
            variant="outline"
            className="rounded-full font-semibold text-sm border-gray-500 text-gray-500 px-6 py-3"
          >
            Go Back
          </Button>
        </a>
      </div>
    </div>
  </div>
</div>

  );
};

export default BlogPage;
