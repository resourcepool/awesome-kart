(function(){
  'use strict';

  angular.module('ebiz-kart')
    .factory('Racer', ["$q", "CarsService", "CircuitsService", "$interval", "$timeout", RacerFactory]);

  function RacerFactory($q, CarsService, CircuitsService, $interval, $timeout){

    var cc = {
      '50cc': 180,
      '100cc': 150,
      '150cc': 130,
      '200cc': 80
    };

    var trackMapping = [
      new THREE.Vector2(0,1),
      new THREE.Vector2(0,0),
      new THREE.Vector2(1,0),
      new THREE.Vector2(1,1)
    ];

    var CC = '100cc';

    var RACER_STATUS = {
      NORMAL: 'normal',
      JUMPING: 'jumping',
      DRIFTING: 'drifting',
      STUNNING: 'stunning',
      BOOSTING: 'boosting'
    };

    // var MOVE_ACTIONS = {
    //   GO_FORWARD: 'go_forward', GO_BACKWARD: 'go_backward', NO_MOVE: 'no_move'
    // };

    var DIRECTIONS = {
      NONE: 'none', LEFT: 'left', RIGHT: 'right'
    };

    var ROTATION_BASE_RATIO = 0.5;
    var ROTATION_SPEED_RATIO = 12;

    var ROTATION_HAND_BASE_RATIO = 1;
    var ROTATION_HANDLING_RATIO = 3;

    var DRIFT_BASE_RATIO = 0.8;
    var DRIFT_TRACTION_RATIO = 6;

    var COUNTER_DRIFT_BASE_RATIO = 0.2;
    var COUNTER_DRIFT_TRACTION_RATIO = 18;

    var DRIFT_MIN_SPEED = 0.5;
    var DRIFT_BLUE_TIME = 1200;
    var DRIFT_RED_TIME = 2400;

    var RATIO_TURBO_DRIFT = 0.4;
    var TIME_TURBO_DRIFT = 750;

    function Racer(car, circuit) {
      this.car = car;
      this.circuit = circuit;
      this.x = 0;
      this.y = 0;
      //this.z = car.width / 2;

      this.rotation = 0;
      this.angle = degToRad(this.rotation);
      this.driftDirection = "";

      this.accelerationLevel = 0;
      this.speed = 0;
      this.ground = 1;
      this.groundBeforeJump = 1;
      this.beforeJumpZ = 0;

      this.status = RACER_STATUS.NORMAL;
      this.driftingTime = -1;

      this.canJump = true;
      this.rotateDirection = DIRECTIONS.NONE;

      this.bonus = 1;
      this.bonusTimeout = null;

      this.design = null;
      this.smoke = null;

      this.points = 0;

      this.nbCp = 0;
      this.turn = 0;
      this.checkpoint = circuit.checkpoints[0];

      this.receivedItems = [];
    }

    Racer.prototype.move = move;
    Racer.prototype.rotate = rotate;
    Racer.prototype.jump = jump;
    Racer.prototype.cancelDrift = cancelDrift;
    Racer.prototype.driftTurbo = driftTurbo;
    Racer.prototype.setBonus = setBonus;
    Racer.prototype.getDriftingFire = getDriftingFire;
    Racer.prototype.getGround = getGround;
    Racer.prototype.moveComputing = moveComputing;
    Racer.prototype.getRotationPerFrame = getRotationPerFrame;
    Racer.prototype.degToRad = degToRad;
    Racer.prototype.getDriftingFire = getDriftingFire;
    Racer.prototype.loadDesignElement = loadDesignElement;
    Racer.prototype.loadSmokeElement = loadSmokeElement;
    Racer.prototype.manageCheckpoints = manageCheckpoints;
    Racer.prototype.manageItems = manageItems;


    /**
     * Get on the circuit normal map the ground value for X, Y pixel.
     * @param x
     * @param y
     * @returns {*}
     */
    function getGround(x, y){
      return CircuitsService.getGroundValue(this.circuit, x, y);
    }

    /**
     * Move according to a moveAction like "go_forward", "go_backward", "no_move"
     * TODO: Optimisation with integer like 0 1 2 ??
     * @param moveAction
     */
    function move(moveAction){
      this.ground = this.getGround(this.x, this.y);
      this.accelerationLevel = CarsService.getCarCurrentAccelerationLevel(moveAction, this.car, this.accelerationLevel, this.bonus, this.ground);
      this.moveComputing();
    }

    function moveComputing(){
      var ground = this.groundBeforeJump || this.ground;

      this.speed = CarsService.getCarCurrentSpeed(this.car, this.accelerationLevel, ground, this.bonus) / cc[CC];

      this.angle = degToRad(this.rotation);

      var nextX = this.x + (Math.sin(this.angle) * this.speed);
      var nextY = this.y + (Math.cos(this.angle) * this.speed);

      var nextGround = this.getGround(nextX, nextY);

      if(nextGround > 0.05){

        this.manageCheckpoints(nextX, nextY);
        this.manageItems(nextX, nextY);

        this.x = nextX;
        this.y = nextY;

      } else {
        this.accelerationLevel = -Math.round(this.accelerationLevel * ground);
      }

    }

    function manageCheckpoints(nextX, nextY){
      var passTrough = isThroughCheckpoint({x: this.x, y: this.y}, {x: nextX, y: nextY}, this.checkpoint.a, this.checkpoint.b);
      if(passTrough){
        var cps = this.circuit.checkpoints;
        this.nbCp = this.nbCp + 1;

        var cpId = this.nbCp % cps.length;
        this.checkpoint = cps[cpId];

        this.turn = Math.floor(this.nbCp / cps.length);

      }
    }

    function manageItems(nextX, nextY) {
      var that = this;
      var items = this.circuit.items.forEach(function(item){
        if(Math.abs(item.instance.tempX - that.x) < 6 && Math.abs(-item.instance.tempY - that.y) < 6) {
          item.instance.getItem(that);
        }
      });
    }


    function rotate(direction){
      var rotationPerFrame = 0;
      this.rotateDirection = direction;
      if(direction === DIRECTIONS.NONE){
        if(this.status === RACER_STATUS.DRIFTING) {
          rotationPerFrame = this.getRotationPerFrame();
          if(this.driftDirection === DIRECTIONS.LEFT){
            rotationPerFrame = -rotationPerFrame;
          }
        }
      } else {
        rotationPerFrame = this.getRotationPerFrame();
        if (this.status === RACER_STATUS.JUMPING && this.driftDirection === DIRECTIONS.NONE) {
          this.driftDirection = direction;
        }

        if (this.status === RACER_STATUS.DRIFTING) {
          if (this.driftDirection === DIRECTIONS.NONE) {
            this.driftDirection = direction;
          }

          if (this.driftDirection === direction) {
            rotationPerFrame *= DRIFT_BASE_RATIO + this.car.traction / DRIFT_TRACTION_RATIO;
          } else if (this.driftDirection !== DIRECTIONS.NONE) {
            rotationPerFrame *= -(COUNTER_DRIFT_BASE_RATIO + this.car.traction / COUNTER_DRIFT_TRACTION_RATIO);
          }
        }
      }
      if(direction === DIRECTIONS.LEFT){
        rotationPerFrame = -rotationPerFrame;
      }

      this.rotation = ( this.rotation - rotationPerFrame + 360 ) % 360;
    }

    function getRotationPerFrame(){
      var speedVar = (!this.speed ? 0 : ROTATION_BASE_RATIO - Math.abs(this.speed) / ROTATION_SPEED_RATIO);
      var handlingVar = ROTATION_HAND_BASE_RATIO + this.car.handling / ROTATION_HANDLING_RATIO;
      return speedVar * handlingVar;
    }

    function degToRad(deg) {
      return deg * Math.PI / 180;
    }


    function cancelDrift(){
      if(this.status === RACER_STATUS.DRIFTING){
        this.status = RACER_STATUS.NORMAL;
        this.driftDirection = DIRECTIONS.NONE;
        this.driftingTime = -1;
      }
    }

    function jump(){
      var that = this;
      var moving = 0;
      if(this.canJump && this.status !== RACER_STATUS.DRIFTING && this.status !== RACER_STATUS.JUMPING){
        this.beforeJumpZ = that.design.obj.position.z;
        moving = that.design.obj.position.z;
        this.canJump = false;
        this.status = RACER_STATUS.JUMPING;
        this.groundBeforeJump = this.ground;

        $interval(function(){
          moving = Math.round((moving + 3/15) * 100) / 100; //Fix javascript number bug (try 3/15+3/15+3/15 on chrome debugger :D )
          that.design.obj.position.z = moving;
        }, 10, 14);

        $timeout(function(){
          $interval(function(){
            moving = Math.round((moving - 3/15) * 100) / 100;
            that.design.obj.position.z = moving;
          }, 10, 14);
        }, 150);

        $timeout(function(){
          that.design.obj.position.z = that.beforeJumpZ;
          that.groundBeforeJump = null;
          if(that.speed > DRIFT_MIN_SPEED && that.rotateDirection !== DIRECTIONS.NONE){
            that.driftDirection = that.rotateDirection;
            that.status = RACER_STATUS.DRIFTING;
            that.driftingTime = new Date().getTime();
          } else {
            that.status = RACER_STATUS.NORMAL;
          }
        }, 301);

        $timeout(function(){
          that.canJump = true;
        }, 550);
      }
    }

    function getDriftingFire(currentTime){
      if(this.status === RACER_STATUS.DRIFTING){
        var driftingDuration = currentTime - this.driftingTime;
        if(driftingDuration > DRIFT_RED_TIME) {
          return 2;
        } else if(driftingDuration > DRIFT_BLUE_TIME) {
          return 1;
        }
      }
      return 0;
    }

    function driftTurbo(){
      if(this.driftingTime > 0){
        var driftingFire = this.getDriftingFire(new Date().getTime());
        this.setBonus(1 + driftingFire*RATIO_TURBO_DRIFT, TIME_TURBO_DRIFT);
      }

      this.cancelDrift();
    }

    function setBonus(amount, duration){
      var that = this;
      if(this.bonusTimeout){
        $timeout.cancel(this.bonusTimeout);
      }

      that.bonus = amount;
      that.bonusTimeout = $timeout(function(){
        that.bonus = 1;
      }, duration);
    }


    function isThroughCheckpoint(posKartFrom, posKartTo, checkPointA, checkPointB){
      var p1 = posKartFrom.x < posKartTo.x ? posKartFrom : posKartTo;
      var p2 = posKartFrom.x < posKartTo.x ? posKartTo : posKartFrom;

      var p3 = checkPointA.x < checkPointB.x ? checkPointA : checkPointB;
      var p4 = checkPointA.x < checkPointB.x ? checkPointB : checkPointA;

      var commonDivider = (p4.y - p3.y)*(p2.x - p1.x) - (p4.x - p3.x)*(p2.y - p1.y);
      if(!commonDivider) return false;

      var ua = ((p4.x - p3.x)*(p1.y - p3.y) - (p4.y - p3.y)*(p1.x - p3.x)) / commonDivider;
      var ub = ((p2.x - p1.x)*(p1.y - p3.y) - (p2.y - p1.y)*(p1.x - p3.x)) / commonDivider;

      return ua > 0 && ua < 1 && ub > 0 && ub < 1;
    }

    function loadDesignElement(){
      var that = this;
      var deferred = $q.defer();

      var carSpritesName = Object.keys(this.car.sprites);
      var carPromises = carSpritesName.map(function(name){
        return loadCharacterMaterial(that.car.sprites[name].url, name);
      });

      $q.all(carPromises).then(function(carMaterials){
        carMaterials.forEach(function(material){
          that.car.sprites[material.key].mat = material.mat;
        });

        var carGeometry = new THREE.PlaneGeometry( that.car.width, that.car.width, 1, 1);

        carGeometry.faceVertexUvs[0][0] = [ trackMapping[0], trackMapping[1], trackMapping[3] ];
        carGeometry.faceVertexUvs[0][1] = [ trackMapping[1], trackMapping[2], trackMapping[3] ];

        var carPlane = new THREE.Mesh(carGeometry, that.car.sprites.FRONT.mat);

        var carObj = new THREE.Object3D();
        carObj.position.x = that.x;
        carObj.position.y = -that.y;
        carObj.position.z = that.car.width/2;
        carObj.add(carPlane);
        carPlane.rotation.x = Math.PI/2;

        that.design = {
          materials: carMaterials,
          geometry: carGeometry,
          plane: carPlane,
          obj: carObj
        };

        deferred.resolve(that.design);
      });
      return deferred.promise;
    }


    function loadSmokeElement(){
      var deferred = $q.defer();
      var that = this;

      var smokeKeys = Object.keys(this.car.smokeSprites);
      var smokePromises = smokeKeys.map(function(key){
        return loadCharacterMaterial(that.car.smokeSprites[key].url, key);
      });

      $q.all(smokePromises).then(function(smokeMaterials) {
        smokeMaterials.forEach(function (material) {
          that.car.smokeSprites[material.key].mat = material.mat;
        });

        var smokeGeometry = new THREE.PlaneGeometry(that.car.width, that.car.width, 1, 1);
        smokeGeometry.faceVertexUvs[0][0] = [trackMapping[0], trackMapping[1], trackMapping[3]];
        smokeGeometry.faceVertexUvs[0][1] = [trackMapping[1], trackMapping[2], trackMapping[3]];

        var smokePlane = new THREE.Mesh(smokeGeometry, that.car.smokeSprites.DRIFT_LEFT_1.mat);

        var smokeObj = new THREE.Object3D();
        smokeObj.position.x = that.x;
        smokeObj.position.y = -that.y;
        smokeObj.position.z = that.car.width / 2;
        smokeObj.add(smokePlane);
        smokePlane.rotation.x = Math.PI / 2;

        that.smoke = {
          materials: smokeMaterials,
          geometry: smokeGeometry,
          plane: smokePlane,
          obj: smokeObj
        };

        deferred.resolve(that.smoke);
      });

      return deferred.promise;
    }



    function loadCharacterMaterial(url, key){
      var deferred = $q.defer();

      var loader = new THREE.TextureLoader();
      loader.load(url, function(tex){
          tex.magFilter = THREE.NearestFilter;
          tex.minFilter = THREE.NearestFilter;

          var mat = new THREE.MeshBasicMaterial({
            map: tex,
            transparent: true,
            side: THREE.DoubleSide
          });
          deferred.resolve({key: key, mat: mat});
        },
        function(){},
        function(){
          deferred.reject();
        });

      return deferred.promise;

    }

    return Racer;
  }
})();