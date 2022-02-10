import React, { useState } from "react";

interface LetterProps {
  letter: string;
}

const Letter: React.FC<LetterProps> = ({ letter }) => {
  //   const [letter, setLetter] = useState("");
  return <div className="letter">{letter}</div>;
};

export default Letter;
