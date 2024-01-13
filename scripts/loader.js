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
        // -- constants --
        // -- utils --
        {
            scripts: [
                'scripts/utils/lodash.js',
                'scripts/utils/random.js',
                'scripts/utils/input.js',
                'scripts/utils/utils.js',
                'scripts/utils/pubsub.js',
                'scripts/utils/constants.js',
            ],
            message: "utils loaded",
            onComplete: null
        },
        // -- entity --
        {
            scripts: ['scripts/entity.js'],
            message: "entity.js loaded.",
            onComplete: null
        },
        // -- levels --

        // -- components --
        {
            scripts: [
                'scripts/components/activateable.js',
                'scripts/components/clickable.js',
                'scripts/components/directional.js',
                'scripts/components/goal.js',
                'scripts/components/position.js',
                'scripts/components/sprite.js',
                'scripts/components/switch_type.js',
            ],
            message: "components loaded",
            onComplete: null,
        },
        
        // -- rendering --
        {
            scripts: [
                'scripts/render/graphics.js',
                'scripts/render/background.js',
            ],
            message: "rendering scripts loaded",
            onComplete: null,
        },
        // -- systems --
        {
            scripts: [
                'scripts/systems/input.js',
                'scripts/systems/renderSprite.js',
                'scripts/systems/render.js',
                'scripts/systems/input.js',
                'scripts/systems/toggle_switches.js',
                'scripts/systems/switch_sprite.js',
            ],
            message: "entity.js loaded",
            onComplete: null
        },
        // -- level loader --
        {
            scripts: [
                'scripts/load_levels.js',
            ],
            message: "load_levels.js loaded",
            onComplete: null
        },
        // -- game model --
        {
            scripts: ['scripts/game_model.js'],
            message: "game model loaded",
            onComplete: null
        },
        // -- screen manager --
        {
            scripts: ['scripts/screens/manager.js'],
            message: "screen manager loaded.",
            onComplete: null,
        },
        // -- screens --
        {
            scripts: [
                'scripts/screens/gameplay.js',
                'scripts/screens/mainMenu.js',
            ],
            message: "screens loaded",
            onComplete: null,
        }

        
    ];

    let assetOrder = [
        // images
        {
            key: 'cascade_off_clickable',
            source: '/assets/images/CASCADE_OFF_CLICKABLE.png'
        }, 
        {
            key: 'cascade_off',
            source: '/assets/images/CASCADE_OFF.png'
        }, 
        {
            key: 'cascade_on_clickable',
            source: '/assets/images/CASCADE_ON_CLICKABLE.png'
        }, 
        {
            key: 'cascade_on',
            source: '/assets/images/CASCADE_ON.png'
        }, 
        {
            key: 'directional_down_off_clickable',
            source: '/assets/images/DIRECTIONAL_DOWN_OFF_CLICKABLE.png'
        }, 
        {
            key: 'directional_down_off',
            source: '/assets/images/DIRECTIONAL_DOWN_OFF.png'
        }, 
        {
            key: 'directional_down_on_clickable',
            source: '/assets/images/DIRECTIONAL_DOWN_ON_CLICKABLE.png'
        }, 
        {
            key: 'directional_down_on',
            source: '/assets/images/DIRECTIONAL_DOWN_ON.png'
        }, 
         
        {
            key: 'directional_left_off_clickable',
            source: '/assets/images/DIRECTIONAL_LEFT_OFF_CLICKABLE.png'
        }, 
        {
            key: 'directional_left_off',
            source: '/assets/images/DIRECTIONAL_LEFT_OFF.png'
        }, 
        {
            key: 'directional_left_on_clickable',
            source: '/assets/images/DIRECTIONAL_LEFT_ON_CLICKABLE.png'
        }, 
        {
            key: 'directional_left_on',
            source: '/assets/images/DIRECTIONAL_LEFT_ON.png'
        }, 
         
        {
            key: 'directional_right_off_clickable',
            source: '/assets/images/DIRECTIONAL_RIGHT_OFF_CLICKABLE.png'
        }, 
        {
            key: 'directional_right_off',
            source: '/assets/images/DIRECTIONAL_RIGHT_OFF.png'
        }, 
        {
            key: 'directional_right_on_clickable',
            source: '/assets/images/DIRECTIONAL_RIGHT_ON_CLICKABLE.png'
        }, 
        {
            key: 'directional_right_on',
            source: '/assets/images/DIRECTIONAL_RIGHT_ON.png'
        }, 
         
        {
            key: 'directional_up_off_clickable',
            source: '/assets/images/DIRECTIONAL_UP_OFF_CLICKABLE.png'
        }, 
        {
            key: 'directional_up_off',
            source: '/assets/images/DIRECTIONAL_UP_OFF.png'
        }, 
        {
            key: 'directional_up_on_clickable',
            source: '/assets/images/DIRECTIONAL_UP_ON_CLICKABLE.png'
        }, 
        {
            key: 'directional_up_on',
            source: '/assets/images/DIRECTIONAL_UP_ON.png'
        }, 

        {
            key: 'distance_off_clickable',
            source: '/assets/images/DISTANCE_OFF_CLICKABLE.png'
        }, 
        {
            key: 'distance_off',
            source: '/assets/images/DISTANCE_OFF.png'
        }, 
        {
            key: 'distance_on_clickable',
            source: '/assets/images/DISTANCE_ON_CLICKABLE.png'
        }, 
        {
            key: 'distance_on',
            source: '/assets/images/DISTANCE_ON.png'
        }, 
        {
            key: 'goal_off_clickable',
            source: '/assets/images/GOAL_OFF_CLICKABLE.png'
        }, 
        {
            key: 'goal_off',
            source: '/assets/images/GOAL_OFF.png'
        }, 
        {
            key: 'goal_on_clickable',
            source: '/assets/images/GOAL_ON_CLICKABLE.png'
        }, 
        {
            key: 'goal_on',
            source: '/assets/images/GOAL_ON.png'
        }, 
        {
            key: 'normal_off_clickable',
            source: '/assets/images/NORMAL_OFF_CLICKABLE.png'
        }, 
        {
            key: 'normal_off',
            source: '/assets/images/NORMAL_OFF.png'
        }, 
        {
            key: 'normal_on_clickable',
            source: '/assets/images/NORMAL_ON_CLICKABLE.png'
        }, 
        {
            key: 'normal_on',
            source: '/assets/images/NORMAL_ON.png'
        }, 
        //-----------------------------------
        {
            key: 'wall',
            source: '/assets/images/WALL.png'
        }, 
        {
            key: 'key_blue',
            source: '/assets/images/KEY_BLUE.png'
        }, 
        {
            key: 'key_green',
            source: '/assets/images/KEY_GREEN.png'
        }, 
        {
            key: 'key_purple',
            source: '/assets/images/KEY_PURPLE.png'
        }, 
        {
            key: 'key_red',
            source: '/assets/images/KEY_RED.png'
        }, 
        {
            key: 'key_yellow',
            source: '/assets/images/KEY_YELLOW.png'
        }, 
        {
            key: 'lock_blue',
            source: '/assets/images/LOCK_BLUE.png'
        }, 
        {
            key: 'lock_green',
            source: '/assets/images/LOCK_GREEN.png'
        }, 
        {
            key: 'lock_purple',
            source: '/assets/images/LOCK_PURPLE.png'
        }, 
        {
            key: 'lock_red',
            source: '/assets/images/LOCK_RED.png'
        }, 
        {
            key: 'lock_yellow',
            source: '/assets/images/LOCK_YELLOW.png'
        }, 
        
        // levels
        {
            key: 'level_test_1',
            source: '/assets/levels/test_1.json'
        },
        {
            key: 'level_test_hello',
            source: '/assets/levels/test_normal.json'
        },
        {
            key: 'level_test_smile',
            source: '/assets/levels/test_cascade.json'
        },
        {
            key: 'level_test_dots',
            source: '/assets/levels/test_distance.json'
        },
        {
            key: 'level_test_lines',
            source: '/assets/levels/test_directional.json'
        },
        {
            key: 'level_test_goals',
            source: '/assets/levels/test_goals.json'
        }
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
            xhr.responseType = (fileExtension === 'txt') ? 'text' : 'blob';
            xhr.responseType = (fileExtension === 'json') ? 'text' : xhr.responseType;
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
                    } else if (fileExtension === 'json') {
                        if (onSuccess) { onSuccess(JSON.parse(xhr.response)); }
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
