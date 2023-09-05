// TODO: turn into skeleton
MyGame.screens['gameplay'] = (function(screenManager, graphics, input) {
  'use strict'

  let keyboard = input.Keyboard();
  let cancelNextRequest = false;
  let previousTimeStamp = performance.now();
  let model = null;


  function initialize() {
    //nothin much.

  }

  function returnToMainMenu() {
    cancelNextRequest = true;
    screenManager.showScreen('main-menu');
    keyboard.unregisterCommand("Escape");
    MyGame.utils.Audio.stopAll();
  }

  function update(elapsedTime) {
    keyboard.update(elapsedTime);
    let wonLevel = model.update(elapsedTime);
    if (wonLevel) {
      if (MyGame.activeLevel < MyGame.levels.length - 1) {
        model = GameModel(MyGame.levels[++MyGame.activeLevel])
      }
      else {
        document.getElementById("title").innerHTML = "A Winner is You";
        returnToMainMenu();
      }
    }
  }

  function gameLoop(time) {
    update(time - previousTimeStamp);
    previousTimeStamp = time;
    
    if (!cancelNextRequest) {
      requestAnimationFrame(gameLoop);
    }
    else {
      MyGame.utils.Audio.stopAll();
    }
  }
  
  function run() {
    model = GameModel(MyGame.levels[MyGame.activeLevel]);

    keyboard.registerCommand("Escape", returnToMainMenu); 

    cancelNextRequest = false;
    previousTimeStamp = performance.now();
    requestAnimationFrame(gameLoop);
  }

  return {
    initialize: initialize,
    run: run
  }
  
}(MyGame.screenManager, MyGame.graphics, MyGame.input));