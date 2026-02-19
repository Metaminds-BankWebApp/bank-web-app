"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui";
import { StepProps } from "./types";

export function PersonalDetails({ formData, updateFormData, onNext, onBack }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.nic) newErrors.nic = "NIC Number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.mobile) newErrors.mobile = "Mobile Number is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    updateFormData({ [id]: value });
    if (errors[id]) {
      setErrors({ ...errors, [id]: "" });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-8 py-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-[#0d3b66]">Personal Information</h2>
        <p className="text-sm text-slate-500 mt-1">Basic identification details for the new account holder.</p>
      </div>
      
      <div className="p-8 space-y-8">
        <div className="space-y-3">
          <Label htmlFor="fullName" className="text-slate-700 font-medium">Full Name</Label>
          <Input 
            id="fullName" 
            value={formData.fullName} 
            onChange={handleChange}
            placeholder="Johnathan Doe" 
            className={`bg-slate-50 border-slate-200 h-11 focus:ring-[#3e9fd3] ${errors.fullName ? "border-red-500" : ""}`}
          />
          {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label htmlFor="nic" className="text-slate-700 font-medium">NIC Number</Label>
            <Input 
              id="nic" 
              value={formData.nic} 
              onChange={handleChange}
              placeholder="951234567V" 
              className={`bg-slate-50 border-slate-200 h-11 ${errors.nic ? "border-red-500" : ""}`} 
            />
            {errors.nic && <p className="text-red-500 text-xs">{errors.nic}</p>}
          </div>
          <div className="space-y-3">
            <Label htmlFor="dob" className="text-slate-700 font-medium">Date of Birth</Label>
            <Input 
              id="dob" 
              type="date" 
              value={formData.dob} 
              onChange={handleChange}
              className="bg-slate-50 border-slate-200 h-11" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange}
              placeholder="john.doe@email.com" 
              className={`bg-slate-50 border-slate-200 h-11 ${errors.email ? "border-red-500" : ""}`} 
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>
          <div className="space-y-3">
            <Label htmlFor="mobile" className="text-slate-700 font-medium">Mobile Number</Label>
            <Input 
              id="mobile" 
              value={formData.mobile} 
              onChange={handleChange}
              placeholder="+94 77 123 4567" 
              className={`bg-slate-50 border-slate-200 h-11 ${errors.mobile ? "border-red-500" : ""}`} 
            />
            {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile}</p>}
          </div>
        </div>

        <div className="pt-4">
          <h3 className="text-lg font-bold text-[#0d3b66] mb-4">Account Credentials</h3>
          <p className="text-sm text-slate-500 mb-6">Set up the digital banking access credentials.</p>
            
            <div className="space-y-3 mb-6">
              <Label htmlFor="username" className="text-slate-700 font-medium">Username</Label>
              <Input 
                id="username" 
                value={formData.username} 
                onChange={handleChange}
                placeholder="johndoe_95" 
                className="bg-slate-50 border-slate-200 h-11" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                  <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
                  <Input id="password" type="password" className="bg-slate-50 border-slate-200 h-11" />
              </div>
              <div className="space-y-3">
                  <Label htmlFor="confirmPassword" className="text-slate-700 font-medium">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" className="bg-slate-50 border-slate-200 h-11" />
              </div>
            </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-slate-50 px-8 py-4 flex items-center justify-between border-t border-slate-100">
        <Button 
          variant="ghost" 
          onClick={onBack}
          disabled={true} 
          className="gap-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 cursor-not-allowed opacity-50"
        >
            <ArrowLeft size={16} /> Back
        </Button>
        <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-400 mr-4 cursor-pointer hover:text-slate-600">Save Draft</span>
            <Button 
              onClick={handleNext}
              className="gap-2 bg-[#3e9fd3] hover:bg-[#328ab8] text-white px-8 h-10 shadow-md shadow-blue-200"
            >
                Continue <ArrowRight size={16} />
            </Button>
        </div>
      </div>
    </div>
  );
}
