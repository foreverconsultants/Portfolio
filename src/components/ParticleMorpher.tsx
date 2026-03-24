"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { textToPoints, infinityToPoints, sphereToPoints, graphToPoints, heartToPoints } from "@/utils/textToPoints";

const PARTICLE_COUNT = 2500;

const MORPH_SECTIONS = [
  { label: "infinity" },       // hero → ∞
  { label: "lic" },             // LIC → Sphere
  { label: "mutual-funds" },    // Mutual Funds → Graph
  { label: "health" },          // Health → Heart
];

/* ── Same colors for all sections ────────────────────────────── */
const COLOR_BASE = "#2563EB";     // Royal Blue
const COLOR_TERTIARY = "#8B5CF6"; // Purple
const COLOR_GLOW = "#06B6D4";     // Cyan


/* ─────────────────────────────────────────────────────────────── */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uMorph;          // 0→1 current morph progress
  uniform float uIsInfinityFrom; // 1.0 if 'from' shape is infinity, else 0.0
  uniform float uIsInfinityTo;   // 1.0 if 'to' shape is infinity, else 0.0
  uniform float uIsGraph;        // 1.0 if shape is graph
  uniform float uIsHeart;        // 1.0 if shape is heart
  uniform vec2 uMouse;           // Mouse position in normalized device coordinates

  attribute vec3 aPositionFrom;  // current shape positions
  attribute vec3 aPositionTo;    // next shape positions
  attribute float aPhase;
  attribute vec3 aRandOffset;
  attribute float aSize;
  attribute float aSpeed;

  varying float vPhase;
  varying float vAlpha;
  varying float vPosY;

  void main() {
    // Morph interpolation with scatter at midpoint
    float t = uMorph;

    vec3 posFrom = aPositionFrom + aRandOffset * 0.12;
    vec3 posTo   = aPositionTo   + aRandOffset * 0.12;

    // Add gentle orbital motion
    float drift = uTime * aSpeed + aPhase;
    
    // Calculate animated infinity position
    float sinT = sin(drift);
    float cosT = cos(drift);
    float denom = 1.0 + sinT * sinT;
    float infX = 2.6 * cosT / denom;
    float infY = 2.6 * sinT * cosT / denom;
    vec3 animatedInfinityFrom = vec3(infX, infY, 0.0) + aRandOffset;
    vec3 animatedInfinityTo = vec3(infX, infY, 0.0) + aRandOffset;
    
    // Mix the original "from/to" with the animated infinity based on a "isInfinity" uniform
    vec3 actualPosFrom = mix(posFrom, animatedInfinityFrom, uIsInfinityFrom);
    vec3 actualPosTo = mix(posTo, animatedInfinityTo, uIsInfinityTo);

    vec3 pos = mix(actualPosFrom, actualPosTo, t);

    // --- GRAPH DRAWING EFFECT ---
    float drawProgress = fract(uTime * 0.15); // Loops every ~6.6s
    float currentDrawX = mix(-2.5, 2.5, drawProgress);
    float reveal = smoothstep(currentDrawX + 0.15, currentDrawX - 0.15, pos.x);
    
    float baseline = -1.25; 
    pos.y = mix(pos.y, baseline, (1.0 - reveal) * uIsGraph);
    pos.z = mix(pos.z, 0.0, (1.0 - reveal) * uIsGraph);
    
    // --- SOFT BREATHING HEART ---
    // Soft, continuous breathing only (no aggressive pulsing/heartbeat)
    float softBreath = sin(uTime * 1.5) * 0.06; 
    
    float heartScale = 1.0 + softBreath;
    pos *= mix(1.0, heartScale, uIsHeart);
    // ----------------------------

    vPosY = pos.y;

    // Add scatter during transition (t is morph progress from 0..1)
    // Only scatter if transitioning (morph > 0.01 and < 0.99)
    float scatter = sin(t * 3.14159) * 0.6;
    pos += aRandOffset * scatter;

    // Add orbital drift if NOT infinity (infinity already moves along curve)
    float isNotInfinityFully = 1.0 - (mix(uIsInfinityFrom, uIsInfinityTo, t));
    vec3 orbit = vec3(
      sin(drift) * 0.04,
      cos(drift * 0.7) * 0.04,
      sin(drift * 1.3) * 0.02
    );
    pos += orbit * isNotInfinityFully;

    // Mouse interaction - repel particles from mouse position
    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vec2 mouseWorld = uMouse * 5.0; // Scale mouse to world space
    float distToMouse = distance(worldPos.xy, mouseWorld);
    float repelStrength = smoothstep(2.0, 0.0, distToMouse);
    vec2 repelDir = normalize(worldPos.xy - mouseWorld);
    pos.xy += repelDir * repelStrength * 0.3;

    vPhase = mod(aPhase + uTime * aSpeed, 6.28318) / 6.28318;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * uPixelRatio * (70.0 / -mvPos.z);
    gl_Position = projectionMatrix * mvPos;

    vAlpha = smoothstep(16.0, 4.0, -mvPos.z);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorBase;
  uniform vec3 uColorGlow;
  uniform vec3 uColorTertiary;
  uniform float uTime;
  uniform float uIsGraph;

  varying float vPhase;
  varying float vAlpha;
  varying float vPosY;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha = pow(alpha, 1.8);

    vec3 baseCol;
    if (vPhase < 0.333) {
      baseCol = mix(uColorBase, uColorTertiary, vPhase * 3.0);
    } else if (vPhase < 0.666) {
      baseCol = mix(uColorTertiary, uColorGlow, (vPhase - 0.333) * 3.0);
    } else {
      baseCol = mix(uColorGlow, uColorBase, (vPhase - 0.666) * 3.0);
    }

    float g = smoothstep(-1.5, 1.5, vPosY);
    vec3 lightestBlue = vec3(0.8, 0.95, 1.0);
    vec3 graphCol = mix(lightestBlue, uColorBase, g);
    vec3 color = mix(baseCol, graphCol, uIsGraph);

    float pulse = 0.9 + 0.1 * sin(uTime * 1.2 + vPhase * 6.28318);

    gl_FragColor = vec4(color * pulse, alpha * vAlpha * 0.88);
  }
