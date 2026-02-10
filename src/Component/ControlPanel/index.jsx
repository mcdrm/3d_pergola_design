import { useDispatch, useSelector } from "react-redux"

import { setBuildingType, setIsShowBg, setIsCamAutoRotate, setIsBuildingOnly, setIsShowGrass, setBuildingDimension, setInitBuildingSize } from "../../Redux/Features/BuildingCtrl/buildingCtrlSlice";
import { SvgBuilding, SvgFrameOnly, SvgGrass, SvgImage, SvgRotate } from "../../Utils/SvgSource"
import { useEffect, useState } from "react";

const ControlPanel = () => {
    const dispatch = useDispatch();

    const buildingType = useSelector(state => state.buildingCtrl.buildingType)
    const isShowBg = useSelector(state => state.buildingCtrl.isShowBg)
    const isCamAutoRotate = useSelector(state => state.buildingCtrl.isCamAutoRotate)
    const isFrameOnly = useSelector(state => state.buildingCtrl.isFrameOnly)
    const isShowGrass = useSelector(state => state.buildingCtrl.isShowGrass)
    
    const [dimensions, setDimensions] = useState({
        width: 6,
        length: 4,
        height: 2.5,
        pitch: 1
    });
    
    const handleOptionClick = (type, value) => {
        if (type === 'building') {
            dispatch(setBuildingType(value));
        } else if (type === 'bgImage') {
            dispatch(setIsShowBg());
            dispatch(setIsShowGrass(false));
        } else if (type === 'cam-rotate') {
            dispatch(setIsCamAutoRotate());
        } else if (type === 'building-only') {
            dispatch(setIsBuildingOnly());
        } else if (type === 'grass-floor') {
            dispatch(setIsShowGrass());
        }
    }

    const handleDimensionChange = (e) => {
        const { name, value } = e.target;
        const numValue = Number(value);
        setDimensions(prev => ({ ...prev, [name]: numValue }));
        dispatch(setBuildingDimension({ [name]: numValue }));
    }

    useEffect(() => {
        dispatch(setInitBuildingSize(dimensions));
    }, [dispatch, dimensions]);

    const handleKeyDown = (type, value) => (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            handleOptionClick(type, value);
        }
    };
    
    return (
        <div className="building-controller">
            <div className="bottom-section">
                <button className="select-item" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <span>Pergola</span>
                    <SvgBuilding />
                </button>
                <ul className="dropdown-menu">
                    <li><span className="dropdown-item" style={{ color: buildingType === 'wood' ? '#0066FF' : '#3C3C3C' }} 
                        onClick={() => handleOptionClick('building', 'wood')} 
                        onKeyDown={handleKeyDown('building', 'wood')}
                        tabIndex="0"
                        role="menuitem"
                    >Type 1</span></li>
                    <hr style={{marginTop: 5, marginBottom: 5}} />
                    <li><span className="dropdown-item" style={{ color: buildingType === 'metal' ? '#0066FF' : '#3C3C3C' }} 
                        onClick={() => handleOptionClick('building', 'metal')} 
                        onKeyDown={handleKeyDown('building', 'metal')}
                        tabIndex="0"
                        role="menuitem"
                    >Type 2</span></li>
                    <hr style={{marginTop: 5, marginBottom: 5}} />
                    <li><span className="dropdown-item" style={{ color: buildingType === 'stone' ? '#0066FF' : '#3C3C3C' }} 
                        onClick={() => handleOptionClick('building', 'stone')} 
                        onKeyDown={handleKeyDown('building', 'stone')}
                        tabIndex="0"
                        role="menuitem"
                    >Type 3</span></li>
                </ul>
                <div className="vl" />
                <button 
                    type="button"
                    className={isShowBg ? "select-item isSelected" : "select-item"} 
                    onClick={() => handleOptionClick('bgImage')} 
                    onKeyDown={handleKeyDown('bgImage')}
                >
                    <span>Background</span>
                    <SvgImage color={isShowBg ? '#0066FF' : '#3C3C3C'} />
                </button>
                <div className="vl" />
                <button 
                    type="button"
                    className={isCamAutoRotate ? "select-item isSelected" : "select-item"} 
                    onClick={() => handleOptionClick('cam-rotate')} 
                    onKeyDown={handleKeyDown('cam-rotate')}
                >
                    <span>Rotate</span>
                    <SvgRotate color={isCamAutoRotate ? '#0066FF' : '#3C3C3C'} />
                </button>
                <div className="vl" />
                <button 
                    type="button"
                    className={isFrameOnly ? "select-item isSelected" : "select-item isDisabled"} 
                    onClick={() => handleOptionClick('building-only')} 
                    onKeyDown={handleKeyDown('building-only')}
                >
                    <span>Building only</span>
                    <SvgFrameOnly color={isFrameOnly ? '#0066FF' : '#3C3C3C'} />
                </button>
                <div className="vl" />
                <button 
                    type="button"
                    className={isShowGrass ? "select-item isSelected" : isShowBg ? "select-item isDisabled" : "select-item"} 
                    onClick={() => handleOptionClick('grass-floor')} 
                    onKeyDown={handleKeyDown('grass-floor')}
                    disabled={isShowBg}
                >
                    <span>Grass Floor</span>
                    <SvgGrass color={isShowGrass ? '#0066FF' : '#3C3C3C'} />
                </button>
            </div>
            {buildingType === "wood" &&
                <div className="bg-white shadow-lg rounded-lg p-4 fixed right-4 top-4 w-64 z-10">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Dimensions</h3>
                    
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                            <label htmlFor="width-slider" className="text-sm font-medium text-gray-700">WIDTH</label>
                            <span className="text-xs text-blue-600 font-semibold">{dimensions.width}m</span>
                        </div>
                        <input 
                            id="width-slider"
                            type="range" 
                            name="width" 
                            onChange={handleDimensionChange} 
                            min="6" 
                            max="10" 
                            step="1" 
                            value={dimensions.width}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>6m</span>
                            <span>10m</span>
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                            <label htmlFor="length-slider" className="text-sm font-medium text-gray-700">LENGTH</label>
                            <span className="text-xs text-blue-600 font-semibold">{dimensions.length}m</span>
                        </div>
                        <input 
                            id="length-slider"
                            type="range" 
                            name="length" 
                            onChange={handleDimensionChange} 
                            min="4" 
                            max="8" 
                            step="1" 
                            value={dimensions.length}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>4m</span>
                            <span>8m</span>
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                            <label htmlFor="height-slider" className="text-sm font-medium text-gray-700">HEIGHT</label>
                            <span className="text-xs text-blue-600 font-semibold">{dimensions.height}m</span>
                        </div>
                        <input 
                            id="height-slider"
                            type="range" 
                            name="height" 
                            onChange={handleDimensionChange} 
                            min="2.5" 
                            max="4" 
                            step="0.5" 
                            value={dimensions.height}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>2.5m</span>
                            <span>4m</span>
                        </div>
                    </div>
                    
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label htmlFor="pitch-slider" className="text-sm font-medium text-gray-700">PITCH</label>
                            <span className="text-xs text-blue-600 font-semibold">{dimensions.pitch}</span>
                        </div>
                        <input 
                            id="pitch-slider"
                            type="range" 
                            name="pitch" 
                            onChange={handleDimensionChange} 
                            min="1" 
                            max="6" 
                            step="1" 
                            value={dimensions.pitch}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>1/12</span>
                            <span>6/12</span>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ControlPanel