"use client";
import React, { useRef, useEffect, useState } from "react";

type BoxComponentProps = {
    children?: React.ReactNode;
    style?: string;
};

export default function BoxComponent({ children, style = "" }: BoxComponentProps) {
    const boxRef = useRef<HTMLDivElement>(null);
    const [roundedClass, setRoundedClass] = useState("rounded-full");

    useEffect(() => {
        const updateRadius = () => {
            if (boxRef.current) {
                const height = boxRef.current.offsetHeight;
                // Wenn die Höhe unter 100px ist, rounded-full, sonst rounded-4xl
                setRoundedClass(height < 100 ? "rounded-full" : "rounded-4xl");
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
            className={`p-5 bg-white/1 border border-white/10 ${roundedClass} backdrop-blur-sm shadow-lg ${style}`}
        >
            {children}
        </div>
    );
}