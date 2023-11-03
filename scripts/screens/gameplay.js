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
    }

    function update(elapsedTime) {
        keyboard.update(elapsedTime);
        //TODO: mouse as well?
        model.update(elapsedTime);        
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
        //TODO: actually load level data
        model = GameModel(
            {
                size: {
                    x: 15, y: 15
                }
            }
        ); 
            
        //TODO: keboard command to return to main menu.

        cancelNextRequest = false;
        previousTimeStamp = performance.now();
        requestAnimationFrame(gameLoop);
    }

    return {
        initialize,
        run
    };

}(MyGame.screenManager, MyGame.graphics, MyGame.input));