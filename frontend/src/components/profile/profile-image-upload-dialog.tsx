"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Button, Dialog } from "@/src/components/ui";
import { ApiError } from "@/src/types/api-error";
import { Trash2, Upload } from "lucide-react";

const MAX_PROFILE_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

type ProfileImageUploadDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentImageSrc?: string | null;
  initials: string;
  displayName: string;
  onUpload: (file: File) => Promise<void>;
  onRemove: () => Promise<void>;
};

function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Unable to read the selected image."));
    };
    reader.onerror = () => reject(new Error("Unable to read the selected image."));
    reader.readAsDataURL(file);
  });
}

export function ProfileImageUploadDialog({
  open,
  onOpenChange,
  currentImageSrc,
  initials,
  displayName,
  onUpload,
  onRemove,
}: ProfileImageUploadDialogProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [draftImageSrc, setDraftImageSrc] = useState<string | null>(currentImageSrc ?? null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isReadingFile, setIsReadingFile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    setDraftImageSrc(currentImageSrc ?? null);
    setSelectedFile(null);
    setError("");
    setIsReadingFile(false);
    setIsSubmitting(false);
  }, [currentImageSrc, open]);

  const triggerFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError("Choose a JPG, PNG, WEBP, or GIF image.");
      return;
    }

    if (file.size > MAX_PROFILE_IMAGE_SIZE_BYTES) {
      setError(`Choose an image up to ${formatFileSize(MAX_PROFILE_IMAGE_SIZE_BYTES)}.`);
      return;
    }

    setIsReadingFile(true);
    setError("");

    try {
      const nextImageSrc = await readFileAsDataUrl(file);
      setDraftImageSrc(nextImageSrc);
      setSelectedFile(file);
    } catch (unknownError) {
      const message = unknownError instanceof Error ? unknownError.message : "Unable to read the selected image.";
      setError(message);
    } finally {
      setIsReadingFile(false);
    }
  };

  const handleRemove = () => {
    setDraftImageSrc(null);
    setSelectedFile(null);
    setError("");
  };

  const handleSave = async () => {
    const hadCurrentImage = Boolean(currentImageSrc);

    if (!selectedFile && draftImageSrc === currentImageSrc) {
      onOpenChange(false);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      if (selectedFile) {
        await onUpload(selectedFile);
      } else if (!draftImageSrc && hadCurrentImage) {
        await onRemove();
      }

      onOpenChange(false);
    } catch (unknownError) {
      const message = unknownError instanceof ApiError
        ? unknownError.message
        : unknownError instanceof Error
          ? unknownError.message
          : "Unable to save the selected profile image.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Update Profile Photo"
      description="Upload a profile image and save it to your account."
      footer={
        <>
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => void handleSave()}
            loading={isSubmitting}
            disabled={isReadingFile}
          >
            Save Photo
          </Button>
        </>
      }
    >
      <div className="space-y-5">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-5 text-center">
          <div className="relative h-28 w-28 overflow-hidden rounded-full border border-slate-200 bg-[#e2edf6]">
            {draftImageSrc ? (
              <Image
                src={draftImageSrc}
                alt={`${displayName} profile photo`}
                fill
                sizes="112px"
                unoptimized
                className="object-cover"
              />
            ) : (
              <div className="grid h-full w-full place-items-center text-4xl font-bold text-[#0d3b66]">
                {initials}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-800">Profile photo preview</p>
            <p className="text-xs text-slate-500">Use JPG, PNG, WEBP, or GIF up to {formatFileSize(MAX_PROFILE_IMAGE_SIZE_BYTES)}.</p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex flex-wrap justify-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={triggerFilePicker}
            loading={isReadingFile}
            disabled={isSubmitting}
          >
            {isReadingFile ? null : <Upload size={16} />}
            Choose Photo
          </Button>

          {draftImageSrc ? (
            <Button
              type="button"
              variant="ghost"
              onClick={handleRemove}
              disabled={isReadingFile || isSubmitting}
            >
              <Trash2 size={16} />
              Remove Photo
            </Button>
          ) : null}
        </div>

        {error ? (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
        ) : null}
      </div>
    </Dialog>
  );
}
