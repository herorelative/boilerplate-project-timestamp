// index.js
// where your node app starts

// init project
import express from "express";
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
import cors from "cors";
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date?", function (req, res) {
  try {
    let result;

    if (req.params.date === undefined) {
      result = new Date();

      return res.send({
        unix: result.getTime(),
        utc: result.toUTCString(),
      });
    }
    if (req.params.date.includes("-")) {
      result = new Date(req.params.date);
    } else {
      result = new Date(Number(req.params.date));
      console.log("not include");
    }

    var unix = result.getTime();
    var utc = result.toUTCString();

    if (utc === "Invalid Date") {
      return res.send({ error: "Invalid Date" });
    }
    res.send({
      unix: unix,
      utc: utc,
    });
  } catch (error) {
    res.send({ error: "Invalid Date" });
  }
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 5000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
