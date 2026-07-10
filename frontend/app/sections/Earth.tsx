"use client";
import GlassBoxComponent from "@/app/components/GlassBoxComponent";
import Globe from "@/app/components/earth/Globe";

import {useState} from "react";
import Image from "next/image";
import {ButtonPrimary} from "@/app/components/Button";


function ToggleSatelliteView() {
    const state = {
        on: "w-lan.svg",
        off: "no-wlan.svg",
        loading: "wlan-xmark.svg"
    };


    const [isSatelliteView, setIsSatelliteView] = useState<"on" | "off" | "loading">("on");

    return (
        <GlassBoxComponent style=" flex justify-center items-center cursor-pointer  h-16 w-16 p-0">
            <Image
                src={`/icons/${state[isSatelliteView]}`}
                alt="Toggle Satellite View"
                width={50}
                height={50}
                onClick={() => {
                    setIsSatelliteView(isSatelliteView === "on" ? "off" : "on");
                }}
            />


        </GlassBoxComponent>
    );
}

export default function Earth() {
    return (
        <div>
            <GlassBoxComponent style=" p-8 relative z-10 rounded-4xl">
                <div className="mb-8 flex justify-between">
                    <h1 className=" text-3xl font-bold text-(--text-primary)">Earth Satellites</h1>
                    <div>
                        <ToggleSatelliteView/>
                    </div>
                </div>
                <div className="flex justify-around  items-center">
                    <div>

                    </div>
                    <Globe></Globe>
                </div>
                <div className="absolute bottom-10 left-15">
                    <ButtonPrimary onClick={() => {
                        window.location.href = '/satellites';
                    }}>
                        Explore more
                    </ButtonPrimary>
                </div>

            </GlassBoxComponent>
        </div>

    );
}