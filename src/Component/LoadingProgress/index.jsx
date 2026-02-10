import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const LOGO_SRC = '/assets/loading/logo.png';

const LoadingProgress = () => {
    const isAllTextureLoaded = useSelector(state => state.texture.isAllTextureLoaded);
    const isAllModelLoaded = useSelector(state => state.glbModel.isAllModelLoaded);

    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState('materials');

    useEffect(() => {
        if (isAllTextureLoaded) setPhase('scene');
        if (isAllModelLoaded) setPhase('ready');
    }, [isAllTextureLoaded, isAllModelLoaded]);

    useEffect(() => {
        const target =
            !isAllTextureLoaded ? 45 : !isAllModelLoaded ? 85 : 100;
        const id = setInterval(() => {
            setProgress(prev => (prev >= target ? prev : Math.min(prev + 3, target)));
        }, 50);
        return () => clearInterval(id);
    }, [isAllTextureLoaded, isAllModelLoaded]);

    const phaseLabel =
        phase === 'materials' ? 'Loading materials…' :
        phase === 'scene' ? 'Preparing scene…' : 'Ready';

    return (
        <div className="loader" role="status" aria-live="polite">
            <div className="loader__bg" />
            <div className="loader__card">
                <div className="loader__brand">
                    <img
                        src={LOGO_SRC}
                        alt=""
                        className="loader__logo"
                        width={112}
                        height={112}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.nextElementSibling) e.target.nextElementSibling.classList.add('loader__logo-fallback--visible');
                        }}
                    />
                    <span className="loader__logo-fallback" aria-hidden="true" />
                    <h1 className="loader__title">Pergola Configurator</h1>
                    <p className="loader__tagline">Design your outdoor space</p>
                </div>
                <div className="loader__progress-outer">
                    <div
                        className="loader__progress-inner"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="loader__phase">{phaseLabel}</p>
                <p className="loader__percent">{Math.round(progress)}%</p>
            </div>
        </div>
    );
};

export default LoadingProgress;
