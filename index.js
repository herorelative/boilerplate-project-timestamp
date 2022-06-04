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
  const input = req.params.date;
  let date;

  if (!input) {
    date = new Date();
  } else {
    !isNaN(input)
      ? (date = new Date(parseInt(input)))
      : (date = new Date(input));
  }

  date == "Invalid Date"
    ? res.json({ error: "Invalid Date" })
    : res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 5000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
