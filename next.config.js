/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
     remotePatterns: [
       {
         hostname: "frcjtltt6mtlmajb.public.blob.vercel-storage.com",
       },
     ],
   },
 };
 
 module.exports = nextConfig;