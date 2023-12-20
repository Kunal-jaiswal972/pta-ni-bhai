import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";

const TypingEffect = ({
  imageArrays,
  speed,
  currentArrayIndex,
  setCurrentArrayIndex,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [displayedImageArray, setDisplayedImageArray] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentImageIndex === imageArrays[currentArrayIndex].length) {
        // Move to the next array when all images in the current array are displayed
        setCurrentArrayIndex(
          (prevIndex) => (prevIndex + 1) % imageArrays.length
        );
        setCurrentImageIndex(0);
        setDisplayedImageArray([]);
      } else {
        const newImageArray = [
          ...displayedImageArray,
          imageArrays[currentArrayIndex][currentImageIndex],
        ];
        setDisplayedImageArray(newImageArray.slice(-1));
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
      }
    }, speed);

    return () => {
      clearInterval(intervalId);
    };
  }, [
    imageArrays,
    speed,
    currentArrayIndex,
    currentImageIndex,
    displayedImageArray,
  ]);

  return (
    <Box sx={{ width: "60px", height: "60px" }}>
      {displayedImageArray.map((image, index) => (
        <img key={index} src={image} height={56} width={56} />
      ))}
    </Box>
  );
};

export default TypingEffect;
