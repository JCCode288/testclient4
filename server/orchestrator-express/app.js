const express = require("express");
const app = express();
const PORT = 4000;
const cors = require("cors");
const router = require("./router");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./"));
app.use(router);

app.listen(PORT, () => {
  console.log(`listening to port http://localhost:${PORT}`);
});
