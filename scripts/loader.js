//------------------------------------------------------------------
//
// Purpose of this code is to bootstrap (maybe I should use that as the name)
// the rest of the application.  Only this file is specified in the index.html
// file, then the code in this file gets all the other code and assets
// loaded.
//
//------------------------------------------------------------------
MyGame.loader = (function() {
    'use strict';
    let scriptOrder = [
        // -- utils --
        {
            scripts: ['scripts/utils/lodash.js'],
            message: "lodash library loaded. See https://lodash.com/",
            onComplete: null
        },
        {
            scripts: ['scripts/constants.js'],
            message: 'constants loaded',
            onComplete: null
        }, 
        {
            scripts: ['scripts/entity.js'],
            message: 'entity factory loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/levels.js'],
            message: 'level loader loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/utils/input.js'],
            message: 'input handler loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/utils/controls.js'],
            message: 'controls loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/utils/utils.js'],
            message: 'utils loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/utils/random.js'],
            message: 'random utility loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/utils/particleSystem.js'],
            message: 'particleSystem loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/utils/audio.js'],
            message: 'audio utility loaded',
            onComplete: null
        },
        // -- components --
        {
            scripts: ['scripts/components/layer.js'],
            message: 'layer component loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/components/animatedSprite.js'],
            message: 'animatedSprite component loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/components/input.js'],
            message: 'input component loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/components/noun.js'],
            message: 'noun component loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/components/position.js'],
            message: 'position component loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/components/property.js'],
            message: 'property component loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/components/sprite.js'],
            message: 'sprite component loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/components/text.js'],
            message: 'text component loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/components/label.js'],
            message: 'label component loaded',
            onComplete: null
        },
        // -- rendering --
        {
            scripts: ['scripts/render/background.js'],
            message: 'background renderer loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/render/graphics.js'],
            message: 'graphics library loaded',
            onComplete: null
        },
        // -- systems --
        {
            scripts: ['scripts/systems/animatedSprite.js'],
            message: 'animatedSprite system loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/systems/input.js'],
            message: 'input system loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/systems/movement.js'],
            message: 'movement system loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/systems/reset.js'],
            message: 'reset system loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/systems/undo.js'],
            message: 'undo system loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/systems/collision.js'],
            message: 'collision system loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/systems/renderAnimatedSprite.js'],
            message: 'animated sprite rendering system loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/systems/renderParticleSystem.js'],
            message: 'particle system rendering system loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/systems/renderSprite.js'],
            message: 'sprite rendering system loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/systems/render.js'],
            message: 'rendering system loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/systems/rules.js'],
            message: 'rules system loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/systems/win.js'],
            message: 'win detection system loading',
            onComplete: null
        },
        // -- game model --
        {
            scripts: ['scripts/game_model.js'],
            message: 'game model loaded',
            onComplete: null
        },
        // -- screens --
        {
            scripts: ['scripts/screens/manager.js'],
            message: 'screen manager loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/screens/credits.js'],
            message: 'credits screen loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/screens/gameplay.js'],
            message: 'gameplay screen loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/screens/mainMenu.js'],
            message: 'main menu screen loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/screens/levelSelect.js'],
            message: 'levelSelect screen loaded',
            onComplete: null
        },
        {
            scripts: ['scripts/screens/controls.js'],
            message: 'controls screen loaded',
            onComplete: null
        },
    ];

    let assetOrder = [{
            key: 'levels-all',
            source: '/assets/levels/levels-all.bbiy'
        }, {
            key: 'BigBlue',
            source: '/assets/images/BigBlue.png'
        }, {
            key: 'flag',
            source: '/assets/images/flag.png'
        }, {
            key: 'floor',
            source: '/assets/images/floor.png'
        }, {
            key: 'flowers',
            source: '/assets/images/flowers.png'
        }, {
            key: 'grass',
            source: '/assets/images/grass.png'
        }, {
            key: 'hedge',
            source: '/assets/images/hedge.png'
        }, {
            key: 'lava',
            source: '/assets/images/lava.png'
        }, {
            key: 'rock',
            source: '/assets/images/rock.png'
        }, {
            key: 'wall',
            source: '/assets/images/wall.png'
        }, {
            key: 'water',
            source: '/assets/images/water.png'
        }, {
            key: 'word-baba',
            source: '/assets/images/word-baba.png'
        }, {
            key: 'word-flag',
            source: '/assets/images/word-flag.png'
        }, {
            key: 'word-is',
            source: '/assets/images/word-is.png'
        }, {
            key: 'word-kill',
            source: '/assets/images/word-kill.png'
        }, {
            key: 'word-lava',
            source: '/assets/images/word-lava.png'
        }, {
            key: 'word-push',
            source: '/assets/images/word-push.png'
        }, {
            key: 'word-push',
            source: '/assets/images/word-push.png'
        }, {
            key: 'word-sink',
            source: '/assets/images/word-sink.png'
        }, {
            key: 'word-stop',
            source: '/assets/images/word-stop.png'
        }, {
            key: 'word-wall',
            source: '/assets/images/word-wall.png'
        }, {
            key: 'word-stop',
            source: '/assets/images/word-stop.png'
        }, {
            key: 'word-water',
            source: '/assets/images/word-water.png'
        }, {
            key: 'word-win',
            source: '/assets/images/word-win.png'
        }, {
            key: 'word-you',
            source: '/assets/images/word-you.png'
        }, {
            key: 'word-rock',
            source: '/assets/images/word-rock.png'
        },
        //particles
        {   
            key: 'blue-particle',
            source: '/assets/images/particles/blue-particle.png'
        }, {
            key: 'green-particle',
            source: '/assets/images/particles/green-particle.png'
        }, {
            key: 'purple-particle',
            source: '/assets/images/particles/purple-particle.png'
        }, {
            key: 'red-particle',
            source: '/assets/images/particles/red-particle.png'
        }, {
            key: 'yellow-particle',
            source: '/assets/images/particles/yellow-particle.png'
        },
        {
            key: 'background-music',
            source: '/assets/sounds/house-of-the-rising-sun.mp3'
        },
        {
            key: 'win-audio',
            source: '/assets/sounds/ZSS_Calibrate4.mp3'
        },
        {
            key: 'player-movement-audio',
            source: 'assets/sounds/minecraft-footstep.mp3',
        },
        {
            key: 'win-rule-audio',
            source: 'assets/sounds/ZSS_Calibrate1.mp3'  
        },
        {
            key: 'you-rule-audio', //how kind
            source: 'assets/sounds/ZSS_Calibrate3.mp3'
        },
        {
            key: 'object-destruction-audio',
            source: 'assets/sounds/WW_PictoBox_Cancel.mp3'
        },
    ];

    //------------------------------------------------------------------
    //
    // Helper function used to load scripts in the order specified by the
    // 'scripts' parameter.  'scripts' expects an array of objects with
    // the following format...
    //    {
    //        scripts: [script1, script2, ...],
    //        message: 'Console message displayed after loading is complete',
    //        onComplete: function to call when loading is complete, may be null
    //    }
    //
    //------------------------------------------------------------------
    function loadScripts(scripts, onComplete) {
        //
        // When we run out of things to load, that is when we call onComplete.
        if (scripts.length > 0) {
            let entry = scripts[0];
            require(entry.scripts, function() {
                console.log(entry.message);
                if (entry.onComplete) {
                    entry.onComplete();
                }
                scripts.shift();    // Alternatively: scripts.splice(0, 1);
                loadScripts(scripts, onComplete);
            });
        } else {
            onComplete();
        }
    }

    //------------------------------------------------------------------
    //
    // Helper function used to load assets in the order specified by the
    // 'assets' parameter.  'assets' expects an array of objects with
    // the following format...
    //    {
    //        key: 'asset-1',
    //        source: 'asset/.../asset.png'
    //    }
    //
    // onSuccess is invoked per asset as: onSuccess(key, asset)
    // onError is invoked per asset as: onError(error)
    // onComplete is invoked once per 'assets' array as: onComplete()
    //
    //------------------------------------------------------------------

    function loadAssets(assets, onSuccess, onError, onComplete) {
        //
        // When we run out of things to load, that is when we call onComplete.
        if (assets.length > 0) {
            let entry = assets[0];
            loadAsset(entry.source,
                function(asset) {
                    onSuccess(entry, asset);
                    assets.shift();    // Alternatively: assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                },
                function(error) {
                    onError(error);
                    assets.shift();    // Alternatively: assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                });
        } else {
            onComplete();
        }
    }

    //------------------------------------------------------------------
    //
    // This function is used to asynchronously load image and audio assets.
    // On success the asset is provided through the onSuccess callback.
    // Reference: http://www.html5rocks.com/en/tutorials/file/xhr2/
    //
    //------------------------------------------------------------------
    function loadAsset(source, onSuccess, onError) {
        let xhr = new XMLHttpRequest();
        let fileExtension = source.substr(source.lastIndexOf('.') + 1);    // Source: http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript

        if (fileExtension) {
            xhr.open('GET', source, true);
            xhr.responseType = (fileExtension === 'txt' || fileExtension === 'bbiy') ? 'text' : 'blob';

            xhr.onload = function() {
                let asset = null;
                if (xhr.status === 200) {
                    if (fileExtension === 'png' || fileExtension === 'jpg') {
                        asset = new Image();
                    } else if (fileExtension === 'mp3') {
                        asset = new Audio();
                        asset.preload = "auto";
                    } else if (fileExtension === 'txt') {
                        if (onSuccess) { onSuccess(xhr.responseText); }
                    } else if (fileExtension === 'bbiy') {
                        if (onSuccess) { onSuccess(xhr.responseText); }
                    }
                    else {
                        if (onError) { onError('Unknown file extension: ' + fileExtension); }
                    }
                    if (xhr.responseType === 'blob') {
                        if (fileExtension === 'mp3') {
                            asset.oncanplaythrough = function() {
                                asset.oncanplaythrough = null;  // Ugh, what a hack!
                                window.URL.revokeObjectURL(asset.src);
                                if (onSuccess) { onSuccess(asset); }
                            };
                        }
                        else {  // not terrific assumption that it has an 'onload' event, but that is what we are doing
                            asset.onload = function() {
                                window.URL.revokeObjectURL(asset.src);
                                if (onSuccess) { onSuccess(asset); }
                            };
                        }
                        asset.src = window.URL.createObjectURL(xhr.response);
                    }
                } else {
                    if (onError) { onError('Failed to retrieve: ' + source); }
                }
            };
            xhr.send();
        } else {
            if (onError) { onError('Unknown file extension: ' + fileExtension); }
        }
    }

    //------------------------------------------------------------------
    //
    // Called when all the scripts are loaded, it kicks off the demo app.
    //
    //------------------------------------------------------------------
    function mainComplete() {
        console.log('Everthing has been loaded.');
        MyGame.screenManager.initialize();
    }

    //
    // Start with loading the assets, then the scripts.
    console.log('Starting to dynamically load project assets');
    loadAssets(assetOrder,
        function(source, asset) {    // Store it on success
            MyGame.assets[source.key] = asset;
        },
        function(error) {
            console.log(error);
        },
        function() {
            console.log('All game assets loaded');
            console.log('Starting to dynamically load project scripts');
            loadScripts(scriptOrder, mainComplete);
        }
    );

}());
