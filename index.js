const express = require("express");
const scrapeIt = require("scrape-it"),
      app = express()

require("dotenv").config();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const HerosRoute = require("./routes/HerosRoute")
app.use("/api/v1/heros", HerosRoute)
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });