(function(){
  'use strict';

  angular
      .module('ebiz-kart')
      .service('CarsService', [CarsService]);

  function CarsService(){
    var that = this;

    that.getCarCurrentAccelerationLevel = getCarCurrentAccelerationLevel;
    that.getCarCurrentSpeed = getCarCurrentSpeed;

    function getCarMaxSpeed(car, bonus, ground){
      return (4 + 0.3*car.speed) * 40 * (ground || 1);
    }

    function getCarMaxBackSpeed(car, bonus, ground){
      return (4 + 0.3*car.speed) * 12 * (ground || 1);
    }

    function getCarCurrentAccelerationLevel(method, car, accelerationLevel, bonus, ground){

      var nextAccLevel = accelerationLevel;

      if(method === 'go_forward'){
        nextAccLevel = accelerationLevel >= 0 ? accelerationLevel+1 : accelerationLevel+3;
      } else if(method === 'go_backward'){
        nextAccLevel = accelerationLevel < 0 ? accelerationLevel-1 : accelerationLevel-3;
      } else if(method === 'no_move'){
        if(accelerationLevel){
          nextAccLevel = accelerationLevel >= 0 ? accelerationLevel-1 : accelerationLevel+1;
        }
      }



      if(car.acceleration * nextAccLevel <= getCarMaxSpeed(car, bonus, ground) && car.acceleration * nextAccLevel >= -getCarMaxBackSpeed(car, bonus, ground)){
        return nextAccLevel;
      } else {
        if(accelerationLevel > 0){
          return accelerationLevel-1;
        } else {
          return accelerationLevel+1; // Fix bound out after bonus/malus
        }
      }
    }

    function getCarCurrentSpeed(car, accelerationLevel, ground, bonus) {
      if(bonus > 1 && ground !== 0){
        return car.acceleration * accelerationLevel * bonus;
      } else {
        return car.acceleration * accelerationLevel * bonus * ground;
      }
    }

  }
})();