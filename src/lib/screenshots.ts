/**
 * Screenshot API utility
 * Uses microlink.io's free screenshot API to capture live website previews
 */

export function getScreenshotUrl(websiteUrl: string, options?: {
  width?: number;
  height?: number;
}): string {
  const { width = 1280, height = 720 } = options || {};

  // Use microlink.io's free screenshot API
  // This provides high-quality screenshots without requiring an API key
  const params = new URLSearchParams({
    url: websiteUrl,
    screenshot: 'true',
    'meta': 'false',
    'embed': 'screenshot.url',
  });

  return `https://api.microlink.io?${params.toString()}`;
}

/**
 * Alternative: Use screenshotone.com's free tier
 * Provides 100 screenshots/month free
 */
export function getScreenshotOneUrl(websiteUrl: string): string {
  // Using the public endpoint that doesn't require auth for basic usage
  const encodedUrl = encodeURIComponent(websiteUrl);
  return `https://shot.screenshotapi.net/screenshot?url=${encodedUrl}&output=image&file_type=png&wait_for_event=load`;
}

/**
 * Fallback: Use thum.io which provides free website thumbnails
 */
export function getThumUrl(websiteUrl: string, width: number = 1280): string {
  // Remove protocol for thum.io
  const cleanUrl = websiteUrl.replace(/^https?:\/\//, '').replace(/^www\./, '');
  return `https://image.thum.io/get/width/${width}/${cleanUrl}`;
}
