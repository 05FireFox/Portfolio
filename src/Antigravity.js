import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const Antigravity = ({
    ringRadius = 7,
    particleSize = 0.08,
    color = "#ffffff",
    count = 400, // Reduced count for spheres to keep performance high
    particleShape = 'point' // 'point' or 'sphere'
}) => {
    const mesh = useRef();
    const [isInteracting, setInteracting] = useState(false);

    // Interaction handlers
    useEffect(() => {
        const handleStart = () => setInteracting(true);
        const handleEnd = () => setInteracting(false);
        window.addEventListener('mousedown', handleStart);
        window.addEventListener('mouseup', handleEnd);
        window.addEventListener('touchstart', handleStart);
        window.addEventListener('touchend', handleEnd);
        return () => {
            window.removeEventListener('mousedown', handleStart);
            window.removeEventListener('mouseup', handleEnd);
            window.removeEventListener('touchstart', handleStart);
            window.removeEventListener('touchend', handleEnd);
        };
    }, []);

    // Particle data
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * Math.PI * 2;
            // Ring distribution with volume
            const radius = ringRadius + (Math.random() - 0.5) * 4;
            const x = Math.cos(t) * radius;
            const z = Math.sin(t) * radius;
            const y = (Math.random() - 0.5) * 3;

            temp.push({
                ox: x, oy: y, oz: z, // Original positions
                speed: 0.5 + Math.random(),
                phase: Math.random() * Math.PI * 2,
                scale: 0.5 + Math.random() * 0.5 // Random scale variation
            });
        }
        return temp;
    }, [count, ringRadius]);

    // Logic for InstancelMesh (Spheres)
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Current speed logic
    const currentSpeed = useRef(0.1);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const targetSpeed = isInteracting ? 2.5 : 0.05;
        currentSpeed.current += (targetSpeed - currentSpeed.current) * 0.05;

        // --- SPHERE MODE (InstancedMesh) ---
        if (particleShape === 'sphere' && mesh.current) {
            // Rotate entire group
            mesh.current.rotation.y += currentSpeed.current * 0.02;
            mesh.current.rotation.z = Math.sin(time * 0.1) * (0.1 + currentSpeed.current * 0.1);

            particles.forEach((p, i) => {
                const chaos = currentSpeed.current * 0.5;

                // Calculate dynamic position
                const x = p.ox + Math.cos(time * p.speed) * chaos;
                const y = p.oy + Math.sin(time * p.speed + p.phase) * (1 + chaos);
                const z = p.oz + Math.sin(time * p.speed) * chaos;

                dummy.position.set(x, y, z);

                // Vary scale slightly with time
                const s = p.scale * (1 + Math.sin(time * 2 + i) * 0.1);
                dummy.scale.set(s, s, s);

                dummy.updateMatrix();
                mesh.current.setMatrixAt(i, dummy.matrix);
            });
            mesh.current.instanceMatrix.needsUpdate = true;
        }

        // --- POINTS MODE (BufferGeometry) ---
        else if (mesh.current && mesh.current.geometry.attributes.position) {
            // ... (Keep existing points logic if user reverts)
            mesh.current.rotation.y += currentSpeed.current * 0.02;
            const positions = mesh.current.geometry.attributes.position.array;
            particles.forEach((p, i) => {
                const chaos = currentSpeed.current * 0.5;
                const y = p.oy + Math.sin(time * p.speed + p.phase) * (1 + chaos);
                const x = p.ox + Math.cos(time * p.speed) * chaos;
                const z = p.oz + Math.sin(time * p.speed) * chaos;
                positions[i * 3] = x;
                positions[i * 3 + 1] = y;
                positions[i * 3 + 2] = z;
            });
            mesh.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    if (particleShape === 'sphere') {
        return (
            <instancedMesh ref={mesh} args={[null, null, count]}>
                <sphereGeometry args={[particleSize, 16, 16]} />
                <meshStandardMaterial
                    color={color}
                    roughness={0.1}
                    metalness={0.8}
                    emissive={color}
                    emissiveIntensity={0.2}
                />
            </instancedMesh>
        );
    }

    // Fallback to Points
    const pointsGeometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(count * 3);
        particles.forEach((p, i) => {
            pos[i * 3] = p.ox; pos[i * 3 + 1] = p.oy; pos[i * 3 + 2] = p.oz;
        });
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        return geo;
    }, [particles, count]);

    return (
        <points ref={mesh}>
            <bufferGeometry attach="geometry" {...pointsGeometry} />
            <pointsMaterial
                attach="material"
                size={particleSize}
                color={color}
                transparent
                opacity={isInteracting ? 0.9 : 0.4}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

export default Antigravity;
