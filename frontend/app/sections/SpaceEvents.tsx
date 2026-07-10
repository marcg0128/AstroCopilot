"use client";

import GlassBoxComponent from "@/app/components/GlassBoxComponent";
import { ButtonPrimary } from "@/app/components/Button";

import { useState, useRef, useEffect } from "react";

type SpaceEvent = {
    id: string;
    name: string;
    emoji: string;
    description: string;
    nextDate: string;
    duration: string;
    visibility: string;
};

export default function SpaceEvents() {
    const [selectedEvent, setSelectedEvent] = useState<string>("lunar_eclipse");
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const events: SpaceEvent[] = [
        {
            id: "lunar_eclipse",
            name: "Lunar Eclipse",
            emoji: "🌕",
            description:
                "A lunar eclipse occurs when the Earth passes between the Sun and the Moon, casting its shadow across the lunar surface. During a total eclipse the Moon can take on a deep reddish hue, earning it the name “Blood Moon”.",
            nextDate: "August 28, 2026",
            duration: "≈ 3h 21m",
            visibility: "Americas, Europe & Africa",
        },
        {
            id: "solar_eclipse",
            name: "Solar Eclipse",
            emoji: "🌑",
            description:
                "A solar eclipse happens when the Moon moves between the Earth and the Sun, blocking all or part of the Sun's light. A total solar eclipse briefly turns day into night and reveals the Sun's glowing corona.",
            nextDate: "August 12, 2026",
            duration: "≈ 2m 18s totality",
            visibility: "Greenland, Iceland & Spain",
        },
        {
            id: "planet_alignment",
            name: "Planet Alignment",
            emoji: "🪐",
            description:
                "A planetary alignment is when several planets appear grouped together on the same side of the Sun as seen from Earth. These rare arrangements let observers spot multiple planets across the sky in a single night.",
            nextDate: "February 28, 2027",
            duration: "Visible for several nights",
            visibility: "Worldwide, just after sunset",
        },
    ];

    const activeEvent =
        events.find((event) => event.id === selectedEvent) ?? events[0];

    useEffect(() => {
        const updateIndicator = () => {
            if (containerRef.current) {
                const activeElement = containerRef.current.querySelector(
                    `[data-event-id="${selectedEvent}"]`
                ) as HTMLElement;
                
                if (activeElement) {
                    const containerRect = containerRef.current.getBoundingClientRect();
                    const elementRect = activeElement.getBoundingClientRect();
                    
                    setIndicatorStyle({
                        left: elementRect.left - containerRect.left,
                        width: elementRect.width,
                    });
                }
            }
        };

        updateIndicator();
        window.addEventListener('resize', updateIndicator);
        return () => window.removeEventListener('resize', updateIndicator);
    }, [selectedEvent]);

    return (
        <div className="mt-50">
            <GlassBoxComponent style=" p-8 relative z-10 rounded-4xl">
                <h1 className=" text-3xl font-bold text-(--text-primary)">Space Events</h1>

               <div 
                   ref={containerRef}
                   className="relative flex mt-10 justify-around pb-5
                   after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0
                   after:h-0.75 after:bg-white/10">
                   {events.map((event) => (
                          <div
                                key={event.id}
                                data-event-id={event.id}
                                className={`z-10 px-5 py-2 cursor-pointer font-semibold text-xl transition-colors duration-300 ${
                                    selectedEvent === event.id
                                        ? "text-(--text-primary) font-semibold"
                                        : "text-(--text-muted)/70 hover:text-(--text-primary)"
                                }`}
                                onClick={() => setSelectedEvent(event.id)}>
                                {event.name}
                          </div>
                     )
                   )}
                   
                   <span 
                       className="absolute bottom-0 h-0.5 bg-(--text) transition-all duration-300 ease-out z-20"
                       style={{
                           left: `${indicatorStyle.left}px`,
                           width: `${indicatorStyle.width}px`,
                       }}
                   />
                </div>

                <div key={activeEvent.id} className="mt-10 flex gap-10 animate-in fade-in duration-500">
                    <div className="flex items-center justify-center shrink-0">
                        <div className="flex h-40 w-40 items-center justify-center rounded-full border border-white/10 bg-white/5 text-7xl shadow-lg">
                            {activeEvent.emoji}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <h2 className="text-2xl font-semibold text-(--text-primary)">
                            {activeEvent.name}
                        </h2>
                        <p className="mt-4 max-w-2xl text-(--text-muted)/80 leading-relaxed">
                            {activeEvent.description}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3">
                                <p className="text-xs uppercase tracking-wider text-(--text-muted)/60">
                                    Next Occurrence
                                </p>
                                <p className="mt-1 font-semibold text-(--text-primary)">
                                    {activeEvent.nextDate}
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3">
                                <p className="text-xs uppercase tracking-wider text-(--text-muted)/60">
                                    Duration
                                </p>
                                <p className="mt-1 font-semibold text-(--text-primary)">
                                    {activeEvent.duration}
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3">
                                <p className="text-xs uppercase tracking-wider text-(--text-muted)/60">
                                    Visibility
                                </p>
                                <p className="mt-1 font-semibold text-(--text-primary)">
                                    {activeEvent.visibility}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <ButtonPrimary>Explore more</ButtonPrimary>
                        </div>
                    </div>
                </div>
            </GlassBoxComponent>

        </div>
    );
}