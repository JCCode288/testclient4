const express = require("express");
const app = express();
const PORT = process.env.PORT || 4001;
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const { connection } = require("./connection");
const router = require("./router");
const seeder = require("./seeder/seeding");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./"));
app.use(router);
app.use(errorHandler);

connection().then(() => {
  app.listen(PORT, () => console.log(`listening to http://localhost:${PORT}`));
});
