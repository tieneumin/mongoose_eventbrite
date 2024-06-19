const express = require("express");
const router = express.Router();

// instruction: import all the necessary functions from controllers/organizer.js
const {
  getOrganizers,
  getOrganizer,
  AddNewOrganizer,
  updateOrganizer,
  deleteOrganizer,
} = require("../controllers/organizer");

// instruction: `GET /organizers`: List all organizers
router.get("/", async (req, res) => {
  try {
    res.status(200).send(await getOrganizers(req.query.name));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// instruction: `GET /organizers/:id`: Get a specific organizer by its id
router.get("/:id", async (req, res) => {
  try {
    const organizer = await getOrganizer(req.params.id);
    if (organizer) {
      res.status(200).send(organizer);
    } else {
      res.status(404).send({ message: "Organizer not found." });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// instruction: `POST /organizers`: Add a new organizer
router.post("/", async (req, res) => {
  try {
    res
      .status(200)
      .send(
        await AddNewOrganizer(
          req.body.name,
          req.body.bio,
          req.body.contact,
          req.body.eventsOrganized
        )
      );
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// instruction: `PUT /organizers/:id`: Update an organizer
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (await getOrganizer(id)) {
      res
        .status(200)
        .send(
          await updateOrganizer(
            id,
            req.body.name,
            req.body.bio,
            req.body.contact,
            req.body.eventsOrganized
          )
        );
    } else {
      res.status(404).send({ message: "Organizer not found." });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// instruction: `DELETE /organizers/:id`: Delete an organizer
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (await getOrganizer(id)) {
      await deleteOrganizer(id);
      res.status(200).send(`Organizer ${id} deleted.`);
    } else {
      res.status(404).send({ message: "Organizer not found." });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
