"use client";

import React, { useMemo } from "react";
import type { SnapshotTablero, JugadorEstado, PartidaJugador } from "@/types/partida";

type MovimientoDisponible = {
	fichaId: number;
	casillaDestino: number;
	esBifurcacion: boolean;
	pasosRestantes?: number;
};

type TableroProps = {
	equipoActual?: string;
	snapshotTablero?: SnapshotTablero | null;
	jugadores?: JugadorEstado[];
	partidaJugadores?: PartidaJugador[];
	movimientos?: MovimientoDisponible[];
	onMoverFicha?: (fichaId: number, casillaDestino: number, pasosRestantes: number) => void | Promise<unknown>;
};

const IMAGENES = {
	VACIA: "casilla_vacia.png",
	NORMAL: "casilla_vertical.png",
	CURVA: "casilla_curva.png",
	META: "casilla_meta1.png",
	BIFURCACION: "casilla_bifurcacion.png",
};

const COLORES_JUGADOR = [
	"#ef4444", // rojo
	"#3b82f6", // azul
	"#22c55e", // verde
	"#eab308", // amarillo
];

export default function Tablero({
	snapshotTablero,
	onMoverFicha,
	equipoActual,
	jugadores = [],
	partidaJugadores = [],
	movimientos = [],
}: TableroProps) {
	if (!snapshotTablero) {
		return <div className="text-white text-center mt-10 text-2xl w-full font-bold">Cargando Tablero...</div>;
	}

	const casillas = snapshotTablero.casillas;

	// Mapear fichas por casilla para renderizarlas
	const fichasPorCasilla = useMemo(() => {
		const mapa: Record<number, { jugadorIndex: number; username: string; fichaId: number; color: string; imagen: string }[]> = {};
		jugadores.forEach((jugador, jIndex) => {
			// Buscar el cosmético de ficha del jugador
			const pj = partidaJugadores.find(p => p.nombre === jugador.username);
			const fichaImg = pj?.fichaActualField
				? `/${pj.fichaActualField}.png`
				: "/ficha_default.png";

			jugador.fichas.forEach((ficha) => {
				if (!ficha.meta) {
					// casilla 0 = posición inicial, las mostramos en la casilla 1
					const casillaVisual = ficha.casilla === 0 ? 1 : ficha.casilla;
					if (!mapa[casillaVisual]) mapa[casillaVisual] = [];
					mapa[casillaVisual].push({
						jugadorIndex: jIndex,
						username: jugador.username,
						fichaId: ficha.id,
						color: COLORES_JUGADOR[jIndex % COLORES_JUGADOR.length],
						imagen: fichaImg,
					});
				}
			});
		});
		return mapa;
	}, [jugadores, partidaJugadores]);

	// Casillas destino válidas para el movimiento actual
	const destinosValidos = useMemo(() => {
		const mapa: Record<number, MovimientoDisponible> = {};
		movimientos.forEach((mov) => {
			mapa[mov.casillaDestino] = mov;
		});
		return mapa;
	}, [movimientos]);

	const saltosDinamicos = useMemo<Record<number, number>>(() => {
		const saltos: Record<number, number> = {};
		snapshotTablero.casillas?.forEach((casilla, index) => {
			if (casilla?.saltoA !== undefined) {
				saltos[index + 1] = casilla.saltoA + 1;
			}
		});
		return saltos;
	}, [snapshotTablero]);

	const obtenerCoordenadas = (casilla: number) => {
		const filaReal = Math.floor((casilla - 1) / 10);
		const colReal = (casilla - 1) % 10;
		const filaCSS = 9 - filaReal;
		return { x: colReal * 10 + 5, y: filaCSS * 10 + 5 };
	};

	const renderizarObstaculosPNG = () => {
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
						const fichasEnCasilla = fichasPorCasilla[num] || [];
						const esDestino = destinosValidos[num];

						return (
							<div
								key={num}
								className={`relative flex items-center justify-center ${esDestino ? "cursor-pointer" : ""}`}
								onClick={() => {
									if (esDestino && onMoverFicha) {
										onMoverFicha(esDestino.fichaId, esDestino.casillaDestino, esDestino.pasosRestantes ?? 0);
									}
								}}
							>
								<div
									className="absolute inset-0 w-full h-full z-0 pointer-events-none scale-105"
									style={{
										backgroundImage: `url(${imagenSrc})`,
										backgroundSize: "100% 100%",
										backgroundPosition: "center",
										transform: `rotate(${rotacion}deg)`,
									}}
								/>

								{/* Highlight de casilla destino válido */}
								{esDestino && (
									<div className="absolute inset-0 z-20 rounded-sm border-2 border-yellow-300 bg-yellow-300/30 animate-pulse pointer-events-none" />
								)}

								{/* Fichas de los jugadores - agrupadas por jugador */}
								{fichasEnCasilla.length > 0 && (() => {
									// Agrupar fichas por jugador
									const gruposPorJugador: Record<string, typeof fichasEnCasilla> = {};
									fichasEnCasilla.forEach((ficha) => {
										if (!gruposPorJugador[ficha.username]) gruposPorJugador[ficha.username] = [];
										gruposPorJugador[ficha.username].push(ficha);
									});
									const grupos = Object.values(gruposPorJugador);

									return (
										<div className="absolute inset-0 z-40 flex flex-wrap items-center justify-center gap-0.5 p-0.5 pointer-events-none">
											{grupos.map((grupo) => {
												const representante = grupo[0];
												const cantidad = grupo.length;
												return (
													<div
														key={representante.username}
														className="rounded-full shadow-md flex items-center justify-center overflow-hidden relative"
														style={{
															width: grupos.length > 2 ? "35%" : grupos.length > 1 ? "40%" : "55%",
															height: grupos.length > 2 ? "35%" : grupos.length > 1 ? "40%" : "55%",
															border: `2px solid ${representante.color}`,
															backgroundColor: "rgba(0,0,0,0.3)",
														}}
														title={`${representante.username} - ${cantidad} ficha${cantidad > 1 ? "s" : ""}`}
													>
														<img
															src={representante.imagen}
															alt={`Ficha de ${representante.username}`}
															className="w-full h-full object-contain"
															onError={(e) => {
																(e.target as HTMLImageElement).src = "/ficha_default.png";
															}}
														/>
														{cantidad > 1 && (
															<span
																className="absolute -top-0.5 -right-0.5 rounded-full flex items-center justify-center font-bold text-white"
																style={{
																	backgroundColor: representante.color,
																	width: "14px",
																	height: "14px",
																	fontSize: "9px",
																	lineHeight: "1",
																	border: "1px solid white",
																}}
															>
																{cantidad}
															</span>
														)}
													</div>
												);
											})}
										</div>
									);
								})()}

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

