import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		useTypeScriptCli: false
	},
	pageExtensions: ["page.tsx", "page.ts"],
	reactCompiler: true,
	reactStrictMode: true
};

export default nextConfig;
