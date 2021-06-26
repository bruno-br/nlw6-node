import "reflect-metadata";
import express from "express";
import "express-async-errors";
import { router } from "./routes";
import { resolve } from "path";
import { handleErrors } from "./middlewares/handleErrors";
import exphbs from "express-handlebars";
import "./database";

const app = express();

app.set("view engine", "hbs");

app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "index",
    layoutsDir: resolve(__dirname, "views", "layouts"),
    partialsDir: resolve(__dirname, "views", "partials"),
  })
);
app.set("views", resolve(__dirname, "views"));

app.use(express.json());

app.use(router);

app.use(handleErrors);

app.listen(3000, () => console.log("Server is running"));
