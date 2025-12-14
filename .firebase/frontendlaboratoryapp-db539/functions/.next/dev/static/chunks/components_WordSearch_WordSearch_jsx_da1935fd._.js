(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/WordSearch/WordSearch.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WordSearch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
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
function WordSearch({ grid, words, level, cellSize = 48, fontSize = "text-lg", selectedColor = "bg-blue-500", foundColor = "bg-green-600", borderColor = "border-gray-400" }) {
    _s();
    const board = grid || defaultGrid;
    const dictionary = words || defaultWords;
    const [selectedCells, setSelectedCells] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [startCell, setStartCell] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [foundWords, setFoundWords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [foundCells, setFoundCells] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [uiCellSize, setUiCellSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(cellSize);
    const [uiSelectedColor, setUiSelectedColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(selectedColor);
    const [uiFoundColor, setUiFoundColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(foundColor);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WordSearch.useEffect": ()=>{
            resetGame();
        }
    }["WordSearch.useEffect"], [
        level,
        grid,
        words
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onMouseUp: handleMouseUp,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-xl font-bold mb-4",
                children: "Wykreślanka"
            }, void 0, false, {
                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: resetGame,
                className: "mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition",
                children: "Resetuj wykreślankę"
            }, void 0, false, {
                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 p-4 border rounded bg-gray-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold mb-3",
                        children: "Ustawienia wyglądu"
                    }, void 0, false, {
                        fileName: "[project]/components/WordSearch/WordSearch.jsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-4 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Rozmiar pola:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                        lineNumber: 135,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "range",
                                        min: "32",
                                        max: "80",
                                        value: uiCellSize,
                                        onChange: (e)=>setUiCellSize(Number(e.target.value))
                                    }, void 0, false, {
                                        fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                        lineNumber: 136,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                lineNumber: 134,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Kolor zaznaczenia:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                        lineNumber: 146,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: uiSelectedColor,
                                        onChange: (e)=>setUiSelectedColor(e.target.value),
                                        className: "border p-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "bg-blue-500",
                                                children: "Niebieski"
                                            }, void 0, false, {
                                                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                                lineNumber: 152,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "bg-red-500",
                                                children: "Czerwony"
                                            }, void 0, false, {
                                                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                                lineNumber: 153,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "bg-purple-500",
                                                children: "Fioletowy"
                                            }, void 0, false, {
                                                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                                lineNumber: 154,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "bg-yellow-500",
                                                children: "Żółty"
                                            }, void 0, false, {
                                                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                                lineNumber: 155,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                        lineNumber: 147,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Kolor znalezionych:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                        lineNumber: 160,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: uiFoundColor,
                                        onChange: (e)=>setUiFoundColor(e.target.value),
                                        className: "border p-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "bg-green-600",
                                                children: "Zielony"
                                            }, void 0, false, {
                                                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                                lineNumber: 166,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "bg-emerald-600",
                                                children: "Szmaragdowy"
                                            }, void 0, false, {
                                                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                                lineNumber: 167,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "bg-teal-600",
                                                children: "Turkusowy"
                                            }, void 0, false, {
                                                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                                lineNumber: 168,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                        lineNumber: 161,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/WordSearch/WordSearch.jsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-1",
                style: {
                    gridTemplateColumns: `repeat(${board.length}, ${uiCellSize}px)`
                },
                children: board.map((row, rowIndex)=>row.map((letter, colIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            lineNumber: 180,
                            columnNumber: 13
                        }, this)))
            }, void 0, false, {
                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                lineNumber: 174,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold mb-2",
                        children: "Słowa do znalezienia:"
                    }, void 0, false, {
                        fileName: "[project]/components/WordSearch/WordSearch.jsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "flex gap-4 flex-wrap",
                        children: dictionary.map((w)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: foundWords.includes(w) ? "line-through text-green-600 font-bold" : "text-gray-700",
                                children: w
                            }, w, false, {
                                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                                lineNumber: 209,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/WordSearch/WordSearch.jsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                lineNumber: 205,
                columnNumber: 7
            }, this),
            foundWords.length === dictionary.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded text-center font-bold",
                children: "🎉 Gratulacje! Wszystkie słowa zostały znalezione!"
            }, void 0, false, {
                fileName: "[project]/components/WordSearch/WordSearch.jsx",
                lineNumber: 224,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/WordSearch/WordSearch.jsx",
        lineNumber: 121,
        columnNumber: 5
    }, this);
}
_s(WordSearch, "T4zY+RGYNWYBnX+Uv4Vbsq58kt8=");
_c = WordSearch;
var _c;
__turbopack_context__.k.register(_c, "WordSearch");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_WordSearch_WordSearch_jsx_da1935fd._.js.map