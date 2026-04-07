import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
    // Specify the path to the i18n config file
    './src/i18n/request.ts'
);

const nextConfig = {
    reactStrictMode: true,
    webpack: (config: any) => {
        config.module.rules.push({
            test: /\.(glb|gltf)$/,
            type: 'asset/resource',
        })
        return config
    },
};

export default withNextIntl(nextConfig);
