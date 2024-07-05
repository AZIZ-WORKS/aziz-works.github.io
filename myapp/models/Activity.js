const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // id of the ActivityType
  inProgress: { type: Boolean, required: true, default: false }, // flag to indicate if the activity is currently in progress, for helping in UI
  /*
    when the activity is scheduled to start and queues can be set for it. 
    Check this whenever creating a queue and cross check with the queue collection to determine if the rig is available
  */
  schedule: [
    {
      startDateTime: { type: Date, required: true },
      endDateTime: { type: Date, required: true },
      rigs: {
        type: Array,
        items: Number,
        additionalItems: false,
        minItems: 0,
        uniqueItems: true,
      }, // ids of the rigs can be used for this activity
    },
  ],
});

const ActivityModel = mongoose.model("Activity", activitySchema);

module.exports = ActivityModel;
