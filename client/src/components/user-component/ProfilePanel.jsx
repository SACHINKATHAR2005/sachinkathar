import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const ProfilePanel = ({ hero }) => {
  return (
    <div
      className="md:w-[30%] w-full md:h-screen overflow-y-auto
                 p-4 sm:p-6 flex flex-col items-center border-b md:border-b-0
                 border-border dark:border-border bg-background"
    >
      {/* Profile Image */}
      <img
        src={
          hero?.imageUrl ||
          "https://res.cloudinary.com/dzlvf9qm5/image/upload/v1753870557/IMG_20230427_233301_eou2gn.jpg"
        }
        alt={hero?.name || "profile"}
        className="rounded-full w-70 h-70 object-cover border"
      />

      {/* Name */}
      <h2 className="text-xl font-bold mt-4 text-center">
        {hero?.name || "Sachin Kathar"}
      </h2>

      {/* Bio/About */}
      <p className="text-lg text-muted-foreground text-center mt-2">
        {hero?.about || "No bio provided yet."}
      </p>

      {/* Education */}
      {hero?.education && (
        <p className="text-lg mt-2 text-muted-foreground text-center">
          🎓 {hero.education}
        </p>
      )}

      {/* Location */}
      {hero?.location && (
        <p className="text-lg mt-1 text-muted-foreground text-center">
          📍 {hero.location}
        </p>
      )}

      {/* Titles */}
      {hero?.titles?.length > 0 && (
        <div className="mt-2 text-sm text-muted-foreground text-center">
          🧑‍💻 {hero.titles.join(", ")}
        </div>
      )}

      {/* Resume Button - Visible on all screen sizes */}
      {hero?.resume?.publicId && (
        <div className="w-full mt-6 flex justify-center">
          <a
            href={hero.resume.publicId}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button
              variant="outline"
              className="w-full border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 flex items-center justify-center gap-2 rounded-full"
            >
              <Download className="w-4 h-4" /> Download Resume
            </Button>
          </a>
        </div>
      )}
    </div>
  );
};

export default ProfilePanel;
