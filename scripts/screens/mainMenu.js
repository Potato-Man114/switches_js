MyGame.screens['main-menu'] = (function (screenManager) {
    'use strict';

    function initialize() {
        document.getElementById('level-select-button').addEventListener(
            'click',
            () => {
                screenManager.showScreen('level-select');
            }
        );
    }

    function run() {
        //nothin much
    }

    return {
        initialize,
        run
    }

}(MyGame.screenManager));
