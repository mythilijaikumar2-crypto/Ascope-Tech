import React from "react";
import SEO from "../components/layout/SEO";
import { getLocalBusinessSchema, getOrganizationSchema, getWebsiteSchema } from "../utils/seoHelper";
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import Process from "../components/sections/Process";
import PopularCourses from "../components/sections/PopularCourses";
import Testimonials from "../components/sections/Testimonials";
import Partners from "../components/sections/Partners";

const Home: React.FC = () => {
  // Centralized high-priority schemas for homepage
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      getLocalBusinessSchema(),
      getOrganizationSchema(),
      getWebsiteSchema()
    ]
  };

  return (
    <>
      <SEO
        title="Best Full Stack Development Institute in Trichy | Python & Java"
        description="Ascope Tech is the premier software training institute in Trichy, Tamil Nadu, offering Python and Java Full Stack Development, Data Science, and UI/UX design courses with 100% placement training."
        keywords={[
          "Best Full Stack Development Institute in Trichy",
          "Python Full Course",
          "Java Full Stack Training in Trichy",
          "Software Training Institute in Trichy",
          "Best Coding Institute in Trichy"
        ]}
        schema={homeSchema}
      />
      <Hero />
      <Partners />
      <Features />
      <Process />
      <PopularCourses />
      <Testimonials />
    </>
  );
};

export default Home;
