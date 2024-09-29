"use client"
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const ConfettiEffect = () => {
  const [windowDimension, setWindowDimension] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);
  return (
    <div>
      <Confetti
        width={windowDimension.width}
        height={windowDimension.height}
        recycle={false}
        numberOfPieces={500}
      />
    </div>
  );
};

export default ConfettiEffect;
