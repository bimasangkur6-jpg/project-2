import type { NextConfig } from "next";

// Static export untuk GitHub Pages: headers() nggak didukung di mode ini
// (GitHub Pages nggak bisa diatur set response header custom lewat Next.js),
// jadi kalau butuh security header, deploy ke Vercel/Netlify pakai next.config.ts
// versi server (lihat git history) yang masih punya headers().
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/project-2",
  trailingSlash: true,
};

export default nextConfig;
