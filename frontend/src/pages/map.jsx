import React, { useState, useRef, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";

function Map({ searchId }) {
  const floorColor1 = "#85fffd";
  const estColor = "#ffa02c";
  const eleColor = "#2285ff";
  const mainColor = "#ff5959";
  const blackColor = "#000000";

  const meshRefs = useRef({});
  console.log("MapsearchId:", searchId);

  useEffect(() => {
    if (searchId) {
      const matchingMeshes = Object.keys(meshRefs.current).filter((id) => id.startsWith(searchId));

      matchingMeshes.forEach((id) => {
        const mesh = meshRefs.current[id];
        if (mesh) {
          const initialColor = mesh.material.color.clone();
          let blinkCount = 0;

          const intervalId = setInterval(() => {
            if (blinkCount < 10) {
              const isBlack = blinkCount % 2 === 0;
              mesh.material.color.set(isBlack ? blackColor : initialColor);
              blinkCount++;
            } else {
              clearInterval(intervalId);
              mesh.material.color.copy(initialColor);
            }
          }, 500);

          return () => clearInterval(intervalId);
        }
      });
    }
  }, [searchId]);

  const createBorder = (geometry) => {
    const edges = new THREE.EdgesGeometry(geometry);
    const borderMaterial = new THREE.LineBasicMaterial({ color: "#535353", linewidth: 1 });
    return <lineSegments args={[edges, borderMaterial]} />;
  };

  return (
    <div className='h-[550px] mt-[-200px] overflow-hidden'>
      <Canvas gl={{ alpha: true }} style={{ background: "transparent", height: "100%" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 2, 2]} intensity={2} />
        <pointLight position={[10, 10, 10]} />

        <group position={[0, 0, -2]}>
          <group className='leftSection'>
            <group position={[-4.1, -2, 3]} classN='firstColomn'>
              <mesh ref={(ref) => (meshRefs.current["G01"] = ref)}>
                <boxGeometry args={[0.6, 1, 1]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
              </mesh>

              <mesh position={[0, 1, 0]} ref={(ref) => (meshRefs.current["L101"] = ref)}>
                <boxGeometry args={[0.6, 1, 1]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
              </mesh>
            </group>
            <group position={[-4.1, -2, 2]} className='secondColomn'>
              <mesh ref={(ref) => (meshRefs.current["G02"] = ref)}>
                <boxGeometry args={[0.6, 1, 1]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
              </mesh>

              <mesh position={[0, 1, 0]} ref={(ref) => (meshRefs.current["L102"] = ref)}>
                <boxGeometry args={[0.6, 1, 1]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
              </mesh>

              <mesh position={[0, 2, 0]} ref={(ref) => (meshRefs.current["L201"] = ref)}>
                <boxGeometry args={[0.6, 1, 1]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
              </mesh>

              <mesh position={[0, 3, 0]} ref={(ref) => (meshRefs.current["L301"] = ref)}>
                <boxGeometry args={[0.6, 1, 1]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
              </mesh>
            </group>
            <group position={[-4.1, -2, 1]} className='thirdColomn'>
              <mesh ref={(ref) => (meshRefs.current["G03"] = ref)}>
                <boxGeometry args={[0.6, 1, 1]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
              </mesh>

              <mesh position={[0, 1, 0]} ref={(ref) => (meshRefs.current["L103"] = ref)}>
                <boxGeometry args={[0.6, 1, 1]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
              </mesh>

              <mesh position={[0, 2, 0]} ref={(ref) => (meshRefs.current["L202"] = ref)}>
                <boxGeometry args={[0.6, 1, 1]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
              </mesh>

              <mesh position={[0, 3, 0]} ref={(ref) => (meshRefs.current["L302"] = ref)}>
                <boxGeometry args={[0.6, 1, 1]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
              </mesh>
            </group>
          </group>

          <group className='middleSection'>
            <group position={[-3.9, -2, 0]} className='leftMain'>
              <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={mainColor} />
                {createBorder(new THREE.BoxGeometry(1, 1, 1))}
              </mesh>

              <mesh position={[0, 1, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={mainColor} />
                {createBorder(new THREE.BoxGeometry(1, 1, 1))}
              </mesh>

              <mesh position={[0, 2, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={mainColor} />
                {createBorder(new THREE.BoxGeometry(1, 1, 1))}
              </mesh>

              <mesh position={[0, 3, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={mainColor} />
                {createBorder(new THREE.BoxGeometry(1, 1, 1))}
              </mesh>
            </group>

            <group position={[-2.9, -2, -0.1]} className='firstColomn'>
              <mesh ref={(ref) => (meshRefs.current["G04"] = ref)}>
                <boxGeometry args={[1, 1, 0.6]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
              </mesh>

              <mesh position={[0, 1, 0]} ref={(ref) => (meshRefs.current["L104"] = ref)}>
                <boxGeometry args={[1, 1, 0.6]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
              </mesh>

              <mesh position={[0, 2, 0]} ref={(ref) => (meshRefs.current["L203"] = ref)}>
                <boxGeometry args={[1, 1, 0.6]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
              </mesh>

              <mesh position={[0, 3, 0]} ref={(ref) => (meshRefs.current["L303"] = ref)}>
                <boxGeometry args={[1, 1, 0.6]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
              </mesh>
            </group>

            <group position={[-1.9, -2, -0.1]} className='secondColomn'>
              <mesh ref={(ref) => (meshRefs.current["G05"] = ref)}>
                <boxGeometry args={[1, 1, 0.6]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
              </mesh>

              <mesh position={[0, 1, 0]} ref={(ref) => (meshRefs.current["L105"] = ref)}>
                <boxGeometry args={[1, 1, 0.6]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
              </mesh>

              <mesh position={[0, 2, 0]} ref={(ref) => (meshRefs.current["L204"] = ref)}>
                <boxGeometry args={[1, 1, 0.6]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
              </mesh>

              <mesh position={[0, 3, 0]} ref={(ref) => (meshRefs.current["L304"] = ref)}>
                <boxGeometry args={[1, 1, 0.6]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
              </mesh>
            </group>

            <group position={[-1, -2, 0]} className='middleColomn'>
              <mesh ref={(ref) => (meshRefs.current["E1"] = ref)}>
                <boxGeometry args={[0.8, 1, 0.8]} />
                <meshStandardMaterial color={eleColor} />
                {createBorder(new THREE.BoxGeometry(0.8, 1, 0.8))}
              </mesh>

              <mesh position={[0, 1, 0]} ref={(ref) => (meshRefs.current["E2"] = ref)}>
                <boxGeometry args={[0.8, 1, 0.8]} />
                <meshStandardMaterial color={eleColor} />
                {createBorder(new THREE.BoxGeometry(0.8, 1, 0.8))}
              </mesh>

              <mesh position={[0, 2, 0]} ref={(ref) => (meshRefs.current["E3"] = ref)}>
                <boxGeometry args={[0.8, 1, 0.8]} />
                <meshStandardMaterial color={eleColor} />
                {createBorder(new THREE.BoxGeometry(0.8, 1, 0.8))}
              </mesh>

              <mesh position={[0, 3, 0]} ref={(ref) => (meshRefs.current["E4"] = ref)}>
                <boxGeometry args={[0.8, 1, 0.8]} />
                <meshStandardMaterial color={eleColor} />
                {createBorder(new THREE.BoxGeometry(0.8, 1, 0.8))}
              </mesh>
            </group>

            <group position={[-0.1, -2, -0.1]} className='fourthColomn'>
              <mesh ref={(ref) => (meshRefs.current["G06"] = ref)}>
                <boxGeometry args={[1, 1, 0.6]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
              </mesh>

              <mesh position={[0, 1, 0]} ref={(ref) => (meshRefs.current["L106"] = ref)}>
                <boxGeometry args={[1, 1, 0.6]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
              </mesh>

              <mesh position={[0, 2, 0]} ref={(ref) => (meshRefs.current["L205"] = ref)}>
                <boxGeometry args={[1, 1, 0.6]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
              </mesh>

              <mesh position={[0, 3, 0]} ref={(ref) => (meshRefs.current["L305"] = ref)}>
                <boxGeometry args={[1, 1, 0.6]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
              </mesh>
            </group>

            <group position={[0.9, -2, -0.1]} className='fifthColomn'>
              <mesh ref={(ref) => (meshRefs.current["G07"] = ref)}>
                <boxGeometry args={[1, 1, 0.6]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
              </mesh>

              <mesh position={[0, 1, 0]} ref={(ref) => (meshRefs.current["L107"] = ref)}>
                <boxGeometry args={[1, 1, 0.6]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
              </mesh>

              <mesh position={[0, 2, 0]} ref={(ref) => (meshRefs.current["L206"] = ref)}>
                <boxGeometry args={[1, 1, 0.6]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
              </mesh>

              <mesh position={[0, 3, 0]} ref={(ref) => (meshRefs.current["L306"] = ref)}>
                <boxGeometry args={[1, 1, 0.6]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
              </mesh>
            </group>

            <group position={[1.9, -2, 0]} className='rightMain'>
              <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={mainColor} />
                {createBorder(new THREE.BoxGeometry(1, 1, 1))}
              </mesh>

              <mesh position={[0, 1, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={mainColor} />
                {createBorder(new THREE.BoxGeometry(1, 1, 1))}
              </mesh>

              <mesh position={[0, 2, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={mainColor} />
                {createBorder(new THREE.BoxGeometry(1, 1, 1))}
              </mesh>

              <mesh position={[0, 3, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={mainColor} />
                {createBorder(new THREE.BoxGeometry(1, 1, 1))}
              </mesh>
            </group>
          </group>

          <group className='rightSection' position={[-0.1, 0, 0]}>
            <group position={[2.1, -2, 1]} className='firstColomn'>
              <mesh ref={(ref) => (meshRefs.current["G08"] = ref)}>
                <boxGeometry args={[0.6, 1, 1]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
              </mesh>

              <mesh position={[0, 1, 0]} ref={(ref) => (meshRefs.current["L108"] = ref)}>
                <boxGeometry args={[0.6, 1, 1]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
              </mesh>

              <mesh position={[0, 2, 0]} ref={(ref) => (meshRefs.current["L207"] = ref)}>
                <boxGeometry args={[0.6, 1, 1]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
              </mesh>

              <mesh position={[0, 3, 0]} ref={(ref) => (meshRefs.current["L309"] = ref)}>
                <boxGeometry args={[0.6, 1, 1]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
              </mesh>
            </group>

            <group position={[2.1, -2, 2]} className='secondColomn'>
              <mesh ref={(ref) => (meshRefs.current["G09"] = ref)}>
                <boxGeometry args={[0.6, 1, 1]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
              </mesh>

              <mesh position={[0, 1, 0]} ref={(ref) => (meshRefs.current["L109"] = ref)}>
                <boxGeometry args={[0.6, 1, 1]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
              </mesh>

              <mesh position={[0, 2, 0]} ref={(ref) => (meshRefs.current["L208"] = ref)}>
                <boxGeometry args={[0.6, 1, 1]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
              </mesh>

              <mesh position={[0, 3, 0]} ref={(ref) => (meshRefs.current["L308"] = ref)}>
                <boxGeometry args={[0.6, 1, 1]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
              </mesh>
            </group>

            <group position={[2.1, -2, 3]} className='thirdColomn'>
              <mesh ref={(ref) => (meshRefs.current["G10"] = ref)}>
                <boxGeometry args={[0.6, 1, 1]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
              </mesh>

              <mesh position={[0, 1, 0]} ref={(ref) => (meshRefs.current["L110"] = ref)}>
                <boxGeometry args={[0.6, 1, 1]} />
                <meshStandardMaterial color={floorColor1} />
                {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
              </mesh>
            </group>
          </group>

          <group className='escalatorLeft'>
            <group position={[-3.7, -1.6, 2]}>
              <mesh ref={(ref) => (meshRefs.current["SL1"] = ref)}>
                <boxGeometry args={[0.4, 0.2, 0.3]} />
                <meshStandardMaterial color={estColor} />
              </mesh>
            </group>
            <group position={[-3.5, -1.8, 2]}>
              <mesh ref={(ref) => (meshRefs.current["SL2"] = ref)}>
                <boxGeometry args={[0.4, 0.2, 0.3]} />
                <meshStandardMaterial color={estColor} />
              </mesh>
            </group>
            <group position={[-3.3, -2, 2]}>
              <mesh ref={(ref) => (meshRefs.current["SL3"] = ref)}>
                <boxGeometry args={[0.4, 0.2, 0.3]} />
                <meshStandardMaterial color={estColor} />
              </mesh>
            </group>
            <group position={[-3.1, -2.2, 2]}>
              <mesh ref={(ref) => (meshRefs.current["SL4"] = ref)}>
                <boxGeometry args={[0.4, 0.2, 0.3]} />
                <meshStandardMaterial color={estColor} />
              </mesh>
            </group>
            <group position={[-2.9, -2.4, 2]}>
              <mesh ref={(ref) => (meshRefs.current["SL5"] = ref)}>
                <boxGeometry args={[0.4, 0.2, 0.3]} />
                <meshStandardMaterial color={estColor} />
              </mesh>
            </group>
            <group position={[-2.7, -2.6, 2]}>
              <mesh ref={(ref) => (meshRefs.current["SL6"] = ref)}>
                <boxGeometry args={[0.4, 0.2, 0.3]} />
                <meshStandardMaterial color={estColor} />
              </mesh>
            </group>
          </group>

          <group className='escalatorRight' position={[-2, 0, 4]} rotation={[0, Math.PI, 0]}>
            <group position={[-3.7, -1.6, 2]}>
              <mesh ref={(ref) => (meshRefs.current["SR1"] = ref)}>
                <boxGeometry args={[0.4, 0.2, 0.3]} />
                <meshStandardMaterial color={estColor} />
              </mesh>
            </group>
            <group position={[-3.5, -1.8, 2]}>
              <mesh ref={(ref) => (meshRefs.current["SR2"] = ref)}>
                <boxGeometry args={[0.4, 0.2, 0.3]} />
                <meshStandardMaterial color={estColor} />
              </mesh>
            </group>
            <group position={[-3.3, -2, 2]}>
              <mesh ref={(ref) => (meshRefs.current["SR3"] = ref)}>
                <boxGeometry args={[0.4, 0.2, 0.3]} />
                <meshStandardMaterial color={estColor} />
              </mesh>
            </group>
            <group position={[-3.1, -2.2, 2]}>
              <mesh ref={(ref) => (meshRefs.current["SR4"] = ref)}>
                <boxGeometry args={[0.4, 0.2, 0.3]} />
                <meshStandardMaterial color={estColor} />
              </mesh>
            </group>
            <group position={[-2.9, -2.4, 2]}>
              <mesh ref={(ref) => (meshRefs.current["SR5"] = ref)}>
                <boxGeometry args={[0.4, 0.2, 0.3]} />
                <meshStandardMaterial color={estColor} />
              </mesh>
            </group>
            <group position={[-2.7, -2.6, 2]}>
              <mesh ref={(ref) => (meshRefs.current["SR6"] = ref)}>
                <boxGeometry args={[0.4, 0.2, 0.3]} />
                <meshStandardMaterial color={estColor} />
              </mesh>
            </group>
          </group>
        </group>

        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}

export default Map;
