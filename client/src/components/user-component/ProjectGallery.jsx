import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProjectGallery = ({ projects }) => {
  const [filter, setFilter] = useState("All");

  const filteredProjects = projects?.filter((item) => {
    if (filter === "All") return true;
    return item.category?.toLowerCase() === filter.toLowerCase();
  });

  return (
    <Tabs defaultValue="All" className="w-full border-none shadow-none">
      <TabsList className="flex-wrap gap-4 mb-6 mt-5 border rounded-xl  bg-white">
        <TabsTrigger value="All" onClick={() => setFilter("All")} className='border rounded-xl p-3 bg-gray-400'>
          All
        </TabsTrigger>
        <TabsTrigger value="Project" onClick={() => setFilter("Project")} className='border rounded-xl p-3 bg-gray-400'>
          Projects
        </TabsTrigger>
        <TabsTrigger value="Internship" onClick={() => setFilter("Internship")} className='border rounded-xl p-3 bg-gray-400'>
          Internships
        </TabsTrigger>
      </TabsList>

      <TabsContent value={filter}>
        <h3 className="text-xl font-semibold mb-3">
          {filter === "All" ? "All Works" : filter}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects?.length > 0 ? (
            filteredProjects.map((item, index) => (
              <Card key={index} >
                <CardContent className="p-4">
                  {item.image && (
                    <img
                      src={item.image}
                      alt="thumbnail"
                      className="rounded-xl mb-3 w-full h-48 object-cover"
                    />
                  )}

                  <h2 className="text-lg font-semibold mb-1">{item.title}</h2>
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.description}
                  </p>

                  {/* Internship-specific info */}
                  {item.category?.toLowerCase() === "internship" && item.company && (
                    <p className="text-xs text-muted-foreground mb-2">
                      Internship at {item.company}{" "}
                      {item.duration && `(${item.duration})`}
                    </p>
                  )}

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 text-xs mb-3">
                    {(typeof item.techStack[0] === "string"
                      ? item.techStack[0].split(",")
                      : item.techStack
                    ).map((tech, i) => (
                      <span
                        key={i}
                        className="bg-muted px-2 py-1 rounded-md dark:bg-zinc-800"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 text-sm">
                    {item.github && (
                      <a
                        href={item.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Live
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No {filter.toLowerCase()} found.</p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProjectGallery;
 