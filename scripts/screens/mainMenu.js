MyGame.screens['main-menu'] = (function (screenManager) {
  'use strict';

  function initialize() {
    document.getElementById('level-select-button').addEventListener(
      'click',
      () => {
        screenManager.showScreen('level-select');
      }
    );

    document.getElementById('controls-button').addEventListener(
      'click',
      () => {
        screenManager.showScreen('controls');
      }
    );

    document.getElementById('credits-button').addEventListener(
      'click',
      () => {
        screenManager.showScreen('credits');
      }
    )
  }

  function run() {
    //not much to do
  }

  return {
    initialize,
    run
  }
}(MyGame.screenManager));