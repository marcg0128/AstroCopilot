"use client";
import BoxComponent from "./BoxComponent";
import Globe from "./earth/Globe";

import {useState} from "react";
import Image from "next/image";


function ToggleSatelliteView() {
    const state = {
        on: "w-lan.svg",
        off: "no-wlan.svg",
        loading: "wlan-xmark.svg"
    };


    const [isSatelliteView, setIsSatelliteView] = useState<"on" | "off" | "loading">("on");

    return (
        <BoxComponent style=" flex justify-center items-center cursor-pointer  h-16 w-16 p-0">
            <Image
                src={`/icons/${state[isSatelliteView]}`}
                alt="Toggle Satellite View"
                width={50}
                height={50}
                onClick={() => {
                    setIsSatelliteView(isSatelliteView === "on" ? "off" : "on");
                }}
            />


        </BoxComponent>
    );
}

export default function Earth() {
    return (
        <div>
            <BoxComponent style=" p-8 relative z-10 rounded-4xl">
                <div className="mb-8 flex justify-between">
                    <h1 className=" text-3xl font-bold text-(--text-primary)">Earth</h1>
                    <div>
                        <ToggleSatelliteView/>
                    </div>
                </div>
                <div className="flex justify-around  items-center">
                    <div>

                    </div>
                    <Globe></Globe>
                </div>

            </BoxComponent>
        </div>

    );
}