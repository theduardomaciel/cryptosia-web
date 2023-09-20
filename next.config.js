/** @type {import('next').NextConfig} */
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

module.exports = nextConfig;
