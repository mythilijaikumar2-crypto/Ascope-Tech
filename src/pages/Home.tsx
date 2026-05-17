import React from "react";
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import PopularCourses from "../components/sections/PopularCourses";
import Testimonials from "../components/sections/Testimonials";

import Partners from "../components/sections/Partners";
import Newsletter from "../components/sections/Newsletter";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Partners />
      <Features />
      <PopularCourses />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default Home;
