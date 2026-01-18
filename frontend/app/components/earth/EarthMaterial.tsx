import * as THREE from "three";
import React from "react";
import { useLoader } from "@react-three/fiber";

const defaultSunDirection = new THREE.Vector3(-2, 0.5, 1.5).normalize();

function EarthMaterial({ sunDirection = defaultSunDirection }) {
  // Hooks müssen direkt in der Komponente aufgerufen werden
  // Pfade angepasst an deine public-Struktur (Beispielnamen basierend auf deinem Projekt-View)
  const map = useLoader(THREE.TextureLoader, "/earth_daymap.jpg");
  
  // Hinweis: Stelle sicher, dass diese Dateien wirklich in public/ existieren:
  const nightMap = useLoader(THREE.TextureLoader, "/earth_nightmap.jpg");
  const cloudsMap = useLoader(THREE.TextureLoader, "/earth_clouds.jpg");

  const uniforms = React.useMemo(() => ({
    dayTexture: { value: map },
    nightTexture: { value: nightMap },
    cloudsTexture: { value: cloudsMap },
    sunDirection: { value: sunDirection },
  }), [map, nightMap, cloudsMap]);

  // Update der Sun-Direction, falls sie sich ändert
  React.useEffect(() => {
    uniforms.sunDirection.value = sunDirection;
  }, [sunDirection, uniforms]);

  const vs = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform sampler2D elevTexture;

    void main() {
      // Position
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * viewMatrix * modelPosition;

      // Model normal
      vec3 modelNormal = (modelMatrix * vec4(normal, 0.0)).xyz;

      // Varyings
      vUv = uv;
      vNormal = modelNormal;
      vPosition = modelPosition.xyz;
    }
  `;

  const fs = `
    uniform sampler2D dayTexture;
    uniform sampler2D nightTexture;
    uniform sampler2D cloudsTexture;
    uniform vec3 sunDirection;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vec3 viewDirection = normalize(vPosition - cameraPosition);
      vec3 normal = normalize(vNormal);
      
      // Sun orientation
      float sunOrientation = dot(sunDirection, normal);
      
      // Day / night color
      float dayMix = smoothstep(-0.25, 0.5, sunOrientation);
      vec3 dayColor = texture2D(dayTexture, vUv).rgb;
      vec3 nightColor = texture2D(nightTexture, vUv).rgb;
      
      vec3 color = mix(nightColor, dayColor, dayMix);
      
      // Clouds
      vec3 cloudsColor = texture2D(cloudsTexture, vUv).rgb;
      float cloudsMix = smoothstep(0.0, 1.0, cloudsColor.g);
      cloudsMix *= dayMix; // Wolken im Schatten verbergen
      color = mix(color, vec3(1.0), cloudsMix);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  return (
    <shaderMaterial
      uniforms={uniforms}
      vertexShader={vs}
      fragmentShader={fs}
    />
  );
}

export default EarthMaterial;