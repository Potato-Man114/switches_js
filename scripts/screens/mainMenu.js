MyGame.screens['main-menu'] = (function (screenManager) {
    'use strict';

    function initialize() {
        document.getElementById('start-test-button').addEventListener(
            'click',
            () => {
                screenManager.showScreen('gameplay');
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
