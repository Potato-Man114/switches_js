MyGame.utils.Audio = (function() {
  'use strict';

  let that = {};

  let activeAudio = [];

  function initialize() {
    MyGame.assets['background-music'].loop = true;
    MyGame.assets['background-music'].volume = 0.35;
  }

  function removeActiveAudio(audio) {
    let index = activeAudio.indexOf(audio);
    if (index == -1) {
      return;
    }
    activeAudio.splice(index, 1);
  }


  that.play = function(audio) {
    audio.play();
    activeAudio.push(audio);
    audio.addEventListener('ended', () => removeActiveAudio(audio), {once: true});
  }


  that.stopAll = function() {
    for (let i = 0; i < activeAudio.length; i++) {
      that.stop(activeAudio[i]);
    }
  }

  that.stop = function(audio) {
    audio.currentTime = 0;
    audio.removeEventListener('ended', () => removeActiveAudio(audio), {once: true});
    removeActiveAudio(audio);
    audio.pause();
  }

  initialize();

  return that;


}())