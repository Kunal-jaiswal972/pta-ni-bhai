import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { splitArrayAtSpace, tokenizeAndMapToSigns } from "../lib/something";
import TypingEffect from "./typingEffect";

const CardSingle = ({ newsItem }) => {
  const [currentArrayIndex, setCurrentArrayIndex] = useState(0);
  const [typingStarted, setTypingStarted] = useState(false);
  const [typingStarted2, setTypingStarted2] = useState(false);
  const [imgArr, setImgArr] = useState([]);

  console.log(imgArr);

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

  const handleTitleClick = async (text) => {
    try {
      setImgArr(tokenizeAndMapToSigns(text));
      setTypingStarted(!typingStarted);
      setTypingStarted2(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleArticleClick = async (text) => {
    try {
      setImgArr(tokenizeAndMapToSigns(text));
      setTypingStarted2(!typingStarted2);
      setTypingStarted(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ marginBottom: "2em" }}>
      <CardMedia
        sx={{ height: 200 }}
        image={
          newsItem.img === "https://static.toiimg.com/photo/25581306.cms"
            ? "../assets/default.svg"
            : newsItem.img
        }
        title={newsItem.title}
      />
      <CardContent>
        <Box
          component="div"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "4px",
            cursor: "pointer",
          }}
          onClick={() => handleTitleClick(newsItem.title)}
        >
          {newsItem.title.split(" ").map((word, idx) => (
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
          onClick={() => handleArticleClick(newsItem.article)}
        >
          {newsItem.article &&
            newsItem.article.split(" ").map((word, idx) => (
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
        <Button
          size="small"
          href={newsItem.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardSingle;
