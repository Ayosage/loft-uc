import type { MetadataRoute } from "next";

const BASE = "https://www.steepleapartments.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/gallery", "/availability", "/neighborhood", "/contact"].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: path === "/availability" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
