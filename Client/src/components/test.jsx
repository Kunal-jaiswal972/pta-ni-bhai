import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { splitArrayAtSpace, d, a } from "../lib/something";
import TypingEffect from "./typingEffect";

const Test = () => {
  const title = "Cities can but lack will to be disability-friendly";
  const article =
    "The Accessible India campaign in Gujarat's cities has remained a mixed bag in terms of making physical and digital spaces accessible to people with disabilities";

  const [currentArrayIndex, setCurrentArrayIndex] = useState(0);
  const [typingStarted, setTypingStarted] = useState(false);
  const [typingStarted2, setTypingStarted2] = useState(false);
  const [imgArr, setImgArr] = useState([]);

  const handleTitleClick = () => {
    setImgArr(splitArrayAtSpace(d));
    setTypingStarted(!typingStarted);
    setTypingStarted2(false);
  };

  const handleArticleClick = () => {
    setImgArr(splitArrayAtSpace(a));
    setTypingStarted2(!typingStarted2);
    setTypingStarted(false);
  };

  useEffect(() => {
    if (typingStarted) {
      const timeoutId = setTimeout(() => {
        setCurrentArrayIndex(0);
      }, 800);

      return () => clearTimeout(timeoutId);
    }
  }, [typingStarted]);

  useEffect(() => {
    if (typingStarted2) {
      const timeoutId = setTimeout(() => {
        setCurrentArrayIndex(0);
      }, 800);

      return () => clearTimeout(timeoutId);
    }
  }, [typingStarted2]);

  return (
    <Card sx={{ marginBottom: "2em", marginTop: "1em" }}>
      <CardMedia
        sx={{ height: 200 }}
        image="https://static.toiimg.com/thumb/imgsize-123456,msid-105689785,width-300,resizemode-4/105689785.jpg"
      />
      <CardContent>
        <Box
          component="div"
          sx={{
            display: "flex",
            gap: "4px",
            cursor: "pointer",
          }}
          onClick={handleTitleClick}
        >
          {title.split(" ").map((word, idx) => (
            <Typography
              variant="h6"
              component="span"
              key={idx}
              style={{
                backgroundColor:
                  typingStarted && idx === currentArrayIndex ? "yellow" : "",
                fontSize: "1em",
              }}
            >
              {word}
            </Typography>
          ))}
        </Box>
        <Box
          color="text.secondary"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "3px",
            cursor: "pointer",
          }}
          onClick={handleArticleClick}
        >
          {article.split(" ").map((word, idx) => (
            <Typography
              variant="body2"
              component="span"
              key={idx}
              style={{
                backgroundColor:
                  typingStarted2 && idx === currentArrayIndex
                    ? "yellowgreen"
                    : "",
              }}
            >
              {word}
            </Typography>
          ))}
        </Box>
      </CardContent>
      <CardActions
        sx={{ display: "flex", flexDirection: "column", gap: "2em" }}
      >
        {typingStarted && (
          <TypingEffect
            imageArrays={imgArr}
            speed={750}
            currentArrayIndex={currentArrayIndex}
            setCurrentArrayIndex={setCurrentArrayIndex}
          />
        )}
        {typingStarted2 && (
          <TypingEffect
            imageArrays={imgArr}
            speed={750}
            currentArrayIndex={currentArrayIndex}
            setCurrentArrayIndex={setCurrentArrayIndex}
          />
        )}
        <Button size="small">Read More</Button>
      </CardActions>
    </Card>
  );
};

export default Test;
