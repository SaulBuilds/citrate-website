import { useEffect, useRef } from "react";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/anim";

interface Props {
  className?: string;
}

export default function NeuralNetBackground({ className }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = prefersReducedMotion();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 220;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Particles (points) using a small shader for soft circles
    const COUNT = 90;
    const positions = new Float32Array(COUNT * 3);
    const velocities: THREE.Vector3[] = [];
    const spread = 220;

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      velocities.push(new THREE.Vector3((Math.random() - 0.5) * 0.08, (Math.random() - 0.5) * 0.08, 0));
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const uniforms = {
      uColor: { value: new THREE.Color(1.0, 0.58, 0.0) }, // approx #FF9500
      uOpacity: { value: 0.18 },
      uSize: { value: 8.0 },
    };

    const vertexShader = `
      uniform float uSize;
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = uSize * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragShader = `
      uniform vec3 uColor;
      uniform float uOpacity;
      void main() {
        vec2 c = gl_PointCoord - vec2(0.5);
        float d = smoothstep(0.5, 0.0, length(c));
        gl_FragColor = vec4(uColor, uOpacity) * d;
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader: fragShader,
      transparent: true,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Line segments connecting nearby nodes
    const maxConnections = 6;
    const lineGeom = new THREE.BufferGeometry();
    const maxSegments = COUNT * maxConnections;
    const linePositions = new Float32Array(maxSegments * 2 * 3);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xff9500, opacity: 0.12, transparent: true });
    const lines = new THREE.LineSegments(lineGeom, lineMat);
    scene.add(lines);

    const onResize = () => {
      const { clientWidth, clientHeight } = mount;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(mount);
    onResize();

    const pos = geometry.attributes.position as THREE.BufferAttribute;

    const animate = () => {
      // Update particles
      if (!reduced) {
        for (let i = 0; i < COUNT; i++) {
          const ix = i * 3;
          positions[ix] += velocities[i].x;
          positions[ix + 1] += velocities[i].y;
          // Bounce softly
          if (Math.abs(positions[ix]) > spread * 0.5) velocities[i].x *= -1.0;
          if (Math.abs(positions[ix + 1]) > spread * 0.3) velocities[i].y *= -1.0;
        }
        pos.needsUpdate = true;

        // Rebuild nearby connections (simple threshold)
        let ptr = 0;
        const threshold = 60; // in world units
        for (let i = 0; i < COUNT; i++) {
          let connections = 0;
          for (let j = i + 1; j < COUNT && connections < maxConnections; j++) {
            const dx = positions[i * 3] - positions[j * 3];
            const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
            const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist < threshold) {
              linePositions[ptr++] = positions[i * 3];
              linePositions[ptr++] = positions[i * 3 + 1];
              linePositions[ptr++] = positions[i * 3 + 2];
              linePositions[ptr++] = positions[j * 3];
              linePositions[ptr++] = positions[j * 3 + 1];
              linePositions[ptr++] = positions[j * 3 + 2];
              connections++;
            }
          }
        }
        lineGeom.setAttribute("position", new THREE.BufferAttribute(linePositions.subarray(0, ptr), 3));
        lineGeom.computeBoundingSphere();
      }

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      lineGeom.dispose();
      material.dispose();
      lineMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={className} />;
}
