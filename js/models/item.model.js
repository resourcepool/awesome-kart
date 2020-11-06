(function(){
  'use strict';

  angular.module('ebiz-kart')
    .factory('Item', ['$timeout', 'BindingService', ItemFactory]);

  function ItemFactory($timeout, BindingService){

    var ITEM_TYPES = {
      MALUS: 'MALUS',
      SUPER_MALUS: 'SUPER_MALUS',
      BONUS: 'BONUS',
      SUPER_BONUS: 'SUPER_BONUS',
      INVERT: 'INVERT',
      SLOW: 'SLOW',
      SPEED: 'SPEED'
    };

    var trackMapping = [
      new THREE.Vector2(0,1),
      new THREE.Vector2(0,0),
      new THREE.Vector2(1,0),
      new THREE.Vector2(1,1)
    ];

    function Item(position, type, value, duration, img, libelle, move, timeout){
      this.x = position.x;
      this.y = -position.y;
      this.type = type;
      this.value = value;
      this.duration = duration || 0;
      this.available = true;
      this.timeout = timeout || 0;
      this.move = move;
      this.move.i = 0;
      this.move.sense = false;

      this.img = img;
      this.libelle = libelle;

      this.tempX = this.x;
      this.tempY = this.y;
    }

    Item.prototype.getItem = getItem;
    Item.prototype.buildItem = buildItem;
    Item.prototype.nextFrame = nextFrame;

    function nextFrame() {
      switch (this.move.type){
        case 'stay': stay(this); break;
        case 'comeback': comeback(this); break;
        case 'path': path(this); break;
      }
      return this;


      function stay(that){
        that.tempX = that.x;
        that.tempY = that.y;
      }

      function comeback(that){
        var move = that.move;
        move.i = move.i || 0;

        if(move.sense) {
          if(move.i < move.iterations){
            that.tempX -= (move.goX - that.x)/move.iterations;
            that.tempY -= (-move.goY - that.y)/move.iterations;
            move.i++;
          } else {
            move.i = 0;
            move.sense = false;
          }
        } else {
          if(move.i < move.iterations){
            that.tempX += (move.goX - that.x)/move.iterations;
            that.tempY += (-move.goY - that.y)/move.iterations;
            move.i++;
          } else {
            move.i = 0;
            move.sense = true;
          }
        }
      }
      function path(that){
        var move = that.move;
        move.i = move.i || 0;

        if(move.iterations && move.path.length){
          var idOrig = Math.floor(move.i/ (move.iterations/move.path.length));

          var idNext = (idOrig+1) % move.path.length;

          var orig = move.path[idOrig];
          var next = move.path[idNext];

          that.tempX += move.path.length * (next.x - orig.x) / move.iterations;
          that.tempY += move.path.length * (-next.y - -orig.y) / move.iterations;

          move.i++;

          if(move.i >= move.iterations){
            move.i = 0;
          }
        }
      }
    }

    function getItem(racer){



      if(this.available){

        var receivedItem = {
          img: this.img,
          libelle: this.libelle || 'Unknown name',
          effectClass: '',
          effect: ''
        };

        switch(this.type) {
          case ITEM_TYPES.SUPER_MALUS:
            racer.points = 0;
            receivedItem.effectClass = 'supermalus';
            receivedItem.effect = 'pts = 0';
            break;
          case ITEM_TYPES.MALUS:
            racer.points -= this.value;
            receivedItem.effectClass = 'malus';
            receivedItem.effect = '-' + this.value + 'pt' + (this.value > 1 ? 's': '');
            break;
          case ITEM_TYPES.BONUS:
            racer.points += this.value;
            receivedItem.effectClass = 'bonus';
            receivedItem.effect = '+' + this.value + 'pt' + (this.value > 1 ? 's': '');
            break;
          case ITEM_TYPES.SUPER_BONUS:
            racer.points += this.value;
            receivedItem.effectClass = 'superbonus';
            receivedItem.effect = '+' + this.value + 'pt' + (this.value > 1 ? 's': '');
            break;
          case ITEM_TYPES.INVERT:
            BindingService.invertBindings(this.duration);
            receivedItem.effectClass = 'supermalus';
            receivedItem.effect = 'inversion!!';
            break;
          case ITEM_TYPES.SLOW:
            racer.setBonus(this.value, this.duration);
            receivedItem.effectClass = 'supermalus';
            receivedItem.effect = 'lenteur!!';
            break;
          case ITEM_TYPES.SPEED:
            racer.setBonus(this.value, this.duration);
            receivedItem.effectClass = 'superbonus';
            receivedItem.effect = 'boost!!';
            break;
        }

        racer.receivedItems.unshift(receivedItem);

        $timeout(function(){
          racer.receivedItems.splice(racer.receivedItems.indexOf(receivedItem), 1);
        }, 1500);

      }


      if(this.timeout && this.available){
        var that = this;
        this.available = false;
        $timeout(function(){
          that.available = true;
        }, this.timeout);
      } else {
        this.available = false;
      }
    }

    function buildItem(tex){

      var group = new THREE.Object3D();
      group.items = {};

      if(tex) {
        tex.magFilter = THREE.NearestFilter;
        tex.minFilter = THREE.NearestFilter;
        var texMaterial = new THREE.MeshBasicMaterial({
          map: tex,
          side: THREE.DoubleSide
        });

        texMaterial.transparent = true;

        var texGeometry = new THREE.PlaneGeometry( 5, 5, 1, 1);
        texGeometry.faceVertexUvs[0][0] = [ trackMapping[0], trackMapping[1], trackMapping[3] ];
        texGeometry.faceVertexUvs[0][1] = [ trackMapping[1], trackMapping[2], trackMapping[3] ];

        var plane = new THREE.Mesh( texGeometry, texMaterial );
        plane.position.x = 0;
        plane.position.y = 0;
        plane.position.z = 0;
        group.add(plane);

        group.items.plane = plane;
      }

      var texColor = 0xcb2468;
      switch(this.type) {
        case ITEM_TYPES.MALUS:
          texColor = 0xff0000;
          break;
        case ITEM_TYPES.BONUS:
          texColor = 0xcb2468;
          break;
        case ITEM_TYPES.SUPER_BONUS:
          texColor = 0xe8d744;
          break;
        case ITEM_TYPES.INVERT:
        case ITEM_TYPES.SLOW:
        case ITEM_TYPES.SPEED:
          texColor = 0x444444;
          break;
      }

      var geometry = new THREE.BoxGeometry( 5, 5, 5 );
      var material = new THREE.MeshBasicMaterial( {color: texColor} );
      material.transparent = true;
      material.opacity = 0.4;
      var cube = new THREE.Mesh( geometry, material );

      group.add(cube);

      group.items.cube = cube;

      group.position.x = this.x;
      group.position.y = this.y;

      group.position.z = 3;

      group.rotation.x = Math.PI/2;

      return group;


    }

    return Item;
  }
})();