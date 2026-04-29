"use client";

import Image from "next/image";
import Cropper, { type Area } from "react-easy-crop";
import { useCallback, useEffect, useRef, useState, type ChangeEvent } from "react";
import { Button, Dialog } from "@/src/components/ui";
import { ApiError } from "@/src/types/api-error";
import { Hand, RotateCcw, Trash2, Upload } from "lucide-react";

const MAX_PROFILE_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
const DEFAULT_ZOOM = 1.2;
const CROP_ASPECT = 1;

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

function createImage(imageSrc: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", () => reject(new Error("Unable to load the selected image.")));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = imageSrc;
  });
}

function getImageFileExtension(mimeType: string): string {
  if (mimeType === "image/jpeg") {
    return "jpg";
  }

  if (mimeType === "image/webp") {
    return "webp";
  }

  return "png";
}

async function getCroppedImage(imageSrc: string, crop: Area, file: File): Promise<File> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Unable to crop the selected image.");
  }

  const outputWidth = Math.max(1, Math.round(crop.width));
  const outputHeight = Math.max(1, Math.round(crop.height));
  canvas.width = outputWidth;
  canvas.height = outputHeight;

  context.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    outputWidth,
    outputHeight,
  );

  const supportedMimeType = ["image/jpeg", "image/png", "image/webp"].includes(file.type)
    ? file.type
    : "image/png";

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => {
      if (result) {
        resolve(result);
        return;
      }

      reject(new Error("Unable to export the cropped image."));
    }, supportedMimeType, supportedMimeType === "image/jpeg" ? 0.92 : undefined);
  });

  const baseName = file.name.replace(/\.[^.]+$/, "") || "profile-photo";
  const extension = getImageFileExtension(blob.type || supportedMimeType);

  return new File([blob], `${baseName}-cropped.${extension}`, {
    type: blob.type || supportedMimeType,
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
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [error, setError] = useState("");
  const [isReadingFile, setIsReadingFile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    setDraftImageSrc(currentImageSrc ?? null);
    setSelectedFile(null);
    setCrop({ x: 0, y: 0 });
    setZoom(DEFAULT_ZOOM);
    setCroppedAreaPixels(null);
    setError("");
    setIsReadingFile(false);
    setIsSubmitting(false);
  }, [currentImageSrc, open]);

  useEffect(() => {
    if (!selectedFile) {
      return;
    }

    setCrop({ x: 0, y: 0 });
    setZoom(DEFAULT_ZOOM);
    setCroppedAreaPixels(null);
  }, [selectedFile]);

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
    setCrop({ x: 0, y: 0 });
    setZoom(DEFAULT_ZOOM);
    setCroppedAreaPixels(null);
    setError("");
  };

  const handleCropComplete = useCallback((_: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const resetCrop = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(DEFAULT_ZOOM);
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
        if (!draftImageSrc || !croppedAreaPixels) {
          throw new Error("Position the photo before saving.");
        }

        const croppedFile = await getCroppedImage(draftImageSrc, croppedAreaPixels, selectedFile);
        await onUpload(croppedFile);
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
          {selectedFile && draftImageSrc ? (
            <div className="space-y-4 w-full">
              <div className="relative mx-auto h-[320px] w-full max-w-[360px] overflow-hidden rounded-[28px] border border-slate-200 bg-slate-900 shadow-inner">
                <Cropper
                  image={draftImageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={CROP_ASPECT}
                  cropShape="round"
                  showGrid={false}
                  objectFit="horizontal-cover"
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={handleCropComplete}
                  classes={{
                    containerClassName: "rounded-[28px]",
                    cropAreaClassName: "border border-white/70 shadow-[0_0_0_9999px_rgba(15,23,42,0.2)]",
                  }}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center p-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                    <Hand size={14} />
                    Drag to reposition the photo
                  </div>
                </div>
              </div>

              <div className="mx-auto w-full max-w-[360px] space-y-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Adjust crop</p>
                    <p className="text-xs text-slate-500">Move the image and zoom to frame the face cleanly.</p>
                  </div>
                  <button
                    type="button"
                    onClick={resetCrop}
                    className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    <RotateCcw size={12} />
                    Reset
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                    <span>Zoom</span>
                    <span>{Math.round(zoom * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.01"
                    value={zoom}
                    onChange={(event) => setZoom(Number(event.target.value))}
                    className="w-full accent-[#3e9fd3]"
                  />
                </div>
              </div>
            </div>
          ) : (
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
          )}

          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-800">Profile photo preview</p>
            <p className="text-xs text-slate-500">
              Use JPG, PNG, WEBP, or GIF up to {formatFileSize(MAX_PROFILE_IMAGE_SIZE_BYTES)}.
              {selectedFile ? " Drag the photo inside the frame to crop it cleanly before saving." : ""}
            </p>
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
