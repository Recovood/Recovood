const express = require("express");
const cors = require("cors");

const userRouter = require("./routes/userRouter.js");
const errHandler = require("./middlewares/errHandler.js");

const port = process.env.PORT || 3001;
const app = express();

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(userRouter);

app.use(errHandler);

// app.listen(port, () => {
//   console.log(`User Server listening at http://localhost:${port}`);
// });

module.exports = app;