'use client';
import { useState, useEffect } from "react";


const defaultGrid = [
  ['K', 'O', 'T', 'A'],
  ['A', 'L', 'A', 'M'],
  ['P', 'I', 'E', 'S'],
  ['D', 'O', 'M', 'Y'],
];

const defaultWords = ["KOT", "PIES", "DOM", "ALA"];

export default function WordSearch({
  grid,
  words,
  level: externalLevel,
  onLevelChange,
  cellSize = 48,
  fontSize = "text-lg",
  selectedColor = "bg-blue-500",
  foundColor = "bg-green-600",
  borderColor = "border-gray-400",
}) {
  const board = grid || defaultGrid;
  const dictionary = words || defaultWords;

  const [internalLevel, setInternalLevel] = useState(1);
  const level = externalLevel ?? internalLevel;

  const [selectedCells, setSelectedCells] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startCell, setStartCell] = useState(null);
  const [foundWords, setFoundWords] = useState([]);
  const [foundCells, setFoundCells] = useState([]);

  const [uiCellSize, setUiCellSize] = useState(cellSize);
  const [uiSelectedColor, setUiSelectedColor] = useState(selectedColor);
  const [uiFoundColor, setUiFoundColor] = useState(foundColor);

  const getDirection = (start, end) => {
    const dx = end.col - start.col;
    const dy = end.row - start.row;

    if (dx === 0) return { dx: 0, dy: Math.sign(dy) }; // pion
    if (dy === 0) return { dx: Math.sign(dx), dy: 0 }; // poziom
    if (Math.abs(dx) === Math.abs(dy)) {
      return { dx: Math.sign(dx), dy: Math.sign(dy) }; // przekątna
    }
    return null;
  };

  const buildSelection = (start, end) => {
    const dir = getDirection(start, end);
    if (!dir) return [];

    const cells = [];
    let r = start.row;
    let c = start.col;

    while (true) {
      cells.push({ row: r, col: c });
      if (r === end.row && c === end.col) break;
      r += dir.dy;
      c += dir.dx;
    }

    return cells;
  };

  const handleMouseDown = (row, col) => {
    setIsDragging(true);
    setStartCell({ row, col });
    setSelectedCells([{ row, col }]);
  };

  const handleMouseEnter = (row, col) => {
    if (!isDragging || !startCell) return;
    const newSelection = buildSelection(startCell, { row, col });
    if (newSelection.length) {
      setSelectedCells(newSelection);
    }
  };

  const getSelectedWord = () => {
    return selectedCells
      .map(cell => board[cell.row][cell.col])
      .join("");
  };

  const handleMouseUp = () => {
    if (!selectedCells.length) return;

    const word = getSelectedWord();

    if (dictionary.includes(word) && !foundWords.includes(word)) {
      setFoundWords([...foundWords, word]);
      setFoundCells((prev) => [...prev, ...selectedCells]);
    }

    setSelectedCells([]);
    setIsDragging(false);
    setStartCell(null);
  };

  const isSelected = (row, col) =>
    selectedCells.some((c) => c.row === row && c.col === col);

  const isFound = (row, col) =>
    foundCells.some((c) => c.row === row && c.col === col);

  const resetGame = () => {
    setSelectedCells([]);
    setFoundCells([]);
    setFoundWords([]);
    setIsDragging(false);
    setStartCell(null);
  };

  useEffect(() => {
    resetGame();
  }, [level, grid, words]);

  return (
    <div onMouseUp={handleMouseUp}>
      <h2 className="text-xl font-bold mb-4">Wykreślanka</h2>
      <div className="mb-4 flex gap-2">
        {[1, 2, 3].map((lvl) => (
          <button
            key={lvl}
            onClick={() => {
              if (onLevelChange) {
                onLevelChange(lvl);
              } else {
                setInternalLevel(lvl);
              }
            }}
            className={`px-4 py-2 rounded font-semibold transition ${
              level === lvl
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Level {lvl}
          </button>
        ))}
      </div>
      <button
        onClick={resetGame}
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Resetuj wykreślankę
      </button>

      <div className="mb-6 p-4 border rounded bg-gray-50">
        <h3 className="font-semibold mb-3">Ustawienia wyglądu</h3>

        <div className="flex flex-wrap gap-4 items-center">
          <label className="flex items-center gap-2">
            <span>Rozmiar pola:</span>
            <input
              type="range"
              min="32"
              max="80"
              value={uiCellSize}
              onChange={(e) => setUiCellSize(Number(e.target.value))}
            />
          </label>

          <label className="flex items-center gap-2">
            <span>Kolor zaznaczenia:</span>
            <select
              value={uiSelectedColor}
              onChange={(e) => setUiSelectedColor(e.target.value)}
              className="border p-1"
            >
              <option value="bg-blue-500">Niebieski</option>
              <option value="bg-red-500">Czerwony</option>
              <option value="bg-purple-500">Fioletowy</option>
              <option value="bg-yellow-500">Żółty</option>
            </select>
          </label>

          <label className="flex items-center gap-2">
            <span>Kolor znalezionych:</span>
            <select
              value={uiFoundColor}
              onChange={(e) => setUiFoundColor(e.target.value)}
              className="border p-1"
            >
              <option value="bg-green-600">Zielony</option>
              <option value="bg-emerald-600">Szmaragdowy</option>
              <option value="bg-teal-600">Turkusowy</option>
            </select>
          </label>
        </div>
      </div>

      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${board.length}, ${uiCellSize}px)` }}
      >
        {board.map((row, rowIndex) =>
          row.map((letter, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              className={`
                flex items-center justify-center
                border font-bold cursor-pointer select-none
                ${fontSize}
                ${borderColor}
                ${
                  isFound(rowIndex, colIndex)
                    ? `${uiFoundColor} text-white`
                    : isSelected(rowIndex, colIndex)
                    ? `${uiSelectedColor} text-white`
                    : "bg-white"
                }
              `}
              style={{ width: uiCellSize, height: uiCellSize }}
            >
              {letter}
            </div>
          ))
        )}
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Słowa do znalezienia:</h3>
        <ul className="flex gap-4 flex-wrap">
          {dictionary.map((w) => (
            <li
              key={w}
              className={
                foundWords.includes(w)
                  ? "line-through text-green-600 font-bold"
                  : "text-gray-700"
              }
            >
              {w}
            </li>
          ))}
        </ul>
      </div>

      {foundWords.length === dictionary.length && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded text-center font-bold">
          🎉 Gratulacje! Wszystkie słowa zostały znalezione!
        </div>
      )}
    </div>
  );
}