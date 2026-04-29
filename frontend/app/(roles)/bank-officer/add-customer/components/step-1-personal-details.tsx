"use client";

import { useState } from "react";
import { 
  CheckCircle2, 
  Search,
  ClipboardCopy,
  Eye,
  EyeOff,
  ArrowRight, 
  ArrowLeft 
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui";
import { CustomerFormData, StepProps } from "./types";
import { PersonalDetailsErrors, validatePersonalDetailsStep } from "./validation";

export function PersonalDetails({
  formData,
  updateFormData,
  onNext,
  onBack,
  onVerifyAccount,
  isVerifyingAccount,
  onSaveDraftStepOne,
  onContinueStepOne,
  onLookupCustomerByNic,
  onGenerateCredentials,
  isSavingDraftStepOne,
  isSubmittingStepOne,
  isLookingUpCustomerByNic,
  isGeneratingCredentials,
  hasExistingCustomerMatch,
  serverStepOneErrors,
  onClearServerStepOneError,
}: StepProps) {
  const [errors, setErrors] = useState<PersonalDetailsErrors>({});
  const [isCopyingPassword, setIsCopyingPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const mergedErrors: PersonalDetailsErrors = {
    ...errors,
    ...serverStepOneErrors,
  };

  const validate = () => {
    const newErrors = validatePersonalDetailsStep(formData, {
      allowPasswordUnchanged: Boolean(hasExistingCustomerMatch),
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validate()) {
      return;
    }

    try {
      if (onContinueStepOne) {
        await onContinueStepOne();
      }
      onNext();
    } catch {
      // Step-one API errors are surfaced by parent state; keep the user on this step.
    }
  };

  const handleSaveDraft = async () => {
    if (validate() && onSaveDraftStepOne) {
      await onSaveDraftStepOne();
    }
  };

  const handleLookupCustomerByNic = async () => {
    if (!onLookupCustomerByNic) {
      return;
    }
    if (!formData.nic.trim()) {
      setErrors((prev) => ({ ...prev, nic: "NIC number is required." }));
      return;
    }
    await onLookupCustomerByNic();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target as HTMLInputElement & { id: keyof CustomerFormData };
    updateFormData({ [id]: value } as Partial<CustomerFormData>);
    if (id in errors && errors[id as keyof PersonalDetailsErrors]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }

    if (id === "nic" || id === "email" || id === "username" || id === "bankAccount") {
      onClearServerStepOneError?.(id);
    }
  };

  const handleEditVerifiedAccount = () => {
    updateFormData({
      isAccountVerified: false,
      accountVerificationStatus: "",
      accountVerificationMessage: "Account number unlocked. Update and verify again.",
    });
    onClearServerStepOneError?.("bankAccount");
  };

  const handleCopyPassword = async () => {
    if (!formData.password.trim()) {
      return;
    }

    setIsCopyingPassword(true);
    try {
      await navigator.clipboard.writeText(formData.password);
    } finally {
      setTimeout(() => setIsCopyingPassword(false), 400);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-8 py-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-[#0d3b66]">Personal Information</h2>
        <p className="text-sm text-slate-500 mt-1">Basic identification details for the new account holder.</p>
      </div>
      
      <div className="p-8 space-y-8">
        <div className="rounded-xl border border-[#c9e8f8] bg-[#f1f9fe] p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="nic" className="text-slate-700 font-semibold">NIC Number (Primary Lookup)</Label>
              <Input
                id="nic"
                value={formData.nic}
                onChange={handleChange}
                placeholder="951234567V"
                className={`bg-white border-slate-200 h-11 ${mergedErrors.nic ? "border-red-500" : ""}`}
              />
              {mergedErrors.nic && <p className="text-red-500 text-xs">{mergedErrors.nic}</p>}
            </div>
            <Button
              type="button"
              onClick={handleLookupCustomerByNic}
              disabled={Boolean(isLookingUpCustomerByNic || isSavingDraftStepOne || isSubmittingStepOne || !formData.nic.trim())}
              className="h-11 min-w-52 bg-[#0d3b66] hover:bg-[#1a4a7a] text-white"
            >
              <Search size={16} className="mr-2" />
              {isLookingUpCustomerByNic ? "Searching..." : "Find Existing Customer"}
            </Button>
          </div>
          <p className="mt-3 text-xs text-slate-600">
            Enter NIC first. If customer already exists, we will load saved details so you can update without duplicate inserts.
          </p>
          {hasExistingCustomerMatch && (
            <p className="mt-2 text-xs font-semibold text-emerald-700">
              Existing customer found and loaded. You can now edit and continue.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label htmlFor="firstName" className="text-slate-700 font-medium">First Name</Label>
            <Input 
              id="firstName" 
              value={formData.firstName} 
              onChange={handleChange}
              placeholder="Johnathan" 
              className={`bg-slate-50 border-slate-200 h-11 focus:ring-[#3e9fd3] ${mergedErrors.firstName ? "border-red-500" : ""}`}
            />
            {mergedErrors.firstName && <p className="text-red-500 text-xs">{mergedErrors.firstName}</p>}
          </div>
          <div className="space-y-3">
            <Label htmlFor="lastName" className="text-slate-700 font-medium">Last Name</Label>
            <Input 
              id="lastName" 
              value={formData.lastName} 
              onChange={handleChange}
              placeholder="Doe" 
              className={`bg-slate-50 border-slate-200 h-11 focus:ring-[#3e9fd3] ${mergedErrors.lastName ? "border-red-500" : ""}`}
            />
            {mergedErrors.lastName && <p className="text-red-500 text-xs">{mergedErrors.lastName}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label htmlFor="dob" className="text-slate-700 font-medium">Date of Birth</Label>
            <Input 
              id="dob" 
              type="date" 
              value={formData.dob} 
              onChange={handleChange}
              className={`bg-slate-50 border-slate-200 h-11 ${errors.dob ? "border-red-500" : ""}`} 
            />
            {mergedErrors.dob && <p className="text-red-500 text-xs">{mergedErrors.dob}</p>}
          </div>
          <div className="space-y-3">
            <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange}
              placeholder="john.doe@email.com" 
              className={`bg-slate-50 border-slate-200 h-11 ${mergedErrors.email ? "border-red-500" : ""}`} 
            />
            {mergedErrors.email && <p className="text-red-500 text-xs">{mergedErrors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label htmlFor="mobile" className="text-slate-700 font-medium">Mobile Number</Label>
            <Input 
              id="mobile" 
              value={formData.mobile} 
              onChange={handleChange}
              placeholder="+94 77 123 4567" 
              className={`bg-slate-50 border-slate-200 h-11 ${mergedErrors.mobile ? "border-red-500" : ""}`} 
            />
            {mergedErrors.mobile && <p className="text-red-500 text-xs">{mergedErrors.mobile}</p>}
          </div>
          <div className="space-y-3">
            <Label htmlFor="province" className="text-slate-700 font-medium">Province</Label>
            <Input 
              id="province" 
              value={formData.province} 
              onChange={handleChange}
              placeholder="Western" 
              className={`bg-slate-50 border-slate-200 h-11 ${mergedErrors.province ? "border-red-500" : ""}`} 
            />
            {mergedErrors.province && <p className="text-red-500 text-xs">{mergedErrors.province}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label htmlFor="address" className="text-slate-700 font-medium">Address</Label>
            <Input 
              id="address" 
              value={formData.address} 
              onChange={handleChange}
              placeholder="123, Galle Road, Colombo" 
              className={`bg-slate-50 border-slate-200 h-11 ${mergedErrors.address ? "border-red-500" : ""}`} 
            />
            {mergedErrors.address && <p className="text-red-500 text-xs">{mergedErrors.address}</p>}
          </div>
          <div />
        </div>

        <div className="pt-4">
          <h3 className="text-lg font-bold text-[#0d3b66] mb-4">Account Credentials</h3>
          <p className="text-sm text-slate-500 mb-6">Set up the digital banking access credentials.</p>
          <div className="mb-4 flex flex-wrap justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => void onGenerateCredentials?.()}
              disabled={Boolean(isGeneratingCredentials || !formData.firstName.trim() || !formData.lastName.trim())}
              className="border-slate-200 text-slate-700 hover:bg-slate-100"
            >
              {isGeneratingCredentials ? "Generating..." : "Generate Username"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => void handleCopyPassword()}
              disabled={Boolean(!formData.password.trim())}
              className="border-slate-200 text-slate-700 hover:bg-slate-100"
            >
              <ClipboardCopy size={16} className="mr-2" />
              {isCopyingPassword ? "Copied" : "Copy Password"}
            </Button>
          </div>
            
            <div className="space-y-3 mb-6">
              <Label htmlFor="username" className="text-slate-700 font-medium">Username</Label>
              <Input 
                id="username" 
                value={formData.username} 
                onChange={handleChange}
                placeholder="johndoe_95" 
                className={`bg-slate-50 border-slate-200 h-11 ${mergedErrors.username ? "border-red-500" : ""}`} 
              />
              {mergedErrors.username && <p className="text-red-500 text-xs">{mergedErrors.username}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                  <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={isPasswordVisible ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className={`bg-slate-50 border-slate-200 h-11 pr-11 ${mergedErrors.password ? "border-red-500" : ""}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsPasswordVisible((visible) => !visible)}
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                      aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                    >
                      {isPasswordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                  {mergedErrors.password && <p className="text-red-500 text-xs">{mergedErrors.password}</p>}
              </div>
              <div className="space-y-3">
                  <Label htmlFor="confirmPassword" className="text-slate-700 font-medium">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`bg-slate-50 border-slate-200 h-11 pr-11 ${mergedErrors.confirmPassword ? "border-red-500" : ""}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsConfirmPasswordVisible((visible) => !visible)}
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                      aria-label={isConfirmPasswordVisible ? "Hide confirm password" : "Show confirm password"}
                    >
                      {isConfirmPasswordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                  {mergedErrors.confirmPassword && <p className="text-red-500 text-xs">{mergedErrors.confirmPassword}</p>}
              </div>
            </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
           <h3 className="text-lg font-bold text-[#0d3b66] mb-4">Banking & Authorization</h3>
           <p className="text-sm text-slate-500 mb-6">Link existing bank accounts.</p>
           
           <div className="space-y-3 mb-6">
              <Label htmlFor="bankAccount" className="text-slate-700 font-medium">Bank Account Number</Label>
              <div className="flex gap-3">
                 <Input 
                   id="bankAccount" 
                   value={formData.bankAccount} 
                   onChange={handleChange}
                   placeholder="1000 2345 6789" 
                   className={`bg-slate-50 border-slate-200 h-11 flex-1 ${mergedErrors.bankAccount ? "border-red-500" : ""}`} 
                   disabled={formData.isAccountVerified}
                 />
                 <Button 
                   type="button"
                   variant={formData.isAccountVerified ? "outline" : "primary"}
                   className={`h-11 px-6 whitespace-nowrap min-w-30 ${formData.isAccountVerified ? "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100" : "bg-[#0d3b66] hover:bg-[#1a4a7a] text-white"}`}
                   onClick={async (e) => {
                     e.preventDefault();
                     if (onVerifyAccount) {
                       await onVerifyAccount();
                     }
                   }}
                   disabled={Boolean(isVerifyingAccount || !formData.bankAccount)}
                 >
                   {formData.isAccountVerified ? (
                      <><CheckCircle2 size={16} className="mr-2" /> Verified</>
                   ) : isVerifyingAccount ? "Verifying..." : "Verify Account"}
                 </Button>
                 {formData.isAccountVerified && (
                   <Button
                     type="button"
                     variant="outline"
                     className="h-11 px-6 whitespace-nowrap"
                     onClick={handleEditVerifiedAccount}
                   >
                     Edit
                   </Button>
                 )}
              </div>
              {mergedErrors.bankAccount && <p className="text-red-500 text-xs">{mergedErrors.bankAccount}</p>}
                {!mergedErrors.bankAccount && formData.accountVerificationMessage && (
                 <p className={`text-xs ${formData.isAccountVerified ? "text-emerald-600" : "text-amber-600"}`}>
                  {formData.accountVerificationMessage}
                 </p>
                )}
           </div>
        </div>
      </div>

      {/* Actions */}
      <div className="fixed bottom-0 right-0 left-0 lg:left-64 bg-white border-t border-slate-200 px-8 py-4 flex items-center justify-between z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <Button 
          variant="ghost" 
          onClick={onBack}
          disabled={true} 
          className="gap-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 cursor-not-allowed opacity-50"
        >
            <ArrowLeft size={16} /> Back
        </Button>
        <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={Boolean(isSavingDraftStepOne || isSubmittingStepOne)}
              className="text-sm font-semibold text-slate-400 cursor-pointer hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSavingDraftStepOne ? "Saving Draft..." : "Save Draft"}
            </button>
            <Button 
              onClick={handleNext}
              disabled={Boolean(isSavingDraftStepOne || isSubmittingStepOne)}
              className="gap-2 bg-[#3e9fd3] hover:bg-[#328ab8] text-white px-8 h-10 shadow-md shadow-blue-200"
            >
                {isSubmittingStepOne ? "Saving..." : "Continue"} <ArrowRight size={16} />
            </Button>
        </div>
      </div>
    </div>
  );
}
