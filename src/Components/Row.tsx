import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import Letter from "./Letter";

const Row: React.FC = () => {
  //   const [length, setLength] = useState<number>(0);
  //   const [isFull, setIsFull] = useState<boolean>(false);
  //   const [input, setInput] = useState("");
  const [letters, setLetters] = useState<{ id: number; letter: string }[]>([
    { id: 0, letter: "-" },
    { id: 1, letter: "-" },
    { id: 2, letter: "-" },
    { id: 3, letter: "-" },
    { id: 4, letter: "-" },
  ]);
  const [isFrozen, setFrozen] = useState<boolean>(false);

  const currId = useRef(0);
  const currentDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentDiv.current) {
      currentDiv.current.focus();
    }
  });

  const handleKeyPress = (e: KeyboardEvent) => {
    let newLetters;
    if (e.key === "Backspace") {
      newLetters = letters.map((letter) => {
        return currId.current === letter.id
          ? { id: letter.id, letter: "-" }
          : letter;
      });
      setLetters(newLetters);
      if (currId.current > 0) {
        if (currId.current === 4) {
          setFrozen(false);
          currId.current--;
        } else currId.current--;
      }
    } else {
      if (!isFrozen) {
        if (e.keyCode >= 65 && e.keyCode <= 90) {
          newLetters = letters.map((letter) => {
            return currId.current === letter.id
              ? { id: letter.id, letter: e.key.toString().toUpperCase() }
              : letter;
          });
          setLetters(newLetters);
          if (currId.current < letters.length) {
            currId.current++;
            if (currId.current === letters.length) {
              setFrozen(true);
              currId.current = 4;
            }
          }
        }
      }
    }
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => handleKeyPress(e)}
      ref={currentDiv}
      className="row"
    >
      {letters.map((letter) => {
        return <Letter letter={letter.letter}></Letter>;
      })}
    </div>
  );
};

export default Row;
