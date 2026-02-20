import { useEffect } from "react";

interface Props {
  title: string;
  description: string;
  path?: string;
  type?: string;
}

const BASE_URL = "https://greenledger.com";
const OG_IMAGE = "https://storage.googleapis.com/gpt-engineer-file-uploads/37Xi2yzwDVQgVIkNFfgejmDYhQj1/social-images/social-1771603049970-Logo_Cor_-_Horizontal.webp";

const SEOHead = ({ title, description, path = "/", type = "website" }: Props) => {
  useEffect(() => {
    const fullTitle = `${title} — Green Ledger`;
    document.title = fullTitle;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", `${BASE_URL}${path}`);
    setMeta("property", "og:type", type);
    setMeta("property", "og:image", OG_IMAGE);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", OG_IMAGE);
    setMeta("name", "twitter:card", "summary_large_image");

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.href = `${BASE_URL}${path}`;
  }, [title, description, path, type]);

  return null;
};

export default SEOHead;
