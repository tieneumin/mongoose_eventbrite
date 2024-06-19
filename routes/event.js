const express = require("express");
const router = express.Router();

// instruction: import all the necessary functions from controllers/event.js
const {
  getEvents,
  getEvent,
  AddNewEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/event");

// instruction: import all the necessary functions from controllers/feedback.js
const {
  getFeedbacksByEvent,
  AddNewFeedback,
} = require("../controllers/feedback");

// instruction: `GET /events`: List all events
router.get("/", async (req, res) => {
  try {
    res.status(200).send(await getEvents(req.query.category, req.query.title));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// instruction: `GET /events/:id`: Get a specific event by its id
router.get("/:id", async (req, res) => {
  try {
    const event = await getEvent(req.params.id);
    if (event) {
      res.status(200).send(event);
    } else {
      res.status(404).send({ message: "Event not found." });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// instruction: `POST /events`: Add a new event
router.post("/", async (req, res) => {
  try {
    res
      .status(200)
      .send(
        await AddNewEvent(
          req.body.title,
          req.body.organizer,
          req.body.date,
          req.body.location,
          req.body.category,
          req.body.description,
          req.body.attendeeCount
        )
      );
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// instruction: `PUT /events/:id`: Update an event
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (await getEvent(id)) {
      res
        .status(200)
        .send(
          await updateEvent(
            id,
            req.body.title,
            req.body.organizer,
            req.body.date,
            req.body.location,
            req.body.category,
            req.body.description,
            req.body.attendeeCount
          )
        );
    } else {
      res.status(404).send({ message: "Event not found." });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// instruction: `DELETE /events/:id`: Delete an event
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (await getEvent(id)) {
      await deleteEvent(id);
      res.status(200).send(`Event ${id} deleted.`);
    } else {
      res.status(404).send({ message: "Event not found." });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// instruction: `GET /events/:id/feedback`: Get all feedback for a specific event by its id
router.get("/:id/feedback", async (req, res) => {
  try {
    res.status(200).send(await getFeedbacksByEvent(req.params.id));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// instruction: `POST /events/:id/feedback`: Add feedback for a specific event by its id
router.post("/:id/feedback", async (req, res) => {
  try {
    res
      .status(200)
      .send(
        await AddNewFeedback(
          req.body.event,
          req.body.attendeeName,
          req.body.comment
        )
      );
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
