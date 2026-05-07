"use client";

import React, { useMemo } from "react";
import type { SnapshotTablero } from "@/types/partida";

type TableroProps = {
	equipoActual?: string;
	snapshotTablero?: SnapshotTablero | null;
    onMoverFicha?: (fichaId: number, casillaDestino: number,pasosRestantes: number) => void | Promise<unknown>;
};

const IMAGENES = {
	VACIA: "casilla_vacia.png",
	NORMAL: "casilla_vertical.png",
	CURVA: "casilla_curva.png",
	META: "casilla_meta1.png",
	BIFURCACION: "casilla_bifurcacion.png",
};

export default function Tablero({   snapshotTablero,
  onMoverFicha,
  equipoActual, }: TableroProps) {
    if (!snapshotTablero) {
        return <div className="text-white text-center mt-10 text-2xl w-full font-bold">Cargando Tablero...</div>;
    }
    
    const casillas = snapshotTablero.casillas;
    

	const saltosDinamicos = useMemo<Record<number, number>>(() => {
		const saltos: Record<number, number> = {};
		snapshotTablero.casillas?.forEach((casilla, index) => {
			if (casilla?.saltoA !== undefined) {
				saltos[index + 1] = casilla.saltoA+1;
			}
		});
		return saltos;
	}, [snapshotTablero]);

	const renderizarObstaculosPNG = () => {
		const obtenerCoordenadas = (casilla: number) => {
			const filaReal = Math.floor((casilla - 1) / 10);
			const colReal = (casilla - 1) % 10;
			const filaCSS = 9 - filaReal;
			return { x: colReal * 10 + 5, y: filaCSS * 10 + 5 };
		};

		return Object.entries(saltosDinamicos).map(([inicio, fin]) => {
			const inicioNumero = Number(inicio);
			const start = obtenerCoordenadas(inicioNumero);
			const end = obtenerCoordenadas(fin);
			const tipoInicio = snapshotTablero.casillas[inicioNumero - 1]?.tipo;
			const dx = end.x - start.x;
			const dy = end.y - start.y;
			const longitud = Math.sqrt(dx * dx + dy * dy);
			const angulo = Math.atan2(dy, dx) * (180 / Math.PI);
			const esEscalera = tipoInicio === "Escalera";

			if (esEscalera) {
				const flipScale = dx < 0 ? " scaleY(-1)" : "";
				return (
					<div
						key={`${inicio}-${fin}`}
						className="absolute z-30 pointer-events-none drop-shadow-xl flex flex-row items-center justify-center"
						style={{
							left: `${start.x}%`,
							top: `${start.y}%`,
							width: `${longitud}%`,
							height: "8%",
							transformOrigin: "0% 50%",
							transform: `translateY(-50%) rotate(${angulo}deg)${flipScale}`,
						}}
					>
						<div className="h-full flex-shrink-0 overflow-hidden relative z-20">
							<img src="/escalera_estratega_base.png" alt="Base" className="h-full w-auto block max-w-none" />
						</div>
						<div
							className="h-full flex-1 relative z-10"
							style={{
								backgroundImage: "url(/escalera_estratega_cuerpo.png)",
								backgroundRepeat: "repeat-x",
								backgroundSize: "auto 100%",
								backgroundPosition: "left center",
								transform: "scaleX(1.03)",
							}}
						/>
						<div className="h-full flex-shrink-0 overflow-hidden relative z-20">
							<img src="/escalera_estratega_tope.png" alt="Tope" className="h-full w-auto block max-w-none" />
						</div>
					</div>
				);
			}

			const flipScale = dx < 0 ? " scaleY(-1)" : "";
			return (
				<div
					key={`${inicio}-${fin}`}
					className="absolute z-30 pointer-events-none drop-shadow-xl flex flex-row items-center"
					style={{
						left: `${start.x}%`,
						top: `${start.y}%`,
						width: `${longitud}%`,
						height: "6.5%",
						transformOrigin: "0% 50%",
						transform: `translateY(-50%) rotate(${angulo}deg)${flipScale}`,
					}}
				>
					<div className="h-full flex-shrink-0 overflow-hidden" style={{ width: "52px" }}>
						<img
							src="/serpiente_futuro_cabeza.png"
							alt="Cabeza"
							className="h-full max-w-none"
							style={{ width: "100%", height: "50%", transform: "translateY(46%) translateX(1%)" }}
						/>
					</div>
					<div
						className="h-full flex-1"
						style={{
							backgroundImage: "url(/serpiente_futuro_cuerpo.png)",
							backgroundRepeat: "repeat-x",
							backgroundSize: "22px 44%",
							backgroundPosition: "left center",
						}}
					/>
					<div className="h-full flex-shrink-0 overflow-hidden" style={{ width: "70px" }}>
						<img
							src="/serpiente_futuro_cola.png"
							alt="Cola"
							className="h-full max-w-none"
							style={{ width: "140%", height: "113%", transform: "translateX(-29%) translateY(-5%)" }}
						/>
					</div>
				</div>
			);
		});
	};

	return (
		<div className="flex flex-col items-center justify-center gap-2 h-full max-h-full w-full mx-auto p-2 min-h-0 relative">
			<div className="h-full aspect-square max-w-full max-h-full bg-gray-900 p-1.5 rounded-2xl shadow-2xl shrink min-h-0 relative">
				<div className="w-full h-full grid grid-cols-10 grid-rows-10 relative overflow-hidden rounded-md">
					<div className="absolute inset-0 w-full h-full pointer-events-none z-30">{renderizarObstaculosPNG()}</div>
					{Array.from({ length: 100 }, (_, i) => {
                        const filaVisual = Math.floor(i / 10);
                        const colVisual = i % 10;

                        const filaReal = 9 - filaVisual;
                        const num = filaReal * 10 + colVisual + 1;

                        const datosCasilla = casillas[num - 1];
						let imagenSrc = IMAGENES.VACIA;

						if (datosCasilla) {
							if (datosCasilla.tipo === "Meta") imagenSrc = IMAGENES.META;
							else if (datosCasilla.tipo === "Bifurcacion") imagenSrc = IMAGENES.BIFURCACION;
							else if (datosCasilla.esCurva) imagenSrc = IMAGENES.CURVA;
							else if (datosCasilla.tipo === "Vacía") imagenSrc = IMAGENES.VACIA;
                            else imagenSrc = IMAGENES.NORMAL;
						}

						const rotacion = datosCasilla ? datosCasilla.rotacion : 0;

						return (
							<div key={num} className="relative flex items-center justify-center">
								<div
									className="absolute inset-0 w-full h-full z-0 pointer-events-none scale-105"
									style={{
										backgroundImage: `url(${imagenSrc})`,
										backgroundSize: "100% 100%",
										backgroundPosition: "center",
										transform: `rotate(${rotacion}deg)`,
									}}
								/>
								<span className="absolute top-0.5 left-1 text-[8px] lg:text-[10px] font-bold text-white/50 z-10 pointer-events-none select-none">
									{num}
								</span>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
