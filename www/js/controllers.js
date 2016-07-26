angular.module('app.controllers', [])


.controller('splashCtrl', function($scope, $state, $stateParams, $ionicPopup, $timeout, $http) {


})

.controller('registerCtrl', function($scope, $state, $stateParams, $ionicPopup, $timeout, $http) {


    function showAlert(status, message) {
        $ionicPopup.alert({
            title: status,
            template: message,
        });

    }



    $scope.username = null;
    $scope.email = null;
    $scope.password = null;
    $scope.confirm_password = null;

    $scope.submit = function(username, email, password, confirm_password) {



        var input = {
            username: username,
            email: email,
            password: password,
            confirm_password: confirm_password
        };



        var url = 'http://bccp.radiumenterprises.co.uk/rest/rest.php/register';

        $http.post(url, input).then(function(response) {
            //success
            var status = response.data.status + '!';
            status = status.trim();
            var message = response.data.message;
            message = message.trim();
            console.log(status);
            if (status.trim() == 'success!') {
                $state.go('login');

            }
            showAlert(status, message);

        }).catch(function(response) {

            showAlert('danger!', 'Some error occured in app. Please try again.');
        });
    }


})

.controller('loginCtrl', function($scope, $state, $stateParams, $ionicPopup, $timeout, $http) {



    function showAlert(status, message) {
        $ionicPopup.alert({
            title: status,
            template: message,
        });

    }



    $scope.username = null;
    $scope.password = null;


    $scope.submit = function(username, password) {




        var input = {
            username: username,
            password: password
        };



        var url = 'http://bccp.radiumenterprises.co.uk/rest/rest.php/login';

        $http.post(url, input).then(function(response) {
            //success
            var status = response.data.status + '!';
            status = status.trim();
            var message = response.data.message;
            message = message.trim();
            console.log(status);
            if (status.trim() == 'success!') {
                $state.go('menu.accountSettings');
            }
            showAlert(status, message);

        }).catch(function(response) {

            showAlert('danger!', 'Some error occured in app. Please try again.');
        });
    }

})

.controller('forgotPasswordCtrl', function($scope, $state, $stateParams, $ionicPopup, $timeout, $http) {


    function showAlert(status, message) {
        $ionicPopup.alert({
            title: status,
            template: message,
        });

    }

    $scope.username = null;
    $scope.email = null;
    $scope.profile_picture = null;
    $scope.first_name = null;
    $scope.last_name = null;
    $scope.phone_number = null;

    $scope.submit = function(email) {


        var input = {
            email: email
        };



        var url = 'http://bccp.radiumenterprises.co.uk/rest/rest.php/forgot_password';

        $http.post(url, input).then(function(response) {
            //success
            var status = response.data.status + '!';
            status = status.trim();
            var message = response.data.message;
            message = message.trim();
            console.log(status);
            if (status.trim() == 'success!') {
                $state.go('login');
            }
            showAlert(status, message);

        }).catch(function(response) {

            showAlert('danger!', 'Some error occured. Please try again.');
        });
    }



})



.controller('menuCtrl', function($scope, $state, $stateParams, $ionicPopup, $timeout, $http) {



    $scope.logout = function() {
        var input = {

        };

        var url = 'http://bccp.radiumenterprises.co.uk/rest/rest.php/logout';

        $http.post(url, input).then(function(response) {
            //success
            var status = response.data.status + '!';
            status = status.trim();
            var message = response.data.message;
            message = message.trim();
            console.log(status);
            if (status.trim() == 'success!') {
                $state.go('splash');
                showAlert(status, message);
            }
            showAlert(status, message);

        }).catch(function(response) {
            console.log(response);
            showAlert('danger!', 'Some error occured in app. Please try again.');
        });
    }


})


.controller('notApprovedCtrl', function($scope, $state, $stateParams, $ionicPopup, $timeout, $http) {



    $scope.logout = function() {
        var input = {

        };

        var url = 'http://bccp.radiumenterprises.co.uk/rest/rest.php/logout';

        $http.post(url, input).then(function(response) {
            //success
            var status = response.data.status + '!';
            status = status.trim();
            var message = response.data.message;
            message = message.trim();
            console.log(status);
            if (status.trim() == 'success!') {
                $state.go('splash');
            }
            showAlert(status, message);

        }).catch(function(response) {

            showAlert('danger!', 'Some error occured in app. Please try again.');
        });
    }


})



