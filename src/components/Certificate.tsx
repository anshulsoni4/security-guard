
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Award, Share, BadgeCheck, Building, ShieldAlert, X } from "lucide-react";
import html2canvas from 'html2canvas';
import { useToast } from "@/hooks/use-toast";

type CertificateProps = {
  name: string;
  photo: string | null;
  date?: string;
  tenthMarks: number;
  twelfthMarks: number;
};

const Certificate = ({ name, photo, tenthMarks, twelfthMarks, date = new Date().toLocaleDateString() }: CertificateProps) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Determine eligibility status based on marks
  const getEligibilityStatus = () => {
    if (tenthMarks >= 80 && twelfthMarks >= 80) {
      return {
        title: "Vishal Mega Mart Security Guard",
        message: "You are eligible for Vishal Mega Mart Security Guard post!",
        icon: <Building className="text-green-600" size={24} />,
        color: "text-green-600",
        stamp: "VISHAL MEGA MART APPROVED"
      };
    } else if (tenthMarks >= 65 && twelfthMarks >= 65 && tenthMarks <= 75 && twelfthMarks <= 75) {
      return {
        title: "Smart Security Guard Pvt. Ltd.",
        message: "You are eligible for Smart Security Guard Pvt. Ltd. position!",
        icon: <ShieldAlert className="text-blue-600" size={24} />,
        color: "text-blue-600",
        stamp: "SMART SECURITY APPROVED"
      };
    } else if (tenthMarks >= 50 && twelfthMarks >= 50 && tenthMarks <= 65 && twelfthMarks <= 65) {
      return {
        title: "Girls Hostel Security Guard",
        message: "You are eligible for Girls Hostel Security Guard position!",
        icon: <BadgeCheck className="text-purple-600" size={24} />,
        color: "text-purple-600",
        stamp: "HOSTEL SECURITY APPROVED"
      };
    } else {
      return {
        title: "Not Eligible",
        message: "Your marks need more security than you do! 😂",
        icon: <X className="text-red-600" size={24} />,
        color: "text-red-600",
        stamp: "REJECTED 😂"
      };
    }
  };

  const eligibility = getEligibilityStatus();

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;
    
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `security-guard-certificate-${name.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.click();
      
      toast({
        title: "Success!",
        description: "Certificate downloaded successfully!",
      });
    } catch (error) {
      console.error('Error generating certificate:', error);
      toast({
        title: "Error",
        description: "Failed to download certificate. Please try again.",
        variant: "destructive",
      });
    }
  };

  const shareCertificate = (platform: 'whatsapp' | 'instagram') => {
    toast({
      title: `Share to ${platform === 'whatsapp' ? 'WhatsApp' : 'Instagram'}`,
      description: `In a real app, this would open sharing options for ${platform === 'whatsapp' ? 'WhatsApp' : 'Instagram'}!`,
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div 
        ref={certificateRef} 
        className="certificate-bg certificate-border bg-white rounded-lg p-8 shadow-lg relative overflow-hidden"
      >
        <div className="text-center relative z-10">
          {/* Certificate Header */}
          <div className="flex justify-center items-center mb-4">
            <Award className="text-brand-red mr-2" size={36} />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bangers text-brand-red tracking-wider">
              Official Certificate
            </h2>
            <Award className="text-brand-red ml-2" size={36} />
          </div>
          
          <div className="text-sm text-gray-500 mb-8">Certificate ID: SEC-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</div>
          
          {/* Main Certificate Content */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-6">This is to certify that</h3>
            <h2 className="text-3xl md:text-4xl font-bangers text-brand-blue mb-6">{name}</h2>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
              {photo && (
                <div className="mb-4 md:mb-0">
                  <div className="border-4 border-gray-800 w-32 h-40">
                    <img 
                      src={photo} 
                      alt="Applicant" 
                      className="w-full h-full object-cover object-center" 
                    />
                  </div>
                </div>
              )}
              
              <div>
                <p className="text-lg mb-3">
                  {eligibility.title !== "Not Eligible" ? (
                    <>has been found <span className="font-bold text-green-600">ELIGIBLE</span> to join as</>
                  ) : (
                    <>has been found <span className="font-bold text-red-600">NOT ELIGIBLE</span></>
                  )}
                </p>
                <div className={`bg-opacity-20 p-3 rounded-lg mb-3 ${eligibility.title === "Not Eligible" ? "bg-red-100" : "bg-brand-yellow"}`}>
                  <p className="text-2xl font-bangers tracking-wide text-gray-800">
                    {eligibility.title}
                  </p>
                  <p className={`text-lg font-semibold ${eligibility.color}`}>
                    {eligibility.message}
                  </p>
                </div>
                <div className="flex justify-center mt-2">
                  {eligibility.icon}
                </div>
                <div className="mt-4 text-sm">
                  <div className="mb-2">
                    <span className="font-bold">10th Marks:</span> {tenthMarks}%
                  </div>
                  <div>
                    <span className="font-bold">12th Marks:</span> {twelfthMarks}%
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Certificate Footer */}
          <div className="flex justify-between items-end">
            <div className="text-left">
              <div className="mb-1">Date of Issue:</div>
              <div className="font-bold">{date}</div>
            </div>
            
            <div className="text-right w-1/3">
              <div className="signature-line h-12 flex items-end justify-center">
                <p className="text-gray-400 italic text-sm">Director's Signature</p>
              </div>
              <p className="mt-1 text-sm">Meme Security Training Institute</p>
            </div>
          </div>
        </div>

        {/* Stamp */}
        <div className="stamp">
          {eligibility.stamp}<br />
          SECURITY GUARD<br />
          MATERIAL
        </div>
      </div>
      
      {/* Certificate Actions */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
        <Button 
          onClick={downloadCertificate}
          className="bg-brand-blue hover:bg-brand-blue/90 flex-1"
        >
          Download Certificate
        </Button>
      </div>
      
      {/* Share Options */}
      <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3">
        <Button 
          onClick={() => shareCertificate('whatsapp')}
          variant="outline"
          className="border-green-600 text-green-600 hover:bg-green-600/10"
        >
          <Share className="mr-2" size={18} />
          Share on WhatsApp
        </Button>
        
        <Button 
          onClick={() => shareCertificate('instagram')}
          variant="outline"
          className="border-purple-600 text-purple-600 hover:bg-purple-600/10"
        >
          <Share className="mr-2" size={18} />
          Share on Instagram
        </Button>
      </div>
      
      <p className="text-center text-sm text-gray-500 italic mt-4">
        * This certificate holds absolutely no legal value whatsoever 😂
      </p>
    </div>
  );
};

export default Certificate;
