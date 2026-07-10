"use client";
import React, { useRef, useEffect, useState } from "react";

type BoxComponentProps = {
    children?: React.ReactNode;
    style?: string;
    padding?: string;
};

export default function GlassBoxComponent({ children, style = "" , padding = "5"}: BoxComponentProps) {
    const boxRef = useRef<HTMLDivElement>(null);
    const [roundedClass, setRoundedClass] = useState("rounded-full");

    useEffect(() => {
        const updateRadius = () => {
            if (boxRef.current) {
                const height = boxRef.current.offsetHeight;

                setRoundedClass(height < 100 ? "rounded-full" : "rounded-[28px]");
            }
        };

        updateRadius();

        // Observer für Größenänderungen
        const resizeObserver = new ResizeObserver(updateRadius);
        if (boxRef.current) {
            resizeObserver.observe(boxRef.current);
        }

        return () => resizeObserver.disconnect();
    }, [children]);

    return (
        <div
            ref={boxRef}
            className={`p-${padding}  bg-white/1 border border-white/10  ${roundedClass} backdrop-blur-sm  shadow-lg ${style}`}
        >
            {children}
        </div>
    );
}