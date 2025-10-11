const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRouters = require("./routers/userRouters");
dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRouters);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
