'use client';
import { useState } from "react";
import WordSearch from "@/components/WordSearch/WordSearch";
import { wordSearches } from "@/app/data/wordSearches";

export default function WordSearchPage() {
  const [level, setLevel] = useState(1);

  const puzzle = wordSearches[`level${level}`]; // level od 1 do 3

  return (
    <WordSearch
      grid={puzzle.grid}
      words={puzzle.words}
      level={level}
      onLevelChange={setLevel}
    />
  );
}