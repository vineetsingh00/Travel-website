import React from "react";
import ServiceCard from "./ServiceCard";
import { Col } from "reactstrap";

import weatherImg from "../assets/images/weather.png";
import guideImg from "../assets/images/guide.png";
import customizationImg from "../assets/images/customization.png";

const serviceData = [
  {
    imgUrl: weatherImg,
    title: "Calculate Weather",
    desc: "Smart forecasts for weather clarity and convenience.",
  },
  {
    imgUrl: guideImg,
    title: "Best Tour Guide",
    desc: "Expert travel tips with personalized tour planning magic.",
  },
  {
    imgUrl: customizationImg,
    title: "Customization",
    desc: "Tailored experiences crafted with precision and style.",
  },
];

const ServiceList = () => {
  return (
    <>
      {serviceData.map((item, index) => (
        <Col lg="3" key={index}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  );
};

export default ServiceList;
