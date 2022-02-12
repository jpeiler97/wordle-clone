import React, { useEffect, useState, useRef } from "react";
import Row from "./Row";

const words = ["poise", "mount", "haven", "shark", "queen", "value"];

const WordGrid: React.FC = () => {
  const [correctWord, setCorrectWord] = useState<
    { id: number; letter: string }[]
  >([]);
  const [correctString, setCorrectString] = useState<string>("");
  const [guessedWords, setGuessedWords] = useState<string[]>([]);
  const [rows, setRows] = useState<object[]>([{}, {}, {}, {}, {}, {}]);
  const [currentRow, setCurrentRow] = useState(0);

  const guessWord = (
    word: { id: number; letter: string; status: string }[]
  ) => {
    correctWord.forEach((letter) => {
      word.forEach((guessedLetter) => {
        if (guessedLetter.id === letter.id) {
          if (guessedLetter.letter === letter.letter) {
            guessedLetter.status = "correct";
          } else if (correctString.indexOf(guessedLetter.letter) > -1) {
            guessedLetter.status = "partial";
          } else {
            guessedLetter.status = "incorrect";
          }
        }
      });
    });
    setCurrentRow(currentRow + 1);
  };

  const isCurrentRow = (index: any) => {
    if (index === currentRow) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * rows.length);
    const newWord: string = words[randomIndex].toUpperCase();
    const newWordSplit = newWord.split("");
    setCorrectWord(
      newWordSplit.map((letter, i) => {
        return { id: i, letter: letter };
      })
    );
    setCorrectString(newWord);
  }, [rows.length]);

  return (
    <div className="word-grid">
      <Row
        key={0}
        guessWord={guessWord}
        rowIndex={0}
        currentRow={currentRow}
        isCurrentRow={isCurrentRow}
      ></Row>
      <Row
        key={1}
        guessWord={guessWord}
        rowIndex={1}
        currentRow={currentRow}
        isCurrentRow={isCurrentRow}
      ></Row>
      <Row
        key={2}
        guessWord={guessWord}
        rowIndex={2}
        currentRow={currentRow}
        isCurrentRow={isCurrentRow}
      ></Row>
      <Row
        key={3}
        guessWord={guessWord}
        rowIndex={3}
        currentRow={currentRow}
        isCurrentRow={isCurrentRow}
      ></Row>
      <Row
        key={4}
        guessWord={guessWord}
        rowIndex={4}
        currentRow={currentRow}
        isCurrentRow={isCurrentRow}
      ></Row>
      <Row
        key={5}
        guessWord={guessWord}
        rowIndex={5}
        currentRow={currentRow}
        isCurrentRow={isCurrentRow}
      ></Row>
      {correctString}
    </div>
  );
};

export default WordGrid;
