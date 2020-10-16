const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 3001;
const app = express();

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

// app.listen(port, () => {
//   console.log(`User Server listening at http://localhost:${port}`);
// });

module.exports = app;