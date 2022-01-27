/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    loader: "imgix",
    path: "https://next-practice.imgix.net/",
    domains: ["next-practice.imgix.net"],
  },
};
