(function(){
  'use strict';

  angular
    .module('ebiz-kart')
    .controller('HelpCtrl', ['CONFIG', HelpCtrl]);

  function HelpCtrl(CONFIG){
    var vm = this;

    vm.backToSite = backToSite;

    function backToSite(){
      document.location.href = CONFIG.LINK_SITE;
    }

  }
})();