import { seoConfig } from "@/config/seo";
import { serializeJsonLd } from "@/utils/serialize-json-ld";

type WebsiteJsonLdProps = {
  siteUrl: URL | null;
};

export function WebsiteJsonLd({ siteUrl }: WebsiteJsonLdProps) {
  if (!siteUrl) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: seoConfig.applicationName,
    url: siteUrl.href,
    inLanguage: "pt-BR",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
    />
  );
}
