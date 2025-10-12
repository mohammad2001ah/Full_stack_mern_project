const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRouters = require("./routers/userRouters");
const productRouters= require("./routers/productRouters")
dotenv.config();

connectDB();


const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRouters);
app.use("/api/products", productRouters);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
