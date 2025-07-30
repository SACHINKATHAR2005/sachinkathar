import { Button } from "@/components/ui/button"; // using shadcn/ui button

const ProfilePanel = ({ hero }) => {
  return (
    <div className="md:w-[30%] w-full p-6 flex flex-col items-center border-b md:border-b-0 border-border dark:border-border">
      <img
        src="https://via.placeholder.com/120"
        alt={hero?.name || "profile"}
        className="rounded-full w-28 h-28 object-cover border"
      />

      <h2 className="text-xl font-bold mt-4">{hero?.name || "Anonymous"}</h2>

      <p className="text-sm text-muted-foreground text-center">
        {hero?.about || "No bio provided yet."}
      </p>

      {hero?.location && (
        <p className="text-xs mt-2 text-muted-foreground">{hero.location}</p>
      )}

      {hero?.education && (
        <p className="text-xs mt-1 text-muted-foreground text-center">
          🎓 {hero.education}
        </p>
      )}

      {hero?.titles?.length > 0 && (
        <div className="mt-2 text-sm text-muted-foreground text-center">
          {hero.titles.join(", ")}
        </div>
      )}

      {/* Resume download */}
      {hero?.resume?.publicId && (
        <a
          href={hero.resume.publicId}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full"
        >
          <Button variant="outline" className="w-full">
            📄 Download Resume
          </Button>
        </a>
      )}
    </div>
  );
};

export default ProfilePanel;
