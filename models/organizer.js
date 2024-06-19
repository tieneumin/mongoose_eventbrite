const mongoose = require("mongoose");
const { Schema, model } = mongoose;

/*
    instruction: setup the organizer schema according to the following requirements:
    - name: (String, required)
    - bio: (String) - A brief biography or description of the organizer
    - contact: (String) - Contact information for the organizer
    - eventsOrganized: (Number, default: 0) - A count of the number of events organized
*/
const organizerSchema = new Schema({
  name: { type: String, required: true },
  bio: String,
  contact: String,
  eventsOrganized: { type: Number, default: 0 },
});

const Organizer = model("Organizer", organizerSchema);
module.exports = Organizer;
