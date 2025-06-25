const nextConfig = {
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "Access-Control-Allow-Origin",
          value: process.env.NEXT_PUBLIC_DEV_ORIGIN || "http://localhost:3000",
        },
        {
          key: "Access-Control-Allow-Methods",
          value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        },
        {
          key: "Access-Control-Allow-Headers",
          value: "X-Requested-With, Content-Type, Authorization",
        },
      ],
    },
  ],
};

export default nextConfig;
