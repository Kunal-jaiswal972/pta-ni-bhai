import app from "./app.js";
import { disconnectFromDatabase, connectToDatabase } from "./db/conn.js";

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(201).json({
    "/api/v1/test": "to check if endpoint is running",
    "/api/v1/news/general": "for general news",
    "/api/v1/news/education": "for educational news",
    "/api/v1/news/benefits": "for benfits of disabled news",
    imp: "to check news and use ?page=NUMBER to access differnt pages",
  });
});

connectToDatabase()
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `Server Open On http://localhost:${PORT} & Connected To Database 🤟`
      )
    );
  })
  .catch((err) => {
    disconnectFromDatabase();
    console.log("Cannot Connect To Database", err);
  });

// try {
//   app.listen(PORT, () => {
//     console.log(`Server connected to http://localhost:${PORT}`);
//   });
// } catch (error) {
//   console.log("Cannot connect to server");
// }
