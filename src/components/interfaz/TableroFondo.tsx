import React from "react";

interface TableroFondoProps {
	children?: React.ReactNode;
	imagen?: string;
}

export const TableroFondo: React.FC<TableroFondoProps> = ({
	children,
	imagen = "/tablero.jpg",
}) => {
	return (
		<section
			className="relative h-full min-h-full w-full overflow-hidden bg-cover bg-center"
			style={{ backgroundImage: `url('${imagen}')` }}
		>
			<div className="pointer-events-none absolute inset-0 bg-black/25" />
			<div className="relative z-10 h-full w-full">{children}</div>
		</section>
	);
};
