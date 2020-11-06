(function(){
  'use strict';

  angular.module('ebiz-kart')
    .filter('timeFilter', [timeFilter]);

  function timeFilter(){
    return function(time){
      var seconds = time % 60;
      var minutes = Math.round((time - seconds) / 60);
      return minutes + ':' + (seconds < 10 ? "0"+seconds : seconds) ;
    }
  }
})();