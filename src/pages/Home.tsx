import React from "react";
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import PopularCourses from "../components/sections/PopularCourses";
import Testimonials from "../components/sections/Testimonials";

import Partners from "../components/sections/Partners";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Partners />
      <Features />
      <PopularCourses />
      <Testimonials />
    </>
  );
};

export default Home;
