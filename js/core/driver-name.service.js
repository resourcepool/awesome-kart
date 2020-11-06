(function () {
  'use strict';

  angular
    .module('ebiz-kart')
    .service('driverName', ['$http', DriverName]);

  function DriverName($http) {
    var that = this;
    that.name = "";

    return {
      getName: function () {
        return that.name;
      },
      setName: function (value) {
        that.name = value;
      },
      sendNotification: function (score) {
        var promise = $http.post("/kart-notif",
          {"name": that.name, "score": score}).then(function (response) {
          return response.data;
        });
        return promise;
      }
    };
  }
})();