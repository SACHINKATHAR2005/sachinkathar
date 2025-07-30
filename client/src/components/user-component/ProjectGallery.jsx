import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Github, ArrowUpRight } from "lucide-react";
import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaJava,
  FaAws,
  FaPython,
  FaHtml5,
  FaCss3,
  FaGitAlt,
  FaGithub,
  FaGitlab,
  FaNpm,
  FaYarn,
  FaJenkins,
} from "react-icons/fa";
import {
  SiMongodb,
  SiRedux,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiExpress,
  SiPostgresql,
  SiFirebase,
  SiGraphql,
  SiVercel,
  SiNetlify,
  SiNextdotjs,
  SiCplusplus,
  SiMysql,
  SiRedis,
  SiRailway,
} from "react-icons/si";

const techIcons = {
  react: <FaReact />,
  nodejs: <FaNodeJs />,
  express: <SiExpress />,
  mongodb: <SiMongodb />,
  docker: <FaDocker />,
  redux: <SiRedux />,
  typescript: <SiTypescript />,
  javascript: <SiJavascript />,
  tailwind: <SiTailwindcss />,
  tailwindcss: <SiTailwindcss />,
  java: <FaJava />,
  python: <FaPython />,
  html: <FaHtml5 />,
  css: <FaCss3 />,
  git: <FaGitAlt />,
  github: <FaGithub />,
  gitlab: <FaGitlab />,
  npm: <FaNpm />,
  yarn: <FaYarn />,
  jenkins: <FaJenkins />,
  aws: <FaAws />,
  postgresql: <SiPostgresql />,
  firebase: <SiFirebase />,
  graphql: <SiGraphql />,
  vercel: <SiVercel />,
  netlify: <SiNetlify />,
  nextjs: <SiNextdotjs />,
  cpp: <SiCplusplus />,
  mysql: <SiMysql />,
  redis: <SiRedis />,
  railway: <SiRailway />,
};

const ProjectGallery = ({ projects }) => {
  const [filter, setFilter] = useState("All");

  const filteredProjects = projects?.filter((item) => {
    if (filter === "All") return true;
    return item.category?.toLowerCase() === filter.toLowerCase();
  });

  return (
    <Tabs defaultValue="All" className="w-full">
      <TabsList className="flex-wrap gap-4 mb-6 mt-5 border rounded-xl bg-white">
        {["All", "Project", "Internship"].map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            onClick={() => setFilter(tab)}
            className="border rounded-xl p-3 bg-gray-400"
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={filter}>
        <h3 className="text-xl font-semibold mb-3">
          {filter === "All" ? "All Works" : filter}
        </h3>

        <div className="flex flex-col gap-6">
          {filteredProjects?.length > 0 ? (
            filteredProjects.map((item, index) => (
              <div key={index} className="w-full p-0 m-0">
                <div className="w-full p-4 border-b border-border rounded-none">
                  {item.image && (
                    <img
                      src={item.image}
                      alt="thumbnail"
                      className="w-full h-auto object-cover mb-4 rounded-none"
                    />
                  )}

                  <h2 className="text-xl font-semibold mb-1">{item.title}</h2>
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>

                  {item.category?.toLowerCase() === "internship" &&
                    item.company && (
                      <p className="text-xs text-muted-foreground mb-2">
                        Internship at {item.company}{" "}
                        {item.duration && `(${item.duration})`}
                      </p>
                    )}

                  {/* Tech stack with icons */}
                  <div className="flex flex-wrap gap-2 text-sm mb-3 items-center">
                    {(typeof item.techStack[0] === "string"
                      ? item.techStack[0].split(",")
                      : item.techStack
                    ).map((tech, i) => {
                      const key = tech.trim().toLowerCase();
                      return (
                        <span
                          key={i}
                          className="flex items-center gap-1 border px-2 py-1 rounded bg-muted dark:bg-zinc-800"
                        >
                          {techIcons[key] || null}
                          <span>{tech.trim()}</span>
                        </span>
                      );
                    })}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 text-sm mt-4 flex-wrap">
                    {item.github && (
                      <a
                        href={item.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          className="rounded-full font-semibold text-sm border-gray-500 text-gray-500 p-4"
                        >
                          <Github size={18} className="mr-2" />
                          GitHub
                        </Button>
                      </a>
                    )}
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          className="rounded-full font-semibold text-sm border-gray-500 text-gray-500 p-4"
                        >
                          <ArrowUpRight size={18} className="mr-2" />
                          Live
                        </Button>
                      </a>
                    )}
                    {item.blog && (
                      <a
                        href={item.blog}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          className="rounded-full font-semibold text-sm border-gray-500 text-gray-500 p-4"
                        >
                          <ArrowUpRight size={18} className="mr-2" />
                          Blog
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
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
