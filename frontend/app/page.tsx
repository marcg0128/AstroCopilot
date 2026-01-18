import NavBar from "@/app/components/NavBar";
import Galaxy from "@/components/Galaxy";


export default function Home() {
    return (
        <>
            <div className="w-full h-screen relative overflow-hidden">
                <div className="relative z-10">
                    <NavBar/>
                </div>
                <div className="absolute inset-0 z-0">
                    <Galaxy
                        starSpeed={0.5}
                        density={0.7}
                        hueShift={0}
                        speed={0.1}
                        glowIntensity={0.2}
                        saturation={0.25}
                        mouseRepulsion={false}
                        repulsionStrength={2}
                        twinkleIntensity={0.3}
                        rotationSpeed={0.1}
                        transparent={false}
                    />
                </div>
            </div>
        </>
    );
}