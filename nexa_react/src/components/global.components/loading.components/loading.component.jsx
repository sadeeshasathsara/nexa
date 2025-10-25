import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const LoadingContext = createContext();

export const useGlobalLoading = () => useContext(LoadingContext);

export const GlobalLoadingProvider = ({ children }) => {
    const [globalLoading, setGlobalLoading] = useState(false);

    useEffect(() => {
        if (globalLoading) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [globalLoading]);

    return (
        <LoadingContext.Provider value={{ globalLoading, setGlobalLoading }}>
            {globalLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 pointer-events-none overflow-hidden select-none">
                    <div className="relative flex items-center justify-center">
                        {/* Loading animation in front */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                            {/* Main rotating ring - larger */}
                            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">
                                {/* Outer ring */}
                                <div
                                    className="absolute inset-0 rounded-full border-4 sm:border-5 md:border-6 border-transparent animate-spin"
                                    style={{
                                        borderTopColor: '#00FF99',
                                        borderRightColor: '#00B6C7',
                                        animationDuration: '1.5s'
                                    }}
                                ></div>


                            </div>
                        </div>

                        {/* N Logo with circle background - behind rings */}
                        <div className="relative z-10 flex items-center justify-center">
                            <div
                                className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full flex items-center justify-center "
                                style={{
                                    background: 'linear-gradient(135deg, #043345 0%, #0D9AAC 100%)',
                                    animationDuration: '1.8s'
                                }}
                            >
                                <span
                                    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold"
                                    style={{ color: 'white' }}
                                >
                                    N
                                </span>
                            </div>
                        </div>

                        {/* Ambient glow effect */}
                        <div
                            className="absolute w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full opacity-8 animate-pulse pointer-events-none"
                            style={{
                                background: 'radial-gradient(circle, #0d9aac 0%, transparent 70%)',
                                animationDuration: '3s'
                            }}
                        ></div>
                    </div>
                </div>
            )
            }
            {children}
        </LoadingContext.Provider >
    );
};