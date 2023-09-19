/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        config.experiments.asyncWebAssembly = true;
        return config;
    },
};

module.exports = nextConfig;
