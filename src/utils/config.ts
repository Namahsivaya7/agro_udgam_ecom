import { Metadata } from "next";

export const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Trisandya Mart";
export const siteAddress =
  process.env.NEXT_PUBLIC_SITE_ADDRESS ?? "http://localhost:3000";
export const appLogo = `${siteAddress}/logo.png`;

export const API_ROOT = `${siteAddress}/api/`;

export const IMAGE_CDN_ROOT = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/`;
export const CN_THUMBNAIL_CONF = "c_thumb,w_200,g_face"; // For Thumbnails

export const RUPEE = "₹";
export const DELIVERY_FEE = 50;
export const MINIMUM_ORDER_VALUE = 500;

export const SITE_DESCRIPTION = `Welcome to ${appName} – your one-stop solution for fresh and convenient grocery shopping from the comfort of your home! Discover a hassle-free way to stock up on essentials with our easy-to-navigate online platform. Choose from a wide selection of high-quality produce, pantry staples, and household items, all sourced locally to ensure freshness. Our dedicated team works tirelessly to handpick and deliver your order promptly, bringing the grocery store experience to your doorstep. Enjoy the convenience of stress-free shopping, timely deliveries, and support local businesses. Embrace the future of grocery shopping with ${appName} - Where Freshness Meets Convenience!`;

export const DEFAULT_METADATA: Metadata = {
  metadataBase: new URL(siteAddress),
  title: appName,
  description: SITE_DESCRIPTION,
  keywords:
    "Online Grocery Shopping, Local Grocery Delivery, Fresh Produce Delivery, Same-Day Grocery Delivery, Convenient Grocery Ordering, Home Grocery Delivery, Local Produce Delivery, Fresh Food Delivery, Quick Grocery Delivery, Organic Grocery Delivery, Neighborhood Grocery Service, Affordable Grocery Delivery, Reliable Food Delivery, Easy Online Grocery Ordering, Local Grocery Marketplace, Sustainable Grocery Delivery, Quality Grocery Selection, Efficient Grocery Service, Contactless Grocery Delivery, Personalized Grocery Experience",
  openGraph: {
    type: "website",
    title: appName,
    description: SITE_DESCRIPTION,
    url: siteAddress,
    images: appLogo,
  },
};

export const ORG_SCHEMA = {
  __html: JSON.stringify({
    "@context": "http://schema.org/",
    "@type": "Organization",
    name: appName,
    logo: appLogo,
    url: siteAddress,
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "3-13A, Jammichettu Center, Pedakallepalli, Mopidevi Mandal, Krishna Dist",
      addressLocality: "Vijayawada",
      addressRegion: "Andhra Pradesh",
      postalCode: "521130",
      addressCountry: "India",
    },
    sameAs: [],
  }),
};
