import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { authContext } from "@/context/context";
import ProfilePanel from "@/components/user-component/ProfilePanel";

const CertificatePage = () => {
  const { id } = useParams();
  const { getCertificateId } = useContext(authContext);

  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const res = await getCertificateId(id);
        console.log("Resolved Certificate:", res);
        setCertificate(res);
      } catch (err) {
        console.error("Error fetching certificate:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [id, getCertificateId]);

  if (loading) {
    return <p className="text-center mt-10 text-muted-foreground">Loading...</p>;
  }

  if (!certificate) {
    return (
      <p className="text-center mt-10 text-destructive">Certificate not found.</p>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen text-black dark:text-white bg-white dark:bg-black">
      {/* Profile on top just like HomePage */}
      <ProfilePanel />

      {/* Certificate content below */}
      <div className="md:w-[70%] w-full h-screen overflow-y-auto px-6 md:px-10 py-6 space-y-6">
        <Card className="bg-background border-none shadow-none">
          <CardContent className="p-6 space-y-4">
            <img
              src={certificate.image}
              alt={certificate.title}
              className="w-full h-full object-cover rounded-md"
            />
            <h1 className="text-2xl font-bold">{certificate.title}</h1>
            
            <div className="text-base leading-relaxed">
              {certificate.description || "No additional details available."}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CertificatePage;