.controller('accountSettingsCtrl', function($scope, $state, $stateParams, $ionicPopup, $timeout, $http) {


    //popup alert starts here
    function showAlert(status, message) {
        $ionicPopup.alert({
            title: status,
            template: message,
        });

    }

    //redirect to splash screen if not logged 
    var url_userdata = 'http://bccp.radiumenterprises.co.uk/rest/rest.php/client/user_data';

    $http.get(url_userdata).then(function(response) {
        var session_user_id = response.data.id
        var approved = response.data.approved

        if (angular.isUndefined(session_user_id)) {

            $state.go('splash');

        }
        if (approved.trim() == 'no') {
            $state.go('notApproved');
        }

    }).catch(function(response) {

        showAlert('danger!', 'Some error occured. Please try again.');
    });


    //show data
    $scope.user_data = null;

    var url = 'http://bccp.radiumenterprises.co.uk/rest/rest.php/client/user_data';

    $http.get(url).then(function(response) {
        $scope.user_data = response.data;
        $scope.action = response.data.action;
        $scope.username = response.data.username;
        $scope.email = response.data.email;



        if (response.data.status && response.data.message) {
            var status = response.data.status + '!';
            var message = response.data.message;

            showAlert(status, message);


        }



    }).catch(function(response) {

        showAlert('danger!', 'Some error occured. Please try again.');
    });




    $scope.submit = function(username, email) {


        var input = {
            username: username,
            email: email,

        };



        var url = 'http://bccp.radiumenterprises.co.uk/rest/rest.php/client/save_account_settings';

        $http.put(url, input).then(function(response) {
            //success
            var status = response.data.status + '!';
            status = status.trim();
            var message = response.data.message;
            message = message.trim();
            console.log(status);
            if (status.trim() == 'success!') {
                $state.go('menu.accountSettings');
            }
            showAlert(status, message);

        }).catch(function(response) {

            showAlert('danger!', 'Some error occured. Please try again.');
        });
    }




})

.controller('passwordSettingsCtrl', function($scope, $state, $stateParams, $ionicPopup, $timeout, $http) {


    //redirect to splash screen if not logged innerHeight
    var url_userdata = 'http://bccp.radiumenterprises.co.uk/rest/rest.php/client/user_data';

    $http.get(url_userdata).then(function(response) {
        var session_user_id = response.data.id
        var approved = response.data.approved

        if (angular.isUndefined(session_user_id)) {

            $state.go('splash');

        }
        if (approved.trim() == 'no') {
            $state.go('notApproved');
        }

    }).catch(function(response) {

        showAlert('danger!', 'Some error occured. Please try again.');
    });



    //popup alert starts here
    function showAlert(status, message) {
        $ionicPopup.alert({
            title: status,
            template: message,
        });

    }


    $scope.action = null;
    $scope.old_password = null;
    $scope.new_password = null;
    $scope.confirm_new_password = null;

    $scope.submit = function(old_password, new_password, confirm_new_password) {



        var input = {
            old_password: old_password,
            new_password: new_password,
            confirm_new_password: confirm_new_password
        };



        var url = 'http://bccp.radiumenterprises.co.uk/rest/rest.php/client/save_password';

        $http.put(url, input).then(function(response) {
            //success
            var status = response.data.status + '!';
            status = status.trim();
            var message = response.data.message;
            message = message.trim();
            console.log(status);
            if (status.trim() == 'success!') {
                $state.go('menu.passwordSettings');
            }
            showAlert(status, message);

        }).catch(function(response) {

            showAlert('danger!', 'Some error occured. Please try again.');
        });
    }


})

