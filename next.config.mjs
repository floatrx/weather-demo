/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: false, // enable during development
    async redirects () {
        return [
            {
                source: "/",
                destination: "/info",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
