import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export const CertificateGallery = ({ certificates }) => {
  if (!certificates || certificates.length === 0) {
    return <p className="text-muted-foreground">No certificates available.</p>;
  }
  const navigate = useNavigate();

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {certificates.map((cert) => (
        <Card
          key={cert._id}
          className="group relative overflow-hidden hover:shadow-xl transition-all duration-300"
          onClick={() => navigate(`/certificate/${cert._id}`)} 
        >
          <CardContent className="p-4">
            <div className="relative overflow-hidden rounded-md">
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-48 object-cover rounded-md transform transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1"
              />
            </div>

            <h4 className="text-lg font-semibold mb-1 mt-3">{cert.title}</h4>
            <p className="text-sm text-muted-foreground mb-2">{cert.description}</p>
            {cert.issuer && (
              <p className="text-xs text-gray-500 mb-2">Issued by: {cert.issuer}</p>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {cert.category && <Badge>{cert.category}</Badge>}
              {cert.date && (
                <Badge variant="outline">
                  {new Date(cert.date).toLocaleDateString("en-IN")}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
