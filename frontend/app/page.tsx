"use client";

import { useEffect, useState, useRef } from "react";
import Cards from "@/components/Cards";

export default function Home() {
      const [background, setBackground] = useState("");
      const [scrolled, setScrolled] = useState(false);
      const [scrolled2, setScrolled2] = useState(false);

      const firstDivRef = useRef(null);
      const secondDivRef = useRef(null);

      useEffect(() => {
        fetch("http://localhost:8000/background")
          .then((res) => res.json())
          .then((data) => setBackground(data.background))
          .catch((err) => console.error(err));
      }, []);

      useEffect(() => {
          const handleScroll = () => {
            if (firstDivRef.current && secondDivRef.current) {
              const rect1 = firstDivRef.current.getBoundingClientRect();
              const rect2 = secondDivRef.current.getBoundingClientRect();

              if (rect1.bottom <= rect1.height / 10) {
                setScrolled(true);
              }

              if (rect2.top >= window.innerHeight - 200) {
                setScrolled(false);
              }

              if (rect1.bottom <= 0) {
                setScrolled2(true);
              }

              if (rect1.bottom >= 100) {
                setScrolled2(false);
              }
            }
          };

          window.addEventListener("scroll", handleScroll);
          return () => window.removeEventListener("scroll", handleScroll);
        }, []);

      type NasaItem = {
          url: string;
          title: string;
          explanation: string;
      };

      const [lastThree, setLastThree] = useState<NasaItem[]>([]);

      useEffect(() => {
          fetch("http://localhost:8000/lastthree")
            .then((res) => res.json())
            .then((data) => setLastThree(data.lastthree))
            .catch((err) => console.error(err));
      }, []);

      const [activeItem, setActiveItem] = useState('Planeten');

      const navItems = [
        { name: 'Planeten', icon: '🪐' },
        { name: 'Galaxien', icon: '🌌' },
        { name: 'Sterne', icon: '⭐' },
        { name: 'Missionen', icon: '🚀' },
        { name: 'Entdeckungen', icon: '🔭' }
      ];

      // Mouse-Follow Handler
      const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
      };

      return (
        <>
          {/* CSS für Mouse-Follow Effekt */}
          <style jsx>{`
            .mouse-follow-bg::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: radial-gradient(
                circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                rgba(249, 115, 22, 0.4) 0%, 
                rgba(234, 88, 12, 0.2) 40%, 
                transparent 70%
              );
              opacity: 0;
              transition: opacity 0.3s ease;
              border-radius: inherit;
            }
            
            .mouse-follow-bg:hover::before {
              opacity: 1;
            }
          `}</style>

          <main>
            <div
              ref={firstDivRef}
              className="relative flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${background})`,
              }}
            >
              <h1
                className={`font-bold fixed transition-all duration-500 z-20 ${
                  scrolled
                    ? "top-5 left-5 text-3xl transform-none"
                    : "top-1/4 left-1/2 -translate-x-1/2 text-9xl absolute"
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
              className="relative flex flex-col justify-start items-center min-h-screen bg-cover bg-center bg-no-repeat"
            >
              <nav
                  className={`fixed top-0 left-0 w-full flex justify-center items-center z-10 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#171717] ${
                    scrolled2 ? "h-20 drop-shadow-[0_4px_6px_rgba(249,115,22,0.8)]" : "hidden"
                  } transition-all duration-500 ease-out`}
                >
                  <div className="flex items-center space-x-2 px-6">
                    {navItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => setActiveItem(item.name)}
                        onMouseMove={activeItem !== item.name ? handleMouseMove : undefined}
                        className={`group relative flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out transform hover:-translate-y-1 hover:scale-105 ${
                          activeItem === item.name
                            ? 'bg-gradient-to-r from-[#f97316] to-orange-600 text-white shadow-lg shadow-orange-500/30 scale-105'
                            : 'text-gray-300 hover:text-white hover:shadow-lg hover:shadow-orange-500/20 mouse-follow-bg overflow-hidden'
                        }`}
                      >
                        <span className={`text-lg transition-all duration-300 relative z-10 ${
                          activeItem !== item.name ? 'group-hover:scale-110' : ''
                        }`}>
                          {item.icon}
                        </span>
                        <span className="relative z-10">
                          {item.name}
                        </span>

                        {/* Aktiver Indikator mit Puls-Animation */}
                        {activeItem === item.name && (
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 z-20">
                            <div className="w-2 h-2 bg-white rounded-full shadow-lg animate-pulse"></div>
                            <div className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full animate-ping opacity-75"></div>
                          </div>
                        )}

                        {/* Hover Indikator für nicht-aktive Items */}
                        {activeItem !== item.name && (
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#f97316] to-orange-600 group-hover:w-8 transition-all duration-300"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </nav>

              <div className="w-full max-w-6xl px-4 mb-10 top-100">
                <div className="relative top-40 mb-40">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                    Entdecke das Universum
                  </h2>

                  {/* Dekorative Bar */}
                  <div className="relative h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full">
                    <div className="absolute -top-1 -right-2 w-3 h-3 bg-white rounded-full shadow-lg"></div>
                  </div>

                  <p className="text-lg text-gray-300 mt-6 max-w-2xl">
                    Die neuesten Bilder und Entdeckungen aus dem Weltraum - direkt von der NASA
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 p-4 mt-20">
                {lastThree.map((item, idx) => (
                    <Cards
                      key={idx}
                      props={{
                        imageUrl: item.url,
                        title: item.title,
                        description: item.explanation,
                      }}
                    />
                ))}
              </div>
            </div>
          </main>
        </>
      );
}