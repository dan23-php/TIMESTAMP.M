const express = require('express');
const app = express();

// Enable CORS
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// Root
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Timestamp API
app.get("/api/:date?", (req, res) => {
  const dateParam = req.params.date;

  let date;
  // If no parameter is provided, use current date
  if (!dateParam) {
    date = new Date();
  } else {
    // Check if it's a timestamp (pure number)
    if (/^\d+$/.test(dateParam)) {
      // Convert UNIX timestamp to number before passing to Date
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  // Check for invalid date
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return JSON response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
