/**
 * Centralized SEO configurations, keywords, and JSON-LD structured schema generators.
 * Optimized for Google, Bing, Yahoo, and AI Search Engines (ChatGPT, Gemini, Perplexity).
 */

export const GLOBAL_SEO_DEFAULTS = {
  companyName: "Ascope Tech",
  logoUrl: "https://ascope.tech/ascopetech_logo.png",
  url: "https://ascope.tech",
  phone: "+91 74182 40526",
  email: "ascopetech@gmail.com",
  address: {
    street: "5th floor, SBRR Square, Anna Nagar",
    city: "Trichy",
    state: "Tamil Nadu",
    postalCode: "620017",
    country: "India",
  },
  geo: {
    latitude: "10.8050",
    longitude: "78.6856",
  },
  socials: [
    "https://www.instagram.com/ascopetech",
    "https://www.facebook.com/share/1BArsb8YU2/",
    "https://www.linkedin.com/company/ascope-tech-private-limited/",
  ],
  keywords: [
    "Best Full Stack Development Institute in Trichy",
    "Python Full Course",
    "Java Full Stack Training in Trichy",
    "Software Training Institute in Trichy",
    "Full Stack Developer Course Tamil Nadu",
    "Web Development Course Trichy",
    "IT Training Institute Trichy",
    "Placement Training Trichy",
    "Python Course with Placement",
    "Java Course with Placement",
    "Best Coding Institute in Trichy",
    "Full Stack Training Center Trichy",
    "Software Courses in Tamil Nadu",
    "Full Stack Certification Course",
    "Learn Full Stack Development",
    "Full Stack Course for Beginners",
    "MERN Stack Course Trichy",
    "React JS Training Trichy",
    "Node JS Course Trichy",
    "Backend Development Course",
    "Frontend Development Training",
    "Career Oriented IT Courses",
    "Best IT Institute Near Me",
    "Top Programming Institute in Trichy",
    "Software Coaching Center Trichy",
    "Coding Classes Trichy",
    "Programming Courses Tamil Nadu",
    "Job Ready Courses",
    "Industry Ready Training",
    "Full Stack Internship Training",
    "Software Developer Training",
    "Professional Coding Courses",
  ],
};

/**
 * Generate LocalBusiness and Organization structured data (JSON-LD)
 */
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": GLOBAL_SEO_DEFAULTS.companyName,
    "image": GLOBAL_SEO_DEFAULTS.logoUrl,
    "@id": `${GLOBAL_SEO_DEFAULTS.url}/#localbusiness`,
    "url": GLOBAL_SEO_DEFAULTS.url,
    "telephone": GLOBAL_SEO_DEFAULTS.phone,
    "email": GLOBAL_SEO_DEFAULTS.email,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": GLOBAL_SEO_DEFAULTS.address.street,
      "addressLocality": GLOBAL_SEO_DEFAULTS.address.city,
      "addressRegion": GLOBAL_SEO_DEFAULTS.address.state,
      "postalCode": GLOBAL_SEO_DEFAULTS.address.postalCode,
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": GLOBAL_SEO_DEFAULTS.geo.latitude,
      "longitude": GLOBAL_SEO_DEFAULTS.geo.longitude,
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:30",
    },
    "sameAs": GLOBAL_SEO_DEFAULTS.socials,
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": GLOBAL_SEO_DEFAULTS.companyName,
    "url": GLOBAL_SEO_DEFAULTS.url,
    "logo": GLOBAL_SEO_DEFAULTS.logoUrl,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": GLOBAL_SEO_DEFAULTS.phone,
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "ta"],
    },
    "sameAs": GLOBAL_SEO_DEFAULTS.socials,
  };
}

/**
 * Generate Website structured data
 */
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": GLOBAL_SEO_DEFAULTS.companyName,
    "url": GLOBAL_SEO_DEFAULTS.url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${GLOBAL_SEO_DEFAULTS.url}/courses?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate Breadcrumb structured data
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${GLOBAL_SEO_DEFAULTS.url}${item.url}`,
    })),
  };
}

/**
 * Generate Course-specific structured data
 */
export function getCourseSchema(course: {
  id: string | number;
  title: string;
  description: string;
  duration?: string;
  rating?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.title,
    "description": course.description,
    "provider": {
      "@type": "Organization",
      "name": GLOBAL_SEO_DEFAULTS.companyName,
      "sameAs": GLOBAL_SEO_DEFAULTS.url,
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "mixed", // Online, Offline, Hybrid
      "duration": course.duration || "P3M", // Default to 3 months duration
      "courseWorkload": "PT10H",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": course.rating || 4.9,
      "bestRating": 5,
      "ratingCount": 142,
    },
  };
}

/**
 * Generate FAQ structured data
 */
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}
