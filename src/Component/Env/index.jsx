import { Environment, OrbitControls, AccumulativeShadows, RandomizedLight, Plane } from "@react-three/drei"
import { useSelector } from "react-redux";
import { ConstProps } from "../../Utils/Constants";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

const { height } = ConstProps;

const Env = () => {
    // const envHDR = useEnvironment({ files: '/assets/env/env-1.hdr' })

    const isShowBg = useSelector(state => state.buildingCtrl.isShowBg)
    const isCamAutoRotate = useSelector(state => state.buildingCtrl.isCamAutoRotate)
    const buildingType = useSelector(state => state.buildingCtrl.buildingType)
    const { scene } = useThree()
    
    // Reference to the AccumulativeShadows component
    const shadowsRef = useRef();
    
    // Reset shadows when building type changes
    useEffect(() => {
        if (shadowsRef.current) {
            // This resets the shadow accumulation
            shadowsRef.current.temporal = false;
            
            // We need to delay re-enabling temporal to ensure a clean reset
            setTimeout(() => {
                if (shadowsRef.current) {
                    shadowsRef.current.temporal = true;
                }
            }, 100);
        }
    }, []);
    
    return (
        <>
            <Environment
                files={'/assets/env/env.hdr'}
                background={isShowBg}
                backgroundIntensity={1}
                backgroundBlurriness={0}
                ground={isShowBg ? { height: 30, radius: 1000, scale: 30 } : null}
                resolution={512}
            />
            
            <OrbitControls
                target={[0, height / 3, 0]}
                enablePan={false}
                autoRotate={isCamAutoRotate}
                rotateSpeed={0.6}
                dampingFactor={0.2}
                minPolarAngle={0}
                maxPolarAngle={isShowBg ? Math.PI / 2.1 : Number.POSITIVE_INFINITY}
                minDistance={6}
                maxDistance={isShowBg ? 20 : 40}
            />
            <ambientLight intensity={1} />
            
            {/* Main key light with improved shadows */}
            <directionalLight
                position={[5, 12, 5]}
                intensity={1.8}
                castShadow
                shadow-mapSize-height={4096}
                shadow-mapSize-width={4096}
                shadow-camera-far={50}
                shadow-camera-left={-15}
                shadow-camera-right={15}
                shadow-camera-top={15}
                shadow-camera-bottom={-15}
                shadow-bias={-0.0001}
                shadow-intensity={2}
            />
            
            {/* Secondary fill light to enhance shadows */}
            <directionalLight
                position={[-3, 10, -5]}
                intensity={0.7}
                castShadow
                shadow-mapSize-height={2048}
                shadow-mapSize-width={2048}
                shadow-camera-far={40}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
                shadow-bias={-0.0001}
                shadow-intensity={1.5}
            />
        </>
    )
}

export default Env