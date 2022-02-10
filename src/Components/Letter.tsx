import React, { useState } from "react";

interface LetterProps {
  letter: string;
  status: string;
}

const Letter: React.FC<LetterProps> = ({ letter, status }) => {
  //   const [letter, setLetter] = useState("");
  return <div className={`letter-${status}`}>{letter}</div>;
};

export default Letter;
