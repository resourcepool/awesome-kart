(function(){
  'use strict';

  angular
    .module('ebiz-kart')
    .constant('CONFIG', {
      'VERSION': '1.0.0',
      'DEBUG': false,
      'OBJECTIVE': 700,
      'TIME_LIMIT': 90,
      'LINK_SITE': 'https://www.takima.fr/',
      'LINK_OFFERS': 'https://www.takima.fr/jobs/postuler/',
      'WIN': {
        'TITLE': 'Felicitations',
        'DESC': 'Tu as réussi l\'objectif ! Nous avons hâte de te rencontrer.',
        'CANCEL': 'Un deuxième tour ?',
        'VALID': 'Il y a un job pour toi'
      },
      'LOSE': {
        'TITLE': 'C\'etait l\'echauffement',
        'DESC': 'Je suis sùr que tu peux récupérer plus de bonus.',
        'CANCEL': 'Je préfère prendre le bus',
        'VALID': 'La prochaine sera la bonne...'
      },
      'CIRCUITS': [{
        name: 'EBiz Map',
        map: 'assets/img/maps/ebiz-new.png',
        normales: 'assets/img/maps/ebiz-new-normales.png',
        background: 'assets/img/maps/ebiz-new-parallax.png',
        parallaxes: [
          // { img: 'assets/img/maps/ebiz-new-parallax-5.png', speed: 1 },
          // { img: 'assets/img/maps/ebiz-new-parallax-4.png', speed: 2 },
          // { img: 'assets/img/maps/ebiz-new-parallax-3.png', speed: 3 },
          // { img: 'assets/img/maps/ebiz-new-parallax-2.png', speed: 4 }
          // { img: 'assets/img/maps/ebiz-new-parallax-1.png', speed: 5 }
          { img: 'assets/img/maps/ebiz-new-parallax.png', speed: 1 }
        ],
        parallaxSizes: { x: 480, y: 270, scale: 3, width: 480*3, height: 270*3 },
        bgColor: '#0f0f32',
        // bgColor: '#222',
        startPosition: { x: 160, y: 1300 },
        direction: 180,
        mapGrounds: [],
        three: {},
        checkpoints: [
          { a: {x:100, y:1150}, b: {x:230, y:1150} },
          { a: {x:230, y:800}, b: {x:230, y:930} },
          { a: {x:290, y:1150}, b: {x:410, y:1150} },
          { a: {x:410, y:850}, b: {x:600, y:850} },
          { a: {x:700, y:700}, b: {x:700, y:900} },
          { a: {x:1075, y:692}, b: {x:1075, y:888} },
          // { a: {x:1075, y:1145}, b: {x:1175, y:1145} },
          // { a: {x:1215, y:910}, b: {x:1340, y:910} },
          // { a: {x:1215, y:185}, b: {x:1350, y:185} },
          // { a: {x:930, y:255}, b: {x:1100, y:255} },
          // { a: {x:1017, y:572}, b: {x:1100, y:572} },
          { a: {x:790, y:575}, b: {x:790, y:693} },
          { a: {x:710, y:440}, b: {x:930, y:440} },
          { a: {x:412, y:85}, b: {x:412, y:208} },
          { a: {x:183, y:85}, b: {x:183, y:208} }
        ],
        items: [
          // FIRST LINE ON STREET
          { pos: { x: 126, y: 1108 }, type: 'BONUS', value: 15, libelle: 'Unity 3D', img: 'assets/img/items/unity.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 145, y: 1108 }, type: 'BONUS', value: 10, libelle: 'JQuery', img: 'assets/img/items/jquery.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 163, y: 1108 }, type: 'SUPER_BONUS', value: 50, libelle: 'Gatling', img: 'assets/img/items/gatling.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 182, y: 1108 }, type: 'BONUS', value: 10, libelle: 'HAProxy', img: 'assets/img/items/haproxy.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 201, y: 1108 }, type: 'BONUS', value: 50, libelle: 'HTML 5', img: 'assets/img/items/html5.png', move: { type: 'stay' }, timeout: 0 },
          // SECOND LINE ON STREET
          { pos: { x: 126, y: 932 }, type: 'BONUS', value: 20, libelle: 'Jasmine', img: 'assets/img/items/jasmine.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 145, y: 932 }, type: 'BONUS', value: 10, libelle: 'Apache HBase', img: 'assets/img/items/apache-hbase.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 163, y: 932 }, type: 'BONUS', value: 10, libelle: 'Microsoft Azure', img: 'assets/img/items/azure.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 182, y: 932 }, type: 'BONUS', value: 10, libelle: 'Backbone JS', img: 'assets/img/items/backbonejs.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 201, y: 932 }, type: 'BONUS', value: 20, libelle: 'Cordova', img: 'assets/img/items/cordova.png', move: { type: 'stay' }, timeout: 0 },
          // THIRD LINE ON STREET
          { pos: { x: 314, y: 932 }, type: 'SUPER_BONUS', value: 40, libelle: 'Docker', img: 'assets/img/items/docker.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 333, y: 932 }, type: 'BONUS', value: 30, libelle: 'CFEngine', img: 'assets/img/items/cfengine.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 352, y: 932 }, type: 'BONUS', value: 20, libelle: 'Ansible', img: 'assets/img/items/ansible.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 371, y: 932 }, type: 'SUPER_BONUS', value: 60, libelle: 'Android', img: 'assets/img/items/android.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 390, y: 932 }, type: 'SUPER_BONUS', value: 100, libelle: 'Angular', img: 'assets/img/items/Angular.png', move: { type: 'stay' }, timeout: 0 },
          // FIRST SPECIAL ITEM
          { pos: { x: 255, y: 1203 }, type: 'SUPER_BONUS', value: 50, libelle: 'Spring', img: 'assets/img/items/sping.png', move: { type: 'stay' }, timeout: 0 },
          // FOURTH LINE ON STREET ( JUST BEFORE PARK )
          { pos: { x: 412, y: 1166 }, type: 'BONUS', value: 30, libelle: 'Stylus', img: 'assets/img/items/stylus.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 412, y: 1185 }, type: 'BONUS', value: 20, libelle: 'HAProxy', img: 'assets/img/items/haproxy.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 412, y: 1204 }, type: 'BONUS', value: 50, libelle: 'CSS 3', img: 'assets/img/items/css3.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 412, y: 1223 }, type: 'BONUS', value: 20, libelle: 'Thymeleaf', img: 'assets/img/items/thymeleaf.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 412, y: 1242 }, type: 'BONUS', value: 15, libelle: 'Less', img: 'assets/img/items/less.png', move: { type: 'stay' }, timeout: 0 },
          // FIRST LINE IN PARK
          { pos: { x: 493, y: 825 }, type: 'BONUS', value: 30, libelle: 'ElectronJS', img: 'assets/img/items/electron.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 515, y: 842 }, type: 'BONUS', value: 25, libelle: 'D3.js', img: 'assets/img/items/D3js.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 537, y: 860 }, type: 'BONUS', value: 10, libelle: 'JQuery', img: 'assets/img/items/jquery.png', move: { type: 'stay' }, timeout: 0 },
          // SECOND LINE IN PARK (ON FIRST BRIDGE)
          { pos: { x: 625, y: 776 }, type: 'SUPER_BONUS', value: 40, libelle: 'Git', img: 'assets/img/items/git.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 625, y: 796 }, type: 'BONUS', value: 30, libelle: 'GCE', img: 'assets/img/items/gce.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 625, y: 816 }, type: 'BONUS', value: 30, libelle: 'Gradle', img: 'assets/img/items/gradle.png', move: { type: 'stay' }, timeout: 0 },
          // FIRST CIRCLE
          { pos: {x:923, y:896}, type: 'BONUS', value: 10, libelle: 'Langage GO', img: 'assets/img/items/golang.png', timeout: 0, move: {
            type: 'path', iterations: 1500, path:[
              {x:923, y:896}, {x:964, y:892}, {x:994, y:871}, {x:1022, y:847}, {x:1027, y:806}, {x:1011, y:771},
              {x:977, y:754}, {x:930, y:751}, {x:885, y:755}, {x:856, y:768},  {x:832, y:794},  {x:822, y:828},
              {x:840, y:865}, {x:865, y:887}
            ]}
          },
          { pos: {x:994, y:871}, type: 'BONUS', value: 30, libelle: 'Elasticsearch', img: 'assets/img/items/elasticsearch.png', timeout: 0, move: {
            type: 'path', iterations: 1500, path:[
              {x:994, y:871}, {x:1022, y:847}, {x:1027, y:806}, {x:1011, y:771},
              {x:977, y:754}, {x:930, y:751}, {x:885, y:755}, {x:856, y:768},  {x:832, y:794},  {x:822, y:828},
              {x:840, y:865}, {x:865, y:887}, {x:923, y:896}, {x:964, y:892}
            ]}
          },
          { pos: {x:1027, y:806}, type: 'BONUS', value: 20, libelle: 'Firebase', img: 'assets/img/items/firebase.png', timeout: 0, move: {
            type: 'path', iterations: 1500, path:[
              {x:1027, y:806}, {x:1011, y:771},
              {x:977, y:754}, {x:930, y:751}, {x:885, y:755}, {x:856, y:768},  {x:832, y:794},  {x:822, y:828},
              {x:840, y:865}, {x:865, y:887}, {x:923, y:896}, {x:964, y:892}, {x:994, y:871}, {x:1022, y:847}
            ]}
          },
          { pos: {x:977, y:754}, type: 'BONUS', value: 10, libelle: '.NET', img: 'assets/img/items/dotnet.png', timeout: 0, move: {
            type: 'path', iterations: 1500, path:[
              {x:977, y:754}, {x:930, y:751}, {x:885, y:755}, {x:856, y:768},  {x:832, y:794},  {x:822, y:828},
              {x:840, y:865}, {x:865, y:887},
              {x:923, y:896}, {x:964, y:892}, {x:994, y:871}, {x:1022, y:847}, {x:1027, y:806}, {x:1011, y:771}
            ]}
          },
          { pos: {x:885, y:755}, type: 'BONUS', value: 20, libelle: 'Grunt', img: 'assets/img/items/grunt.png', timeout: 0, move: {
            type: 'path', iterations: 1500, path:[
              {x:885, y:755}, {x:856, y:768},  {x:832, y:794},  {x:822, y:828},
              {x:840, y:865}, {x:865, y:887},
              {x:923, y:896}, {x:964, y:892}, {x:994, y:871}, {x:1022, y:847}, {x:1027, y:806}, {x:1011, y:771},
              {x:977, y:754}, {x:930, y:751}
            ]}
          },
          { pos: {x:832, y:794}, type: 'BONUS', value: 20, libelle: 'Gulp', img: 'assets/img/items/gulp.png', timeout: 0, move: {
            type: 'path', iterations: 1500, path:[
              {x:832, y:794},  {x:822, y:828}, {x:840, y:865}, {x:865, y:887},
              {x:923, y:896}, {x:964, y:892}, {x:994, y:871}, {x:1022, y:847}, {x:1027, y:806}, {x:1011, y:771},
              {x:977, y:754}, {x:930, y:751}, {x:885, y:755}, {x:856, y:768}
            ]}
          },
          { pos: {x:840, y:865}, type: 'SUPER_BONUS', value: 30, libelle: 'IOS', img: 'assets/img/items/ios.png', timeout: 0, move: {
            type: 'path', iterations: 1500, path:[
              {x:840, y:865}, {x:865, y:887},
              {x:923, y:896}, {x:964, y:892}, {x:994, y:871}, {x:1022, y:847}, {x:1027, y:806}, {x:1011, y:771},
              {x:977, y:754}, {x:930, y:751}, {x:885, y:755}, {x:856, y:768},  {x:832, y:794},  {x:822, y:828}
            ]}
          },
          // SECOND LINE IN PARK
          { pos: { x: 1085, y: 817 }, type: 'SUPER_BONUS', value: 40, libelle: 'Ionic', img: 'assets/img/items/ionic.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 1085, y: 832 }, type: 'BONUS', value: 30, libelle: 'JSP', img: 'assets/img/items/jsp.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 1085, y: 852 }, type: 'BONUS', value: 20, libelle: 'Jade', img: 'assets/img/items/jade.png', move: { type: 'stay' }, timeout: 0 },
          // SECOND SPECIAL ITEM
          { pos: { x: 1199, y: 852 }, type: 'SUPER_BONUS', value: 100, libelle: 'Java', img: 'assets/img/items/java.png', move: { type: 'stay' }, timeout: 0 },
          // THIRD LINE IN PARK
          { pos: { x: 1116, y: 706 }, type: 'BONUS', value: 40, libelle: 'Jenkins', img: 'assets/img/items/jenkins.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 1125, y: 701 }, type: 'BONUS', value: 20, libelle: 'Knime', img: 'assets/img/items/knime.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 1137, y: 695 }, type: 'BONUS', value: 25, libelle: 'Karma', img: 'assets/img/items/karma.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 1151, y: 691 }, type: 'BONUS', value: 30, libelle: 'JSP', img: 'assets/img/items/jsp.png', move: { type: 'stay' }, timeout: 0 },
          // THIRD SPECIAL ITEM
          { pos: { x: 1056, y: 592 }, type: 'SUPER_BONUS', value: 100, libelle: 'Javascript', img: 'assets/img/items/javascript.png', move: { type: 'stay' }, timeout: 0 },
          // FOURTH LINE IN PARK (BEFORE SECOND BRIDGE)
          { pos: { x: 1000, y: 615 }, type: 'BONUS', value: 30, libelle: 'Hadoop', img: 'assets/img/items/hadoop.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 1000, y: 636 }, type: 'BONUS', value: 30, libelle: 'Mustache', img: 'assets/img/items/mustache.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 1000, y: 657 }, type: 'BONUS', value: 40, libelle: 'Grafana', img: 'assets/img/items/grafana.png', move: { type: 'stay' }, timeout: 0 },
          // FIRST COMEBACK ITEMS LINE
          { pos: { x: 800, y: 580 }, type: 'BONUS', value: 30, libelle: 'NativeScript', img: 'assets/img/items/nativescript.png',
            move: { type: 'comeback', goX: 800, goY: 680, iterations: 100 }, timeout: 0 },
          { pos: { x: 820, y: 580 }, type: 'BONUS', value: 40, libelle: 'MongoDB', img: 'assets/img/items/mongodb.png',
            move: { type: 'comeback', goX: 820, goY: 680, iterations: 100 }, timeout: 0 },
          { pos: { x: 840, y: 580 }, type: 'BONUS', value: 40, libelle: 'Mysql', img: 'assets/img/items/mysql.png',
            move: { type: 'comeback', goX: 840, goY: 680, iterations: 100 }, timeout: 0 },
          { pos: { x: 860, y: 580 }, type: 'BONUS', value: 30, libelle: 'OVH', img: 'assets/img/items/ovh.png',
            move: { type: 'comeback', goX: 860, goY: 680, iterations: 100 }, timeout: 0 },
          { pos: { x: 880, y: 580 }, type: 'BONUS', value:20, libelle: 'NPM', img: 'assets/img/items/npm.png',
            move: { type: 'comeback', goX: 880, goY: 680, iterations: 100 }, timeout: 0 },
          // LINE ON BIG BRIDGE
          { pos: { x: 556, y: 667 }, type: 'SUPER_BONUS', value: 70, libelle: 'NodeJS', img: 'assets/img/items/nodejs.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 568, y: 652 }, type: 'BONUS', value: 30, libelle: 'Protractor', img: 'assets/img/items/protractor.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 580, y: 641 }, type: 'SUPER_BONUS', value: 100, libelle: 'ReactJS', img: 'assets/img/items/reactjs.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 595, y: 628 }, type: 'BONUS', value: 40, libelle: 'Spark', img: 'assets/img/items/spark.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 605, y: 623 }, type: 'BONUS', value: 30, libelle: 'Redis', img: 'assets/img/items/redis.png', move: { type: 'stay' }, timeout: 0 },
          // FIRST LINE AFTER BIG BRIDGE
          { pos: { x: 700, y: 461 }, type: 'BONUS', value: 30, libelle: 'Puppet', img: 'assets/img/items/puppet.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 700, y: 484 }, type: 'BONUS', value: 40, libelle: 'Redux', img: 'assets/img/items/redux.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 700, y: 506 }, type: 'BONUS', value: 35, libelle: 'Splunk', img: 'assets/img/items/splunk.png', move: { type: 'stay' }, timeout: 0 },
          // END OF PARK BOTTOM CIRCLE
          { pos: {x:708, y:390}, type: 'BONUS', value: 25, libelle: 'Mocha', img: 'assets/img/items/mocha.png', timeout: 0, move: {
            type: 'path', iterations: 1000, path:[
              {x:708, y:390}, {x:750, y:384}, {x:764, y:365}, {x:749, y:343}, {x:725, y:327}, {x:702, y:330},
              {x:678, y:341}, {x:660, y:357}, {x:667, y:380}, {x:689, y:390}
            ]}
          },
          { pos: {x:749, y:343}, type: 'BONUS', value: 50, libelle: 'Maven', img: 'assets/img/items/maven.png', timeout: 0, move: {
            type: 'path', iterations: 1000, path:[
              {x:749, y:343}, {x:725, y:327}, {x:702, y:330}, {x:678, y:341}, {x:660, y:357}, {x:667, y:380},
              {x:689, y:390}, {x:708, y:390}, {x:750, y:384}, {x:764, y:365}
            ]}
          },
          { pos: {x:660, y:357}, type: 'BONUS', value: 20, libelle: 'Jooq', img: 'assets/img/items/jook.png', timeout: 0, move: {
            type: 'path', iterations: 1000, path:[
              {x:660, y:357}, {x:667, y:380}, {x:689, y:390}, {x:708, y:390}, {x:750, y:384}, {x:764, y:365},
              {x:749, y:343}, {x:725, y:327}, {x:702, y:330}, {x:678, y:341}
            ]}
          },
          // END OF PARK RIGHT CIRCLE
          { pos: {x:751, y:323}, type: 'BONUS', value: 25, libelle: 'Hortonworks', img: 'assets/img/items/hortonworks.png', timeout: 0, move: {
            type: 'path', iterations: 1000, path:[
              {x:751, y:323}, {x:777, y:329}, {x:812, y:321}, {x:827, y:295}, {x:821, y:267}, {x:800, y:252},
              {x:770, y:249}, {x:748, y:259}, {x:728, y:283}, {x:731, y:301}
            ]}
          },
          { pos: {x:812, y:321}, type: 'BONUS', value: 30, libelle: 'Hibernate', img: 'assets/img/items/hibernate.png', timeout: 0, move: {
            type: 'path', iterations: 1000, path:[
              {x:812, y:321}, {x:827, y:295}, {x:821, y:267}, {x:800, y:252},
              {x:770, y:249}, {x:748, y:259}, {x:728, y:283}, {x:731, y:301},
              {x:751, y:323}, {x:777, y:329}
            ]}
          },
          { pos: {x:800, y:252}, type: 'BONUS', value: -35, libelle: 'Logom', img: 'assets/img/items/logom.png', timeout: 0, move: {
            type: 'path', iterations: 1000, path:[
              {x:800, y:252}, {x:770, y:249}, {x:748, y:259}, {x:728, y:283}, {x:731, y:301},
              {x:751, y:323}, {x:777, y:329}, {x:812, y:321}, {x:827, y:295}, {x:821, y:267}
            ]}
          },
          { pos: {x:748, y:259}, type: 'BONUS', value: 70, libelle: 'AWS', img: 'assets/img/items/aws.png', timeout: 0, move: {
            type: 'path', iterations: 1000, path:[
              {x:748, y:259}, {x:728, y:283}, {x:731, y:301}, {x:751, y:323}, {x:777, y:329}, {x:812, y:321},
              {x:827, y:295}, {x:821, y:267}, {x:800, y:252}, {x:770, y:249}
            ]}
          },

          // END OF PARK TOP RIGHT CIRCLE
          { pos: {x:767, y:243}, type: 'BONUS', value: 45, libelle: 'Chef', img: 'assets/img/items/chef.png', timeout: 0, move: {
            type: 'path', iterations: 1000, path:[
              {x:767, y:243}, {x:801, y:228}, {x:821, y:194}, {x:812, y:159}, {x:785, y:154}, {x:750, y:158},
              {x:710, y:165}, {x:681, y:188}, {x:680, y:217}, {x:710, y:246}, {x:752, y:245}
            ]}
          },
          { pos: {x:821, y:194}, type: 'BONUS', value: 50, libelle: 'VueJS', img: 'assets/img/items/vuejs.png', timeout: 0, move: {
            type: 'path', iterations: 1000, path:[
              {x:821, y:194}, {x:812, y:159}, {x:785, y:154}, {x:750, y:158}, {x:710, y:165}, {x:681, y:188},
              {x:680, y:217}, {x:710, y:246}, {x:752, y:245}, {x:767, y:243}, {x:801, y:228}
            ]}
          },
          { pos: {x:785, y:154}, type: 'SUPER_BONUS', value: 100, libelle: 'Scrum', img: 'assets/img/items/scrum.png', timeout: 0, move: {
            type: 'path', iterations: 1000, path:[
              {x:785, y:154}, {x:750, y:158}, {x:710, y:165}, {x:681, y:188}, {x:680, y:217}, {x:710, y:246},
              {x:752, y:245}, {x:767, y:243}, {x:801, y:228}, {x:821, y:194}, {x:812, y:159}
            ]}
          },
          { pos: {x:710, y:165}, type: 'BONUS', value: 40, libelle: 'Vagrant', img: 'assets/img/items/vagrant.png', timeout: 0, move: {
            type: 'path', iterations: 1000, path:[
              {x:710, y:165}, {x:681, y:188}, {x:680, y:217}, {x:710, y:246}, {x:752, y:245}, {x:767, y:243},
              {x:801, y:228}, {x:821, y:194}, {x:812, y:159}, {x:785, y:154}, {x:750, y:158}
            ]}
          },
          { pos: {x:680, y:217}, type: 'BONUS', value: 35, libelle: 'Sonarqube', img: 'assets/img/items/sonarqube.png', timeout: 0, move: {
            type: 'path', iterations: 1000, path:[
              {x:680, y:217}, {x:710, y:246}, {x:752, y:245}, {x:767, y:243}, {x:801, y:228}, {x:821, y:194},
              {x:812, y:159}, {x:785, y:154}, {x:750, y:158}, {x:710, y:165}, {x:681, y:188}
            ]}
          },

          // END OF PARK TOP LEFT CIRCLE
          { pos: {x:658, y:241}, type: 'BONUS', value: 50, libelle: 'PostGIS', img: 'assets/img/items/PostGIS.png', timeout: 0, move: {
            type: 'path', iterations: 1000, path:[
              {x:658, y:241}, {x:652, y:213}, {x:633, y:189}, {x:601, y:171}, {x:576, y:169}, {x:556, y:194},
              {x:539, y:222}, {x:552, y:253}, {x:569, y:273}, {x:601, y:279}, {x:627, y:283}, {x:654, y:264}
            ]}
          },
          { pos: {x:633, y:189}, type: 'BONUS', value: 40, libelle: 'NGinx', img: 'assets/img/items/nginx.png', timeout: 0, move: {
            type: 'path', iterations: 1000, path:[
              {x:633, y:189}, {x:601, y:171}, {x:576, y:169}, {x:556, y:194}, {x:539, y:222}, {x:552, y:253},
              {x:569, y:273}, {x:601, y:279}, {x:627, y:283}, {x:654, y:264}, {x:658, y:241}, {x:652, y:213}
            ]}
          },
          { pos: {x:576, y:169}, type: 'BONUS', value: 40, libelle: 'Play', img: 'assets/img/items/play.png', timeout: 0, move: {
            type: 'path', iterations: 1000, path:[
              {x:576, y:169}, {x:556, y:194}, {x:539, y:222}, {x:552, y:253}, {x:569, y:273}, {x:601, y:279},
              {x:627, y:283}, {x:654, y:264}, {x:658, y:241}, {x:652, y:213}, {x:633, y:189}, {x:601, y:171}
            ]}
          },
          { pos: {x:539, y:222}, type: 'BONUS', value: 40, libelle: 'PostgreSQL', img: 'assets/img/items/postgresql.png', timeout: 0, move: {
            type: 'path', iterations: 1000, path:[
              {x:539, y:222}, {x:552, y:253}, {x:569, y:273}, {x:601, y:279}, {x:627, y:283}, {x:654, y:264},
              {x:658, y:241}, {x:652, y:213}, {x:633, y:189}, {x:601, y:171}, {x:576, y:169}, {x:556, y:194}
            ]}
          },
          { pos: {x:569, y:273}, type: 'BONUS', value: 30, libelle: 'Webpack', img: 'assets/img/items/webpack.png', timeout: 0, move: {
            type: 'path', iterations: 1000, path:[
              {x:569, y:273}, {x:601, y:279}, {x:627, y:283}, {x:654, y:264}, {x:658, y:241}, {x:652, y:213},
              {x:633, y:189}, {x:601, y:171}, {x:576, y:169}, {x:556, y:194}, {x:539, y:222}, {x:552, y:253}
            ]}
          },
          { pos: {x:627, y:283}, type: 'BONUS', value: 25, libelle: 'Karma', img: 'assets/img/items/karma.png', timeout: 0, move: {
            type: 'path', iterations: 1000, path:[
              {x:627, y:283}, {x:654, y:264}, {x:658, y:241}, {x:652, y:213}, {x:633, y:189}, {x:601, y:171},
              {x:576, y:169}, {x:556, y:194}, {x:539, y:222}, {x:552, y:253}, {x:569, y:273}, {x:601, y:279}
            ]}
          },

          // END OF PARK LEFT CIRCLE
          { pos: {x:593, y:304}, type: 'BONUS', value: 45, libelle: 'Apache Kafka', img: 'assets/img/items/kafka.png', timeout: 0, move: {
            type: 'path', iterations: 1000, path:[
              {x:593, y:304}, {x:561, y:320}, {x:559, y:356}, {x:594, y:367}, {x:622, y:360}, {x:627, y:326}
            ]}
          },
          { pos: {x:561, y:320}, type: 'BONUS', value: 60, libelle: 'VertX', img: 'assets/img/items/vertx.png', timeout: 0, move: {
            type: 'path', iterations: 1000, path:[
              {x:561, y:320}, {x:559, y:356}, {x:594, y:367}, {x:622, y:360}, {x:627, y:326}, {x:593, y:304}
            ]}
          },
          { pos: {x:559, y:356}, type: 'BONUS', value: 30, libelle: 'Puppet', img: 'assets/img/items/puppet.png', timeout: 0, move: {
            type: 'path', iterations: 1000, path:[
              {x:559, y:356}, {x:594, y:367}, {x:622, y:360}, {x:627, y:326}, {x:593, y:304}, {x:561, y:320}
            ]}
          },
          { pos: {x:622, y:360}, type: 'BONUS', value: 50, libelle: 'Python', img: 'assets/img/items/python.png', timeout: 0, move: {
            type: 'path', iterations: 1000, path:[
              {x:622, y:360}, {x:627, y:326}, {x:593, y:304}, {x:561, y:320}, {x:559, y:356}, {x:594, y:367}
            ]}
          },
          { pos: {x:627, y:326}, type: 'SUPER_BONUS', value: 70, libelle: 'NodeJS', img: 'assets/img/items/nodejs.png', timeout: 0, move: {
            type: 'path', iterations: 1000, path:[
              {x:627, y:326}, {x:593, y:304}, {x:561, y:320}, {x:559, y:356}, {x:594, y:367}, {x:622, y:360}
            ]}
          },
          // FOURTH SPECIAL ITEM
          { pos: { x: 922, y: 78 }, type: 'BONUS', value: 15, libelle: 'Bower', img: 'assets/img/items/bower.png', move: { type: 'stay' }, timeout: 0 },
          // FIRST LINE AFTER BIG BRIDGE
          { pos: { x: 473, y: 120 }, type: 'BONUS', value: 30, libelle: 'BackboneJS', img: 'assets/img/items/backbonejs.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 473, y: 140 }, type: 'BONUS', value: 40, libelle: 'Cordova', img: 'assets/img/items/cordova.png', move: { type: 'stay' }, timeout: 0 },
          { pos: { x: 473, y: 160 }, type: 'BONUS', value: 10, libelle: '.NET', img: 'assets/img/items/dotnet.png', move: { type: 'stay' }, timeout: 0 },
          // LAST COMEBACK ITEMS LINE
          { pos: { x: 250, y: 100 }, type: 'SUPER_BONUS', value: 50, libelle: 'GIT', img: 'assets/img/items/git.png',
            move: { type: 'comeback', goX: 250, goY: 195, iterations: 100 }, timeout: 0 },
          { pos: { x: 270, y: 100 }, type: 'BONUS', value: 10, libelle: 'JQuery', img: 'assets/img/items/jquery.png',
            move: { type: 'comeback', goX: 270, goY: 195, iterations: 100 }, timeout: 0 },
          { pos: { x: 290, y: 100 }, type: 'BONUS', value: 50, libelle: 'Openstreetmap', img: 'assets/img/items/Openstreetmap.png',
            move: { type: 'comeback', goX: 290, goY: 195, iterations: 100 }, timeout: 0 },
          { pos: { x: 310, y: 100 }, type: 'SUPER_BONUS', value: 100, libelle: 'HTML 5', img: 'assets/img/items/html5.png',
            move: { type: 'comeback', goX: 310, goY: 195, iterations: 100 }, timeout: 0 },
          { pos: { x: 330, y: 100 }, type: 'BONUS', value: 25, libelle: 'Logom', img: 'assets/img/items/logom.png',
            move: { type: 'comeback', goX: 330, goY: 195, iterations: 100 }, timeout: 0 },
          { pos: { x: 350, y: 100 }, type: 'BONUS', value: 20, libelle: 'Jade', img: 'assets/img/items/jade.png',
            move: { type: 'comeback', goX: 350, goY: 195, iterations: 100 }, timeout: 0 }

           // { pos: {x:127, y:1241}, type: 'INVERT', duration: 5000, img: 'assets/img/items/angular.png', move: { type: 'comeback', goX:199, goY:1168, iterations: 100 }, timeout: 3000},
           // { pos: {x:199, y:1241}, type: 'SLOW', value: 0, duration: 1000, img: 'assets/img/items/angular.png', move: { type: 'comeback', goX:127, goY:1168, iterations: 100 }, timeout: 3000},
           // { pos: {x:199, y:1168}, type: 'SPEED', value: 1.5, duration: 5000, img: 'assets/img/items/angular.png', move: { type: 'comeback', goX:127, goY:1241, iterations: 100 }, timeout: 3000},
           // { pos: {x:127, y:1241}, type: 'BONUS', value: 2, img: 'assets/img/items/angular.png', move: {
           //     type: 'path', path:[ {x: 127, y:1241},{x:127, y:1168},{x:199, y:1168},{x:199, y:1241} ], iterations: 900
           //   }, timeout: 3000
           // },
           // { pos: {x:130, y:1000}, type: 'BONUS', value: 2, img: 'assets/img/items/angular.png', move: {
           //     type: 'path', path:[ {x: 130, y:1000},{x:200, y:1000}], iterations: 500
           //   }, timeout: 3000
           // },
           // { pos: {x:165, y:1025}, type: 'BONUS', value: 2, img: 'assets/img/items/angular.png', move: {
           //     type: 'path', path:[ {x: 165, y:1025},{x:200, y:1025}], iterations: 500
           //   }, timeout: 3000
           // },
           // { pos: {x:130, y:1025}, type: 'BONUS', value: 2, img: 'assets/img/items/angular.png', move: {
           //     type: 'path', path:[ {x: 130, y:1025},{x:165, y:1025}], iterations: 500
           //   }, timeout: 3000
           // },
           // { pos: {x:470, y:1160}, type: 'BONUS', value: 2, img: 'assets/img/items/angular.png', move: {
           //     type: 'path', path:[ {x: 470, y:1160},{x:530, y:1160}], iterations: 500
           //   }, timeout: 3000
           // },
           // { pos: {x:384, y:940}, type: 'BONUS', value: 2, img: 'assets/img/items/angular.png', move: {
           //     type: 'path', path:[ {x: 384, y:940},{x:320, y:970},{x:384, y:1000},{x:320, y:1030},{x:384, y:1060},{x:320, y:1090}], iterations: 800
           //   }, timeout: 3000
           // },
           // { pos: {x:384, y:1090}, type: 'BONUS', value: 2, img: 'assets/img/items/angular.png', move: {
           //     type: 'path', path:[ {x: 384, y:1090},{x:320, y:1060},{x:384, y:1030},{x:320, y:1000},{x:384, y:970},{x:320, y:940}], iterations: 800
           //   }, timeout: 3000
           // },
           // { pos: {x:815, y:818}, type: 'BONUS', value: 2, img: 'assets/img/items/angular.png', move: {
           //     type: 'path', path:[ {x: 815, y:818},
           //     {x:839, y:776},{x:892, y:746},{x:955, y:743},{x:1008, y:762},{x:1030, y:813},{x:1017, y:858},
           //     {x:988, y:884},{x:935, y:909},{x:883, y:900},{x:846, y:876},{x:816, y:840}], iterations: 1500
           //   }, timeout: 3000
           // },
           // { pos: {x:458, y:945}, type: 'BONUS', value: 2, img: 'assets/img/items/angular.png', move: { type: 'stay' }, timeout: 3000},
           // { pos: {x:477, y:945}, type: 'BONUS', value: 2, img: 'assets/img/items/angular.png', move: { type: 'stay' }, timeout: 3000},
           // { pos: {x:496, y:945}, type: 'BONUS', value: 2, img: 'assets/img/items/angular.png', move: { type: 'stay' }, timeout: 3000},
           // { pos: {x:630, y:770}, type: 'BONUS', value: 2, img: 'assets/img/items/angular.png', move: { type: 'stay' }, timeout: 3000},
           // { pos: {x:630, y:795}, type: 'BONUS', value: 2, img: 'assets/img/items/angular.png', move: { type: 'stay' }, timeout: 3000},
           // { pos: {x:630, y:820}, type: 'BONUS', value: 2, img: 'assets/img/items/angular.png', move: { type: 'stay' }, timeout: 3000},
           // { pos: {x:1106, y:1158}, type: 'BONUS', value: 2, img: 'assets/img/items/angular.png', move: { type: 'stay' }, timeout: 3000},
           // { pos: {x:1126, y:1158}, type: 'BONUS', value: 2, img: 'assets/img/items/angular.png', move: { type: 'stay' }, timeout: 3000},
           // { pos: {x:1146, y:1158}, type: 'BONUS', value: 2, img: 'assets/img/items/angular.png', move: { type: 'stay' }, timeout: 3000},
           // { pos: {x:1166, y:1158}, type: 'BONUS', value: 2, img: 'assets/img/items/angular.png', move: { type: 'stay' }, timeout: 3000}
        ],
        sprites: {
          lamp: {
            texfile: 'assets/img/sprites/lamp.png', width: 6, height: 28, autorotate: true,
            positions: [
              {x:455, y: 1121}, {x:544,y:1121}, {x:455,y:793}, {x:573,y:843}, {x:669, y: 833}, {x:767,y:761},
              {x:769,y:854}, {x:930,y:773}, {x:932, y: 882}, {x:1093,y:790}, {x:1174,y:952}, {x:1174,y:1077},
              {x:776,y:604}, {x:783,y:672}, {x:1062,y:662}, {x:962,y:546}, {x:1188,y:495}, {x:1190,y:332},
              {x:1017,y:273}, {x:975,y:186}, {x:1022,y:104}, {x:1168,y:117}, {x:765,y:531},
              {x:519,y:506}, {x:852,y:423}, {x:464,y:375}, {x:594,y:336}, {x:780,y:291},
              {x:876,y:272}, {x:462,y:180}, {x:866,y:44}
              ]
          },
          light: {
            texfile: 'assets/img/sprites/light.png', width: 18, height: 42, autorotate: false,
            positions: [
              {x:210, y: 1325, ry: 0},{x:210, y: 1110, ry: 0},{x:210, y: 980, ry: 0},{x:210, y: 770, ry: 0},
              {x:210, y: 580, ry: 0},{x:210, y: 415, ry: 0},{x:210, y: 240, ry: 0},{x:210, y: 55, ry: 0},
              {x:115, y: 1325, ry: Math.PI},{x:115, y: 1110, ry: Math.PI},{x:115, y: 980, ry: Math.PI},{x:115, y: 770, ry: Math.PI},
              {x:115, y: 580, ry: Math.PI},{x:115, y: 415, ry: Math.PI},{x:115, y: 240, ry: Math.PI},{x:115, y: 55, ry: Math.PI},

              {x:400, y: 1325, ry: 0},{x:400, y: 1090, ry: 0},{x:400, y: 980, ry: 0},{x:400, y: 770, ry: 0},
              {x:400, y: 580, ry: 0},{x:400, y: 415, ry: 0},{x:400, y: 240, ry: 0},{x:400, y: 55, ry: 0},
              {x:305, y: 1325, ry: Math.PI},{x:305, y: 1090, ry: Math.PI},{x:305, y: 980, ry: Math.PI},{x:305, y: 770, ry: Math.PI},
              {x:305, y: 580, ry: Math.PI},{x:305, y: 415, ry: Math.PI},{x:305, y: 240, ry: Math.PI},{x:305, y: 55, ry: Math.PI},

              {x:1326, y: 246, ry: 0},{x:1326, y: 412, ry: 0},{x:1326, y: 580, ry: 0},{x:1326, y: 775, ry: 0},
              {x:1326, y: 965, ry: 0},{x:1326, y: 1110, ry: 0},{x:1326, y: 1303, ry: 0},
              {x:1230, y: 246, ry: Math.PI},{x:1230, y: 412, ry: Math.PI},{x:1230, y: 580, ry: Math.PI},{x:1230, y: 775, ry: Math.PI},
              {x:1230, y: 965, ry: Math.PI},{x:1230, y: 1110, ry: Math.PI},{x:1230, y: 1303, ry: Math.PI},

              {x:1064, y: 1305, ry: 0},{x:730, y: 1288, ry: 0},{x:400, y: 865, ry: 0},
              {x:970, y: 1305, ry: Math.PI},{x:630, y: 1288, ry: Math.PI},

              {x:35, y: 100, ry: Math.PI/2.},{x:680, y: 1156, ry: Math.PI/2.},{x:1014, y: 1156, ry: Math.PI/2.},

              {x:35, y: 195, ry: 3/2*Math.PI},{x:256, y: 195, ry: 3/2*Math.PI},{x:60, y: 1250, ry: 3/2*Math.PI},
              {x:258, y: 1250, ry: 3/2*Math.PI},{x:495, y: 1250, ry: 3/2*Math.PI},{x:785, y: 1250, ry: 3/2*Math.PI},
              {x:904, y: 1250, ry: 3/2*Math.PI},{x:1146, y: 1250, ry: 3/2*Math.PI}
            ]
          },
          arrows: {
            texfile: 'assets/img/sprites/arrow.png', width: 20, height: 20,
            positions: [
                {x:150, y: 790, ry: 0},{x:180, y: 790, ry: 0},
                {x:600, y: 1185, ry: Math.PI/2},{x:600, y: 1225, ry: Math.PI/2},
                {x:1360, y: 1185, ry: Math.PI/2},{x:1360, y: 1225, ry: Math.PI/2},
                {x:1260, y: 68, ry: Math.PI},{x:1290, y: 68, ry: Math.PI}
              ]
          }
        },
        buildings: [
          { x: 54, y: 1330, sizeX: 108, sizeY: 140, height: 300, color: 0x31101b, opacity: 1 },
          { x: 54, y: 1034, sizeX: 108, sizeY: 228, height: 300, color: 0x31101b, opacity: 1 },
          { x: 54, y: 682, sizeX: 108, sizeY: 252, height: 300, color: 0x31101b, opacity: 1 },
          { x: 54, y: 323, sizeX: 108, sizeY: 242, height: 300, color: 0x31101b, opacity: 1 },
          { x: 54, y: 45, sizeX: 108, sizeY: 90, height: 300, color: 0x31101b, opacity: 1 },
          { x: 258, y: 1330, sizeX: 76, sizeY: 140, height: 300, color: 0x31101b, opacity: 1 },
          { x: 258, y: 1034, sizeX: 76, sizeY: 228, height: 300, color: 0x31101b, opacity: 1 },
          { x: 258, y: 682, sizeX: 76, sizeY: 252, height: 300, color: 0x31101b, opacity: 1 },
          { x: 258, y: 323, sizeX: 76, sizeY: 242, height: 300, color: 0x31101b, opacity: 1 },
          { x: 258, y: 45, sizeX: 76, sizeY: 90, height: 300, color: 0x31101b, opacity: 1 },

          { x: 516, y: 1330, sizeX: 216, sizeY: 140, height: 300, color: 0x31101b, opacity: 1 },
          { x: 848, y: 1330, sizeX: 224, sizeY: 140, height: 300, color: 0x31101b, opacity: 1 },
          { x: 1147, y: 1330, sizeX: 150, sizeY: 140, height: 300, color: 0x31101b, opacity: 1 },
          { x: 1367, y: 1330, sizeX: 66, sizeY: 140, height: 300, color: 0x31101b, opacity: 1 },
          { x: 1367, y: 1034, sizeX: 66, sizeY: 230, height: 300, color: 0x31101b, opacity: 1 },
          { x: 1367, y: 677.5, sizeX: 66, sizeY: 257, height: 300, color: 0x31101b, opacity: 1 },
          { x: 1367, y: 325, sizeX: 66, sizeY: 224, height: 300, color: 0x31101b, opacity: 1 },
          { x: 1367, y: 50.5, sizeX: 66, sizeY: 101, height: 300, color: 0x31101b, opacity: 1 }
        ]
      }],
      'DRIVERS': [{
        name: 'Jawg Bald',
        sprites: {
          'FRONT':       { url: 'assets/img/kart/drivers/loic/loic-front.png', mat: null },
          'FACE':        { url: 'assets/img/kart/drivers/loic/loic-front.png',  mat: null },
          'SELECT':      { url: 'assets/img/kart/drivers/loic/loic-front.png',  mat: null },
          'SEE_LEFT':    { url: 'assets/img/kart/drivers/loic/loic-left.png',  mat: null },
          'SEE_RIGHT':   { url: 'assets/img/kart/drivers/loic/loic-right.png', mat: null },
          'TURN_LEFT':   { url: 'assets/img/kart/drivers/loic/loic-left.png',  mat: null },
          'TURN_RIGHT':  { url: 'assets/img/kart/drivers/loic/loic-right.png', mat: null },
          'DRIFT_LEFT':  { url: 'assets/img/kart/drivers/loic/loic-left.png',  mat: null },
          'DRIFT_RIGHT': { url: 'assets/img/kart/drivers/loic/loic-right.png', mat: null }
        },
        smokeSprites: {
          'DRIFT_LEFT_1':  { url: 'assets/img/misc/drift_left_1.png'},
          'DRIFT_LEFT_2':  { url: 'assets/img/misc/drift_left_2.png'},
          'DRIFT_LEFT_BLUE':  { url: 'assets/img/misc/drift_left_blue.png'},
          'DRIFT_LEFT_RED':  { url: 'assets/img/misc/drift_left_red.png'},
          'DRIFT_RIGHT_1': { url: 'assets/img/misc/drift_right_1.png'},
          'DRIFT_RIGHT_2': { url: 'assets/img/misc/drift_right_2.png'},
          'DRIFT_RIGHT_BLUE': { url: 'assets/img/misc/drift_right_blue.png'},
          'DRIFT_RIGHT_RED': { url: 'assets/img/misc/drift_right_red.png'}
        },
        mainColor: '#FF0000',
        mainBackground: 'assets/img/menu/bg-jawg.png',
        speed: 2, // Vitesse du véhicule
        acceleration: 5, // Ratio d'augmentation de la vitesse
        weight: 2, // Impact lors de contacts entre véhicules
        handling: 5, // Niveau de rotation du véhicule hors dérapage
        traction: 5, // Plus la valeur est élevée moins le véhicule glisse en dérapage
        luck: 3,
        width: 5
      },{
        name: 'Gatling',
        sprites: {
          'FRONT': { url: 'assets/img/kart/drivers/viking/viking-front.png', mat: null },
          'FACE': { url: 'assets/img/kart/drivers/viking/viking-front.png', mat: null },
          'SELECT': { url: 'assets/img/kart/drivers/viking/viking-front.png', mat: null },
          'SEE_LEFT': { url: 'assets/img/kart/drivers/viking/viking-left.png', mat: null },
          'SEE_RIGHT': { url: 'assets/img/kart/drivers/viking/viking-right.png', mat: null },
          'TURN_LEFT': { url: 'assets/img/kart/drivers/viking/viking-left.png', mat: null },
          'TURN_RIGHT': { url: 'assets/img/kart/drivers/viking/viking-right.png', mat: null },
          'DRIFT_LEFT': { url: 'assets/img/kart/drivers/viking/viking-left.png', mat: null },
          'DRIFT_RIGHT': { url: 'assets/img/kart/drivers/viking/viking-right.png', mat: null }
        },
        smokeSprites: {
          'DRIFT_LEFT_1':  { url: 'assets/img/misc/drift_left_1.png'},
          'DRIFT_LEFT_2':  { url: 'assets/img/misc/drift_left_2.png'},
          'DRIFT_LEFT_BLUE':  { url: 'assets/img/misc/drift_left_blue.png'},
          'DRIFT_LEFT_RED':  { url: 'assets/img/misc/drift_left_red.png'},
          'DRIFT_RIGHT_1': { url: 'assets/img/misc/drift_right_1.png'},
          'DRIFT_RIGHT_2': { url: 'assets/img/misc/drift_right_2.png'},
          'DRIFT_RIGHT_BLUE': { url: 'assets/img/misc/drift_right_blue.png'},
          'DRIFT_RIGHT_RED': { url: 'assets/img/misc/drift_right_red.png'}
        },
        mainColor: '#FFAA00',
        mainBackground: 'assets/img/menu/bg-gatling.png',
        speed: 6,
        acceleration: 1,
        weight: 5,
        handling: 3,
        traction: 3,
        luck: 2,
        width: 6
      },{
        name: 'Mouse',
        sprites: {
          'FRONT': { url: 'assets/img/kart/drivers/mouse/mouse-front.png', mat: null },
          'FACE': { url: 'assets/img/kart/drivers/mouse/mouse-front.png', mat: null },
          'SELECT': { url: 'assets/img/kart/drivers/mouse/mouse-front.png', mat: null },
          'SEE_LEFT': { url: 'assets/img/kart/drivers/mouse/mouse-left.png', mat: null },
          'SEE_RIGHT': { url: 'assets/img/kart/drivers/mouse/mouse-right.png', mat: null },
          'TURN_LEFT': { url: 'assets/img/kart/drivers/mouse/mouse-left.png', mat: null },
          'TURN_RIGHT': { url: 'assets/img/kart/drivers/mouse/mouse-right.png', mat: null },
          'DRIFT_LEFT': { url: 'assets/img/kart/drivers/mouse/mouse-left.png', mat: null },
          'DRIFT_RIGHT': { url: 'assets/img/kart/drivers/mouse/mouse-right.png', mat: null }
        },
        smokeSprites: {
          'DRIFT_LEFT_1':  { url: 'assets/img/misc/drift_left_1.png'},
          'DRIFT_LEFT_2':  { url: 'assets/img/misc/drift_left_2.png'},
          'DRIFT_LEFT_BLUE':  { url: 'assets/img/misc/drift_left_blue.png'},
          'DRIFT_LEFT_RED':  { url: 'assets/img/misc/drift_left_red.png'},
          'DRIFT_RIGHT_1': { url: 'assets/img/misc/drift_right_1.png'},
          'DRIFT_RIGHT_2': { url: 'assets/img/misc/drift_right_2.png'},
          'DRIFT_RIGHT_BLUE': { url: 'assets/img/misc/drift_right_blue.png'},
          'DRIFT_RIGHT_RED': { url: 'assets/img/misc/drift_right_red.png'}
        },
        mainColor: '#FFAA00',
        mainBackground: 'assets/img/menu/bg-ebiz.png',
        speed: 6,
        acceleration: 1,
        weight: 5,
        handling: 3,
        traction: 3,
        luck: 2,
        width: 6
      },{
        name: 'Fou Furieux',
        sprites: {
          'FRONT':       { url: 'assets/img/kart/drivers/hat/hat-front.png', mat: null },
          'FACE':        { url: 'assets/img/kart/drivers/hat/hat-front.png',  mat: null },
          'SELECT':      { url: 'assets/img/kart/drivers/hat/hat-front.png',  mat: null },
          'SEE_LEFT':    { url: 'assets/img/kart/drivers/hat/hat-left.png',  mat: null },
          'SEE_RIGHT':   { url: 'assets/img/kart/drivers/hat/hat-right.png', mat: null },
          'TURN_LEFT':   { url: 'assets/img/kart/drivers/hat/hat-left.png',  mat: null },
          'TURN_RIGHT':  { url: 'assets/img/kart/drivers/hat/hat-right.png', mat: null },
          'DRIFT_LEFT':  { url: 'assets/img/kart/drivers/hat/hat-left.png',  mat: null },
          'DRIFT_RIGHT': { url: 'assets/img/kart/drivers/hat/hat-right.png', mat: null }
        },
        smokeSprites: {
          'DRIFT_LEFT_1':  { url: 'assets/img/misc/drift_left_1.png'},
          'DRIFT_LEFT_2':  { url: 'assets/img/misc/drift_left_2.png'},
          'DRIFT_LEFT_BLUE':  { url: 'assets/img/misc/drift_left_blue.png'},
          'DRIFT_LEFT_RED':  { url: 'assets/img/misc/drift_left_red.png'},
          'DRIFT_RIGHT_1': { url: 'assets/img/misc/drift_right_1.png'},
          'DRIFT_RIGHT_2': { url: 'assets/img/misc/drift_right_2.png'},
          'DRIFT_RIGHT_BLUE': { url: 'assets/img/misc/drift_right_blue.png'},
          'DRIFT_RIGHT_RED': { url: 'assets/img/misc/drift_right_red.png'}
        },
        mainColor: '#00AA00',
        mainBackground: 'assets/img/menu/bg-gatling.png',
        speed: 4,
        acceleration: 4,
        weight: 3,
        handling: 3,
        traction: 3,
        luck: 2,
        width: 6
      }]
    });
})();
