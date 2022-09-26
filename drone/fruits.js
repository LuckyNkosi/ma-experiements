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

const logger = amplitude.getInstance();
const logEvent = (event) => {
    logger.logEvent(event);
    const reqBody = { msg: 'test work', id: 123 };
    console.log('reqBody', reqBody);
    fetch('http://localhost:3000/log', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: reqBody,
    })
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}