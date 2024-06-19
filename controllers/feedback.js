// instruction: import the feedback model
const Feedback = require("../models/feedback");

const getFeedbacksByEvent = async (eventId) => {
  // instruction: write the codes to retrieve all feedbacks by eventId
  return await Feedback.find({ event: eventId });
};

const AddNewFeedback = async (event, attendeeName, comment) => {
  // instruction: write the codes to add new feedback for an event
  return await new Feedback({ event, attendeeName, comment }).save();
};

module.exports = {
  getFeedbacksByEvent,
  AddNewFeedback,
};
