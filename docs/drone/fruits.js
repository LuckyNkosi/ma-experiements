window.fruitTouched = (key) => {
    console.log('touched:', key);
    switch (key) {
        case 'a': console.log('left'); logEvent('left'); drone.moveLeft(); break;
        case 'd': console.log('right'); logEvent('right'); drone.moveRight(); break;
        case 'w': console.log('takeoff'); logEvent('takeOff'); drone.takeOff(); break;
        case 's': console.log('land'); logEvent('land'); drone.land(); break;
        case 'g': console.log('flip'); logEvent('flip'); drone.flip(); break;
        default:
            break;
    }
};
const logEvent = (activity) => {
    if (REPORT) {
        LogActivity('drone', activity);
    }
}
