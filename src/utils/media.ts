// Every optimized JPG in /public/images has a matching WebP sibling
// (same name, .webp extension) generated at build/asset-prep time.
export const toWebp = (jpgUrl: string): string => jpgUrl.replace(/\.jpe?g$/i, ".webp");

// Every optimized MP4 has a matching poster frame JPG
// (e.g. p1-v2.mp4 -> p1-v2-poster.jpg) so the video area paints
// instantly instead of staying blank/black until playback starts.
export const toPoster = (mp4Url: string): string => mp4Url.replace(/\.mp4$/i, "-poster.jpg");
