/**
 * This structure is a draft of the data model we can use in the application.
 * It provides us with the option to let the users create the tournaments and races
 * in the admin dashboard. Saving us the trouble of hardcoding everything.
 */
interface Tournament {
    _id: string;
    name: string;
    /**
     * The qualification rounds that are available for the tournament.
     * Finals are separate from the qualifications to distinguish it
     */
    qualifications: Qualification[];
    finals: Qualification;
}

interface Qualification {
    _id: string;
    tournament: Tournament;
    raceType: RaceType;
    topDrivers: Driver[];
    participants: Driver[];
    races: Race[];
    startTime: Date;
    endTime: Date;
}

interface QualificationType {
    _id: string;
    name: string;
    topCount: number; // the number of drivers that will be selected for the next round
    pariticpantsCount: number; // the number of participants we'll allow in the qualification
    open: boolean;
}

interface RaceType {
    _id: string;
    name: string;
    scheduledDuration: number; // in minutes
}

interface Race {
    _id: string;
    name: string; // A user-friendly name for the race set by admin staff in the dashbaord, can be displayed to the driver to be confirmed by the staff.
    raceType: RaceType;
    qualification?: Qualification;
    participants: Driver[];
    startTime: Date; // Used as the time to give the driver to attend
    rigs: Rig[]; // The rigs that are assigned to the race, can be used to choose for the driver
    track: Track; // The track used for this race.
}

/**
 * A record of a racing track that can be used in the game.
 * The assumptions is they will have specific races they'll want to use.
 * Best records is to show the best times for the particular track. Since the assumption is that tracks have different lengths and difficulties
 * so comparison across all tracks is not viable.
 */
interface Track {
    _id: string;
    name: string;
    bestRecords: RaceRecord[];
}

type RigStatus = "available" | "in_use" | "unavailable";
type Gender = "male" | "female";

interface Rig {
    _id: string;
    name: string;
    // Should we add IP Address / MAC Address / Serial Number for the rig?
    /**
     * Status should be checked when picking a rig for the driver.
     * Should switch from available to in_use when picked for a driver for a race.
     * Should switch back to available automatically when time reaches Race.startTime + Race.type.scheduledDuration.
     * Unavailable is only used when the rig is broken or under maintenance. Set the staff users in admin dashboard.
     */
    status: RigStatus;
}

/**
 * The driver record. When the user registers it should be created for them as the registration and serves as their profile.
 * Fields are just placeholders off the top of my head. We can change them to whatever the requirements are.
 */
interface Driver {
    _id: string;
    name: string;
    gender: Gender;
    phoneNumber: string;
    email: string;
    picture: string;
}

interface Lap {
    _id: string;
    lapTime: number; // in milliseconds, unless we decide to change the structure
}

/**
 * The record of a driver's assignment and participation in a race.
 * When assigned laps will be empty. When the race is done the laps will be filled with the lap times.
 */
interface RaceRecord {
    _id: string;
    driver: Driver;
    race: Race;
    laps: Lap[];
    Rig: Rig;
}
