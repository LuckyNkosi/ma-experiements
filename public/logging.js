window.REPORT = true;//activate reporting from drone
let startTime; // Get the current time in milliseconds
let elapsedTime
const startTimer = () => {
    startTime = new Date().getTime(); // Get the current time in milliseconds
    elapsedTime = 0;
}
let timer = setInterval(function () {
    if (!startTime) return;
    let currentTime = new Date().getTime(); // Get the current time in milliseconds
    elapsedTime = Math.floor((currentTime - startTime) / 1000); // Calculate the elapsed time in seconds
    document.getElementById('elapsedTime').innerText = elapsedTime;
}, 1000); // Run the code every 1 second (1000 milliseconds)

const ACTIVITY_TRACKING_STATES = {
    default: 'dormant',
    tracking: 'tracking',
    trackingComplete: 'trackingComplete',
}
let ACTIVITY_TRACKING;
const updateTrackingState = (newState) => {
    ACTIVITY_TRACKING = newState;
    document.getElementById('trackingState').innerText = newState;
}

let ActivityLogs = [];
const LogActivity = async (experiment, activity) => {
    console.log('curr', CURRENT_EXPERIMENT);
    if (ACTIVITY_TRACKING === ACTIVITY_TRACKING_STATES.default) return; //don't log activity if not tracking
    const participant = getUser().userId;
    ActivityLogs.push({
        participant: [participant],
        experiment,
        experimentDetails: CURRENT_EXPERIMENT,
        activity,
        elapsedTime
    });
    const data = {
        id: participant,
        logKey: CURRENT_EXPERIMENT.logKey,
        data: ActivityLogs
    }

    if (ACTIVITY_TRACKING === ACTIVITY_TRACKING_STATES.tracking) return; //don't log activity if we're still tracking

    const response = await fetch(`/logActivity`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const result = await response.json();
    ActivityLogs = [];
    updateTrackingState(ACTIVITY_TRACKING_STATES.default);
    console.log('result', result);

}