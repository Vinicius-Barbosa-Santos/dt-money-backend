import cors from "cors";
import express from "express";

import { routes } from "./routes";
import { errorHandling } from "./middlewares/errorHandling";

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errorHandling);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
