import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		useTypeScriptCli: false
	},
	pageExtensions: ["page.tsx", "page.ts"],
	reactStrictMode: true
};

export default nextConfig;
