(function(){
  'use strict';

  angular
      .module('ebiz-kart')
      .service('CircuitsService', ['$q', '$http', 'Item', 'CONFIG', CircuitsService]);

  function CircuitsService($q, $http, Item, CONFIG){
    var that = this;

    that.getGroundValue = getGroundValue;
    that.loadCircuit = loadCircuit;
    that.loadItems = loadItems;
    that.loadSprites = loadSprites;
    that.loadBuildings = loadBuildings;
    that.getCurrentCircuit = getCurrentCircuit;

    var trackMapping = [
      new THREE.Vector2(0,1),
      new THREE.Vector2(0,0),
      new THREE.Vector2(1,0),
      new THREE.Vector2(1,1)
    ];

    var circuits = CONFIG.CIRCUITS;

    var currentCircuit = circuits[0];

    function getCurrentCircuit(){
      return currentCircuit;
    }

    function getGroundValue(circuit, x, y){
      if(circuit.mapGrounds.length && x && y){
        return circuit.mapGrounds[Math.round(x)][Math.round(y)];
      } else {
        return 0;
      }
    }

    function loadBuildings(circuit) {
      var deferred = $q.defer();

      circuit.buildings.forEach(function(building){

        var geometry = new THREE.BoxGeometry( building.sizeX, building.sizeY, building.height );
        var material = new THREE.MeshPhongMaterial( {
          color: building.color,
          polygonOffset: true,
          polygonOffsetFactor: 1, // positive value pushes polygon further away
          polygonOffsetUnits: 1
        } );

        material.transparent = building.opacity < 1;
        material.opacity = building.opacity;

        building.obj = new THREE.Mesh( geometry, material );

        var geo = new THREE.EdgesGeometry( geometry ); // or WireframeGeometry
        var mat = new THREE.LineBasicMaterial( { color: building.color, linewidth: 4 } );
        var wireframe = new THREE.LineSegments( geo, mat );
        building.obj.add( wireframe );

        building.obj.position.x = building.x;
        building.obj.position.y = -building.y;

      });

      deferred.resolve(circuit.buildings);

      return deferred.promise;
    }

    function loadSprites(circuit) {
      var promises = [];
      var spritesKeys = Object.keys(circuit.sprites);
      spritesKeys.forEach(function(spriteKey){
        var deferred = $q.defer();
        promises.push(deferred.promise);
        var sprite = circuit.sprites[spriteKey];

        var loader = new THREE.TextureLoader();
        loader.load(sprite.texfile, function(spriteTex){
          if(spriteTex) {
            spriteTex.magFilter = THREE.NearestFilter;
            spriteTex.minFilter = THREE.NearestFilter;
            var texMaterial = new THREE.MeshBasicMaterial({
              map: spriteTex,
              side: THREE.DoubleSide
            });

            texMaterial.transparent = true;
            var texGeometry = new THREE.PlaneGeometry( sprite.width, sprite.height, 1, 1);
            texGeometry.faceVertexUvs[0][0] = [ trackMapping[0], trackMapping[1], trackMapping[3] ];
            texGeometry.faceVertexUvs[0][1] = [ trackMapping[1], trackMapping[2], trackMapping[3] ];

            var plane = new THREE.Mesh( texGeometry, texMaterial );
            plane.position.x = 0;
            plane.position.y = 0;
            plane.position.z = 0;

            plane.rotation.x = Math.PI / 2.;

            sprite.obj = plane;

            sprite.positions.forEach(function(position){
              position.obj = sprite.obj.clone();
              position.obj.position.set(position.x, -position.y, sprite.height/2.);
              if(position.ry) { position.obj.rotation.y = position.ry }
            });

            deferred.resolve(sprite);
          }
        });
      });
      return $q.all(promises);
    }


    function loadItems(circuit) {
      var promises = [];
      circuit.items.forEach(function(item){
        var deferred = $q.defer();

        promises.push(deferred.promise);

        item.instance = new Item(item.pos, item.type, item.value, item.duration, item.img, item.libelle, item.move, item.timeout);
        var loader = new THREE.TextureLoader();
        loader.load(item.img, function(itemTex){
          item.obj = item.instance.buildItem(itemTex);
          deferred.resolve(item);
        });
      });
      return $q.all(promises);
    }

    function loadCircuit(circuit){
      var deferred = $q.defer();



      var mgi = new Image();
      mgi.onload = function(){
        var mgc = document.createElement("canvas");
        var mgctx = mgc.getContext("2d");
        mgc.width = mgi.width;
        mgc.height = mgi.height;
        mgctx.drawImage(mgi, 0, 0);
        var mgData = mgctx.getImageData(0,0,mgc.width, mgc.height).data;
        for(var i = 0; i < mgi.width; i++){
          circuit.mapGrounds[i] = [];
          for(var j = 0; j < mgi.height; j++){
            var index = (j * (mgi.width*4)) + (i * 4);
            circuit.mapGrounds[i][j] = mgData[index] / 255.;
          }
        }
        mgc = null;
        mgctx = null;
        mgData = null;

        circuit.width = mgi.width;
        circuit.height = mgi.height;


        var loader = new THREE.TextureLoader();
        loader.load(
            circuit.map,
            function(tex){


              tex.magFilter = THREE.NearestFilter;
              tex.minFilter = THREE.NearestFilter;
              var material = new THREE.MeshBasicMaterial({
                map: tex
              });

              var geometry = new THREE.PlaneGeometry( circuit.width, circuit.height, 1, 1);
              geometry.faceVertexUvs[0][0] = [ trackMapping[0], trackMapping[1], trackMapping[3] ];
              geometry.faceVertexUvs[0][1] = [ trackMapping[1], trackMapping[2], trackMapping[3] ];

              var plane = new THREE.Mesh( geometry, material );
              plane.position.x = circuit.width/2;
              plane.position.y = -circuit.height/2;

              circuit.three.tex = tex;
              circuit.three.material = material;
              circuit.three.geometry = geometry;
              circuit.three.mesh = plane;

              $http({
                url: circuit.background,
                method: "GET",
                responseType: "blob"
              }).then(function(res){
                circuit.backgroundBlobUrl = window.URL.createObjectURL(res.data);
                var image = new Image();
                image.onload = function(){
                  circuit.backgroundImage = image;
                  deferred.resolve(circuit);
                };
                image.src = circuit.backgroundBlobUrl;

              }, function(err){
                deferred.reject();
              });


            }, function step(){}, function(){ deferred.reject(); }
        );

      };
      mgi.onerror = function(){ deferred.reject(); };
      mgi.src = circuit.normales;

      return deferred.promise;
    }

  }
})();