(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/interfaz/CajaLista.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CajaLista",
    ()=>CajaLista,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
{}const CajaLista = ({ children })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-[#283F9F] border-amber-400 border-2 rounded-lg shadow-md p-4 mb-4",
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/interfaz/CajaLista.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = CajaLista;
const __TURBOPACK__default__export__ = CajaLista;
var _c;
__turbopack_context__.k.register(_c, "CajaLista");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/interfaz/SlotLogro.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SlotLogro",
    ()=>SlotLogro,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interfaz$2f$CajaLista$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/interfaz/CajaLista.tsx [app-client] (ecmascript)");
"use client";
;
;
const SlotLogro = (props)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interfaz$2f$CajaLista$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex text-white justify-between items-center font-bold",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold",
                            children: props.nombreLogro
                        }, void 0, false, {
                            fileName: "[project]/src/components/interfaz/SlotLogro.tsx",
                            lineNumber: 16,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: props.descripciónLogro
                        }, void 0, false, {
                            fileName: "[project]/src/components/interfaz/SlotLogro.tsx",
                            lineNumber: 17,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Progreso: ",
                                props.progresoLogro,
                                "/",
                                props.metaLogro
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/interfaz/SlotLogro.tsx",
                            lineNumber: 18,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/interfaz/SlotLogro.tsx",
                    lineNumber: 15,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center justify-end",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Recompensa"
                        }, void 0, false, {
                            fileName: "[project]/src/components/interfaz/SlotLogro.tsx",
                            lineNumber: 21,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: props.recompensaLogro
                        }, void 0, false, {
                            fileName: "[project]/src/components/interfaz/SlotLogro.tsx",
                            lineNumber: 22,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/interfaz/SlotLogro.tsx",
                    lineNumber: 20,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/interfaz/SlotLogro.tsx",
            lineNumber: 14,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/interfaz/SlotLogro.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = SlotLogro;
const __TURBOPACK__default__export__ = SlotLogro;
var _c;
__turbopack_context__.k.register(_c, "SlotLogro");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/logros.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LogrosService",
    ()=>LogrosService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const LogrosService = {
    // 1. Obtenemos las estadísticas del usuario
    getUserStats: async (email)=>{
        const response = await fetch(`${API_URL}/users/${email}/stats`, {
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Error al obtener estadísticas');
        return response.json();
    },
    // 2. Obtenemos todos los logros disponibles en el juego
    // Nota: Asumo que tienes esta ruta en api/achievements o similar
    getGlobalAchievements: async ()=>{
        const response = await fetch(`${API_URL}/achievements/all`); // Ajustar según tu ruta real
        if (!response.ok) return []; // Fallback si no existe la ruta aún
        return response.json();
    },
    // 3. Reclamar un logro (POST que tienes en userRoutes.js)
    reclamarLogro: async (email, achievementId)=>{
        const response = await fetch(`${API_URL}/users/${email}/achievements`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                achievement_id: achievementId
            })
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'No cumples los requisitos');
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useLogros.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLogros",
    ()=>useLogros
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$logros$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/logros.service.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const useLogros = (email)=>{
    _s();
    const [logros, setLogros] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchLogros = async ()=>{
        try {
            setIsLoading(true);
            const [stats, globalLogros] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$logros$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LogrosService"].getUserStats(email),
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$logros$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LogrosService"].getGlobalAchievements()
            ]);
            const logrosProcesados = globalLogros.map((l)=>{
                let progreso = 0;
                // Ajustamos las keys para que coincidan con la respuesta real del servidor
                switch(l.tipo){
                    case 'Victorias':
                        progreso = stats.victorias || 0;
                        break;
                    case 'Partidas':
                        progreso = stats.PartidasJugadas || 0;
                        break;
                    case 'SEP':
                        progreso = stats.SEP || 0;
                        break;
                    case 'CartasJugadas':
                        progreso = stats.CartasJugadas || 0;
                        break;
                    default:
                        progreso = 0;
                }
                return {
                    id: l.id || '',
                    nombreLogro: l.nombre || 'Logro Desconocido',
                    descripcionLogro: l.descripcion || '',
                    progresoLogro: progreso,
                    metaLogro: l.requisito || 0,
                    recompensaLogro: l.recompensa || 'Sin recompensa',
                    // Ahora TypeScript ya sabe qué es LogrosCompletados
                    completado: stats.LogrosCompletados?.includes(l.nombre || '') || false
                };
            });
            setLogros(logrosProcesados);
        } catch (err) {
            setError(err.message || 'Error al cargar los logros');
        } finally{
            setIsLoading(false);
        }
    };
    const reclamar = async (id)=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$logros$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LogrosService"].reclamarLogro(email, id);
            await fetchLogros(); // Refrescamos la lista
            return true;
        } catch (err) {
            alert(err.message);
            return false;
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useLogros.useEffect": ()=>{
            if (email) fetchLogros();
        }
    }["useLogros.useEffect"], [
        email
    ]);
    return {
        logros,
        isLoading,
        error,
        reclamar
    };
};
_s(useLogros, "a47Rb5EDhrC88OvkJPP9KgicZXU=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/juego/logros/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interfaz$2f$SlotLogro$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/interfaz/SlotLogro.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLogros$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useLogros.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$userContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/userContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function Home() {
    _s();
    const { userEmail } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$userContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"])();
    const { logros, isLoading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLogros$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLogros"])(userEmail || '');
    if (!userEmail) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-white text-center mt-10 text-2xl w-full font-bold",
            children: "Por favor, inicia sesión para ver tus logros."
        }, void 0, false, {
            fileName: "[project]/src/app/juego/logros/page.tsx",
            lineNumber: 13,
            columnNumber: 12
        }, this);
    }
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-white text-center mt-10 text-2xl w-full font-bold",
            children: "Cargando logros..."
        }, void 0, false, {
            fileName: "[project]/src/app/juego/logros/page.tsx",
            lineNumber: 17,
            columnNumber: 12
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "w-full h-full flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-red-500 text-center text-xl font-bold uppercase",
                children: [
                    "Error de la API: ",
                    error
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/juego/logros/page.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/juego/logros/page.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "w-full h-full flex flex-col p-4 md:p-8 overflow-y-auto ",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center text-white text-3xl font-bold shrink-0 mb-8 ",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    children: [
                        "Logros (",
                        logros.length,
                        ")"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/juego/logros/page.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/juego/logros/page.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-4 ",
                children: logros.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-400 mt-4 text-center text-lg font-bold",
                    children: "No tienes logros disponibles o la lista está vacía."
                }, void 0, false, {
                    fileName: "[project]/src/app/juego/logros/page.tsx",
                    lineNumber: 36,
                    columnNumber: 11
                }, this) : logros.map((logro)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$interfaz$2f$SlotLogro$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        nombreLogro: logro.nombreLogro,
                        descripciónLogro: logro.descripcionLogro,
                        progresoLogro: logro.progresoLogro,
                        metaLogro: logro.metaLogro,
                        recompensaLogro: logro.recompensaLogro
                    }, logro.id, false, {
                        fileName: "[project]/src/app/juego/logros/page.tsx",
                        lineNumber: 39,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/juego/logros/page.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/juego/logros/page.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(Home, "dvXxEmPeLYtOq4ZUKiZHCgC9Qn8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$userContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLogros$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLogros"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_92206302._.js.map