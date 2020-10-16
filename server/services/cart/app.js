const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 3002;
const app = express();
const router = require("./routes")

const errorHandler = require("./middlewares/errorHandler")
app.use(cors());

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router)

app.use(errorHandler)
// app.listen(port, () => {
//   console.log(`User Server listening at http://localhost:${port}`);
// });

module.exports = app;