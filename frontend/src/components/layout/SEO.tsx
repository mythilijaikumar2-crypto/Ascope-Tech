import React, { useEffect } from "react";
import { GLOBAL_SEO_DEFAULTS } from "../../utils/seoHelper";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogType?: "website" | "article" | "course";
  ogImage?: string;
  schema?: object | object[];
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogType = "website",
  ogImage = GLOBAL_SEO_DEFAULTS.logoUrl,
  schema,
}) => {
  useEffect(() => {
    // 1. Set Title
    const formattedTitle = title.includes(GLOBAL_SEO_DEFAULTS.companyName)
      ? title
      : `${title} | ${GLOBAL_SEO_DEFAULTS.companyName}`;
    document.title = formattedTitle;

    // Helper to find or create a meta tag
    const setMetaTag = (attr: string, value: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${value}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, value);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
      return element;
    };

    // Helper to find or create a link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
      return element;
    };

    // 2. Set Standard Meta Tags
    setMetaTag("name", "description", description);
    const combinedKeywords = Array.from(
      new Set([...keywords, ...GLOBAL_SEO_DEFAULTS.keywords])
    ).slice(0, 15).join(", ");
    setMetaTag("name", "keywords", combinedKeywords);
    setMetaTag("name", "robots", "index, follow, max-image-preview:large");
    setMetaTag("name", "author", GLOBAL_SEO_DEFAULTS.companyName);
    setMetaTag("name", "theme-color", "#0A2540"); // Sleek brand colors

    // 3. Set Local/Geo Meta Tags for Trichy Search Authority
    setMetaTag("name", "geo.region", "IN-TN"); // Tamil Nadu
    setMetaTag("name", "geo.placename", GLOBAL_SEO_DEFAULTS.address.city);
    setMetaTag("name", "geo.position", `${GLOBAL_SEO_DEFAULTS.geo.latitude};${GLOBAL_SEO_DEFAULTS.geo.longitude}`);
    setMetaTag("name", "ICBM", `${GLOBAL_SEO_DEFAULTS.geo.latitude}, ${GLOBAL_SEO_DEFAULTS.geo.longitude}`);

    // 4. Set Canonical Link
    const currentUrl = canonicalUrl || window.location.href;
    setLinkTag("canonical", currentUrl);

    // 5. Set Open Graph Tags for Social & AI Engines
    setMetaTag("property", "og:title", formattedTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:url", currentUrl);
    setMetaTag("property", "og:image", ogImage);
    setMetaTag("property", "og:site_name", GLOBAL_SEO_DEFAULTS.companyName);

    // 6. Set Twitter Card Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", formattedTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", ogImage);

    // 7. Inject Structured Data JSON-LD Schema
    const scriptId = "ascope-tech-jsonld-schema";
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptElement) {
      scriptElement = document.createElement("script");
      scriptElement.id = scriptId;
      scriptElement.type = "application/ld+json";
      document.head.appendChild(scriptElement);
    }

    if (schema) {
      scriptElement.textContent = JSON.stringify(schema, null, 2);
    } else {
      scriptElement.textContent = "";
    }

    // 8. Cleanup dynamically added / updated tags when unmounting or changing routes
    return () => {
      // Clean up dynamic schema to prevent stale structured data in SPAs
      const oldScript = document.getElementById(scriptId);
      if (oldScript) {
        oldScript.remove();
      }
    };
  }, [title, description, keywords, canonicalUrl, ogType, ogImage, schema]);

  return null; // This is a head side-effect-only component
};

export default SEO;
