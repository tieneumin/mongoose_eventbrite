// instruction: import the organizer model
const Organizer = require("../models/organizer");
const Event = require("../models/event");

const getOrganizers = async (name) => {
  // instruction: Write the codes to retrieve all organizers
  let filters = {};
  if (name) filters.name = name;
  return await Organizer.find(filters);
};

const getOrganizer = async (id) => {
  // instruction: write the codes to retrieve a specific organizer
  return await Organizer.findById(id);
};

const AddNewOrganizer = async (name, bio, contact, eventsOrganized) => {
  // instruction: write the codes to add an organizer
  return await new Organizer({ name, bio, contact, eventsOrganized }).save();
};

const updateOrganizer = async (id, name, bio, contact, eventsOrganized) => {
  // instruction: write the codes to update an organizer
  return await Organizer.findByIdAndUpdate(
    id,
    { name, bio, contact, eventsOrganized },
    { new: true }
  );
};

const deleteOrganizer = async (id) => {
  // instruction: write the codes to delete an organizer
  const events = await Event.find({ organizer: id });
  if (events.length > 0)
    throw new Error("Organizer is associated with existing events.");

  return await Organizer.findByIdAndDelete(id);
};

module.exports = {
  getOrganizers,
  getOrganizer,
  AddNewOrganizer,
  updateOrganizer,
  deleteOrganizer,
};
