(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/interfaz/HuecoJugador.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const HuecoJugador = ({ estaOcupado, esLider, nomJugador, iconoJugador, onAgregarBot })=>{
    _s();
    const [hayBot, setHayBot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (hayBot) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-[#EEB716] w-60 h-60 rounded-4xl relative flex items-center justify-center text-white text-3xl font-bold font-sans",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: "Bot"
                }, void 0, false, {
                    fileName: "[project]/src/components/interfaz/HuecoJugador.tsx",
                    lineNumber: 25,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "absolute left-1/2 top-2/3 -translate-x-1/2 translate-y-6 text-xl font-bold underline font-sans",
                    onClick: ()=>setHayBot(false),
                    children: "Eliminar"
                }, void 0, false, {
                    fileName: "[project]/src/components/interfaz/HuecoJugador.tsx",
                    lineNumber: 26,
                    columnNumber: 16
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/interfaz/HuecoJugador.tsx",
            lineNumber: 23,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (!estaOcupado) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "bg-[#eab308] w-60 h-60 rounded-4xl flex flex-col items-center justify-center text-white text-3xl font-bold font-sans hover:bg-[#d4a107] transition-colors",
            onClick: ()=>{
                if (onAgregarBot) {
                    onAgregarBot();
                } else {
                    setHayBot(true);
                }
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: "+"
                }, void 0, false, {
                    fileName: "[project]/src/components/interfaz/HuecoJugador.tsx",
                    lineNumber: 49,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "Añadir Bot"
                }, void 0, false, {
                    fileName: "[project]/src/components/interfaz/HuecoJugador.tsx",
                    lineNumber: 50,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/interfaz/HuecoJugador.tsx",
            lineNumber: 39,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-[#eab308] w-60 h-60 rounded-4xl flex flex-col items-center justify-center relative",
        children: [
            esLider && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "-top-6 left-0 text-6xl text-white transform -rotate-12",
                children: "👑"
            }, void 0, false, {
                fileName: "[project]/src/components/interfaz/HuecoJugador.tsx",
                lineNumber: 58,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-full w-24 h-24 flex items-center justify-center mb-3 border-4 border-black overflow-hidden",
                children: iconoJugador ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: iconoJugador,
                    alt: nomJugador,
                    className: "w-full h-full"
                }, void 0, false, {
                    fileName: "[project]/src/components/interfaz/HuecoJugador.tsx",
                    lineNumber: 62,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full h-full bg-gray-300"
                }, void 0, false, {
                    fileName: "[project]/src/components/interfaz/HuecoJugador.tsx",
                    lineNumber: 64,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/interfaz/HuecoJugador.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-white text-3xl font-bold font-sans",
                children: nomJugador
            }, void 0, false, {
                fileName: "[project]/src/components/interfaz/HuecoJugador.tsx",
                lineNumber: 67,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/interfaz/HuecoJugador.tsx",
        lineNumber: 56,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
};
_s(HuecoJugador, "CjXVn+nWe3L2QjrS/0ILrSkFG9E=");
_c = HuecoJugador;
const __TURBOPACK__default__export__ = HuecoJugador;
var _c;
__turbopack_context__.k.register(_c, "HuecoJugador");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/interfaz/PopupSalirLobby.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PopupSalirLobby
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function PopupSalirLobby({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-[#263c85] border-2 border-[#EFB810] rounded-xl p-6 md:p-8 max-w-sm w-full shadow-2xl text-center text-white",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold mb-3",
                    children: "¿Abandonar sala?"
                }, void 0, false, {
                    fileName: "[project]/src/components/interfaz/PopupSalirLobby.tsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mb-8 text-gray-200",
                    children: "¿Estás seguro de que quieres abandonar el lobby?"
                }, void 0, false, {
                    fileName: "[project]/src/components/interfaz/PopupSalirLobby.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "flex-1 bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-md",
                            children: "No"
                        }, void 0, false, {
                            fileName: "[project]/src/components/interfaz/PopupSalirLobby.tsx",
                            lineNumber: 20,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onConfirm,
                            className: "flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-md",
                            children: "Sí, salir"
                        }, void 0, false, {
                            fileName: "[project]/src/components/interfaz/PopupSalirLobby.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/interfaz/PopupSalirLobby.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/interfaz/PopupSalirLobby.tsx",
            lineNumber: 14,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/interfaz/PopupSalirLobby.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = PopupSalirLobby;
var _c;
__turbopack_context__.k.register(_c, "PopupSalirLobby");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/interfaz/SelectorMazo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const SelectorMazo = ({ mazoSeleccionado, onMazoSeleccionado })=>{
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mazos = [
        "Mazo de Fuego",
        "Mazo de Agua",
        "Mazo de Tierra",
        "Mazo de Aire"
    ];
    // Cerrar al hacer clic fuera
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SelectorMazo.useEffect": ()=>{
            const handleClickOutside = {
                "SelectorMazo.useEffect.handleClickOutside": (event)=>{
                    if (menuRef.current && !menuRef.current.contains(event.target)) {
                        setIsOpen(false);
                    }
                }
            }["SelectorMazo.useEffect.handleClickOutside"];
            document.addEventListener("mousedown", handleClickOutside);
            return ({
                "SelectorMazo.useEffect": ()=>document.removeEventListener("mousedown", handleClickOutside)
            })["SelectorMazo.useEffect"];
        }
    }["SelectorMazo.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full",
        ref: menuRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsOpen(!isOpen),
                className: `w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-all shadow-md
          ${isOpen ? "border-white bg-[#283F9F]" : "border-yellow-400 bg-[#283F9F] hover:bg-[#283593]"}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-white font-bold",
                        children: mazoSeleccionado
                    }, void 0, false, {
                        fileName: "[project]/src/components/interfaz/SelectorMazo.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `text-white transition-transform duration-200 p-1 text-xl leading-none
            ${isOpen ? 'rotate-90' : 'rotate-0'}`,
                        children: "➔"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interfaz/SelectorMazo.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interfaz/SelectorMazo.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-full left-0 w-full mt-1 bg-[#283F9F] border-2 border-yellow-400 rounded-lg overflow-hidden z-[100] shadow-2xl animate-in slide-in-from-top-2 duration-150",
                children: mazos.map((mazo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `w-full text-left px-4 py-3 text-white font-semibold transition-colors
                ${mazo === mazoSeleccionado ? "bg-yellow-400 text-[#283F9F]" : "hover:bg-[#283593] border-b border-white/10 last:border-0"}`,
                        onClick: ()=>{
                            onMazoSeleccionado(mazo);
                            setIsOpen(false);
                        },
                        children: mazo
                    }, mazo, false, {
                        fileName: "[project]/src/components/interfaz/SelectorMazo.tsx",
                        lineNumber: 46,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/components/interfaz/SelectorMazo.tsx",
                lineNumber: 44,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/interfaz/SelectorMazo.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(SelectorMazo, "yIsVPXmGJnWJAXf4YKobPzEQ+oo=");
_c = SelectorMazo;
const __TURBOPACK__default__export__ = SelectorMazo;
var _c;
__turbopack_context__.k.register(_c, "SelectorMazo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/interfaz/SelectorTablero.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const SelectorTablero = ({ tableroSeleccionado, onTableroSeleccionado })=>{
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const listaTableros = [
        {
            id: "clasico",
            nombre: "Tablero Clásico"
        },
        {
            id: "oscuro",
            nombre: "Tablero Oscuro"
        },
        {
            id: "neon",
            nombre: "Tablero Neón"
        },
        {
            id: "retro",
            nombre: "Tablero Retro"
        }
    ];
    const seleccionarYSalir = (tableroId)=>{
        onTableroSeleccionado(tableroId);
        setIsOpen(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: ()=>setIsOpen(true),
                className: "group bg-[#283F9F] border-[2px] border-[#EFB810] rounded-xl p-3 w-full aspect-square max-h-[220px] flex flex-col items-center shadow-lg cursor-pointer transition-all z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-bold text-xl text-white mb-2 self-start ml-1",
                        children: "Tablero"
                    }, void 0, false, {
                        fileName: "[project]/src/components/interfaz/SelectorTablero.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full flex-1 bg-white rounded-sm shadow-inner relative overflow-hidden flex flex-col items-center justify-center border border-black/10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-6xl transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-200 select-none",
                            children: "✏️"
                        }, void 0, false, {
                            fileName: "[project]/src/components/interfaz/SelectorTablero.tsx",
                            lineNumber: 41,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/interfaz/SelectorTablero.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interfaz/SelectorTablero.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-50 flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
                        onClick: ()=>setIsOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/src/components/interfaz/SelectorTablero.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative bg-[#283F9F] border-4 border-yellow-400 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col max-w-4xl w-full max-h-[85%] animate-in zoom-in-95 duration-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-white text-2xl font-bold uppercase tracking-wide",
                                        children: "Selecciona un Tablero"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/interfaz/SelectorTablero.tsx",
                                        lineNumber: 60,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsOpen(false),
                                        className: "text-white/40 hover:text-white font-bold text-2xl transition-colors",
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/interfaz/SelectorTablero.tsx",
                                        lineNumber: 61,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/interfaz/SelectorTablero.tsx",
                                lineNumber: 59,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 gap-6 overflow-y-auto p-2 pr-4 flex-1 custom-scroll",
                                children: listaTableros.map((tablero)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>seleccionarYSalir(tablero.id),
                                        className: `cursor-pointer rounded-2xl p-3 border-4 transition-all flex flex-col ${tablero.id === tableroSeleccionado ? "border-yellow-400 bg-yellow-400/10 scale-[1.02]" : "border-transparent bg-white/5 hover:bg-white/10"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full aspect-video bg-white rounded-lg shadow-md border border-gray-200 flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-200 font-bold text-[10px] uppercase tracking-widest",
                                                    children: "Vista Previa"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/interfaz/SelectorTablero.tsx",
                                                    lineNumber: 83,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/interfaz/SelectorTablero.tsx",
                                                lineNumber: 82,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "pt-4 text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: `font-bold text-lg ${tablero.id === tableroSeleccionado ? "text-yellow-400" : "text-white"}`,
                                                        children: tablero.nombre
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/interfaz/SelectorTablero.tsx",
                                                        lineNumber: 90,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    tablero.id === tableroSeleccionado && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-yellow-400 font-bold uppercase",
                                                        children: "Seleccionado"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/interfaz/SelectorTablero.tsx",
                                                        lineNumber: 94,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/interfaz/SelectorTablero.tsx",
                                                lineNumber: 89,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, tablero.id, true, {
                                        fileName: "[project]/src/components/interfaz/SelectorTablero.tsx",
                                        lineNumber: 72,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/components/interfaz/SelectorTablero.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/interfaz/SelectorTablero.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interfaz/SelectorTablero.tsx",
                lineNumber: 49,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_s(SelectorTablero, "+sus0Lb0ewKHdwiUhiTAJFoFyQ0=");
_c = SelectorTablero;
const __TURBOPACK__default__export__ = SelectorTablero;
var _c;
__turbopack_context__.k.register(_c, "SelectorTablero");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useLobby.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLobby",
    ()=>useLobby
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$lobbies$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/lobbies.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$userContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/userContext.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const useLobby = ()=>{
    _s();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$userContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["userContext"]);
    const username = context?.username;
    const [lobby, setLobby] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const crearLobby = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLobby.useCallback[crearLobby]": async ()=>{
            if (!username) {
                setError('Usuario no autenticado');
                return null;
            }
            setLoading(true);
            setError(null);
            try {
                const nuevoLobby = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$lobbies$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LobbiesService"].crearLobby(username);
                setLobby(nuevoLobby);
                return nuevoLobby;
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
                setError(errorMessage);
                return null;
            } finally{
                setLoading(false);
            }
        }
    }["useLobby.useCallback[crearLobby]"], [
        username
    ]);
    const obtenerLobby = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLobby.useCallback[obtenerLobby]": async (lobbyId)=>{
            setLoading(true);
            setError(null);
            try {
                const lobbyData = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$lobbies$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LobbiesService"].obtenerLobby(lobbyId);
                setLobby(lobbyData);
                return lobbyData;
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
                setError(errorMessage);
                return null;
            } finally{
                setLoading(false);
            }
        }
    }["useLobby.useCallback[obtenerLobby]"], []);
    const obtenerLobbyDeJugador = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLobby.useCallback[obtenerLobbyDeJugador]": async ()=>{
            if (!username) {
                return null;
            }
            setLoading(true);
            setError(null);
            try {
                const lobbyData = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$lobbies$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LobbiesService"].obtenerLobbyDeJugador(username);
                if (lobbyData) {
                    setLobby(lobbyData);
                }
                return lobbyData;
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
                setError(errorMessage);
                return null;
            } finally{
                setLoading(false);
            }
        }
    }["useLobby.useCallback[obtenerLobbyDeJugador]"], [
        username
    ]);
    const enviarInvitacion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLobby.useCallback[enviarInvitacion]": async (lobbyId, inviteFor)=>{
            if (!username) {
                setError('Usuario no autenticado');
                return false;
            }
            setLoading(true);
            setError(null);
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$lobbies$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LobbiesService"].enviarInvitacion(lobbyId, username, inviteFor);
                return true;
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
                setError(errorMessage);
                return false;
            } finally{
                setLoading(false);
            }
        }
    }["useLobby.useCallback[enviarInvitacion]"], [
        username
    ]);
    const responderInvitacion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLobby.useCallback[responderInvitacion]": async (lobbyId, inviteFrom, accept)=>{
            if (!username) {
                setError('Usuario no autenticado');
                return null;
            }
            setLoading(true);
            setError(null);
            try {
                const resultado = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$lobbies$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LobbiesService"].responderInvitacion(lobbyId, {
                    inviteFor: username,
                    inviteFrom,
                    accept
                });
                if ('idLobby' in resultado) {
                    setLobby(resultado);
                }
                return resultado;
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
                setError(errorMessage);
                return null;
            } finally{
                setLoading(false);
            }
        }
    }["useLobby.useCallback[responderInvitacion]"], [
        username
    ]);
    const agregarBot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLobby.useCallback[agregarBot]": async (lobbyId)=>{
            if (!username) {
                setError('Usuario no autenticado');
                return null;
            }
            setLoading(true);
            setError(null);
            try {
                const lobbyActualizado = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$lobbies$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LobbiesService"].agregarBot(lobbyId, username);
                setLobby(lobbyActualizado);
                return lobbyActualizado;
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
                setError(errorMessage);
                return null;
            } finally{
                setLoading(false);
            }
        }
    }["useLobby.useCallback[agregarBot]"], [
        username
    ]);
    const seleccionarMazo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLobby.useCallback[seleccionarMazo]": async (lobbyId, deckName)=>{
            if (!username) {
                setError('Usuario no autenticado');
                return null;
            }
            setLoading(true);
            setError(null);
            try {
                const lobbyActualizado = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$lobbies$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LobbiesService"].seleccionarMazo(lobbyId, username, deckName);
                setLobby(lobbyActualizado);
                return lobbyActualizado;
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
                setError(errorMessage);
                return null;
            } finally{
                setLoading(false);
            }
        }
    }["useLobby.useCallback[seleccionarMazo]"], [
        username
    ]);
    const marcarListo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLobby.useCallback[marcarListo]": async (lobbyId, ready)=>{
            if (!username) {
                setError('Usuario no autenticado');
                return null;
            }
            setLoading(true);
            setError(null);
            try {
                const lobbyActualizado = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$lobbies$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LobbiesService"].marcarListo(lobbyId, username, ready);
                setLobby(lobbyActualizado);
                return lobbyActualizado;
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
                setError(errorMessage);
                return null;
            } finally{
                setLoading(false);
            }
        }
    }["useLobby.useCallback[marcarListo]"], [
        username
    ]);
    const cambiarTablero = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLobby.useCallback[cambiarTablero]": async (lobbyId, boardName)=>{
            if (!username) {
                setError('Usuario no autenticado');
                return null;
            }
            setLoading(true);
            setError(null);
            try {
                const lobbyActualizado = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$lobbies$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LobbiesService"].cambiarTablero(lobbyId, username, boardName);
                setLobby(lobbyActualizado);
                return lobbyActualizado;
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
                setError(errorMessage);
                return null;
            } finally{
                setLoading(false);
            }
        }
    }["useLobby.useCallback[cambiarTablero]"], [
        username
    ]);
    const eliminarJugador = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLobby.useCallback[eliminarJugador]": async (lobbyId, playerUsername)=>{
            if (!username) {
                setError('Usuario no autenticado');
                return null;
            }
            setLoading(true);
            setError(null);
            try {
                const lobbyActualizado = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$lobbies$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LobbiesService"].eliminarJugador(lobbyId, playerUsername, username);
                setLobby(lobbyActualizado);
                return lobbyActualizado;
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
                setError(errorMessage);
                return null;
            } finally{
                setLoading(false);
            }
        }
    }["useLobby.useCallback[eliminarJugador]"], [
        username
    ]);
    const limpiarError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLobby.useCallback[limpiarError]": ()=>{
            setError(null);
        }
    }["useLobby.useCallback[limpiarError]"], []);
    const limpiarLobby = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLobby.useCallback[limpiarLobby]": ()=>{
            setLobby(null);
        }
    }["useLobby.useCallback[limpiarLobby]"], []);
    return {
        lobby,
        loading,
        error,
        crearLobby,
        obtenerLobby,
        obtenerLobbyDeJugador,
        enviarInvitacion,
        responderInvitacion,
        agregarBot,
        seleccionarMazo,
        marcarListo,
        cambiarTablero,
        eliminarJugador,
        limpiarError,
        limpiarLobby
    };
};
_s(useLobby, "6Dvvq5GPXxW1nd84gVuJKpRSdig=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/juego/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>JuegoPrincipalPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interfaz$2f$HuecoJugador$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/interfaz/HuecoJugador.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interfaz$2f$PopupSalirLobby$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/interfaz/PopupSalirLobby.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interfaz$2f$SelectorMazo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/interfaz/SelectorMazo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interfaz$2f$SelectorTablero$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/interfaz/SelectorTablero.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLobby$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useLobby.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$userContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/userContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
function JuegoPrincipalPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Extraemos directamente el username real del contexto (puede ser string | null aquí)
    const { username } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$userContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"])();
    const { lobby, loading, error, crearLobby, obtenerLobby, obtenerLobbyDeJugador, marcarListo, seleccionarMazo, cambiarTablero, eliminarJugador, agregarBot, limpiarError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLobby$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLobby"])();
    const [mostrarPopupSalir, setMostrarPopupSalir] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mazoElegido, setMazoElegido] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Mazo de Fuego");
    const [tableroElegido, setTableroElegido] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Tablero 1");
    const [lobbyId, setLobbyId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [miPosicion, setMiPosicion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [estoyListo, setEstoyListo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const inicializadoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "JuegoPrincipalPage.useEffect": ()=>{
            const inicializarLobby = {
                "JuegoPrincipalPage.useEffect.inicializarLobby": async ()=>{
                    if (!username) return;
                    if (inicializadoRef.current) return; // evitar doble ejecución
                    inicializadoRef.current = true;
                    const params = new URLSearchParams(window.location.search);
                    const lobbyIdParam = params.get('lobbyId');
                    if (lobbyIdParam) {
                        await obtenerLobby(lobbyIdParam);
                        setLobbyId(lobbyIdParam);
                    } else {
                        // Primero comprobar si el jugador ya está en un lobby
                        const lobbyExistente = await obtenerLobbyDeJugador();
                        if (lobbyExistente) {
                            setLobbyId(lobbyExistente.idLobby);
                        } else {
                            // No está en ningún lobby, crear uno nuevo
                            const nuevoLobby = await crearLobby();
                            if (nuevoLobby) {
                                setLobbyId(nuevoLobby.idLobby);
                            }
                        }
                    }
                }
            }["JuegoPrincipalPage.useEffect.inicializarLobby"];
            inicializarLobby();
        }
    }["JuegoPrincipalPage.useEffect"], [
        username,
        crearLobby,
        obtenerLobby,
        obtenerLobbyDeJugador
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "JuegoPrincipalPage.useEffect": ()=>{
            if (lobby && username) {
                const posicion = lobby.jugadores.findIndex({
                    "JuegoPrincipalPage.useEffect.posicion": (j)=>j.nombre === username
                }["JuegoPrincipalPage.useEffect.posicion"]);
                if (posicion !== -1) {
                    setMiPosicion(posicion);
                }
            }
        }
    }["JuegoPrincipalPage.useEffect"], [
        lobby,
        username
    ]);
    // -------------------------------------------------------------------
    // BARRERA DE SEGURIDAD PARA TYPESCRIPT (¡Y PARA USUARIOS NO LOGUEADOS!)
    // Tiene que ir siempre DESPUÉS de todos los hooks.
    if (!username) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full h-screen flex flex-col items-center justify-center bg-[#0a0f2c] text-white",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold mb-4",
                    children: "No estás conectado"
                }, void 0, false, {
                    fileName: "[project]/src/app/juego/page.tsx",
                    lineNumber: 89,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mb-6 text-gray-300",
                    children: "Debes iniciar sesión para entrar al lobby."
                }, void 0, false, {
                    fileName: "[project]/src/app/juego/page.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>router.push('/'),
                    className: "bg-blue-600 hover:bg-blue-500 font-bold py-3 px-6 rounded-lg transition-colors shadow-lg",
                    children: "Ir al Login"
                }, void 0, false, {
                    fileName: "[project]/src/app/juego/page.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/juego/page.tsx",
            lineNumber: 88,
            columnNumber: 7
        }, this);
    }
    // A partir de aquí, TypeScript sabe 100% que 'username' es un string válido
    // -------------------------------------------------------------------
    const huecos = [
        lobby?.jugadores[0],
        lobby?.jugadores[1],
        lobby?.jugadores[2],
        lobby?.jugadores[3]
    ];
    const manejarAgregarBot = async ()=>{
        if (lobbyId && lobby?.idCreador === username) {
            await agregarBot(lobbyId);
        }
    };
    const manejarCambioMazo = async (nuevoMazo)=>{
        setMazoElegido(nuevoMazo);
        if (lobbyId) {
            await seleccionarMazo(lobbyId, nuevoMazo);
        }
    };
    const manejarCambioTablero = async (nuevoTablero)=>{
        setTableroElegido(nuevoTablero);
        if (lobbyId) {
            await cambiarTablero(lobbyId, nuevoTablero);
        }
    };
    const manejarMarcarListo = async ()=>{
        if (lobbyId) {
            await marcarListo(lobbyId, !estoyListo);
            setEstoyListo(!estoyListo);
        }
    };
    const manejarSalida = async ()=>{
        if (lobbyId) {
            await eliminarJugador(lobbyId, username);
            setMostrarPopupSalir(false);
            router.push('/juego');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "w-full h-full flex flex-col p-4 md:p-8 overflow-y-auto relative",
        children: [
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded mb-4 flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/app/juego/page.tsx",
                        lineNumber: 150,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: limpiarError,
                        className: "text-red-200 hover:text-red-100",
                        children: "✕"
                    }, void 0, false, {
                        fileName: "[project]/src/app/juego/page.tsx",
                        lineNumber: 151,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/juego/page.tsx",
                lineNumber: 149,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interfaz$2f$PopupSalirLobby$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: mostrarPopupSalir,
                onClose: ()=>setMostrarPopupSalir(false),
                onConfirm: manejarSalida
            }, void 0, false, {
                fileName: "[project]/src/app/juego/page.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex justify-center items-center text-3xl mb-2 shrink-0 text-white h-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setMostrarPopupSalir(true),
                        className: "absolute left-0 text-gray-200 hover:text-white hover:scale-110 transition-all cursor-pointer",
                        title: "Abandonar Lobby",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            strokeWidth: 2.5,
                            stroke: "red",
                            className: "w-9 h-9",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                d: "M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                            }, void 0, false, {
                                fileName: "[project]/src/app/juego/page.tsx",
                                lineNumber: 168,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/juego/page.tsx",
                            lineNumber: 167,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/juego/page.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center items-center gap-12 text-3xl mb-2 shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "flex underline font-bold cursor-pointer",
                                children: "Crear Partida"
                            }, void 0, false, {
                                fileName: "[project]/src/app/juego/page.tsx",
                                lineNumber: 173,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/juego/continuarpartida",
                                className: "text-center font-bold hover:text-gray-300",
                                children: "Continuar"
                            }, void 0, false, {
                                fileName: "[project]/src/app/juego/page.tsx",
                                lineNumber: 174,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/juego/page.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this),
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute right-0 text-gray-300 text-sm",
                        children: "Cargando..."
                    }, void 0, false, {
                        fileName: "[project]/src/app/juego/page.tsx",
                        lineNumber: 179,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/juego/page.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center flex-1 gap-4 md:gap-12 w-full max-w-6xl mx-auto min-h-0 mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col justify-center gap-4 h-full w-full max-w-[300px] min-h-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-h-0 flex flex-col justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interfaz$2f$HuecoJugador$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    estaOcupado: !!huecos[0],
                                    esLider: huecos[0]?.nombre === lobby?.idCreador,
                                    nomJugador: huecos[0]?.nombre,
                                    iconoJugador: huecos[0]?.icono,
                                    onAgregarBot: lobby?.idCreador === username ? manejarAgregarBot : undefined
                                }, void 0, false, {
                                    fileName: "[project]/src/app/juego/page.tsx",
                                    lineNumber: 186,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/juego/page.tsx",
                                lineNumber: 185,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-h-0 flex flex-col justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interfaz$2f$HuecoJugador$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    estaOcupado: !!huecos[1],
                                    esLider: huecos[1]?.nombre === lobby?.idCreador,
                                    nomJugador: huecos[1]?.nombre,
                                    iconoJugador: huecos[1]?.icono,
                                    onAgregarBot: lobby?.idCreador === username ? manejarAgregarBot : undefined
                                }, void 0, false, {
                                    fileName: "[project]/src/app/juego/page.tsx",
                                    lineNumber: 195,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/juego/page.tsx",
                                lineNumber: 194,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/juego/page.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center justify-center gap-4 min-w-[200px] w-full max-w-[250px] shrink-0 text-white h-full overflow-y-auto py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interfaz$2f$SelectorMazo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                mazoSeleccionado: mazoElegido,
                                onMazoSeleccionado: manejarCambioMazo
                            }, void 0, false, {
                                fileName: "[project]/src/app/juego/page.tsx",
                                lineNumber: 206,
                                columnNumber: 11
                            }, this),
                            lobby?.idCreador === username && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interfaz$2f$SelectorTablero$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                tableroSeleccionado: tableroElegido,
                                onTableroSeleccionado: manejarCambioTablero
                            }, void 0, false, {
                                fileName: "[project]/src/app/juego/page.tsx",
                                lineNumber: 212,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `w-full font-bold py-3 px-4 rounded-lg border-[#EFB810] border-white shadow-lg text-lg mt-2 transition-colors ${estoyListo ? 'bg-green-600 hover:bg-green-500' : 'bg-[#2078B4] hover:bg-[#00aeb5]'} text-white`,
                                onClick: manejarMarcarListo,
                                disabled: loading,
                                children: estoyListo ? '✓ Listo' : 'Marcar como Listo'
                            }, void 0, false, {
                                fileName: "[project]/src/app/juego/page.tsx",
                                lineNumber: 218,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "w-full bg-[#2078B4] hover:bg-[#00aeb5] text-white font-bold py-3 px-4 rounded-lg border-[#EFB810] border-white shadow-lg text-lg transition-colors disabled:opacity-50",
                                onClick: ()=>router.push('/partida'),
                                disabled: loading || !estoyListo,
                                children: "Comenzar Partida"
                            }, void 0, false, {
                                fileName: "[project]/src/app/juego/page.tsx",
                                lineNumber: 229,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/juego/page.tsx",
                        lineNumber: 205,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col justify-center gap-4 h-full w-full max-w-[300px] min-h-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-h-0 flex flex-col justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interfaz$2f$HuecoJugador$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    estaOcupado: !!huecos[2],
                                    esLider: huecos[2]?.nombre === lobby?.idCreador,
                                    nomJugador: huecos[2]?.nombre,
                                    iconoJugador: huecos[2]?.icono,
                                    onAgregarBot: lobby?.idCreador === username ? manejarAgregarBot : undefined
                                }, void 0, false, {
                                    fileName: "[project]/src/app/juego/page.tsx",
                                    lineNumber: 240,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/juego/page.tsx",
                                lineNumber: 239,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-h-0 flex flex-col justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interfaz$2f$HuecoJugador$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    estaOcupado: !!huecos[3],
                                    esLider: huecos[3]?.nombre === lobby?.idCreador,
                                    nomJugador: huecos[3]?.nombre,
                                    iconoJugador: huecos[3]?.icono,
                                    onAgregarBot: lobby?.idCreador === username ? manejarAgregarBot : undefined
                                }, void 0, false, {
                                    fileName: "[project]/src/app/juego/page.tsx",
                                    lineNumber: 249,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/juego/page.tsx",
                                lineNumber: 248,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/juego/page.tsx",
                        lineNumber: 238,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/juego/page.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/juego/page.tsx",
        lineNumber: 147,
        columnNumber: 5
    }, this);
}
_s(JuegoPrincipalPage, "KnwiQrfO2PUpdQy67KOAPB+CdJM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$userContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLobby$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLobby"]
    ];
});
_c = JuegoPrincipalPage;
var _c;
__turbopack_context__.k.register(_c, "JuegoPrincipalPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_b0163b51._.js.map