// .controller('geolocationCtrl', function($scope, $state, $stateParams, $ionicPopup, $timeout, $http) {
//
//
//     //redirect to splash screen if not logged innerHeight
//     var url_userdata = 'http://bccp.radiumenterprises.co.uk/rest/rest.php/client/user_data';
//
//     $http.get(url_userdata).then(function(response) {
//         var session_user_id = response.data.id
//         var approved = response.data.approved
//
//         if (angular.isUndefined(session_user_id)) {
//
//             $state.go('splash');
//
//         }
//         if (approved.trim() == 'no') {
//             $state.go('notApproved');
//         }
//
//     }).catch(function(response) {
//
//         showAlert('danger!', 'Some error occured. Please try again.');
//     });
//
//
//
//     //popup alert starts here
//     function showAlert(status, message) {
//         $ionicPopup.alert({
//             title: status,
//             template: message,
//         });
//
//     }
//
// })
    .controller('geolocationCtrl', [ '$scope', '$http', 'geolocationFactory',
        function($scope, $http, geolocationFactory) {

            // constants should be uppercase
            var GET_PATH = 'http://bccp.radiumenterprises.co.uk/rest/rest.php/client/geolocation',
                PUT_PATH = 'http://bccp.radiumenterprises.co.uk/rest/rest.php/client/geolocation/update';


            $http.get(GET_PATH).then(function (response) {
                var respLong = Number(response.data.longitude),
                    respLat = Number(response.data.latitude);

                $scope.map = drawMap(respLong, respLat);
                $scope.marker = new google.maps.Marker({
                    position: new google.maps.LatLng(respLong, respLat)
                });
                $scope.marker.setMap($scope.map);

            }, function (errorResponse) {
                console.error('error response ' + errorResponse);
            });

            function drawMap(latitude, longitude) {
                var lat = latitude,
                    long = longitude,
                    currentLatlng = new google.maps.LatLng(lat, long);
                var map = new google.maps.Map(document.getElementById('map'), {
                    center: currentLatlng,
                    zoom: 10
                });
                return map;
            };

            setInterval(function () {
                geolocationFactory.getCurrentPosition().then(function(location) {
                    $scope.location = location;
                    $scope.marker = new google.maps.Marker({
                        position: {
                            lat: $scope.location.coords.latitude,
                            lng: $scope.location.coords.longitude
                        }
                    });
                    $scope.marker.setMap(null);
                    $scope.marker.setMap($scope.map);

                    // send data to server
                    $http.put(PUT_PATH, {
                        "longitude": JSON.stringify($scope.location.coords.latitude),
                        "latitude": JSON.stringify($scope.location.coords.longitude)
                    }).then(function (response) {
                        console.log('data sended');
                    }, function (errorResponse) {
                        console.error(errorResponse);
                    });
                }.bind(this));
            }, 5000);


                // // get gata from server
                // $http.get(GET_PATH).then(function (response) {
                //     $scope.marker.setMap(null);
                //     $scope.marker = new google.maps.Marker({
                //         position: {
                //             lat: response.data.latitude,
                //             lng: response.data.longitude
                //         }
                //     });
                //     $scope.marker.setMap($scope.map);
                //
                // }, function (errorResponse) {
                //     console.error('error response ' + errorResponse);
                // })

            //});

        }])

.controller('availabilityCtrl', function($scope, $state, $stateParams, $ionicPopup, $timeout, $http) {


    //redirect to splash screen if not logged innerHeight
    var url_userdata = 'http://bccp.radiumenterprises.co.uk/rest/rest.php/client/user_data';

    $http.get(url_userdata).then(function(response) {
        var session_user_id = response.data.id
        var approved = response.data.approved

        if (angular.isUndefined(session_user_id)) {

            $state.go('splash');

        }
        if (approved.trim() == 'no') {
            $state.go('notApproved');
        }

    }).catch(function(response) {

        showAlert('danger!', 'Some error occured. Please try again.');
    });



    //popup alert starts here
    function showAlert(status, message) {
        $ionicPopup.alert({
            title: status,
            template: message,
        });

    }

})


