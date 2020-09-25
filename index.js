const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
// const bodyParser = require("body-parser");

const app = express();

connectDB();

app.use(cors());
// app.use(bodyParser.json());
app.use(express.json({ extented: false }));

app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
  PORT = 5000;
}
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
