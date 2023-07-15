/*
Asteroids-JS
This is a modern JS reboot of the classic 1979 Atari space shoot-em up game

Copyright (C) 2021  Phil Spilsbury - <philspil66@gmail.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
// "use strict";
var experiments = [
  {
    name: 'Gamepad',
    logKey: 'asteroidGamePadLog',
    description: 'Play using a gamepad',
    done: false,
  },
  {
    name: 'Keyboard',
    logKey: 'asteroidKeyboardLog',
    description: 'Play using a keyboard',
    done: false,
  },
  {
    name: 'Custom',
    logKey: 'asteroidCustomLog',
    description: 'Play custom controller',
    done: false,
  }
];
const startExperiment = () => {
  startTimer();
  updateTrackingState(ACTIVITY_TRACKING_STATES.tracking);
  LogActivity('drone', 'startExperiment');
  // document.querySelector('#btnStartChallenge').disabled = true;
  // document.querySelector('#btnConfigureControls').disabled = true;

  // document.querySelector('#btnEndChallenge').disabled = false;
  // droneInterfaceButtons.forEach(button => {
  //   button.disabled = false;
  // });
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
function startAsteroids() {

  Game.start();
}
