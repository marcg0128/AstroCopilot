"use client";
import React from "react";
import Image from "next/image";
import BoxComponent from "@/app/components/BoxComponent";

export default function NavBar() {
    return (
        <nav className="m-0 flex px-30 justify-between h-[10vh] w-full items-center shadow-sm relative bg-transparent">
            <div className="flex-1">
                <h1 className="text-3xl font-bold text-(--text-primary)">
                    AstroCopilot
                </h1>
            </div>
            <BoxComponent style=" flex h-16 justify-center px-10  ">
                <ul className="flex justify-around gap-8 ">
                    <li className=" text-(--text) hover:text-(--text-muted) cursor-pointer transition">
                        Home
                    </li>
                    <li className=" text-(--text) hover:text-(--text-muted) cursor-pointer transition">
                        Earth
                    </li>
                    <li className=" text-(--text) hover:text-(--text-muted) cursor-pointer transition">
                        Nasa Pictures
                    </li>
                    <li className=" text-(--text) hover:text-(--text-muted) cursor-pointer transition">
                        About
                    </li>
                </ul>
            </BoxComponent>
            <div className="flex-1 flex justify-end ">
                <BoxComponent style="flex justify-center items-center h-16">
                    <a href={"https://github.com/marcg0128"} target={"_blank"}>
                        <Image
                            src="/icons/github.svg"
                            alt="Github"
                            width={35}
                            height={35}
                            className="rounded-full cursor-pointer"
                        />
                    </a>
                </BoxComponent>

            </div>
        </nav>
    );
}