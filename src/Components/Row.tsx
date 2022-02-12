import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useCallback } from "react";
import Letter from "./Letter";

type RowProps = {
  guessWord: Function;
  rowIndex: number;
  isCurrentRow: Function;
  currentRow: any;
};

const Row: React.FC<RowProps> = ({ guessWord, rowIndex, currentRow }) => {
  const [letters, setLetters] = useState<
    { id: number; letter: string; status: string }[]
  >([
    { id: 0, letter: " ", status: "unsolved" },
    { id: 1, letter: " ", status: "unsolved" },
    { id: 2, letter: " ", status: "unsolved" },
    { id: 3, letter: " ", status: "unsolved" },
    { id: 4, letter: " ", status: "unsolved" },
  ]);
  const [isFrozen, setFrozen] = useState<boolean>(false);
  const [isGuessed, setIsGuessed] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  const currId = useRef(0);
  const divRef = useRef<HTMLDivElement>(null);

  const handleRowFocus = () => {
    if (divRef.current && currentRow === rowIndex) {
      divRef.current.focus();
    }
  };

  const handleClickOutside = useCallback((event: any) => {
    if (
      divRef.current &&
      !divRef.current.contains(event.target) &&
      currentRow === rowIndex
    ) {
      handleRowFocus();
    }
  }, []);

  useEffect(() => {
    if (currentRow === rowIndex && divRef.current) {
      setIsActive(true);
      divRef.current.focus();
    } else if (divRef.current) {
      divRef.current.blur();
    }
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [currentRow, rowIndex, handleClickOutside]);

  const checkIsComplete = (
    word: { id: number; letter: string; status: string }[]
  ) => {
    let wordToCheck: string[] = [];
    word.forEach((letter) => {
      if (letter.letter !== " ") {
        wordToCheck.push(letter.letter);
      } else wordToCheck.push(" ");
    });
    if (wordToCheck.join().indexOf(" ") > -1) {
      return false;
    } else return true;
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    let newLetters;
    if (isActive) {
      if (e.key === "Backspace") {
        if (!isGuessed) {
          newLetters = letters.map((letter) => {
            return currId.current === letter.id
              ? { ...letter, id: letter.id, letter: " " }
              : letter;
          });
          setLetters(newLetters);
          if (currId.current > 0) {
            if (currId.current === 4) {
              setFrozen(false);
              currId.current--;
            } else currId.current--;
          }
        }
      } else if (e.key === "Enter" && !isGuessed && checkIsComplete(letters)) {
        guessWord(letters);
        setIsGuessed(true);
        setIsActive(false);
      } else {
        if (!isFrozen) {
          if (e.keyCode >= 65 && e.keyCode <= 90) {
            newLetters = letters.map((letter) => {
              return currId.current === letter.id
                ? {
                    ...letter,
                    id: letter.id,
                    letter: e.key.toString().toUpperCase(),
                  }
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
    }
  };

  return (
    <div
      key={rowIndex}
      tabIndex={-1}
      onKeyDown={(e) => handleKeyPress(e)}
      className="row"
      ref={divRef}
    >
      {letters.map((letter) => {
        return (
          <Letter
            key={letter.id}
            letter={letter.letter}
            status={letter.status}
          ></Letter>
        );
      })}
    </div>
  );
};

export default Row;
