/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'andrerimes.s3.amazonaws.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'andrerimes.s3.sa-east-1.amazonaws.com',
                pathname: '/**',
            },
        ],
    },
    output: 'standalone',
};

export default nextConfig;