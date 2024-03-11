//action IDs map directly to drone methods
const controls = [
    { actionId: 'takeOff', label: 'Take Off', key: 't' },
    { actionId: 'land', label: 'Land', key: 'l' },
    { actionId: 'moveLeft', label: 'Left', key: 'a' },
    { actionId: 'moveRight', label: 'Right', key: 'd' },
    { actionId: 'moveForwards', label: 'Forward', key: 'w' },
    { actionId: 'moveBackwards', label: 'Backward', key: 's' },
    { actionId: 'twistLeft', label: 'Spin Left', key: 'ArrowLeft' },
    { actionId: 'twistRight', label: 'Spin Right', key: 'ArrowRight' },
    { actionId: 'moveUp', label: 'Higher', key: 'ArrowUp' },
    { actionId: 'moveDown', label: 'Lower', key: 'ArrowDown' },
    { actionId: 'flip', label: 'Flip', key: 'f' },
]
const configuringControl = {
    active: false,
    control: null,
    configInProgress: false,
}
onkeyup = (e) => {
    if (!configuringControl.configInProgress) return;
    let control = configuringControl.control;
    control.key = e.key;
    console.log(`You have set ${control.label} to ${control.key}`);
    document.querySelector(`#${control.actionId}`).innerHTML = control.key;
    document.querySelector(`#msg${control.actionId}`).innerHTML = `You have set ${control.label} to ${control.key}`;
    configuringControl.configInProgress = false;
    document.querySelector(`#btn${control.actionId}`).innerHTML = `Customise ${control.label}`;
    controls.find(c => c.actionId === control.actionId).key = control.key;
    console.log('====================================');
    console.log(controls);
    console.log('====================================');
};

const customiseControls = (actionId) => {
    let control = controls.find(c => c.actionId === actionId);
    console.log(`Which input do you want to use for ${control.label}?`);
    document.querySelector(`#msg${control.actionId}`).innerHTML = `Which input do you want to use for ${control.label}?`;
    document.querySelector(`#btn${control.actionId}`).innerHTML = `Listening for input...`;

    configuringControl.control = control;
    configuringControl.configInProgress = true;
}

const handleInput = (key) => {
    if (configuringControl.configInProgress) return;
    let control = controls.find(c => c.key === key);
    if (!control) return;
    //action
    drone[control.actionId]();
}
onkeydown = (e) => handleInput(e.key);

const getUserCOntrols = () => {
    return controls;
}

const controlsSection = document.querySelector('#controls');
controls.forEach(control => {
    //create element to show the control
    let element = document.createElement('p');
    element.innerHTML = `${control.label}: 
        <span id="${control.actionId}"> ${control.key} </span>
        <button id="btn${control.actionId}" type="button" onclick="customiseControls('${control.actionId}')" class="small"> Customise ${control.label} </button><span id="msg${control.actionId}"></span>`;
    controlsSection.appendChild(element);

})

const configureControls = () => {
    // let gamePlayButtons = document.querySelectorAll('.anti-config');

    if (!configureControls.active) {
        document.querySelector('#controls').style.display = 'block';
        document.querySelector('#btnConfigureControls').innerText = 'save and hide';

        document.querySelector('#btnStartChallenge').disabled = true;

        configureControls.active = true;

    } else {

        document.querySelector('#controls').style.display = 'none';
        document.querySelector('#btnConfigureControls').innerText = 'Customise Controls';
        document.querySelector('#btnStartChallenge').disabled = false;
        configureControls.active = false;
    }
}
