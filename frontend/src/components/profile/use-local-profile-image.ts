"use client";

import { useMemo } from "react";
import { resolveUserProfileImageUrl } from "@/src/api/profile/user-profile.service";
import type { UserProfileResponse } from "@/src/types/dto/user-profile.dto";

// Resolves the profile image source used by profile views.
export function useLocalProfileImage(profile: UserProfileResponse | null) {
  // Resolves the usable profile image URL from profile data.
  const profileImageSrc = useMemo(
    () => resolveUserProfileImageUrl(profile?.profilePictureUrl),
    [profile?.profilePictureUrl],
  );

  return {
    profileImageSrc,
  };
}
