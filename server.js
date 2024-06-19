const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(express.json());

// instruction: setup cors
const corsHandler = cors({
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: true,
  optionsSuccessStatus: 200,
});
app.use(corsHandler);

// instruction: setup MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/eventbrite")
  .then(() => {
    console.log("MongoDB connected.");
  })
  .catch((error) => {
    console.log(error);
  });

// instruction: setup routes
const eventRouter = require("./routes/event");
const organizerRouter = require("./routes/organizer");

app.use("/events", eventRouter);
app.use("/organizers", organizerRouter);

app.get("/", (req, res) => {
  res.send("Good luck with the exam!");
});

// Server listening
app.listen(port, () => console.log(`Server started on port ${port}`));
