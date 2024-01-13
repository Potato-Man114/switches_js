MyGame.levels = (function() {
    'use strict';

    function get_all_levels() {
        let levels = {"game_levels": [], "test_levels": []};
        for (let asset_name in MyGame.assets) {
            if (asset_name.startsWith("level_game")) {
                levels["game_levels"].push(MyGame.assets[asset_name]);
            }
            if (asset_name.startsWitch("level_test")) {
                levels["test_levels"].push(MyGame.assets[asset_name]);
            }
        }
        return levels;
    }
    
    return get_all_levels();
}());
