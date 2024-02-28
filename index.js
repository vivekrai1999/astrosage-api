const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/:sign", function (req, res) {
  let sign = req.params.sign;
  let url = `https://www.astrosage.com/horoscope/daily-${sign}-horoscope.asp`;
  function formatDate(date) {
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  console.log(formattedDate); // Output: Monday, February 26, 2024

  request(url, function (error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);
      var prediction = $(".ui-large-content-box .ui-large-content")
        .eq(0)
        .text();
      var json = {
        date: formattedDate,
        sign: sign,
        prediction: prediction,
      };
      res.send(json);
    }
  });
});

app.listen(4000, function () {
  console.log("app is running on 4000");
});

module.exports = app;