`;

/* ─────────────────────────────────────────────────────────────── */

interface ParticleMorpherProps {
  currentSection: number;   // 0–3
  sectionProgress: number;  // 0–1 within current section
}

export default function ParticleMorpher({
  currentSection,
  sectionProgress,
}: ParticleMorpherProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert to normalized device coordinates (-1 to +1)
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /* ── Generate all morph targets once ──────────────────────── */
  const targets = useMemo(() => {
    const result: Float32Array[] = [];

    for (const section of MORPH_SECTIONS) {
      if (section.label === "infinity") {
        // Infinity curve
        result.push(infinityToPoints(PARTICLE_COUNT, 2.6, 0.14));
      } else if (section.label === "lic") {
        // Sphere representing protection/wholeness
        result.push(sphereToPoints(PARTICLE_COUNT, 1.8));
      } else if (section.label === "mutual-funds") {
        // Growing graph representing structured growth
        result.push(graphToPoints(PARTICLE_COUNT, 3.5, 3.0));
      } else if (section.label === "health") {
        // Hollow breathing heart representing health and living (made smaller per request)
        result.push(heartToPoints(PARTICLE_COUNT, 0.08, 0.20));
      }
    }
    return result;
  }, []);

  /* ── Build geometry and shader material ───────────────────── */
  const { geometry, uniforms, attributes } = useMemo(() => {
    const phases = new Float32Array(PARTICLE_COUNT);
    const randOffsets = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const speeds = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      phases[i] = (i / PARTICLE_COUNT) * Math.PI * 2;

      randOffsets[i * 3] = (Math.random() - 0.5) * 0.08;
      randOffsets[i * 3 + 1] = (Math.random() - 0.5) * 0.08;
      randOffsets[i * 3 + 2] = (Math.random() - 0.5) * 0.08;

      sizes[i] = Math.random() * 1.8 + 0.5;
      speeds[i] = 0.06 + Math.random() * 0.1;
    }

    const geo = new THREE.BufferGeometry();

    // Set initial positions from first target
    const posFrom = new THREE.BufferAttribute(
      new Float32Array(targets[0]),
      3
    );
    const posTo = new THREE.BufferAttribute(
      new Float32Array(targets[0]),
      3
    );

    geo.setAttribute("aPositionFrom", posFrom);
    geo.setAttribute("aPositionTo", posTo);
    geo.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    geo.setAttribute(
      "aRandOffset",
      new THREE.BufferAttribute(randOffsets, 3)
    );
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));

    // Dummy position attribute (required by Three.js)
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(PARTICLE_COUNT * 3), 3)
    );

    const u = {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uMorph: { value: 0 },
      uIsGraph: { value: 0 },
      uIsHeart: { value: 0 },
      uIsInfinityFrom: { value: 1.0 },
      uIsInfinityTo: { value: 1.0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorBase: { value: new THREE.Color(COLOR_BASE) },
      uColorTertiary: { value: new THREE.Color(COLOR_TERTIARY) },
      uColorGlow: { value: new THREE.Color(COLOR_GLOW) },
    };

    return {
      geometry: geo,
      uniforms: u,
      attributes: { posFrom, posTo },
    };
  }, [targets]);

  /* ── Track which section transition is "loaded" ──────────── */
  const loadedRef = useRef({ from: 0, to: 0 });

  /* ── Update targets when section changes ─────────────────── */
  useEffect(() => {
    const fromIdx = currentSection;
    const toIdx = Math.min(currentSection + 1, MORPH_SECTIONS.length - 1);

    if (
      loadedRef.current.from !== fromIdx ||
      loadedRef.current.to !== toIdx
    ) {
      const fromData = targets[fromIdx];
      const toData = targets[toIdx];

      const posFromAttr = attributes.posFrom;
      const posToAttr = attributes.posTo;

      for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
        (posFromAttr.array as Float32Array)[i] = fromData[i];
        (posToAttr.array as Float32Array)[i] = toData[i];
      }

      posFromAttr.needsUpdate = true;
      posToAttr.needsUpdate = true;

      loadedRef.current = { from: fromIdx, to: toIdx };
    }
  }, [currentSection, targets, attributes]);

  /* ── Per-frame animation loop ────────────────────────────── */
  useFrame((_state, delta) => {
    uniforms.uTime.value += delta;
    uniforms.uMorph.value = sectionProgress;
    uniforms.uMouse.value.set(mouse.x, mouse.y);

    // Pass flag if from/to is infinity
    uniforms.uIsInfinityFrom.value = loadedRef.current.from === 0 ? 1.0 : 0.0;
    uniforms.uIsInfinityTo.value = loadedRef.current.to === 0 ? 1.0 : 0.0;

    let isGraph = 0.0;
    if (loadedRef.current.from === 2 && loadedRef.current.to === 2) {
      isGraph = 1.0;
    } else if (loadedRef.current.to === 2) {
      isGraph = uniforms.uMorph.value;
    } else if (loadedRef.current.from === 2) {
      isGraph = 1.0 - uniforms.uMorph.value;
    }
    uniforms.uIsGraph.value = isGraph;

    let isHeart = 0.0;
    if (loadedRef.current.from === 3 && loadedRef.current.to === 3) {
      isHeart = 1.0;
    } else if (loadedRef.current.to === 3) {
      isHeart = uniforms.uMorph.value;
    } else if (loadedRef.current.from === 3) {
      isHeart = 1.0 - uniforms.uMorph.value;
    }
    uniforms.uIsHeart.value = isHeart;

    if (groupRef.current) {
      let targetX = 0;
      let targetY = 0;
      let targetScale = window.innerWidth < 768 ? 0.5 : 1.0;

      if (window.innerWidth >= 768) {
        if (currentSection === 0) {
          targetX = THREE.MathUtils.lerp(0, -viewport.width / 4, sectionProgress);
          // Shift the infinity logo up gently behind the title text by 0.3 units 
          targetY = THREE.MathUtils.lerp(0.3, 0, sectionProgress);
        } else {
          targetX = -viewport.width / 4;
          targetY = 0;
        }
      } else {
        // Mobile behavior
        targetScale = 0.55; // Squeeze significantly down to securely prevent mobile overflow
        if (currentSection === 0) {
          targetY = THREE.MathUtils.lerp(0.5, 0, sectionProgress);
        } else {
          targetY = 0;
        }
      }
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.1);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1));

      if (currentSection === 2) {
        // Face perfectly forward to readable graph
        const targetRot = Math.round(groupRef.current.rotation.y / (Math.PI * 2)) * Math.PI * 2;
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRot, 0.08);
      } else if (currentSection > 0) {
        groupRef.current.rotation.y += delta * 0.15; // Slow, majestic rotation
      } else {
        const targetRot = Math.round(groupRef.current.rotation.y / Math.PI) * Math.PI;
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRot, 0.05);
      }
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={geometry}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>
    </group>
  );
}
