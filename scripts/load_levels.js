MyGame.levels = (function() {
    'use strict';
  
  /**
   * Level structure:
   * {
   *  name: string,
   *  size: {x: number, y: number},
   *  content: Array<Array<Array<string>>>
   * }
  */
  
    function separateLines(string) {
      return string.split("\n");
    }
  
  
    function readLevelContent(level_json) {
        
    }

    function parseAllLevels(levels, levels_json) {
        
    }
  
  
    let levels = [];
  
    parseAllLevels(levels, JSON.parse(MyGame.assets['levels-all'])));
  
    return levels;
  
  }());
  
  