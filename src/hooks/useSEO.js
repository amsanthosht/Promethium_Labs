import { useEffect } from "react";

const BASE_URL = "https://promethiumlabs.in";

/**
 * useSEO — sets document title, meta description, keywords, OG and Twitter tags per page.
 * Usage: useSEO({ title: "About", description: "...", keywords: "...", path: "/about" })
 */
export const useSEO = ({ title, description, keywords, path } = {}) => {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | Promethium Labs`
      : "Promethium Labs — Software Development & Digital Marketing, Chennai";

    const fullDesc =
      description ||
      "Promethium Labs is a software lab in Chennai building web apps, AI tools, and digital marketing solutions for startups and businesses across India.";

    const canonicalUrl = `${BASE_URL}${path || "/"}`;

    // Title
    document.title = fullTitle;

    // Helper: upsert a <meta> tag
    const setMeta = (attr, key, value) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    // Helper: upsert a <link> tag
    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    // Standard meta
    setMeta("name", "description", fullDesc);
    if (keywords) setMeta("name", "keywords", keywords);

    // Canonical
    setLink("canonical", canonicalUrl);

    // Open Graph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", fullDesc);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "Promethium Labs");
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", `${BASE_URL}/og-image.png`);
    setMeta("property", "og:locale", "en_IN");

    // Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", fullDesc);
    setMeta("name", "twitter:image", `${BASE_URL}/og-image.png`);

    return () => {
      document.title = "Promethium Labs — Software Development & Digital Marketing, Chennai";
    };
  }, [title, description, keywords, path]);
};
