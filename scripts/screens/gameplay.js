MyGame.screens['gameplay'] = (function(screenManager, graphics, input) {
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
        MyGame.particleSystems.length = 0;
        remove_subscriptions();
    }

    function remove_subscriptions() {
        for (let system in MyGame.systems) {
            if (Object.keys(MyGame.systems[system]).includes("remove")) {
                MyGame.systems[system].remove();
            }
        }
    }

    function update(elapsedTime) {
        keyboard.update(elapsedTime);
        //TODO: mouse as well?
        let wonLevel = model.update(elapsedTime);
        if (wonLevel) {
            returnToMainMenu();
        }        
    }

    function gameLoop(time) {
        update(time - previousTimeStamp);
        previousTimeStamp = time;

        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
        else {
            //TODO: stop the audio
        }
    }

    function run() {
        model = GameModel(MyGame.levels[MyGame.activeLevelType][MyGame.activeLevel]);
        
        keyboard.registerCommand("Escape", returnToMainMenu); 

        cancelNextRequest = false;
        previousTimeStamp = performance.now();
        requestAnimationFrame(gameLoop);
    }

    return {
        initialize,
        run
    };

}(MyGame.screenManager, MyGame.graphics, MyGame.input));