.controller('messagesCtrl', function($scope, $state, $stateParams, $ionicPopup, $timeout, $http) {

    //popup alert starts here
    function showAlert(status, message) {
        $ionicPopup.alert({
            title: status,
            template: message,
        });

    }

    //redirect to splash screen if not logged innerHeight
    var url_userdata = 'http://bccp.radiumenterprises.co.uk/rest/rest.php/client/user_data';

    $http.get(url_userdata).then(function(response) {
        var session_user_id = response.data.id
        var approved = response.data.approved
        $scope.session_user_id = session_user_id;

        if (angular.isUndefined(session_user_id)) {

            $state.go('splash');

        }
        if (approved.trim() == 'no') {
            $state.go('notApproved');
        }

    }).catch(function(response) {

        showAlert('danger!', 'Some error occured. Please try again.');
    });



    //popup alert starts here
    $scope.showAlert = function(status, message) {
        var alertPopup = $ionicPopup.alert({
            title: status,
            template: message,
        });
    };
    //popup alert ends here


    //display data
    $scope.messages = null;


    var url = 'http://bccp.radiumenterprises.co.uk/rest/rest.php/client/messages';

    $http.get(url).then(function(response) {
        $scope.messages = response.data;
        if ($scope.messages == null) {
            return;
        }

        if (response.data.status && response.data.message) {
            var status = response.data.status + '!';
            var message = response.data.message;

            showAlert(status, message);


        }

        return;

    }).catch(function(response) {

        showAlert('danger!', 'Some error occured. Please try again.');
    });



})


.controller('messagesViewCtrl', function($scope, $state, $stateParams, $ionicPopup, $timeout, $http) {



    var get_username_by_id = function(id, retElem) {

        var url_username = 'http://rest.radiumenterprises.co.uk/rest-all.php/admin/username_by_id/' + id;

        $http.get(url_username).then(function(response) {
            console.log(response);

            if (response.data.status && response.data.message) {
                var status = response.data.status + '!';
                var message = response.data.message;

                //return 'username not found';
                $scope.params.from = 'username not found';

            } else {
                var username = response.data.username;
                //onsole.info(username);
                $scope.params.from = username;
                // console.info('hello');

            }




        }).catch(function(response) {
            $scope.params.from = 'username not found';

            // return 'username not found';
        });

    }

    //popup alert starts here
    function showAlert(status, message) {
        $ionicPopup.alert({
            title: status,
            template: message,
        });

    }


    //redirect to splash screen if not logged innerHeight
    var url_userdata = 'http://bccp.radiumenterprises.co.uk/rest/rest.php/client/user_data';

    $http.get(url_userdata).then(function(response) {
        var session_user_id = response.data.id
        var approved = response.data.approved
        $scope.session_user_id = session_user_id;

        if (angular.isUndefined(session_user_id)) {

            $state.go('splash');

        }
        if (approved.trim() == 'no') {
            $state.go('notApproved');
        }

    }).catch(function(response) {

        showAlert('danger!', 'Some error occured. Please try again.');
    });



    $scope.showAlert = function(status, message) {
        var alertPopup = $ionicPopup.alert({
            title: status,
            template: message
        });
    };

    var id = $stateParams.id;
    var content = $stateParams.content;
    var type = $stateParams.type;
    var datetime = $stateParams.datetime;
    var to_user_id = $stateParams.to_user_id;
    var from_user_id = $stateParams.from_user_id;
    var to = $stateParams.to;
    var from = $stateParams.from;

    $scope.state = $state.current
    $scope.params = $stateParams;
    console.log($scope.params.from);
    console.log(get_username_by_id($scope.params.from));
    $scope.params.provider_to_user_id = get_username_by_id($scope.params.provider_to_user_id);

})

.controller('messagesReplyCtrl', function($scope, $state, $stateParams, $ionicPopup, $timeout, $http) {

    //popup alert starts here
    function showAlert(status, message) {
        $ionicPopup.alert({
            title: status,
            template: message,
        });

    }

    //redirect to splash screen if not logged innerHeight
    var url_userdata = 'http://bccp.radiumenterprises.co.uk/rest/rest.php/client/user_data';

    $http.get(url_userdata).then(function(response) {
        var session_user_id = response.data.id
        var approved = response.data.approved

        if (angular.isUndefined(session_user_id)) {

            $state.go('splash');

        }
        if (approved.trim() == 'no') {
            $state.go('notApproved');
        }

    }).catch(function(response) {

        showAlert('danger!', 'Some error occured. Please try again.');
    });



    $scope.showAlert = function(status, message) {
        var alertPopup = $ionicPopup.alert({
            title: status,
            template: message
        });
    };

    var id = $stateParams.id;
    var content = $stateParams.content;
    var type = $stateParams.type;
    var datetime = $stateParams.datetime;
    var to_user_id = $stateParams.to_user_id;
    var from_user_id = $stateParams.from_user_id;
    var to = $stateParams.to;
    var from = $stateParams.from;
    $scope.state = $state.current
    $scope.params = $stateParams;




    $scope.action = null;
    $scope.to_user_id = from_user_id;
    $scope.content = null;

    $scope.submit = function(action, to_user_id, content) {

        //fields left empty
        //if(!username || !password) {
        //   alert('empty usr or pw');
        //   return;
        // }


        var input = {
            to_user_id: to_user_id,
            content: content
        };



        var url = 'http://bccp.radiumenterprises.co.uk/rest/rest.php/client/message/reply';

        $http.post(url, input).then(function(response) {
            //success
            var status = response.data.status + '!';
            status = status.trim();
            var message = response.data.message;
            message = message.trim();
            console.log(status);
            if (status.trim() == 'success!') {
                $state.go('menu.messages');
                showAlert(status, message);

            }
            if (status == 'danger') {
                showAlert(status, message);
            } else {
                showAlert(status, message);
            }

        }).catch(function(response) {

            showAlert('danger!', 'Some error occured. Please try again.');
        });
    }

})

