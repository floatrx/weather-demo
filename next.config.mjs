/** @type {import('next').NextConfig} */
const nextConfig = {
    // @see https://nextjs.org/docs/pages/api-reference/components/image#configuration-options
    images: {
        loader: 'default',
        domains: ['openweathermap.org', 'localhost', '127.0.0.1'],
    },
};

export default nextConfig;
