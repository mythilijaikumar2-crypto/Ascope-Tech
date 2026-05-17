import React from "react";
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import Process from "../components/sections/Process";
import PopularCourses from "../components/sections/PopularCourses";
import Testimonials from "../components/sections/Testimonials";

import Partners from "../components/sections/Partners";

const Home: React.FC = () => {
  return (
    <>
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