.controller('reviewsCtrl', function($scope, $state, $stateParams, $ionicPopup, $timeout, $http) {

    function showAlert(status, message) {
        $ionicPopup.alert({
            title: status,
            template: message,
        });

    }

    //redirect to splash screen if not logged innerHeight
    var url_userdata = 'http://bccp.radiumenterprises.co.uk/rest/rest.php/client/user_data';

    $http.get(url_userdata).then(function(response) {
        var session_user_id = response.data.id
        var approved = response.data.approved

        if (angular.isUndefined(session_user_id)) {

            $state.go('splash');

        }
        if (approved.trim() == 'no') {
            $state.go('notApproved');
        }

    }).catch(function(response) {

        showAlert('danger!', 'Some error occured. Please try again.');
    });



    //popup alert ends here


    //show data


    var url = 'http://bccp.radiumenterprises.co.uk/rest/rest.php/client/reviews';

    $http.get(url).then(function(response) {
        $scope.reviews = response.data;
        if ($scope.reviews == null) {
            return;
        }

        if (response.data.status && response.data.message) {
            var status = response.data.status + '!';
            var message = response.data.message;

            showAlert(status, message);


        }

        return;

    }).catch(function(response) {

        showAlert('danger!', 'Some error occured. Please try again.');
    });



})


.controller('reviewsViewCtrl', function($scope, $state, $stateParams, $ionicPopup, $timeout, $http) {

    var get_username_by_id = function(id, retElem) {

        var url_username = 'http://bccp.radiumenterprises.co.uk/rest/rest.php/admin/username_by_id/' + id;

        $http.get(url_username).then(function(response) {
            console.log(response);

            if (response.data.status && response.data.message) {
                var status = response.data.status + '!';
                var message = response.data.message;

                //return 'username not found';
                $scope.params.by = 'username not found';

            } else {
                var username = response.data.username;
                //onsole.info(username);
                $scope.params.by = username;
                // console.info('hello');

            }




        }).catch(function(response) {
            $scope.params.by = 'username not found';

            // return 'username not found';
        });

    }

    function showAlert(status, message) {
        $ionicPopup.alert({
            title: status,
            template: message,
        });

    }


    //redirect to splash screen if not logged innerHeight
    var url_userdata = 'http://bccp.radiumenterprises.co.uk/rest/rest.php/client/user_data';

    $http.get(url_userdata).then(function(response) {
        var session_user_id = response.data.id
        var approved = response.data.approved

        if (angular.isUndefined(session_user_id)) {

            $state.go('splash');

        }
        if (approved.trim() == 'no') {
            $state.go('notApproved');
        }

    }).catch(function(response) {

        showAlert('danger!', 'Some error occured. Please try again.');
    });



    $scope.showAlert = function(status, message) {
        var alertPopup = $ionicPopup.alert({
            title: status,
            template: message
        });
    };
    var id = $stateParams.id;
    var by = $stateParams.by;
    var content = $stateParams.content;
    var datetime = $stateParams.datetime;
    $scope.state = $state.current
    $scope.params = $stateParams;
    $scope.params.by = get_username_by_id($scope.params.by);
})