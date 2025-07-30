import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useContext, useState } from "react";
import { Moon, Sun, Mail, Github, Linkedin } from "lucide-react";
import { authContext } from "@/context/context";
import ProjectGallery from "@/components/user-component/ProjectGallery";
import { CertificateGallery } from "@/components/user-component/CertificateGallery";
import { BlogGallery } from "@/components/user-component/BlogGallery";
import ProfilePanel from "@/components/user-component/ProfilePanel";

import { FaCode } from "react-icons/fa";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";


const skills = [
    "HTML", "CSS", "JavaScript", "TypeScript", "React", "Node",
    "Express", "MongoDB", "PostgreSQL", "Docker", "GitHub"
];

export default function HomePage() {
    const [activeTab, setActiveTab] = useState("projects");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [open, setOpen] = useState(false);
    const { project, certificates, blog, leetcode,hero } = useContext(authContext);

    const toggleTheme = () => {
        document.documentElement.classList.toggle("dark");
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen w-screen text-black dark:text-white bg-white dark:bg-black bg-blc ">

            {/* Left Panel */}
            <ProfilePanel hero={hero} />

            {/* Right Panel */}
            <ScrollArea className="md:w-[70%] w-full h-screen overflow-y-auto px-6 md:px-10 py-6 space-y-6">
                {/* Top controls */}
                <div className="flex justify-end md:justify-start items-center gap-4 mb-4">
                    {/* <Button variant="ghost" onClick={toggleTheme} className="rounded-full ">
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </Button> */}
                    <Button variant="outline" disabled className="rounded-full p-4 font-semibold text-sm border-y-amber-300 text-gray-500">
                        <Mail size={18} className="mr-2" /> katharsachin95@gmail.com
                    </Button>
                    <a href="https://github.com/SACHINKATHAR2005" target="_blank" rel="noreferrer">
                        <Button variant="outline" className="rounded-full font-semibold text-sm border-gray-500 text-gray-500 p-4">
                            <Github size={18} className="mr-2" /> GitHub
                        </Button>
                    </a>
                    <a href="https://www.linkedin.com/in/sachinkathar" target="_blank" rel="noreferrer">
                        <Button variant="outline" className="rounded-full font-semibold text-sm border-gray-500 text-gray-500 p-4">
                            <Linkedin size={18} className="mr-2" /> LinkedIn
                        </Button>
                    </a>

                    <Button onClick={() => setOpen(true)} variant="outline" className="rounded-full font-semibold text-sm border-gray-500 text-gray-500 p-4">
                        <FaCode className="mr-2 text-yellow-600" /> LeetCode
                    </Button>

         {hero?.resume?.publicId && (
        <a
          href={hero.resume.publicId}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button variant="outline"  className="rounded-full font-semibold text-sm border-gray-500 text-gray-500 p-4 ">
             Resume
          </Button>
        </a>
      )}
                    
                </div>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="max-w-md rounded-2xl shadow-md">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-lg">
                                <FaCode className="text-yellow-500" /> LeetCode Progress
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-2 mt-2 text-sm text-gray-700">
                            <p><strong>Total Solved:</strong> {leetcode ?.all}</p>
                            <p className="text-green-600"><strong>Easy:</strong> {leetcode?.easy}</p>
                            <p className="text-yellow-600"><strong>Medium:</strong> {leetcode?.medium}</p>
                            <p className="text-red-500"><strong>Hard:</strong> {leetcode?.hard}</p>
                        </div>
                        <DialogClose asChild>
                            <button className="mt-4 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded">
                                Close
                            </button>
                        </DialogClose>
                    </DialogContent>
                </Dialog>

                {/* Skills Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Skills</h3>
                    <div className="flex flex-wrap gap-3">
                        {skills.map(skill => (
                            <Badge key={skill} variant="outline" className='text-gray-900 text-sm p-3 rounded-full border-gray-500'>{skill}</Badge>
                        ))}
                    </div>
                </div>

                {/* Navigation Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-5">
                    
                  <TabsList className="flex-wrap gap-4 mb-6 mt-5 border rounded-xl  bg-gray-400">
                        <TabsTrigger value="projects" className='border rounded-xl p-3 bg-gray-400'>Projects</TabsTrigger>
                        <TabsTrigger value="blogs" className='border rounded-xl p-3 bg-gray-400'>Blogs</TabsTrigger>
                        <TabsTrigger value="certificates" className='border rounded-xl p-3 bg-gray-400'>Certificates</TabsTrigger>
                        <TabsTrigger value="contact" className='border rounded-xl p-3 bg-gray-400'>Contact</TabsTrigger>
                    </TabsList>

                    
                  

                    <TabsContent value="projects">
                        <h3 className="text-xl font-semibold mb-3">Projects</h3>
                        <div className="flex items-center justify-between">

                            <Card className='shadow-none border-none  '>
                                <CardContent className='shadow-none border-none'>
                                    <ProjectGallery projects={project} />
                                </CardContent>
                            </Card>

                        </div>
                    </TabsContent>


                    <TabsContent value="blogs">
                        <h3 className="text-xl font-semibold mb-3">Blogs</h3>
                        <div className="space-y-4">
                            <BlogGallery blogs={blog} />
                        </div>
                    </TabsContent>

                    <TabsContent value="certificates">
                        <h3 className="text-xl font-semibold mb-3">Certificates</h3>
                        <CertificateGallery certificates={certificates} />
                    </TabsContent>

                    <TabsContent value="contact">
                        <h3 className="text-xl font-semibold mb-3">Contact Me</h3>
                        <form className="space-y-4">
                            <Input type="text" placeholder="Your Name" />
                            <Input type="email" placeholder="Your Email" />
                            <Textarea placeholder="Your Message..." className="min-h-[120px]" />
                            <Button type="submit">Send</Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </ScrollArea>
        </div>
    );
}
