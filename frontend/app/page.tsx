"use client";

import { useEffect, useState, useRef } from "react";
import Cards from "@/components/Cards";

export default function Home() {
  const [background, setBackground] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const firstDivRef = useRef(null);
  const secondDivRef = useRef(null); // Ref für das zweite Div

  useEffect(() => {
    fetch("http://localhost:8000/background")
      .then((res) => res.json())
      .then((data) => setBackground(data.background))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (firstDivRef.current) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          const rect = firstDivRef.current.getBoundingClientRect();
        setScrolled(rect.bottom <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <main>
      <div
        ref={firstDivRef}
        className="relative flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${background})`,
        }}
      >
        <h1
          className={`font-bold fixed transition-all duration-500 ${
            scrolled
              ? "top-5 left-5 text-3xl transform-none"
              : "top-1/4 left-1/2 -translate-x-1/2 text-9xl"
          }`}
        >
          AstroCopilot
        </h1>

          <img
            src="/chevron-double-down.svg"
            alt="SVG Bild"
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-10 h-auto cursor-pointer"
            style={{ filter: "invert(1)" }}
            onClick={() => {
                if (secondDivRef.current) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                    secondDivRef.current.scrollIntoView({ behavior: "smooth" });
                }
              }}
          />

      </div>

      <div
        ref={secondDivRef}
        className="relative flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          <Cards
            props={{
              imageUrl: "https://via.placeholder.com/300",
              title: "Card 1",
              description: "This is the description for Card 1.",
            }}
          />

        </div>
      </div>
    </main>
  );
}
