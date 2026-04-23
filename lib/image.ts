export const DEFAULT_IMAGE_PLACEHOLDER = "/placeholder-course.svg";

export function getSafeImageSrc(
  imageUrl: string | null | undefined,
  fallbackSrc = DEFAULT_IMAGE_PLACEHOLDER,
) {
  if (!imageUrl) {
    return fallbackSrc;
  }

  const normalizedUrl = imageUrl.trim();

  if (!normalizedUrl) {
    return fallbackSrc;
  }

  if (normalizedUrl.startsWith("/")) {
    return normalizedUrl;
  }

  if (!normalizedUrl.startsWith("http")) {
    return fallbackSrc;
  }

  try {
    new URL(normalizedUrl);
    return normalizedUrl;
  } catch {
    return fallbackSrc;
  }
}
