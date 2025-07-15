'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { animate } from 'motion';

export default function ThreeCube({ className = '' }) {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      25,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0xffffff, 0);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1.3, 1.3, 1.3);
    const material = new THREE.MeshStandardMaterial({
      color: 0x800080, // Purple color
      metalness: 0.2,
      roughness: 0.4,
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(3, 3, 3);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.set(512, 512);
    scene.add(directionalLight);

    scene.add(new THREE.AmbientLight(0x404040, 0.5));

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.ShadowMaterial({ opacity: 0.2 })
    );
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1.5;
    plane.receiveShadow = true;
    scene.add(plane);

    const rad = (deg) => deg * (Math.PI / 180);

    let frameId;
    const renderLoop = () => {
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    animate(
      cube.rotation,
      { y: rad(360), z: rad(360) },
      { duration: 20, repeat: Infinity, ease: 'linear' }
    );

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (renderer.domElement) container.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-[100px] h-[100px] sm:w-[160px] sm:h-[160px] md:w-[200px] md:h-[200px] ${className}`}
      id="three-container"
    />
  );
}
