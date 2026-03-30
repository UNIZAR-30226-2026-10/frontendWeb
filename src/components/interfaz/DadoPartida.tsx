import React from "react";

export const DadoPartida: React.FC = () => {
	return (
		<div className="absolute bottom-10 right-10 z-10">
			<img
				src="/dado.jpg"
				alt="Dado"
				className="h-30 w-30 object-contain drop-shadow-lg"
			/>
		</div>
	);
};
