
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Award, Share, BadgeCheck } from "lucide-react";
import html2canvas from 'html2canvas';
import { toast } from "@/components/ui/toast";

type CertificateProps = {
  name: string;
  photo: string | null;
  date?: string;
};

const Certificate = ({ name, photo, date = new Date().toLocaleDateString() }: CertificateProps) => {
  const certificateRef = useRef<HTMLDivElement>(null);

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

  const shareCertificate = () => {
    toast({
      title: "Share Feature",
      description: "In a real app, this would open sharing options for WhatsApp and Instagram!",
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
                <p className="text-lg mb-3">has been found <span className="font-bold text-green-600">ELIGIBLE</span> to join as</p>
                <div className="bg-brand-yellow bg-opacity-20 p-3 rounded-lg mb-3">
                  <p className="text-2xl font-bangers tracking-wide text-gray-800">
                    Security Guard
                  </p>
                  <p className="text-lg font-semibold">at Vishal Mega Mart, Dmart & More!</p>
                </div>
                <div className="flex justify-center mt-2">
                  <BadgeCheck className="text-green-600" size={24} />
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
          100% APPROVED<br />
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
        
        <Button 
          onClick={shareCertificate}
          variant="outline"
          className="border-brand-blue text-brand-blue hover:bg-brand-blue/10 flex-1"
        >
          <Share className="mr-2" size={18} />
          Share Certificate
        </Button>
      </div>
      
      <p className="text-center text-sm text-gray-500 italic mt-4">
        * This certificate holds absolutely no legal value whatsoever 😂
      </p>
    </div>
  );
};

export default Certificate;
