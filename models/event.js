const mongoose = require("mongoose");
const { Schema, model } = mongoose;

/*
    instruction: setup the event schema according to the following requirements:
    - title: (String, required)
    - organizer: (ObjectId, ref: 'Organizer', required)
    - date: (Date, required)
    - location: (String, required)
    - category: (String)
    - description: (String)
    - attendeeCount: (Number, default: 0) - The number of attendees
*/
const eventSchema = new Schema({
  title: { type: String, required: true },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: "Organizer",
    required: true,
  },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  category: String,
  description: String,
  attendeeCount: { type: Number, default: 0 },
});

const Event = model("Event", eventSchema);
module.exports = Event;
