import Header from "@/components/Header";
import React from "react";

const About = () => {
    
  return (
    <div>
      <Header />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div className="my-4 px-4">
          <h1 className="font-extrabold text-2xl">My Portfolio</h1>
          <p className="text-sm font-light">Full stack developer</p>
        </div>
      </div>
    </div>
  );
};

export default About;
