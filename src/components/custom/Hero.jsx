import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Bold, Weight } from "lucide-react";

const images = [
  "/images/image1.jpg",
  "/images/image2.png",
  "/images/image3.png",
  "/images/image4.jpg",
  "/images/image5.jpg",
  "/images/image6.jpg",
  "/images/image7.jpg",
  "/images/image8.jpg",
  // Add more image paths as needed
];

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

return (
    <div
        className="h-screen w-full flex items-center justify-center"
        style={{
            backgroundColor: "#343333",
            backgroundImage: `url(${images[current]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "background-image 0.9s",
        }}
    >
        <div className="w-3/4  flex flex-col items-center gap-9 bg-gray-800 bg-opacity-95 rounded-xl shadow-lg px-10 py-16">
            <div className="font-extrabold text-[18px] text-center mt-4 text-white"
            style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "1px" }}>
                <h1>
                    Embark on Effortless Journeys with AI: Smart Travel Plans Tailored for You
                </h1>
            </div>
            <h6 className="text-center text-[20px] text-white"
            style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "1px" }}>
                Your intelligent travel assistant, helping you craft unique,
                budget-friendly itineraries based on your interests, time, and dream
                destinations.
            </h6>
            <Link to={"/create-trip"}>
                <Button className="mb-4" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "1px", backgroundColor: "#EEEFE0", color: "black" }}>
                    <span style={{ fontWeight: "bold" }}>Get Started, It's Free</span>
                </Button>
            </Link>
        </div>
    </div>
);
}

export default Hero;