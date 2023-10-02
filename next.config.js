/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
	dest: "public",
	workboxOptions: {
		mode: "production",
	},
});

const nextConfig = {
	webpack: (config, { isServer }) => {
		return {
			experiments: {
				asyncWebAssembly: true,
				...config.experiments,
			},
			output: {
				webAssemblyModuleFilename: "static/wasm/cryptosia.wasm",
				...config.output,
			},
			...config,
		};
	},
};

module.exports = module.exports = withPWA(nextConfig);
