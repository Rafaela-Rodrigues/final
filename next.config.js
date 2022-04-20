/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            'images.unsplash.com',
            'img.freepik.com',
            'images.pexels.com',
            'imgcy.trivago.com',
            'cf.bstatic.com',
            's3-t1-g08.s3.amazonaws.com',
        ],
    },
}

module.exports = nextConfig
