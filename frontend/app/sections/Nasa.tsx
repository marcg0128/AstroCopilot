"use client";
import { getNasaImageOfTheDay } from "@/app/api";
import { useEffect, useState } from "react";
import GlassBoxComponent from "@/app/components/GlassBoxComponent";
import {ButtonPrimary} from "@/app/components/Button";

export default function Nasa() {
    const [nasaImageData, setNasaImageData] = useState<Array<>>(null);

    useEffect(() => {
        (async () => {
            try {

                const data = await getNasaImageOfTheDay();
                console.log(data);

                setNasaImageData(data);
            } catch (error) {
                console.error("Error fetching NASA image of the day:", error);
            }})
        ();
    }, []);


    if (!nasaImageData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <GlassBoxComponent style=" p-8 relative z-10 rounded-4xl mt-50">
                <h1 className=" text-3xl font-bold text-(--text-primary)">Picture of Today</h1>

                <div className="flex justify-center mt-10">

                    <div>
                        <img
                            src={nasaImageData.url}
                            alt={nasaImageData.title}
                            className="max-w-full h-auto rounded-3xl border border-white/30 shadow-lg"
                        />
                    </div>
                    <div className="flex flex-col ml-8 w-[50%]">
                        <h2 className="text-2xl font-semibold ">{nasaImageData.title}</h2>
                        <p className="mt-2 text-(--text-muted)/70">{nasaImageData.date}</p>
                        <div className="mt-7">
                            {nasaImageData.explanation}
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-10 right-15">



                </div>
            </GlassBoxComponent>
        </div>

    );
}