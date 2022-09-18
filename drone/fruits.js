window.fruitTouched = (key) => {
    console.log('touched:', key);
    switch (key) {
        case 'a': console.log('left'); drone.moveLeft(); break;
        case 'd': console.log('right'); drone.moveRight(); break;
        case 'w': console.log('takeoff'); drone.takeOff(); break;
        case 's': console.log('land'); drone.land(); break;
        case 'g': console.log('flip'); drone.flip(); break;
        default:
            break;
    }
};
