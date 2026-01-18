"use client";
import React from "react";

type BoxComponentProps = {
    children?: React.ReactNode;
    style?: string;
};

export default function BoxComponent({ children, style = "" }: BoxComponentProps) {
    return (
        <div
            className={` p-5  bg-white/1 border border-white/10 rounded-full backdrop-blur-sm shadow-lg ${style}`}
        >
            {children}
        </div>
    );
}
