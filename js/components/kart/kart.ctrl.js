(function(){
  'use strict';

  angular
    .module('ebiz-kart')
    .controller('KartCtrl', ['$state', '$scope', '$q', '$timeout', '$interval', '$cookies', 'BindingService', 'RaceService', 'CircuitsService', 'Racer', 'Item', 'driverName', 'CONFIG', KartCtrl]);

  function KartCtrl($state, $scope, $q, $timeout, $interval, $cookies, BindingService, RaceService, CircuitsService, Racer, Item, driverName, CONFIG){
    var vm = this;

    vm.cordovaAvailable = !!window.cordova;

    vm.activateStereo = activateStereo;
    vm.setBinding = setBinding;
    vm.backToChoice = backToChoice;
    vm.gameEndAction = gameEndAction;
    vm.backToSite = backToSite;

    vm.win = false;
    vm.lose = false;

    vm.CONFIG = CONFIG;

    var fpsTable = [];

    var animation, threeCanvas;

    var CAMERA_HEIGHT = 8;
    var CAMERA_FOCUS = 80;
    var CAMERA_MAX = 2500;
    var CAMERA_BACK = -8;

    var shake = 0;


    var lastTime = new Date().getTime();

    var controllerClosed = false;


    vm.objective = CONFIG.OBJECTIVE;
    vm.timeLimit = CONFIG.TIME_LIMIT;
    vm.debug = CONFIG.DEBUG;

    vm.racer = null;

    vm.isLoading = true;

    vm.finished = false;

    vm.beginTime = new Date().getTime();
    vm.totalTime = 0;
    vm.finalPoints = 0;

    var scene, camera, renderer, effect;


    var physicsInterval = null;
    var backgroundRefreshInterval = null;
    var currentTime = new Date().getTime();

    var mode7ctnr = document.getElementById('mode7ctnr');

    function backToChoice(){

      clearRace();
      controllerClosed = true;
      $state.go('kart_driver');
    }

    function init(){

      vm.racer = null;

      vm.isLoading = true;


      mode7ctnr = document.getElementById('mode7ctnr');
      BindingService.setMode(window.cordova ? 'touchscreen' : 'keyboard');

      clearRace();

      vm.currentCar = RaceService.getDriver();
      if(!vm.currentCar){
        $state.go('kart_driver');
        return;
      }

      vm.currentCircuit = CircuitsService.getCurrentCircuit();

      var $parallax = document.getElementById('parallax');
      $parallax.innerHTML = "";
      var parallaxSizes = vm.currentCircuit.parallaxSizes;
      var parallaxes = vm.currentCircuit.parallaxes;

      parallaxes.forEach(function(paralax){
        var $para = document.createElement('div');
        $para.className = "parallax-ctnr";
        paralax.$elem = $para;
        $para.style.width = parallaxSizes.width * 3 + "px";
        $para.style.height = parallaxSizes.height + "px";
        $para.style.willChange = 'transform';
        // $para.style.transition = 'transform 200ms linear';

        for(var i = -1; i < 2; i++) {
          var $back = document.createElement('div');
          $back.className = "pixellated-background parallax-background";
          $back.style.backgroundImage = "url('"+paralax.img+"')";
          $back.style.transform = "translate3d(" + parallaxSizes.width * i + "px, 0, 0)";
          $back.style.backgroundSize = parallaxSizes.width+"px "+parallaxSizes.height+"px";

          $para.appendChild($back);
        }

        $parallax.appendChild($para);
      });

      vm.circuitBack = { background: vm.currentCircuit.bgColor };

      vm.stereoActivated = false;
      vm.accelerometer = null;

      vm.racer = new Racer(vm.currentCar, vm.currentCircuit);
      vm.racer.rotation = vm.currentCircuit.direction;
      vm.racer.x = vm.currentCircuit.startPosition.x;
      vm.racer.y = vm.currentCircuit.startPosition.y;

      vm.cameraPositionZ = CAMERA_HEIGHT;

      vm.beginTime = new Date().getTime();
      vm.totalTime = 0;

      initScene();

    }

    function initScene() {

      camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, CAMERA_MAX);
      camera.position.set(0, 0, CAMERA_HEIGHT);
      camera.up = new THREE.Vector3(0,0,1);
      camera.lookAt(new THREE.Vector3(0, CAMERA_FOCUS, 0));

      var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.9 );
      directionalLight.position.y = -750;
      directionalLight.position.z = 1500;
      directionalLight.position.x = 750;

      scene = new THREE.Scene();
      scene.add( directionalLight );

      var loadingPromises = [];

      loadingPromises.push(CircuitsService.loadCircuit(vm.currentCircuit).then(function(circuit){
        scene.add(circuit.three.mesh);
        updateBackground();
      }));

      loadingPromises.push(CircuitsService.loadItems(vm.currentCircuit).then(function(items){
        items.forEach(function(item){
          scene.add(item.obj)
        });
      }));

      loadingPromises.push(CircuitsService.loadBuildings(vm.currentCircuit).then(function(buildings){
        buildings.forEach(function(building){
          scene.add(building.obj)
        });
      }));

      loadingPromises.push(CircuitsService.loadSprites(vm.currentCircuit).then(function(sprites){
        sprites.forEach(function(sprite){
          sprite.positions.forEach(function(position){
            scene.add(position.obj);
          });
        });
      }));

      loadingPromises.push(vm.racer.loadDesignElement().then(function(design){
        scene.add(design.obj);
      }));

      loadingPromises.push(vm.racer.loadSmokeElement().then(function(smoke){
        scene.add(smoke.obj);
      }));

      $q.all(loadingPromises).then(function(){
        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize( window.innerWidth, window.innerHeight );


        effect = new THREE.StereoEffect( renderer );
        effect.setEyeSeparation(1);
        effect.setSize( window.innerWidth, window.innerHeight );

        threeCanvas = renderer.domElement;

        mode7ctnr.appendChild( renderer.domElement );

        BindingService.bindTouching(threeCanvas);

        renderer.domElement.style.zIndex = 13;

        vm.isLoading = false;


        startAnimate();
      });

    }

    function startAnimate(){
      if(physicsInterval) {
        $interval.cancel(physicsInterval);
      }
      if(backgroundRefreshInterval){
        $interval.cancel(backgroundRefreshInterval);
      }
      physicsInterval = $interval(updatePhysics, 1000/60);
      backgroundRefreshInterval = $interval(updateBackgroundRotation, 1000/60);

      animate();
    }

    function updatePhysics(){

      var actions = BindingService.getAction();

      if(actions['go_backward']) {
        vm.racer.move('go_backward');
      }
      if(actions['go_forward']) {
        vm.racer.move('go_forward');
      }
      if(actions['no_go']) {
        vm.racer.move('no_move');
        vm.racer.cancelDrift();
      }

      if(actions['turn_left']){
        vm.racer.rotate('left');
      }
      if(actions['turn_right']){
        vm.racer.rotate('right');
      }
      if(actions['no_turn']){
        vm.racer.rotate('none');
      }

      defineDriverMaterial(actions);

      if(actions['jump']){
        vm.racer.jump();
      } else {
        vm.racer.driftTurbo();
      }

      var spriteRotation = (vm.racer.rotation-180) * Math.PI / 180;
      var circuitSpritesKeys = Object.keys(vm.racer.circuit.sprites);
      circuitSpritesKeys.forEach(function(spriteKey){
        var sprite = vm.racer.circuit.sprites[spriteKey];
        sprite.positions.forEach(function(position){
          var dist = Math.sqrt(Math.pow(position.x - camera.position.x, 2) + Math.pow(-position.y - camera.position.y, 2));
          position.obj.visible = dist < 300;
          if(sprite.autorotate) {
            position.obj.rotation.y = spriteRotation;
          }
        });
      });
    }


    function animate() {
      // vm.accelerometer = BindingService.accelerometer;
      shake = ((shake+1) % 10);

      currentTime = new Date().getTime();
      var total = currentTime - lastTime;
      lastTime = currentTime;
      vm.fps = Math.round(1000/total);
      if(fpsTable.length >= 100) {
        fpsTable.splice(0,1);
      }
      fpsTable.push(vm.fps);

      var sumFPS =  fpsTable.reduce(function(lastVal, newVal){
        return lastVal + newVal;
      }, 0);

      vm.averageFPS = Math.floor(sumFPS/fpsTable.length);
      vm.totalTime = Math.round((currentTime - vm.beginTime) / 1000);


      var driverObj = vm.racer.design.obj;
      var driverPlane = vm.racer.design.plane;
      var smokeObj = vm.racer.smoke.obj;
      var smokePlane = vm.racer.smoke.plane;
      var smokeImgs = vm.racer.car.smokeSprites;

      if(driverObj){
        var angle = (vm.racer.rotation-90) * Math.PI / 180;

        driverObj.position.x = vm.racer.x + (-2*Math.cos(angle));
        driverObj.position.y = -vm.racer.y + (-2*Math.sin(angle));


        driverPlane.rotation.y = (vm.racer.rotation-180) * Math.PI / 180;

        camera.position.x = driverObj.position.x + (CAMERA_BACK * Math.cos(angle));
        camera.position.y = driverObj.position.y + (CAMERA_BACK * Math.sin(angle));


        var lookAt = {
          x: driverObj.position.x + (CAMERA_FOCUS * Math.cos(angle)),
          y: driverObj.position.y + (CAMERA_FOCUS * Math.sin(angle)),
          z: vm.cameraPositionZ - CAMERA_HEIGHT
        };

        camera.lookAt(new THREE.Vector3(lookAt.x, lookAt.y, lookAt.z));

        var drifting = +(vm.racer.status === 'drifting');

        driverObj.position.x += (drifting * +(shake>5) * 0.1);


        if(smokeObj){
          smokePlane.rotation.y = (vm.racer.rotation-180) * Math.PI / 180;

          if(drifting){
            var fire = vm.racer.getDriftingFire(currentTime);
            var angleDrift = vm.racer.driftDirection === 'left' ? -15 : +15;
            var mat;
            if(fire === 2){
              mat = vm.racer.driftDirection === 'left' ? smokeImgs.DRIFT_LEFT_RED : smokeImgs.DRIFT_RIGHT_RED;
            } else if(fire === 1) {
              mat = vm.racer.driftDirection === 'left' ? smokeImgs.DRIFT_LEFT_BLUE : smokeImgs.DRIFT_RIGHT_BLUE;
            } else {
              mat = vm.racer.driftDirection === 'left' ? smokeImgs.DRIFT_LEFT_1 : smokeImgs.DRIFT_RIGHT_1;
            }

            smokePlane.material = mat.mat;
            smokeObj.position.x = driverObj.position.x + (1.3*Math.cos(angle+angleDrift));
            smokeObj.position.y = driverObj.position.y + (1.3*Math.sin(angle+angleDrift));
            smokeObj.position.x += ( drifting * +(shake > 5) * 0.1);
          }

          smokeObj.position.z = -3 + drifting * 6;
        }

      }

      vm.racer.circuit.items.forEach(function(item, index){
        if(item.obj){

          if(item.instance.available) {
            item.obj.rotation.x += 0.05;
            item.obj.rotation.y += 0.05;

            item.instance.nextFrame();
            item.obj.position.x = item.instance.tempX;
            item.obj.position.y = item.instance.tempY;

            var dist = Math.sqrt(Math.pow(item.obj.position.x - camera.position.x, 2) + Math.pow(item.obj.position.y - camera.position.y, 2));

            var visible = dist < 300;

            item.obj.visible = item.instance.available && visible;
          } else {
            item.obj.visible = false;
          }

        }
      });

      if(vm.stereoActivated){
        effect.render( scene, camera );
      } else {
        renderer.render( scene, camera );
      }

      vm.finished = isGameFinished();

      if(!vm.finished && !controllerClosed){
        animation = requestAnimationFrame( animate );
      } else {

        vm.finalPoints = vm.racer.points + vm.timeLimit - vm.totalTime;
        vm.bonusTime = vm.timeLimit - vm.totalTime;

        if(vm.finalPoints < vm.objective){
          vm.lose = true;
        } else {
          vm.win = true;
        }

        // Set score in a cookie to send by mail
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 3);
        var cookie = $cookies.put('score', vm.finalPoints.toString(),  {'path': "/", 'expires': expireDate});

      }
    }


    function gameEndAction(retry){

      if(vm.lose){
        vm.lose = false;
        if(retry){
          vm.isLoading = true;
          $timeout(function(){
            clearRace();
            $timeout(function(){
              init();
            });
          });
        } else {
          document.location.href = CONFIG.LINK_SITE;
        }
      } else if(vm.win) {
        vm.win = false;
        if(retry){
          vm.isLoading = true;
          $timeout(function(){
            clearRace();
            $timeout(function(){
              init();
            });
          });
        } else {
          var jobtype = (angular.isUndefined($cookies.get('jobtype')) ? "job" : $cookies.get('jobtype'));
          var score = (vm.finalPoints > vm.objective + (vm.objective * 10 / 100) ? "awesome" : "passed");
          document.location.href = CONFIG.LINK_OFFERS + jobtype + "/" + score;
        }
      }
    }

    function backToSite(){
      document.location.href = CONFIG.LINK_SITE;
    }


    function isGameFinished(){
      return vm.racer.turn >= 1;
    }

    function activateStereo(){
      vm.stereoActivated = !vm.stereoActivated;

      if(!vm.stereoActivated){
        BindingService.setMode(window.cordova ? 'touchscreen' : 'keyboard');
        renderer.setSize( window.innerWidth, window.innerHeight );
      } else {
        BindingService.setMode('cardboard');
      }
      $timeout(updateBackground);
    }

    function defineDriverMaterial(actions){
      var drivers = vm.racer.car.sprites;
      var matter = drivers.FRONT;

      if(vm.racer.status === 'drifting'){
        if(vm.racer.driftDirection === "left"){ matter = drivers.DRIFT_LEFT; }
        if(vm.racer.driftDirection === "right"){ matter = drivers.DRIFT_RIGHT; }
      } else {
        if(actions['turn_left']){
          matter = vm.racer.speed ? drivers.TURN_LEFT : drivers.SEE_LEFT;
        } else if(actions['turn_right']){
          matter = vm.racer.speed ? drivers.TURN_RIGHT : drivers.SEE_RIGHT;
        }
      }

      if(matter){
        setRacerMaterial(matter);
      }
    }

    function setRacerMaterial(driver) {
      if(driver.mat && vm.racer.design.plane && driver.mat !== vm.racer.design.plane.material){
        vm.racer.design.plane.material = driver.mat;
      }
    }


    function clearRace(){
      mode7ctnr = document.getElementById('mode7ctnr');
      if(animation){
        cancelAnimationFrame(animation);
        animation = null;
      }

      vm.finished = true;

      if(physicsInterval) {
        $interval.cancel(physicsInterval);
      }
      if(backgroundRefreshInterval){
        $interval.cancel(backgroundRefreshInterval);
      }

      if(threeCanvas){
        mode7ctnr.removeChild(threeCanvas);
        threeCanvas = null;
      }
    }

    function setBinding(type, value){
      BindingService.setBind(type, value);
    }

    function updateBackground(){

      if(vm.stereoActivated){
        // updateForID('map-bg-stereo-1', 0.5);
        // updateForID('map-bg-stereo-2', 0.5);
      } else {
        //updateForID('map-background', 1);
      }

      updateBackgroundRotation();

      // function updateForID(id, size){
      //   var mapBackground = document.getElementById(id);
      //   if(mapBackground){
      //
      //     var bgWidth = vm.racer.circuit.backgroundImage.width;
      //     mapBackground.style.width = 'calc(100% + ' + vm.racer.circuit.backgroundImage.width+'px)';
      //
      //     var nbPics = Math.ceil(size*window.innerWidth / bgWidth) +1;
      //     var pics = mapBackground.querySelectorAll('img');
      //
      //     if(pics.length < nbPics){
      //       for(var i = pics.length; i < nbPics; i++) {
      //         var clone = vm.racer.circuit.backgroundImage.cloneNode();
      //         clone.style.position = 'absolute';
      //         clone.style.bottom = 0;
      //         clone.style.left = (i*(clone.width-1))+'px';
      //         clone.style.width = clone.width+'px';
      //         mapBackground.append(clone);
      //       }
      //     }
      //
      //     updateBackgroundRotation();
      //   }
      // }

    }


    function updateBackgroundRotation() {

      if (vm.stereoActivated) {
        // updateForID('map-bg-stereo-1');
        // updateForID('map-bg-stereo-2');
      } else {
      }

      var moduloAngle = (vm.racer.angle*180/Math.PI) % 360;
      var reducedWidth = vm.currentCircuit.parallaxSizes.width / 360;

      vm.currentCircuit.parallaxes.forEach(function(para){
        para.$elem.style.transform = 'translate3d('+((para.speed * moduloAngle) * reducedWidth) + 'px, 0, 0)';
      });


      // function updateForID(id) {
      //   var bgWidth = vm.racer.circuit.backgroundImage.width;
      //   var mapBackground = document.getElementById(id);
      //   var transformValue = (-bgWidth) *((360 - vm.racer.rotation) / 360);
      //   if(mapBackground) {
      //     mapBackground.style.transform = 'translateX(' + transformValue + 'px)';
      //   }
      // }
    }

    $scope.$on('$stateChangeSuccess', function(e, toState, toStateParams, fromState){


      if(toState.name === "kart"){

        $timeout(function(){
          init();
        }, 200);
      }


      if(fromState.name === "kart"){
        clearRace();
        controllerClosed = true;
      }
    });

    window.addEventListener("resize", function() {
      vm.orientation = screen.orientation ? screen.orientation.angle : 180;

      if(camera){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }

      renderer.setSize( window.innerWidth, window.innerHeight );

      updateBackground();


    });
  }

})();
