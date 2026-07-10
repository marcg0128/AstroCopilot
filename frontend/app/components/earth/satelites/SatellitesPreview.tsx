import { useEffect, useState, useRef } from "react";
import { getPreviewSatellitesData } from "@/app/api";
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export default function SatellitesPreview({ radius }: { radius: number }) {
    const [satellites, setSatellites] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                console.log("Satelliten werden geladen...");
                const satellitesData = await getPreviewSatellitesData();

                if (satellitesData && typeof satellitesData === 'object') {
                    const satellitesArray = Object.entries(satellitesData).map(([id, data]: [string, any]) => {
                            let parsedPath = data.path;
                            
                            // Falls der Pfad ein String ist (wegen der doppelten Serialisierung), parsen wir ihn
                            if (typeof data.path === 'string') {
                                try {
                                    parsedPath = JSON.parse(data.path);
                                } catch (e) {
                                    console.error("Fehler beim Parsen des Pfades für Satellit", id, e);
                                    parsedPath = [];
                                }
                            }

                            return {
                                id,
                                name: data.name,
                                lat: data.lat,
                                lon: data.lon,
                                height: data.height,
                                path: parsedPath
                            };
                        });
                        console.log("Satelliten geladen:", satellitesArray);
                        setSatellites(satellitesArray);
                    }
            } catch (error) {
                console.error("Fehler beim Laden der Satelliten:", error);
            } finally {
                setLoading(false);
            }
        })();

    }, []);

    if (loading) return null;

    // ... (States und useEffect wie bisher, stelle sicher, dass 'path' geladen wird)
    // Angenommen satellitesArray enthält nun: { id, name, lat, lon, height, path: [{lat, lon, height}, ...] }


    return (
        <>
            {satellites.map((satellite) => (
                <group key={satellite.id}>
                    {satellite.path && (
                        <OrbitPath pathData={satellite.path} radius={radius} />
                    )}
                    <SatellitePoint
                        latitude={satellite.lat}
                        longitude={satellite.lon}
                        height={satellite.height}
                        radius={radius}
                        name={satellite.name}
                    />
                </group>
            ))}
        </>
    );
}

function OrbitPath({ pathData, radius }: { pathData: any[], radius: number }) {
    const points = pathData.map(pos => {
        // Gleiche Umrechnungslogik wie beim SatellitePoint
        const phi = (90 - pos.lat) * (Math.PI / 180);
        const theta = (pos.lon + 180) * (Math.PI / 180);
        
        // Nutze den Basis-Radius der Erde für die Linie (oder leicht darüber)
        const x = -(radius * Math.sin(phi) * Math.cos(theta));
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        
        return new THREE.Vector3(x, y, z);
    });

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    return (
        <line geometry={geometry}>
            <lineBasicMaterial color="#44ff44" transparent opacity={0.3} />
        </line>
    );
}

function SatellitePoint({
    latitude,
    longitude,
    height,
    radius,
    name
}: {
    latitude: number;
    longitude: number;
    height: number;
    radius: number;
    name: string;
}) {
    const groupRef = useRef<THREE.Group>(null!);
    const pulseGroupRef = useRef<THREE.Group>(null!);
    console.log(`Rendering satellite: ${name} at lat: ${latitude}, lon: ${longitude}, height: ${height}`);


    // Berechne die Position auf dem Globus
    // Addiere die Höhe zum Radius für Satelliten
    const actualRadius = radius; // Skaliere die Höhe nach Bedarf

    const phi = (90 - latitude) * (Math.PI / 180);
    const theta = (longitude + 180) * (Math.PI / 180);

    const x = -(actualRadius * Math.sin(phi) * Math.cos(theta));
    const y = actualRadius * Math.cos(phi);
    const z = actualRadius * Math.sin(phi) * Math.sin(theta);

    return (
        <group position={[x, y, z]} ref={groupRef}>
            {/* Kern-Punkt für Satellit */}
            <mesh>
                <sphereGeometry args={[0.015, 16, 16]} />
                <meshBasicMaterial color="#ff6600" />
            </mesh>

            {/* Gruppe für die pulsierenden Ebenen */}
            <group ref={pulseGroupRef}>
                {[0, 1, 2].map((i) => (
                    <mesh key={i}>
                        <circleGeometry args={[0.02, 32]} />
                        <meshBasicMaterial
                            color="#ff6600"

                            opacity={0}
                            depthWrite={false}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                ))}
            </group>
        </group>
    );
}