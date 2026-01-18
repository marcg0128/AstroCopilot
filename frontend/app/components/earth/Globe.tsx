"use client";
import * as THREE from 'three';
import React from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import AtmosphereMesh from './AtmosphereMesh';
import EarthMaterial from './EarthMaterial';
import VisitersLocationPoint from "@/app/components/earth/VisitersLocationPoint";

const sunDirection = new THREE.Vector3(-2, 0.5, 1.5);

function EarthMesh() {
    const ref = React.useRef<THREE.Mesh>(null!);
    const map = useLoader(THREE.TextureLoader, '/earth_daymap.jpg');

    useFrame(() => {
        if (ref.current) {

            ref.current.rotation.y += 0.0005;
        }
    });

    const radius = 1;

    return (
        <group rotation-z={THREE.MathUtils.degToRad(-23.5)}>
            <mesh ref={ref}>

                <sphereGeometry args={[1, 32, 32]} />
                <EarthMaterial sunDirection={sunDirection} />
                <VisitersLocationPoint radius={1.01} />
            </mesh>
            <AtmosphereMesh radius={radius * 1.02}/>
        </group>

    );
}

export default function Globe() {
    const { x, y, z } = sunDirection;
    return (
        <Canvas 
            camera={{ fov: 30 }} // Standard ist meist 75, kleinerer Wert = mehr Zoom
            style={{ height: '70vh', width: '70vh' }}
        >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <EarthMesh />
            <OrbitControls enableZoom={false} />
            <directionalLight position={[x,y,z]} intensity={1} />
        </Canvas>
    );
}