// import React from "react";
// import { instance } from "../lib/axiosInstance";
// import { useQuery } from "@tanstack/react-query";
// import {
//   CircularProgress,
//   Card,
//   CardActions,
//   CardContent,
//   CardMedia,
//   Button,
//   Typography,
// } from "@mui/material";
// import { endpoint } from "../lib/categoryToEndpointMap";

// const NewsCard = ({ category }) => {
//   const fetchNews = async () => {
//     try {
//       const response = await instance.get(endpoint[category]);
//       return response.data;
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   };

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["news", category],
//     queryFn: fetchNews,
//     refetchOnMount: false,
//     staleTime: 24 * 60 * 60,
//   });

//   if (isLoading)
//     return (
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <CircularProgress />
//       </div>
//     );
//   if (isError) return <div>Error loading data</div>;

//   return (
//     <>
//       {data?.news?.map((newsItem, i) => (
//         <Card sx={{ marginBottom: "2em" }} key={i}>
//           <CardMedia
//             sx={{ height: 200 }}
//             image={
//               newsItem.img === "https://static.toiimg.com/photo/25581306.cms"
//                 ? "../assets/default.svg"
//                 : newsItem.img
//             }
//             title={newsItem.title}
//           />
//           <CardContent>
//             <Typography gutterBottom variant="h6" component="div">
//               {newsItem.title}
//             </Typography>
//             <Typography
//               variant="body2"
//               color="text.secondary"
//               sx={{
//                 overflow: "hidden",
//                 display: "-webkit-box",
//                 WebkitBoxOrient: "vertical",
//                 WebkitLineClamp: 3,
//               }}
//             >
//               {newsItem.article || "No article available"}
//             </Typography>
//           </CardContent>
//           <CardActions>
//             <Button
//               size="small"
//               href={newsItem.link}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Read More
//             </Button>
//           </CardActions>
//         </Card>
//       ))}
//     </>
//   );
// };

// export default NewsCard;

import React from "react";
import { instance } from "../lib/axiosInstance";
import { useQuery } from "@tanstack/react-query"
import { endpoint } from "../lib/categoryToEndpointMap";
import CardSingle from "./cardSingle";
import { CircularProgress } from "@mui/material";

const NewsCard = ({ category }) => {
  const fetchNews = async () => {
    try {
      const response = await instance.get(endpoint[category]);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["news", category],
    queryFn: fetchNews,
    refetchOnMount: false,
    staleTime: 24 * 60 * 60,
  });

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  if (isError) return <div>Error loading data</div>;

  return (
    <>
      {data?.news?.map((newsItem, i) => (
        <CardSingle newsItem={newsItem} key={i} />
      ))}
    </>
  );
};

export default NewsCard;
