import React from 'react'
import { useSelector } from 'react-redux'

const Accessories = () => {
    const { width, length } = useSelector(state => state.buildingCtrl)
    const potModel_1 = useSelector(state => state.glbModel.potModel_1)
    const tableModel = useSelector(state => state.glbModel.tableModel_3)

    return potModel_1 && tableModel && (
        <>
            <primitive object={potModel_1.clone()} position={[-(width / 2 + 1), 0, -(length / 2 + 1)]} scale={0.012} castShadow receiveShadow />
            <primitive object={potModel_1.clone()} position={[(width / 2 + 1), 0, -(length / 2 + 1)]} scale={0.012} castShadow receiveShadow />
            <primitive object={potModel_1.clone()} position={[-(width / 2 + 1), 0, (length / 2 + 1)]} scale={0.012} castShadow receiveShadow />
            <primitive object={potModel_1.clone()} position={[(width / 2 + 1), 0, (length / 2 + 1)]} scale={0.012} castShadow receiveShadow />
            <primitive object={tableModel} position={[1.5, 1.6, -4.5]} scale={15} castShadow receiveShadow />
        </>
    )
}

export default Accessories