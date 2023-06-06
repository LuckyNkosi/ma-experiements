updateTrackingState(ACTIVITY_TRACKING_STATES.default);
const startExperiment = () => {
    startTimer();
    updateTrackingState(ACTIVITY_TRACKING_STATES.tracking);
    LogActivity('drone', 'startExperiment');

}
const endExperiment = () => {
    updateTrackingState(ACTIVITY_TRACKING_STATES.trackingComplete);
    LogActivity('drone', 'endExperiment');
}
