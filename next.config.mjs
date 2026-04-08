import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(glb|gltf)$/,
            type: 'asset/resource',
        });
        return config;
    },
    experimental: {
        // Enable more aggressive static generation
        optimizePackageImports: ['next-intl'],
    },
};

export default withNextIntl(nextConfig);
