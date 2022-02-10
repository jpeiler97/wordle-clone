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

  const guessWord = (
    word: { id: number; letter: string; status: string }[]
  ) => {
    correctWord.forEach((letter) => {
      word.forEach((guessedLetter) => {
        if (guessedLetter.id === letter.id) {
          if (guessedLetter.letter === letter.letter) {
            console.log(
              `#${guessedLetter.id + 1} ${guessedLetter.letter} is correct!`
            );
            guessedLetter.status = "correct";
          } else if (correctString.indexOf(guessedLetter.letter) > -1) {
            console.log(
              `#${guessedLetter.id + 1} ${guessedLetter.letter} is somewhere!`
            );
            guessedLetter.status = "partial";
          } else {
            console.log(
              `#${guessedLetter.id + 1} ${guessedLetter.letter} is wrong!`
            );
            guessedLetter.status = "incorrect";
          }
        }
      });
    });
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
      {/* {rows.map((row) => {
        return <Row></Row>;
      })}
      <button>Submit answer</button>
      {guessedWords.map((word) => {
        return <div>{word}</div>;
      })} */}
      <Row guessWord={guessWord} rowIndex={0}></Row>
      <Row guessWord={guessWord} rowIndex={1}></Row>
      <Row guessWord={guessWord} rowIndex={3}></Row>
      <Row guessWord={guessWord} rowIndex={4}></Row>
      <Row guessWord={guessWord} rowIndex={5}></Row>
      <Row guessWord={guessWord} rowIndex={6}></Row>
      {correctString}
    </div>
  );
};

export default WordGrid;
