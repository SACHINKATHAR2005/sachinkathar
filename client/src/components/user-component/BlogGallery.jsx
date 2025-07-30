import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom"; // 🧭 for routing

export const BlogGallery = ({ blogs }) => {
  const navigate = useNavigate();

  if (!blogs || blogs.length === 0) {
    return <p className="text-muted-foreground">No blogs found.</p>;
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <Card
          key={blog._id}
          className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
          onClick={() => navigate(`/blog/${blog._id}`)} 
        >
          <CardContent className="p-4">
            <div className="relative overflow-hidden rounded-md">
              <img
                src={blog.image}
                alt={blog.title || "Blog Image"}
                className="w-full h-48 object-cover rounded-md transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
              />
            </div>

            <h4 className="text-lg font-semibold mt-3">{blog.title}</h4>

            <p className="text-sm text-muted-foreground mb-2 line-clamp-3">
              {blog.description}
            </p>

            {/* Optional: Show blog ID for dev/debug/access */}
            <p className="text-xs text-gray-500">ID: {blog._id}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
