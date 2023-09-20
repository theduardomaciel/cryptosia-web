/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        return {
            experiments: {
                asyncWebAssembly: true,
                ...config.experiments,
            },
            output: {
                webassemblyModuleFilename: "static/wasm/[modulehash].wasm",
                ...config.output,
            },
            ...config,
        };
    },
};

module.exports = nextConfig;
