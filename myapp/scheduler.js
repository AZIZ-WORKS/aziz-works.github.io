var cron = require("node-cron");
var QueueModel = require("./models/Queue");
var RigModel = require("./models/Rig");
var ActivityModel = require("./models/Activity");
var moment = require("moment");

// This function should be called every minute to check for queues starting and ending and updating the rig status accordingly
// The string is a cron expression that specifies the schedule for the function, you can use https://crontab.guru to check the syntax
const runScheduler = () => {
  cron.schedule("* * * * *", async () => {
    try {
      // create moment object for current time and the time one minute from now
      const currentTime = moment();
      const oneMinuteFromNow = moment().add(1, "minutes");

      // Process queues to update the rig status
      await processEndingQueues(currentTime, oneMinuteFromNow);
      await processStartingQueues(currentTime, oneMinuteFromNow);

      console.log("Rig status updated successfully");

      // Process activities to update the inProgress flag and rig assignment
      await processEndingActivities(currentTime, oneMinuteFromNow);
      await processStartingActivities(currentTime, oneMinuteFromNow);

      console.log("Activity status and Rig assignment updated successfully");
    } catch (error) {
      console.error("Error occurred while updating rig status:", error);
    }
  });
  console.log("Scheduler started successfully");
};

async function processStartingQueues(currentTime, oneMinuteFromNow) {
  try {
    // Get all queues starting within the next minute
    const startingQueues = await QueueModel.find({
      startDateTime: {
        $gte: currentTime.toDate(),
        $lte: oneMinuteFromNow.toDate(),
      },
    });

    // Update the rig status for starting queues
    for (const queue of startingQueues) {
      const rig = await RigModel.findById(queue.rig);
      rig.status = "Busy";
      await rig.save();
    }
  } catch (error) {
    console.error("Error occurred while processing starting queues:", error);
  }
}

async function processEndingQueues(currentTime, oneMinuteFromNow) {
  try {
    // Get all queues ending within the next minute
    const endingQueues = await QueueModel.find({
      endDateTime: {
        $gte: currentTime.toDate(),
        $lte: oneMinuteFromNow.toDate(),
      },
    });

    // Update the rig status for ending queues
    for (const queue of endingQueues) {
      const rig = await RigModel.findById(queue.rig);
      rig.status = "Available";
      await rig.save();
    }
  } catch (error) {
    console.error("Error occurred while processing ending queues:", error);
  }
}

async function processStartingActivities(currentTime, oneMinuteFromNow) {
  try {
    // Get all activities starting within the next minute
    const startingActivities = await ActivityModel.find({
      schedule: {
        $elemMatch: {
          startDateTime: {
            $gte: currentTime.toDate(),
            $lte: oneMinuteFromNow.toDate(),
          },
        },
      },
    });

    // Update the inProgress flag for starting activities
    for (const activity of startingActivities) {
      // update activity status
      activity.inProgress = true;
      await activity.save();

      // update rig assignment to this activity
      const relevantSchedule = activity.schedule.find((schedule) =>
        moment(schedule.startDateTime).isBetween(currentTime, oneMinuteFromNow)
      );
      await RigModel.updateMany(
        { _id: { $in: relevantSchedule.rigs } },
        { assignment: activity._id }
      );
    }
  } catch (error) {
    console.error(
      "Error occurred while processing starting activities:",
      error
    );
  }
}

async function processEndingActivities(currentTime, oneMinuteFromNow) {
  try {
    // Get all activities ending within the next minute
    const endingActivities = await ActivityModel.find({
      schedule: {
        $elemMatch: {
          endDateTime: {
            $gte: currentTime.toDate(),
            $lte: oneMinuteFromNow.toDate(),
          },
        },
      },
    });

    // Update the inProgress flag for ending activities
    for (const activity of endingActivities) {
      // update activity status
      activity.inProgress = false;
      await activity.save();

      // update rig assignment to this activity
      const relevantSchedule = activity.schedule.find((schedule) =>
        moment(schedule.startDateTime).isBetween(currentTime, oneMinuteFromNow)
      );
      await RigModel.updateMany(
        { _id: { $in: relevantSchedule.rigs } },
        { $unset: { assignment: 1 } }
      );
    }
  } catch (error) {
    console.error("Error occurred while processing ending activities:", error);
  }
}

module.exports = runScheduler;
