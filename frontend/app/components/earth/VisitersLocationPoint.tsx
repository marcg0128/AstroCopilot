"use client";
import React, { useEffect, useState, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface GeoData {
    latitude: number;
    longitude: number;
}

export default function VisitersLocationPoint({ radius }: { radius: number }) {
    const [geoInfo, setGeoInfo] = useState<GeoData | null>(null);
    const groupRef = useRef<THREE.Group>(null!);
    const pulseGroupRef = useRef<THREE.Group>(null!);

    useEffect(() => {
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(setGeoInfo)
            .catch(console.error);
    }, []);

    useFrame(({ clock }) => {
        if (!pulseGroupRef.current || !groupRef.current) return;

        const t = clock.getElapsedTime();
        groupRef.current.lookAt(0, 0, 0);


        pulseGroupRef.current.children.forEach((child, i) => {
            const mesh = child as THREE.Mesh;
            const mat = mesh.material as THREE.MeshBasicMaterial;
            
            const speed = 1.0;

            const progress = (t * speed + i / pulseGroupRef.current.children.length) % 1;


            mesh.position.z = -progress * 0.2; 


            const s = 0.5 + progress * 2.0;
            mesh.scale.set(s, s, 1);

            mat.opacity = (1 - progress) * 0.8;
        });
    });

    if (!geoInfo) return null;

    const { latitude, longitude } = geoInfo;
    const phi = (90 - latitude) * (Math.PI / 180);
    const theta = (longitude + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return (
        <group position={[x, y, z]} ref={groupRef}>
            {/* Kern-Punkt direkt auf der Oberfläche */}
            <mesh>
                <sphereGeometry args={[0.015, 16, 16]} />
                <meshBasicMaterial color="#00ffaa" />
            </mesh>

            {/* Gruppe für die pulsierenden Ebenen */}
            <group ref={pulseGroupRef}>
                {[0, 1, 2].map((i) => (
                    <mesh key={i}>
                        <circleGeometry args={[0.02, 32]} />
                        <meshBasicMaterial 
                            color="#00ffaa" 
                            transparent={true} 
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