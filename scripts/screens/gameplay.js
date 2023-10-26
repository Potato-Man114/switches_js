MyGame.screens['gameplay'] = (function(screenManager, graphics, input)) {
    'use strict'

    let mouse = input.Mouse(); // mouse controlled game.
    let keyboard = input.Keyboard(); //TODO: put this in the utils/input.js file.
    let cancelNextRequest = false;
    let previousTimeStamp = performance.now();
    let model = null;

    function initialize() {
        //nothin yet
    }

    function returnToMainMenu() {
        cancelNextRequest = true;
        screenManager.showScreen('main-menu');
        keyboard.unregisterCommand("Escape");
        //TODO: something with the mouse?
        //stop audio.
    }

    function update(elapsedTime) {
        keyboard.update(elapsedTime);
        //TODO: mouse as well?
    }
}