//gamepad controls in order of buttons as returned by navigator.getGamepads()[0].buttons
const controllerButtonsLookup = [
    { key: "cross", pressed: false },
    { key: "circle", pressed: false },
    { key: "square", pressed: false },
    { key: "triangle", pressed: false },
    { key: "L1", pressed: false },
    { key: "R1", pressed: false },
    { key: "L2", pressed: false },
    { key: "R2", pressed: false },
    { key: "share", pressed: false },
    { key: "options", pressed: false },
    { key: "L3", pressed: false },
    { key: "R3", pressed: false },
    { key: "up", pressed: false },
    { key: "down", pressed: false },
    { key: "left", pressed: false },
    { key: "right", pressed: false },
    { key: "PS", pressed: false },
    { key: "touchpad", pressed: false },
    { key: "leftStickLeft", pressed: false },
    { key: "leftStickRight", pressed: false },
];

const shipControls = {
    thrust: controllerButtonsLookup.find(b => b.key === 'cross'),
    brake: controllerButtonsLookup.find(b => b.key === 'circle'),
    left: controllerButtonsLookup.find(b => b.key === 'left'),
    right: controllerButtonsLookup.find(b => b.key === 'right'),
    hyperspaceJump: controllerButtonsLookup.find(b => b.key === 'L1'),
    fire: controllerButtonsLookup.find(b => b.key === 'R1'),
};

// Check for gamepad support
if ("getGamepads" in navigator) {
    console.log("Gamepad API supported");
    // Start listening for gamepad connections
    window.addEventListener("gamepadconnected", function (e) {
        console.log("Gamepad connected:", e.gamepad.id);
    });

    // Start listening for gamepad disconnections
    window.addEventListener("gamepaddisconnected", function (e) {
        console.log("Gamepad disconnected:", e.gamepad.id);
    });

    // Start monitoring gamepad input
    function updateGamepad() {
        const gamepads = navigator.getGamepads();
        const ps4Controller = gamepads[0]; // Assuming the PS4 controller is the first gamepad connected

        // Check if the PS4 controller is connected
        if (ps4Controller && ps4Controller.connected) {
            // Retrieve and process input from the PS4 controller
            const buttons = ps4Controller.buttons;
            // const axes = ps4Controller.axes;

            //update reference to the buttons
            buttons.forEach((button, index) => {
                // console.log('here');
                controllerButtonsLookup[index].pressed = button.pressed;
                if (button.pressed)
                    console.log(controllerButtonsLookup[index].key, button.pressed);
            });
            const threshold = 0.2;
            const leftStickX = ps4Controller.axes[0];
            if (leftStickX < -threshold) {
                controllerButtonsLookup.find(b => b.key === 'left').pressed = true;
                controllerButtonsLookup.find(b => b.key === 'right').pressed = false;
            } else if (leftStickX > threshold) {
                controllerButtonsLookup.find(b => b.key === 'left').pressed = false;
                controllerButtonsLookup.find(b => b.key === 'right').pressed = true;
            }
        }

        // Call updateGamepad() again on the next animation frame
        requestAnimationFrame(updateGamepad);
    }

    // Start the initial gamepad update
    updateGamepad();
} else {
    console.log("Gamepad API not supported");
}

console.log('called?');