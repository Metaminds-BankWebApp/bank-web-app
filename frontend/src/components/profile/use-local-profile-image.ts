"use client";

import { useMemo } from "react";
import { resolveUserProfileImageUrl } from "@/src/api/profile/user-profile.service";
import type { UserProfileResponse } from "@/src/types/dto/user-profile.dto";

export function useLocalProfileImage(profile: UserProfileResponse | null) {
  const profileImageSrc = useMemo(
    () => resolveUserProfileImageUrl(profile?.profilePictureUrl),
    [profile?.profilePictureUrl],
  );

  return {
    profileImageSrc,
  };
}
