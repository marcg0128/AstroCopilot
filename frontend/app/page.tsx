"use client"; // unbedingt am Anfang

import { useEffect, useState } from "react";

export default function Home() {
  const [background, setBackground] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/background") // FastAPI-URL
      .then((res) => res.json())
      .then((data) => setBackground(data.background))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#fff", padding: "20px" }}>Hallo Welt!</h1>
    </div>
  );
}
