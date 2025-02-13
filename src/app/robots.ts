import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/_next", "/api", "/*?*"],
        crawlDelay: 10,
      },
    ],
    sitemap: `${
      process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.grafica3fc.com/"
    }sitemap.xml`,
  };
}
