import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("services.json")
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  return (
    <>
      <div className="text-center">
        <p className="text-2xl font-bold text-orange-600">Service</p>
        <h2 className="text-5xl font-semibold">Our Service Area</h2>
        <p className="my-4">
          the majority have suffered alteration in some form, by injected
          humour, <br />
          or randomised words which don't look even slightly believable.{" "}
        </p>
      </div>
      <div className="mb-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {services.map(service => (
          <ServiceCard key={service._id} service={service}></ServiceCard>
        ))}
      </div>
    </>
  );
};

export default Services;
