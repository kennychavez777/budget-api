import { initializeDataSource } from "./data-source";
import app from "./app";

const port = process.env.PORT || 3000;

initializeDataSource()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at port: ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed", error);
  });
