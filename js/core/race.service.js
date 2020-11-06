(function(){
  'use strict';

  angular
    .module('ebiz-kart')
    .service('RaceService', [RaceService]);

  function RaceService(){
    var that = this;

    var currentDriver = null;
    var currentRace = null;

    that.setDriver = setDriver;
    that.setRace = setRace;
    that.getDriver = getDriver;
    that.getRace = getRace;
    that.getRaceDetails = getRaceDetails;

    function setDriver(driver){
      currentDriver = driver;
    }

    function setRace(race){
      currentRace = race;
    }

    function getDriver(){
      return currentDriver;
    }

    function getRace(){
      return currentRace;
    }

    function getRaceDetails(){
      return {
        driver: currentDriver,
        race: currentRace
      }
    }



  }
})();