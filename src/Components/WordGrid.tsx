import React, { useEffect, useState, useRef } from "react";
import Row from "./Row";

const words = ["poise", "mount", "haven", "shark", "queen", "value"];

const WordGrid: React.FC = () => {
  const [correctWord, setCorrectWord] = useState<string>("");
  const [guessedWords, setGuessedWords] = useState<string[]>([]);
  const [rows, setRows] = useState<object[]>([{}, {}, {}, {}, {}, {}]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * rows.length);
    setCorrectWord(words[randomIndex]);
  }, [rows.length]);

  return (
    <div className="word-grid">
      {/* {rows.map((row) => {
        return <Row></Row>;
      })}
      <button>Submit answer</button>
      {guessedWords.map((word) => {
        return <div>{word}</div>;
      })} */}
      <Row></Row>
      <Row></Row>
      <Row></Row>
      <Row></Row>
      <Row></Row>
      <Row></Row>
    </div>
  );
};

export default WordGrid;
