const express = require("express");
const allRoutes = require("./routes/index");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api/v1",allRoutes);
//The above line means all the requests for /api/v1... will go to allRoutes

app.listen(3000);



