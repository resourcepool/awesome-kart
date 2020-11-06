(function () {
  'use strict';

  angular
    .module('ebiz-kart')
    .controller('DriverSelectionCtrl', ['$scope', '$timeout', '$state', 'RaceService', 'CONFIG', 'driverName', DriverSelectionCtrl]);

  function DriverSelectionCtrl($scope, $timeout, $state, RaceService, CONFIG, driverName) {
    var vm = this;

    vm.getDriverColor = getDriverColor;
    vm.selectDriver = selectDriver;
    vm.confirmDriver = confirmDriver;
    vm.goHelp = goHelp;

    //var driverChart = null;
    //Chart.defaults.global.defaultFontColor = 'rgba(255,255,255,0.8';
    //Chart.defaults.global.legend.display = false;
    //Chart.defaults.global.tooltips.enabled = false;
    var labels = ['Vitesse', 'Accelération', 'Poids', 'Maniabilité', 'Adhérence', 'Chance'];

    vm.drivers = CONFIG.DRIVERS;

    vm.chosenDriver = vm.drivers[0];

    vm.form_name = false;
    vm.name = driverName.getName();


    selectDriver(vm.drivers[0]);

    function confirmDriver() {
      if (angular.isUndefined(vm.name) || vm.name.length < 2 || !(/^[a-zA-Z0-9\-]*$/.test(vm.name))) {
        vm.form_name = true;
      } else {
        driverName.setName(vm.name);
        RaceService.setDriver(vm.chosenDriver);
        document.removeEventListener('keyup', keyMapper);
        $state.go('kart');
      }
    }

    function goHelp() {
      document.removeEventListener('keyup', keyMapper);
      $state.go('help');
    }

    function getDriverColor(driver) {
      // return { background: driver.mainColor }
      return {"background-image": 'url("' + driver.mainBackground + '")'}
    }

    function selectDriver(driver) {
      // if(!driverChart) {
      //   initDriverChart();
      // }
      vm.chosenDriver = driver;

      var rgb = hexToRgb(driver.mainColor);
      var bgColor = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ", 0.05)";
      var brdColor = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ", 1)";

      // driverChart.config.data.datasets[0] = {
      //   backgroundColor: bgColor,
      //   borderColor: brdColor,
      //   pointBackgroundColor: brdColor,
      //   pointBorderColor: 'white',
      //   pointHoverBackgroundColor: 'white',
      //   pointHoverBorderColor: brdColor,
      //   data: [driver.speed, driver.acceleration, driver.weight, driver.handling, driver.traction, driver.luck]
      // };
      //
      // driverChart.update();

    }

    function hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : {
          r: 0, g: 0, b: 0
        };
    }

    // function initDriverChart(){
    //
    //   var scCanvas = document.getElementById('stats-chart');
    //   var scCtx = scCanvas.getContext('2d');
    //
    //   driverChart = new Chart(scCtx, {
    //     type: 'radar',
    //     data: {
    //       labels: labels,
    //       datasets: []
    //     },
    //     options:
    //     {
    //       scaleShowLabels: false,
    //       scale: {
    //         gridLines:{
    //           color: 'rgba(255,255,255,0.3)'
    //         },
    //         angleLines: {
    //           color: 'rgba(255,255,255,0.25)'
    //         },
    //         pointLabels: {
    //           fontSize: 16
    //         },
    //         ticks: {
    //           display: false,
    //           min: 0,
    //           max: 6
    //         }
    //       }
    //     }
    //   });
    // }

    function moveChoice(direction) {
      var $drivers = document.getElementById('drivers');

      var width = $drivers.getBoundingClientRect().width - 20; // 20 = padding
      var nbTilesPerLine = Math.floor(width / 100);
      var chosenIndex = vm.drivers.indexOf(vm.chosenDriver);
      var nbLine = Math.ceil(vm.drivers.length / nbTilesPerLine);

      var currentLine = Math.floor(chosenIndex / nbTilesPerLine);
      var currentTile = chosenIndex % nbTilesPerLine;

      if (direction === 'left') {
        if (currentTile === 0) {
          if (currentLine === nbLine - 1) {
            vm.chosenDriver = vm.drivers[vm.drivers.length - 1];
          } else {
            vm.chosenDriver = vm.drivers[(currentLine * nbTilesPerLine) + (nbTilesPerLine - 1)]
          }
        } else {
          vm.chosenDriver = vm.drivers[(currentLine * nbTilesPerLine) + (currentTile - 1)]
        }
      }

      if (direction === 'right') {
        if (chosenIndex === vm.drivers.length - 1) {
          vm.chosenDriver = vm.drivers[(currentLine * nbTilesPerLine)];
        } else {
          if (currentTile === nbTilesPerLine - 1) {
            vm.chosenDriver = vm.drivers[(currentLine * nbTilesPerLine)];
          } else {
            vm.chosenDriver = vm.drivers[(currentLine * nbTilesPerLine) + (currentTile + 1)];
          }
        }
      }

      if (direction === 'top') {
        if (currentLine === 0) {
          var lastLineTiles = (vm.drivers.length % nbTilesPerLine) || nbTilesPerLine;
          if (lastLineTiles <= currentTile) {
            console.log('Choose last');
            vm.chosenDriver = vm.drivers[vm.drivers.length - 1];
          } else {
            vm.chosenDriver = vm.drivers[((nbLine - 1) * nbTilesPerLine) + currentTile];
          }
        } else {
          vm.chosenDriver = vm.drivers[((currentLine - 1) * nbTilesPerLine) + currentTile];
        }
      }

      if (direction === 'bottom') {
        if (currentLine === nbLine - 1) {
          vm.chosenDriver = vm.drivers[currentTile];
        } else {
          var next = ((currentLine + 1) * nbTilesPerLine) + currentTile;
          if (next >= vm.drivers.length) next = vm.drivers.length - 1;
          vm.chosenDriver = vm.drivers[next];
        }
      }


      $timeout(function () {
        $scope.$apply();
      });

    }

    $scope.$on('$stateChangeSuccess', function (e, to, toa, from, froma) {

      if (from.name === "kart_driver") {
        document.removeEventListener('keyup', keyMapper);
      }
      if (to.name === "kart_driver") {
        document.addEventListener('keyup', keyMapper, false);
      }


    });

    function keyMapper(e) {

      //37 left
      //38 top
      //39 right
      //40 bottom

      var bindingKeys = {
        37: 'left',
        38: 'top',
        39: 'right',
        40: 'bottom'
      };

      var bindingKey = bindingKeys[e.keyCode];
      if (bindingKey) {
        moveChoice(bindingKey);
      }

      if (e.keyCode === 13) { // ENTER
        confirmDriver();
      }

      if (e.keyCode === 27) { // ESCAPE
        goHelp();
      }

    }
  }
})();