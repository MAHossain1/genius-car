import React from "react";
import person from "../../../assets/images/about_us/person.jpg";
import parts from "../../../assets/images/about_us/parts.jpg";

const About = () => {
  return (
    <div className="hero my-20">
      <div className="hero-content flex-col lg:flex-row">
        <div className="relative w-1/2">
          <img
            src={person}
            alt=""
            className="w-4/5 h-full rounded-lg shadow-2xl"
          />
          <img
            src={parts}
            alt=""
            className="absolute right-5 w-3/5 top-1/2 border-6 rounded-lg shadow-2xl"
          />
        </div>

        <div className="w-1/2">
          <p className="text-2xl text-error  mb-4 mt-8 font-bold">About Us</p>
          <h1 className="text-5xl font-bold">
            We are qualified & of experience in this field
          </h1>
          <p className="py-6">
            Welcome to our car-servicing site! Our experienced and certified
            technicians provide exceptional automotive services including
            routine maintenance and extensive repairs using the latest
            diagnostic tools and high-quality parts. <br /> We offer competitive
            pricing, convenient scheduling, and strive for complete customer
            satisfaction. Thank you for choosing us for your automotive needs!
          </p>
          <button className="btn btn-error">Get More Info</button>
        </div>
      </div>
    </div>
  );
};

export default About;
