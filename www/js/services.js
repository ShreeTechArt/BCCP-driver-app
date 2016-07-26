angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])
.factory('geolocationFactory', ['$window', '$rootScope', '$q', function ($window, $rootScope, $q) {

    function supported() {
        return 'geolocation' in $window.navigator;
    }

    var retVal = {
        getCurrentPosition: function (options) {
            var deferred = $q.defer();
            if (supported()) {
                $window.navigator.geolocation.getCurrentPosition(
                    function (position) {
                        $rootScope.$apply(function () {
                            this.coords = position.coords;
                            this.timestamp = position.timestamp;
                            deferred.resolve(position);
                        });
                    },
                    function (error) {
                        $rootScope.$apply(function () {
                            deferred.reject({error: error});
                        });
                    }, options);
            } else {
                deferred.reject({
                    error: {
                        code: 2,
                        message: 'This web browser does not support HTML5 Geolocation'
                    }
                });
            }
            return deferred.promise;
        },

        drawMarker: function (lat, lng) {

            map = new google.maps.Map(document.getElementById("map"), mapOptions);

            var marker = new google.maps.Marker({
                position: myLatlng,
                title: "Hello World!"
            });
        }
    };
    return retVal;
}]);
