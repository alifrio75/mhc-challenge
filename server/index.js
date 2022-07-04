require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

require("./models/event.model");
require("./models/user.model");
console.log(process.env.MONGODB_URI + ' ' + process.env.SECRET_KEY)
const app = express();
app.use(cors());

mongoose
  .connect(
    process.env.MONGODB_URI || 
    `mongodb://localhost:27017/alif-mhc`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB has been connected "))
  .catch((err) => console.log(err));

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./routes/user")(app);
require("./routes/event")(app);

const PORT = process.env.PORT || 5000;

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
