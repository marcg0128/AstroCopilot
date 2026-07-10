import NavBar from "@/app/components/NavBar";
import Galaxy from "@/components/Galaxy";
import Earth from "@/app/sections/Earth";
import Start from "@/app/sections/Start";
import Nasa from "@/app/sections/Nasa";
import SpaceEvents from "@/app/sections/SpaceEvents";


export default function Home() {
    return (
        <>
            <div className="w-full min-h-screen relative">
                <div className=" z-50 sticky top-0">
                    <NavBar/>
                </div>
                <div className="fixed inset-0 z-0">
                    <Galaxy
                        starSpeed={0.5}
                        density={0.9}
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

                <div className="px-30 z-40 relative">
                    <Start/>

                    <div >
                        <Earth/>
                    </div>
                    <div>
                        <Nasa/>
                    </div>
                    <div>
                        <SpaceEvents/>
                    </div>

                </div>
                <div className="mt-200">
                    asd
                </div>

            </div>
        </>
    );
}