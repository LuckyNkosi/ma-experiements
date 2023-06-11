const experiments = [
    {
        name: 'Drone - Gamepad',
        description: 'Fly the drone using a gamepad',
        done: false,
    },
    {
        name: 'Drone - Keyboard',
        description: 'Fly the drone using a keyboard',
        done: false,
    },
    {
        name: 'Drone - Custom',
        description: 'Fly the drone using your voice',
        done: false,
    }
]

const droneInterfaceButtons = document.querySelector('#droneInterface').querySelectorAll('button');

updateTrackingState(ACTIVITY_TRACKING_STATES.default);
const startExperiment = () => {
    startTimer();
    updateTrackingState(ACTIVITY_TRACKING_STATES.tracking);
    LogActivity('drone', 'startExperiment');
    document.querySelector('#btnStartChallenge').disabled = true;
    document.querySelector('#btnConfigureControls').disabled = true;

    document.querySelector('#btnEndChallenge').disabled = false;
    droneInterfaceButtons.forEach(button => {
        button.disabled = false;
    });
}
const endExperiment = () => {
    updateTrackingState(ACTIVITY_TRACKING_STATES.trackingComplete);
    document.querySelector('#btnEndChallenge').disabled = true;
    document.querySelector('#btnNextChallenge').disabled = false;
    droneInterfaceButtons.forEach(button => {
        button.disabled = true;
    });
    LogActivity('drone', 'endExperiment');
}

const nextExperiment = () => {
    console.log(experiments);
    if (experiments.length === 0) {
        document.querySelector('#btnNextChallenge').disabled = true;
        document.querySelector('#btnEndChallenge').disabled = true;
        document.querySelector('#btnStartChallenge').disabled = true;
        document.querySelector('#btnConfigureControls').disabled = true;
        updateTrackingState(ACTIVITY_TRACKING_STATES.complete);
        LogActivity('drone', 'complete');
        return;
    }
    // let experiment = experiments.shift();
    //pick random experiment and remove it from the list
    let experiment = experiments.splice(Math.floor(Math.random() * experiments.length), 1)[0];

    document.querySelector('#experimentName').innerText = experiment.name;
    document.querySelector('#btnNextChallenge').disabled = true;
    document.querySelector('#btnStartChallenge').disabled = false;
    document.querySelector('#btnConfigureControls').disabled = false;
    document.querySelector('#btnEndChallenge').disabled = true;
    updateTrackingState(ACTIVITY_TRACKING_STATES.default);
    LogActivity('drone', 'nextExperiment');
}

nextExperiment();