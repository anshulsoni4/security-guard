
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Image } from "lucide-react";

type EligibilityFormProps = {
  onSubmit: (data: {
    name: string;
    tenthMarks: number;
    twelfthMarks: number;
    photo: string | null;
  }) => void;
};

const EligibilityForm = ({ onSubmit }: EligibilityFormProps) => {
  const [name, setName] = useState('');
  const [tenthMarks, setTenthMarks] = useState('');
  const [twelfthMarks, setTwelfthMarks] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setPhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!tenthMarks) {
      newErrors.tenthMarks = "10th marks are required";
    } else if (isNaN(Number(tenthMarks)) || Number(tenthMarks) < 0 || Number(tenthMarks) > 100) {
      newErrors.tenthMarks = "Marks should be between 0 and 100";
    }
    
    if (!twelfthMarks) {
      newErrors.twelfthMarks = "12th marks are required";
    } else if (isNaN(Number(twelfthMarks)) || Number(twelfthMarks) < 0 || Number(twelfthMarks) > 100) {
      newErrors.twelfthMarks = "Marks should be between 0 and 100";
    }
    
    if (!photo) {
      newErrors.photo = "Photo is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit({
        name,
        tenthMarks: Number(tenthMarks),
        twelfthMarks: Number(twelfthMarks),
        photo,
      });
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 border-t-8 border-brand-blue"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bangers">Application Form</h3>
        <Badge variant="outline" className="bg-brand-blue bg-opacity-10 text-brand-blue">
          100% Success Rate!
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="font-semibold">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tenthMarks" className="font-semibold">
            10th Class Marks (%) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="tenthMarks"
            type="number"
            placeholder="Enter your 10th percentage"
            min="0"
            max="100"
            value={tenthMarks}
            onChange={(e) => setTenthMarks(e.target.value)}
            className={errors.tenthMarks ? "border-red-500" : ""}
          />
          {errors.tenthMarks ? (
            <p className="text-red-500 text-sm">{errors.tenthMarks}</p>
          ) : (
            <p className="text-xs text-gray-500">Don't worry, any percentage works!</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="twelfthMarks" className="font-semibold">
            12th Class Marks (%) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="twelfthMarks"
            type="number"
            placeholder="Enter your 12th percentage"
            min="0"
            max="100"
            value={twelfthMarks}
            onChange={(e) => setTwelfthMarks(e.target.value)}
            className={errors.twelfthMarks ? "border-red-500" : ""}
          />
          {errors.twelfthMarks ? (
            <p className="text-red-500 text-sm">{errors.twelfthMarks}</p>
          ) : (
            <p className="text-xs text-gray-500">Even 33% is fine, we don't judge!</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="photo" className="font-semibold">
            Upload Photo (Passport Size) <span className="text-red-500">*</span>
          </Label>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            {photo ? (
              <div className="flex flex-col items-center">
                <img 
                  src={photo} 
                  alt="Preview" 
                  className="w-32 h-40 object-cover object-center mb-2" 
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPhoto(null)}
                >
                  Change Photo
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 rounded-lg p-4 mb-2">
                  <Image size={48} className="text-gray-400" />
                </div>
                <Label
                  htmlFor="photoInput"
                  className="cursor-pointer bg-brand-blue text-white px-4 py-2 rounded-md hover:bg-brand-blue/90 transition-colors"
                >
                  Select Photo
                </Label>
                <input
                  id="photoInput"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </div>
            )}
            {errors.photo && <p className="text-red-500 text-sm mt-2">{errors.photo}</p>}
            <p className="text-xs text-gray-500 mt-2">
              Upload your most serious-looking passport photo
            </p>
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full mt-6 bg-brand-red hover:bg-brand-red/90 text-white font-bold py-3"
      >
        Check Eligibility Now!
      </Button>
      
      <p className="text-center text-sm text-gray-500 mt-3">
        All applications are instantly approved! 😉
      </p>
    </form>
  );
};

export default EligibilityForm;
