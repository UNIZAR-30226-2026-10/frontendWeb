import React from "react";

export const DadoPartida: React.FC = () => {
    return (
        <div className="flex items-center justify-center">
            <img
                src="/dado.jpg"
                alt="Dado"
                className="w-32 h-32 object-contain drop-shadow-2xl hover:scale-110 transition-transform cursor-pointer"
            />
        </div>
    );
};