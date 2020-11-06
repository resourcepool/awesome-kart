(function(){
  'use strict';

  angular
    .module('ebiz-kart')
    .service("BindingService", ['$timeout', BindingService]);

  function BindingService($timeout){
    var that = this;

    that.inverted = false;
    that.invertedPromise = null;


    var ACTIONS = {
      'GO_FORWARD': 'go_forward',
      'GO_BACKWARD': 'go_backward',
      'NO_GO': 'no_go',
      'TURN_LEFT': 'turn_left',
      'TURN_RIGHT': 'turn_right',
      'NO_TURN': 'no_turn',
      'JUMP': 'jump',
      'OBJECT': 'object'
    };

    var BINDING_TYPE = {
      'KEYBOARD': 'keyboard',
      'KEYBOARD_INVERTED': 'keyboard_inverted',
      'TOUCHSCREEN': 'touchscreen',
      'CARDBOARD': 'cardboard'
    };

    // var ACCELEROMETER_FREQUENCY = 100/6.;
    var GO_FORWARD_ACC = 3;
    var GO_BACKWARD_ACC = 6;
    var GO_FORWARD_CB = 1;
    var GO_BACKWARD_CB = 4;

    var directionTouches = null;
    var driftTouches = null;

    that.mode = BINDING_TYPE.KEYBOARD;
    that.orientation = screen.orientation ? screen.orientation.angle : 180;

    that.accelerometer = null;
    that.down = {};

    that.getAction = getAction;
    that.getCurrentRotation = getCurrentRotation;
    that.setBind = setBind;
    that.setMode = setMode;
    that.invertBindings = invertBindings;
    that.bindTouching = bindTouching;

    function invertBindings(duration){
      if(!that.inverted){
        that.inverted = true;
        that.invertedPromise = $timeout(function(){
          that.inverted = false;
        }, duration);
      }
    }

    function bindTouching($canvas) {

      $canvas.addEventListener("touchstart", function(e){
        var touches = e.touches[e.touches.length - 1];
        var canvasWidth = $canvas.getBoundingClientRect().width;
        if(touches.clientX > canvasWidth / 2) {
          if(!driftTouches){
            driftTouches = touches;
            that.down[68] = true;
          }
        } else {
          if(!directionTouches){
            directionTouches = touches;
          }
        }
      }, false);


      $canvas.addEventListener("touchend", function(e){
        var currentFingerReleased = e.changedTouches[0];
        if(driftTouches && currentFingerReleased.identifier === driftTouches.identifier){
          driftTouches = null;
          that.down[68] = false;
        }
        if(directionTouches && currentFingerReleased.identifier === directionTouches.identifier){
          directionTouches = null;
          that.down[37] = false;
          that.down[38] = false;
          that.down[39] = false;
          that.down[40] = false;
        }
      }, false);

      $canvas.addEventListener("touchmove", function(e){
        var currentFingerMoved = e.changedTouches[0];
        if(directionTouches && currentFingerMoved.identifier === directionTouches.identifier){
          var diffX = currentFingerMoved.clientX - directionTouches.clientX;
          var diffY = currentFingerMoved.clientY - directionTouches.clientY;
          var angle = Math.asin( diffY / Math.sqrt((diffX*diffX)+(diffY*diffY))) * 180 / Math.PI;

          var computedAngle = angle;
          if(diffX > 0) {
            computedAngle = 180 - angle;
          } else {
            computedAngle = (360 + angle) % 360;
          }

          that.down[37] = false;
          that.down[38] = false;
          that.down[39] = false;
          that.down[40] = false;

          // SOUTH WEST
          if(computedAngle >= 0 && computedAngle < 67.5) {
            that.down[37] = true;
            that.down[40] = true;
          }
          // SOUTH
          if(computedAngle >= 67.5 && computedAngle < 112.5) {
            that.down[40] = true;
          }
          // SOUTH EAST
          if(computedAngle >= 112.5 && computedAngle < 180) {
            that.down[40] = true;
            that.down[39] = true;
          }
          // NORTH EAST
          if(computedAngle >= 180 && computedAngle < 247.5) {
            that.down[39] = true;
            that.down[38] = true;
          }
          // NORTH
          if(computedAngle >= 247.5 && computedAngle < 292.5) {
            that.down[38] = true;
          }
          // NORTH WEST
          if(computedAngle >= 292.5 && computedAngle < 360) {
            that.down[38] = true;
            that.down[37] = true;
          }

        }
      }, false);
    }

    /**
     * Set a bind for actions (useful for touchscreen btn)
     * @param input : string
     * @param status : boolean
     */
    function setBind(input, status){
      that.down[input] = status;
    }

    function setMode(mode){
      that.mode = mode;
    }

    function getAction(){
      var actions = {};
      var rotation = null;

      if(that.mode === BINDING_TYPE.KEYBOARD){
        if(that.down[that.inverted ? 40 : 38]){
          actions[ACTIONS.GO_FORWARD] = true;
        } else if(that.down[that.inverted ? 38 : 40]){
          actions[ACTIONS.GO_BACKWARD] = true;
        } else {
          actions[ACTIONS.NO_GO] = true;
        }

        if(that.down[that.inverted ? 39 : 37]){
          actions[ACTIONS.TURN_LEFT] = true;
        } else if(that.down[that.inverted ? 37 : 39]){
          actions[ACTIONS.TURN_RIGHT] = true;
        } else {
          actions[ACTIONS.NO_TURN] = true;
        }

        if(that.down[68]){
          actions[ACTIONS.JUMP] = true;
        }

        // TODO OBJ BIND

      }else if(that.mode === BINDING_TYPE.KEYBOARD_INVERTED){

      }else if(that.mode === BINDING_TYPE.TOUCHSCREEN){
        if(that.accelerometer){
          if(that.accelerometer.z < GO_FORWARD_ACC){
            actions[ACTIONS.GO_BACKWARD] = true;
          } else if(that.accelerometer.z > GO_BACKWARD_ACC){
            actions[ACTIONS.GO_FORWARD] = true;
          } else {
            actions[ACTIONS.NO_GO] = true;
          }

          rotation = getCurrentRotation();
          if(rotation && rotation.turn === "left"){
            actions[ACTIONS.TURN_LEFT] = true;
          } else if(rotation && rotation.turn === "right"){
            actions[ACTIONS.TURN_RIGHT] = true;
          } else {
            actions[ACTIONS.NO_TURN] = true;
          }
        }

        if(that.down['jump']){
          actions[ACTIONS.JUMP] = true;
        }

        if(that.down['object']){
          actions[ACTIONS.OBJECT] = true;
        }

      } else if(that.mode === BINDING_TYPE.CARDBOARD){
        if(that.accelerometer){
          if(that.accelerometer.z < GO_FORWARD_CB){
            actions[ACTIONS.GO_BACKWARD] = true;
          } else if(that.accelerometer.z > GO_BACKWARD_CB){
            actions[ACTIONS.GO_FORWARD] = true;
          } else {
            actions[ACTIONS.NO_GO] = true;
          }

          rotation = getCurrentRotation();
          if(rotation && rotation.turn === "left"){
            actions[ACTIONS.TURN_LEFT] = true;
          } else if(rotation && rotation.turn === "right"){
            actions[ACTIONS.TURN_RIGHT] = true;
          } else {
            actions[ACTIONS.NO_TURN] = true;
          }
        }

        if(that.down['jump_cardboard']){
          actions[ACTIONS.JUMP] = true;
        }

        if(that.down['object']){
          actions[ACTIONS.OBJECT] = true;
        }

      }

      return actions;
    }

    function getCurrentRotation(){

      that.orientation = screen.orientation ? screen.orientation.angle : 180;
      if(!that.accelerometer) return null;
      if(that.orientation === 90){
        if(that.accelerometer.y < -1){
          return { turn: 'left', ratio: Math.abs(that.accelerometer.y+1) };
        }
        if(that.accelerometer.y > 1){
          return { turn: 'right', ratio: Math.abs(that.accelerometer.y-1) };
        }
      }
      if(that.orientation === 270){
        if(that.accelerometer.y > 1){
          return { turn: 'left', ratio: Math.abs(that.accelerometer.y-1) };
        }
        if(that.accelerometer.y < -1){
          return { turn: 'right', ratio: Math.abs(that.accelerometer.y+1) };
        }
      }

      if(that.orientation === 180){
        if(that.accelerometer.x < -1){
          return { turn: 'left', ratio: Math.abs(that.accelerometer.x+1) };
        }
        if(that.accelerometer.x > 1){
          return { turn: 'right', ratio: Math.abs(that.accelerometer.x-1) };
        }
      }
      if(that.orientation === 0){
        if(that.accelerometer.x > 1){
          return { turn: 'left', ratio: Math.abs(that.accelerometer.x-1) };
        }
        if(that.accelerometer.x < -1){
          return { turn: 'right', ratio: Math.abs(that.accelerometer.x+1) };
        }
      }

      return null;
    }

    function init(){

      document.addEventListener('keydown', function(e){
        that.down[e.which] = true;
      });

      document.addEventListener('keyup', function(e){
        that.down[e.which] = false;
      });

    }

    init();

  }

})();