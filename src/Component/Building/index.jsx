import { useEffect, useRef, useCallback } from "react";
import { useThree } from "@react-three/fiber"

import Pergola from "./Pergola"
import Surface from "./Surface"
import { useSelector } from "react-redux";

const Building = () => {
    const { scene, gl } = useThree();
    const buildingType = useSelector(state => state.buildingCtrl.buildingType);
    const { width, length, height, pitch } = useSelector(state => state.buildingCtrl)

    const prevBuildingTypeRef = useRef(buildingType);
    const prevWidth = useRef(width);
    const prevLength = useRef(length);
    
    // Function to reset shadow maps - memoized with useCallback
    const resetShadows = useCallback(() => {
        // Force shadow map update on all lights
        scene.traverse((object) => {
            if (object.isLight && object.shadow) {
                // Reset the shadow map to force recalculation
                object.shadow.map = null;
                object.shadow.needsUpdate = true;
                
                // Force light update
                object.position.set(
                    object.position.x + 0.0001,
                    object.position.y + 0.0001,
                    object.position.z + 0.0001
                );
            }
        });
        
        // Force renderer to clear shadow maps
        if (gl.shadowMap.enabled) {
            gl.shadowMap.needsUpdate = true;
        }
    }, [scene, gl]);
    
    useEffect(() => {
        // Only apply shadows when scene changes or building type changes
        if (scene && (prevBuildingTypeRef.current !== buildingType || prevWidth.current !== width || prevLength.current !== length)) {
            prevBuildingTypeRef.current = buildingType;
            prevWidth.current = width;
            prevLength.current = length;
            
            // Reset shadow maps immediately to clear old shadows
            resetShadows();
            
            // Add a small delay to ensure the new building components are mounted
            setTimeout(() => {
                // Apply shadow properties to all meshes
                scene.traverseVisible((mesh) => {
                    if (mesh.isMesh) {
                        mesh.castShadow = true;
                        mesh.receiveShadow = true;
                    }
                });
                
                // Force another shadow map update after new components are mounted
                resetShadows();
            }, 100);
        }
    }, [scene, buildingType, width, length, height, pitch, resetShadows]);
    
    // Initial shadow setup
    useEffect(() => {
        if (scene) {
            scene.traverseVisible((mesh) => {
                if (mesh.isMesh) {
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                }
            });
        }
    }, [scene]);
    
    return (
        <group scale={1}>
            <Pergola />
            <Surface />
        </group>
    )
}

export default Building