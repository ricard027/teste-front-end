export function getPublicSiteUrl(): URL | null {
  const configuredUrl = process.env.SITE_URL;
  if (!configuredUrl) return null;

  try {
    const url = new URL(configuredUrl);
    if (url.protocol !== "https:") return null;
    return url;
  } catch {
    return null;
  }
}
