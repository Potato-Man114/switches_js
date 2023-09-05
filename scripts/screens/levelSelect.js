MyGame.screens['level-select'] = (function (screenManager) {
  'use strict';

  function initialize() {
    document.getElementById('level-select-back-button').addEventListener(
      'click',
      () => {screenManager.showScreen("main-menu");}
    );

    let list = document.getElementById("level-select-menu");

    for (let i = 0; i < MyGame.levels.length; i++) {
      let li = document.createElement("li");
      let button = document.createElement("button");
      button.innerHTML = MyGame.levels[i].name;
      button.addEventListener(
        'click',
        () => {
          MyGame.activeLevel = i;
          screenManager.showScreen("gameplay");
        }
      )
      li.appendChild(button);
      list.appendChild(li);
    }
  }

  function run() {
    //nothin much
  }

  return {
    initialize,
    run
  }
}(MyGame.screenManager));