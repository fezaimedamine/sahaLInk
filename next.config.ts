
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fpllktffrytpfzjydogw.supabase.co", // Replace with your Supabase project domain
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};