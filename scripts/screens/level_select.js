MyGame.screens['level-select'] = (function (screenManager) {

    'use strict';

    function initialize() {
        document.getElementById('level-select-back-button').addEventListener(
            'click',
            () => {screenManager.showScreen("main-menu");}
        );

        let list = document.getElementById("level-select-menu");

        for (let i = 0; i < MyGame.levels["game_levels"].length; i++) {
            let li = document.createElement("li");
            let button = document.createElement("button");
            button.innerHTML = MyGame.levels["game_levels"][i].name;
            button.addEventListener(
                'click',
                () => {
                    MyGame.activeLevel = i;
                    MyGame.activeLevelType = "game_levels";
                    screenManager.showScreen("gameplay");
                }
            );
            li.appendChild(button);
            list.appendChild(li);
        }

        // list.appendChild(document.createElement("button")); // TODO: make this some kind of actual separation, not just a blank button.
        for (let i = 0; i < MyGame.levels["test_levels"].length; i++) {
            let li = document.createElement("li");
            let button = document.createElement("button");
            button.innerHTML = MyGame.levels["test_levels"][i].name;
            button.addEventListener(
                'click',
                () => {
                    MyGame.activeLevel = i;
                    MyGame.activeLevelType = "test_levels";
                    screenManager.showScreen("gameplay");
                }
            );
            li.appendChild(button);
            list.appendChild(li);
        }
    }

    function run() {

    }

    return {
        initialize,
        run
    }

}(MyGame.screenManager));