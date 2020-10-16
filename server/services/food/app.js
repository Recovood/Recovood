const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 3003;
const app = express();
const foodRouter = require("./routes");
const errHandler = require("./middlewares/errHandler");

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

// Food Router'
app.use(foodRouter);

app.use(errHandler);

// app.listen(port, () => {
//   console.log(`User Server listening at http://localhost:${port}`);
// });

module.exports = app;
