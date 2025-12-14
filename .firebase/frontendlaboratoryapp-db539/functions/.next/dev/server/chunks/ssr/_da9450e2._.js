module.exports = [
"[project]/components/WordSearch/WordSearch.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WordSearch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const defaultGrid = [
    [
        'K',
        'O',
        'T',
        'A'
    ],
    [
        'A',
        'L',
        'A',
        'M'
    ],
    [
        'P',
        'I',
        'E',
        'S'
    ],
    [
        'D',
        'O',
        'M',
        'Y'
    ]
];
const defaultWords = [
    "KOT",
    "PIES",
    "DOM",
    "ALA"
];
function WordSearch({ grid, words, level: externalLevel, onLevelChange, cellSize = 48, fontSize = "text-lg", selectedColor = "bg-blue-500", foundColor = "bg-green-600", borderColor = "border-gray-400" }) {
    const board = grid || defaultGrid;
    const dictionary = words || defaultWords;
    const [internalLevel, setInternalLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const level = externalLevel ?? internalLevel;
    const [selectedCells, setSelectedCells] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [startCell, setStartCell] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [foundWords, setFoundWords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [foundCells, setFoundCells] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [uiCellSize, setUiCellSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(cellSize);
    const [uiSelectedColor, setUiSelectedColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(selectedColor);
    const [uiFoundColor, setUiFoundColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(foundColor);
    const getDirection = (start, end)=>{
        const dx = end.col - start.col;
        const dy = end.row - start.row;
        if (dx === 0) return {
            dx: 0,
            dy: Math.sign(dy)
        }; // pion
        if (dy === 0) return {
            dx: Math.sign(dx),
            dy: 0
        }; // poziom
        if (Math.abs(dx) === Math.abs(dy)) {
            return {
                dx: Math.sign(dx),
                dy: Math.sign(dy)
            }; // przekątna
        }
        return null;
    };
    const buildSelection = (start, end)=>{
        const dir = getDirection(start, end);
        if (!dir) return [];
        const cells = [];
        let r = start.row;
        let c = start.col;
        while(true){
            cells.push({
                row: r,
                col: c
            });
            if (r === end.row && c === end.col) break;
            r += dir.dy;
            c += dir.dx;
        }
        return cells;
    };
    const handleMouseDown = (row, col)=>{
        setIsDragging(true);
        setStartCell({
            row,
            col
        });
        setSelectedCells([
            {
                row,
                col
            }
        ]);
    };
    const handleMouseEnter = (row, col)=>{
        if (!isDragging || !startCell) return;
        const newSelection = buildSelection(startCell, {
            row,
            col
        });
        if (newSelection.length) {
            setSelectedCells(newSelection);
        }
    };
    const getSelectedWord = ()=>{
        return selectedCells.map((cell)=>board[cell.row][cell.col]).join("");
    };
    const handleMouseUp = ()=>{
        if (!selectedCells.length) return;
        const word = getSelectedWord();
        if (dictionary.includes(word) && !foundWords.includes(word)) {
            setFoundWords([
                ...foundWords,
                word
            ]);
            setFoundCells((prev)=>[
                    ...prev,
                    ...selectedCells
                ]);
        }
        setSelectedCells([]);
        setIsDragging(false);
        setStartCell(null);
    };
    const isSelected = (row, col)=>selectedCells.some((c)=>c.row === row && c.col === col);
    const isFound = (row, col)=>foundCells.some((c)=>c.row === row && c.col === col);
    const resetGame = ()=>{
        setSelectedCells([]);
        setFoundCells([]);
        setFoundWords([]);
        setIsDragging(false);
        setStartCell(null);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        resetGame();
    }, [
        level,
        grid,
        words
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onMouseUp: handleMouseUp,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-xl font-bold mb-4",
                children: "Wykreślanka"
            }, void 0, false, {
                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 flex gap-2",
                children: [
                    1,
                    2,
                    3
                ].map((lvl)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            if (onLevelChange) {
                                onLevelChange(lvl);
                            } else {
                                setInternalLevel(lvl);
                            }
                        },
                        className: `px-4 py-2 rounded font-semibold transition ${level === lvl ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`,
                        children: [
                            "Level ",
                            lvl
                        ]
                    }, lvl, true, {
                        fileName: "[project]/components/WordSearch/WordSearch.jsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: resetGame,
                className: "mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition",
                children: "Resetuj wykreślankę"
            }, void 0, false, {
                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                lineNumber: 148,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 p-4 border rounded bg-gray-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold mb-3",
                        children: "Ustawienia wyglądu"
                    }, void 0, false, {
                        fileName: "[project]/components/WordSearch/WordSearch.jsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-4 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Rozmiar pola:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                        lineNumber: 160,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "range",
                                        min: "32",
                                        max: "80",
                                        value: uiCellSize,
                                        onChange: (e)=>setUiCellSize(Number(e.target.value))
                                    }, void 0, false, {
                                        fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                        lineNumber: 161,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Kolor zaznaczenia:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                        lineNumber: 171,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: uiSelectedColor,
                                        onChange: (e)=>setUiSelectedColor(e.target.value),
                                        className: "border p-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "bg-blue-500",
                                                children: "Niebieski"
                                            }, void 0, false, {
                                                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                                lineNumber: 177,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "bg-red-500",
                                                children: "Czerwony"
                                            }, void 0, false, {
                                                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                                lineNumber: 178,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "bg-purple-500",
                                                children: "Fioletowy"
                                            }, void 0, false, {
                                                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                                lineNumber: 179,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "bg-yellow-500",
                                                children: "Żółty"
                                            }, void 0, false, {
                                                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                                lineNumber: 180,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                        lineNumber: 172,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Kolor znalezionych:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                        lineNumber: 185,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: uiFoundColor,
                                        onChange: (e)=>setUiFoundColor(e.target.value),
                                        className: "border p-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "bg-green-600",
                                                children: "Zielony"
                                            }, void 0, false, {
                                                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                                lineNumber: 191,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "bg-emerald-600",
                                                children: "Szmaragdowy"
                                            }, void 0, false, {
                                                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                                lineNumber: 192,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "bg-teal-600",
                                                children: "Turkusowy"
                                            }, void 0, false, {
                                                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                                lineNumber: 193,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                        lineNumber: 186,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/WordSearch/WordSearch.jsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                lineNumber: 155,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-1",
                style: {
                    gridTemplateColumns: `repeat(${board.length}, ${uiCellSize}px)`
                },
                children: board.map((row, rowIndex)=>row.map((letter, colIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onMouseDown: ()=>handleMouseDown(rowIndex, colIndex),
                            onMouseEnter: ()=>handleMouseEnter(rowIndex, colIndex),
                            className: `
                flex items-center justify-center
                border font-bold cursor-pointer select-none
                ${fontSize}
                ${borderColor}
                ${isFound(rowIndex, colIndex) ? `${uiFoundColor} text-white` : isSelected(rowIndex, colIndex) ? `${uiSelectedColor} text-white` : "bg-white"}
              `,
                            style: {
                                width: uiCellSize,
                                height: uiCellSize
                            },
                            children: letter
                        }, `${rowIndex}-${colIndex}`, false, {
                            fileName: "[project]/components/WordSearch/WordSearch.jsx",
                            lineNumber: 205,
                            columnNumber: 13
                        }, this)))
            }, void 0, false, {
                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                lineNumber: 199,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold mb-2",
                        children: "Słowa do znalezienia:"
                    }, void 0, false, {
                        fileName: "[project]/components/WordSearch/WordSearch.jsx",
                        lineNumber: 231,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "flex gap-4 flex-wrap",
                        children: dictionary.map((w)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: foundWords.includes(w) ? "line-through text-green-600 font-bold" : "text-gray-700",
                                children: w
                            }, w, false, {
                                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                lineNumber: 234,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/WordSearch/WordSearch.jsx",
                        lineNumber: 232,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                lineNumber: 230,
                columnNumber: 7
            }, this),
            foundWords.length === dictionary.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded text-center font-bold",
                children: "🎉 Gratulacje! Wszystkie słowa zostały znalezione!"
            }, void 0, false, {
                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                lineNumber: 249,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/WordSearch/WordSearch.jsx",
        lineNumber: 125,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/data/wordSearches.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "wordSearches",
    ()=>wordSearches
]);
const wordSearches = {
    level1: {
        grid: [
            [
                'K',
                'O',
                'T',
                'A'
            ],
            [
                'A',
                'L',
                'A',
                'M'
            ],
            [
                'P',
                'I',
                'E',
                'S'
            ],
            [
                'D',
                'O',
                'M',
                'Y'
            ]
        ],
        words: [
            'KOT',
            'PIES',
            'DOM',
            'ALA'
        ]
    },
    level2: {
        grid: [
            [
                'J',
                'A',
                'J',
                'K',
                'O',
                'X'
            ],
            [
                'X',
                'A',
                'X',
                'X',
                'X',
                'X'
            ],
            [
                'B',
                'A',
                'B',
                'A',
                'N',
                'Y'
            ],
            [
                'X',
                'X',
                'X',
                'L',
                'X',
                'X'
            ],
            [
                'G',
                'R',
                'U',
                'S',
                'K',
                'A'
            ],
            [
                'A',
                'R',
                'B',
                'U',
                'Z',
                'O'
            ]
        ],
        words: [
            'JABLKO',
            'JAJKO',
            'ARBUZ'
        ]
    },
    level3: {
        grid: [
            [
                'O',
                'Z',
                'V',
                'X',
                'V',
                'V',
                'X',
                'V'
            ],
            [
                'Z',
                'G',
                'X',
                'X',
                'X',
                'S',
                'X',
                'V'
            ],
            [
                'Z',
                'V',
                'O',
                'Z',
                'V',
                'Z',
                'V',
                'V'
            ],
            [
                'Z',
                'V',
                'Z',
                'R',
                'V',
                'Y',
                'V',
                'V'
            ],
            [
                'X',
                'V',
                'V',
                'V',
                'E',
                'N',
                'Z',
                'X'
            ],
            [
                'X',
                'Z',
                'Z',
                'V',
                'V',
                'K',
                'V',
                'V'
            ],
            [
                'S',
                'A',
                'L',
                'A',
                'T',
                'A',
                'X',
                'V'
            ],
            [
                'P',
                'O',
                'M',
                'I',
                'D',
                'O',
                'R',
                'Y'
            ]
        ],
        words: [
            'OGOREK',
            'POMIDOR',
            'SALATA',
            'SZYNKA'
        ]
    }
};
}),
"[project]/app/(protected)/wordsearch/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WordSearchPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WordSearch$2f$WordSearch$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/WordSearch/WordSearch.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$wordSearches$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/data/wordSearches.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function WordSearchPage() {
    const [level, setLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const puzzle = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$wordSearches$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["wordSearches"][`level${level}`]; // level od 1 do 3
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WordSearch$2f$WordSearch$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        grid: puzzle.grid,
        words: puzzle.words,
        level: level,
        onLevelChange: setLevel
    }, void 0, false, {
        fileName: "[project]/app/(protected)/wordsearch/page.js",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_da9450e2._.js.map