// instruction: import the event model
const Event = require("../models/event");
const Feedback = require("../models/feedback");

const getEvents = async (category, title) => {
  // instruction: write the codes to retrieve all events (use `populate()` to get organizer details)
  let filters = {};
  if (category) filters.category = category;
  if (title) filters.title = title;
  return await Event.find(filters).populate("organizer");
};

const getEvent = async (id) => {
  // instruction: write the codes to retrieve a specific event (use `populate()` to get organizer details)
  return await Event.findById(id).populate("organizer");
};

const AddNewEvent = async (
  title,
  organizer,
  date,
  location,
  category,
  description,
  attendeeCount
) => {
  // instruction: write the codes to add a new event
  return await new Event({
    title,
    organizer,
    date,
    location,
    category,
    description,
    attendeeCount,
  }).save();
};

const updateEvent = async (
  id,
  title,
  organizer,
  date,
  location,
  category,
  description,
  attendeeCount
) => {
  // instruction: write the codes to update an event
  return await Event.findByIdAndUpdate(
    id,
    { title, organizer, date, location, category, description, attendeeCount },
    { new: true }
  );
};

const deleteEvent = async (id) => {
  // instruction: Write the codes to delete an event
  const feedbacks = await Feedback.find({ event: id });
  if (feedbacks.length > 0) throw new Error("Event has existing feedback.");

  return await Event.findByIdAndDelete(id);
};

module.exports = {
  getEvents,
  getEvent,
  AddNewEvent,
  updateEvent,
  deleteEvent,
};
