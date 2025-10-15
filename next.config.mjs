/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'totalcarcheck.co.uk',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
