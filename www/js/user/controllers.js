/**
 * beginnings of a controller to login to system
 * here for the purpose of showing how a service might
 * be used in an application
 */
angular.module('user.controllers', [  'ionic',
    'ngCordova'])

    .controller('LoginController', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            debugger;

            // ng-model holding values from view/html
            $scope.creds = {
                username: "username",
                password: "password"
            };

            $scope.doLogoutAction = function () {
                UserService.logout()
                    .then(function (_response) {
                        // transition to next state
                        $state.go('app-login');
                    }, function (_error) {
                        alert("error logging in " + _error.debug);
                    })
            };

            $scope.doLoginAction = function () {
                UserService.login($scope.creds.username, $scope.creds.password)
                    .then(function (_response) {


                        //$cordovaToast.show("login success " + _response.attributes.username, 'long', 'center');
                        alert("login success " + _response.attributes.username);

                        // transition to next state
                        $state.go('tab.list');

                    }, function (_error) {
                        alert("error logging in " + _error.message);
                        //$cordovaToast.show("error logging in " + _error.message, 'long', 'center');
                    })
            };

            //
            //$scope.getfeedback = function($state, $scope, UserService){
            //
            //
            //
            //}






        }])


    .controller('SignUpController', ['$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {
            $scope.creds = {};
            $scope.signUpUser = function () {
                UserService.init();

                UserService.createUser($scope.creds).then(function (_data) {
                    $scope.user = _data;
                    alert("Success Creating User Account ");
                    $state.go('tab.list', {});
                }, function (_error) {
                    alert("Error Creating User Account " + _error.debug)
                });
            }
        }])


    //This controller will trigger the methods that insert into parse
    .controller('RateFeedbackCtrl', ['$state', '$scope', 'UserService',
        function ($state, $scope, UserService) {
            //alert("Submit hit");
            $scope.creds = {};
            $scope.feedBack = function () {
                UserService.init();
                $state.go('tab.list', {});
                UserService.createfeedBack($scope.creds).then(function (_data) {
                    $scope.feedback = _data;

                    alert("Thank your message was sent ");

                    //$state.go('tab.list', {});
                }, function (_error) {
                    alert("Error Sending Message " + _error.debug)
                });

            }

        }])
//Add Taxi controller adding taxi
    .controller('addTaxiCtrl', ['$state', '$scope', 'UserService',
        function ($state, $scope, UserService){
            
            $scope.taxi = {};
                
            $scope.addTaxi = function (){
                UserService.addNewTaxi($scope.taxi).then(function(data){
                    $scope.addTaxi = data;
                }, function(error){
                    alert("Error add data " + error.message)
                });
            }
              
        }])

    //Controller for add route -- it triggers the methods in service that insert route details
    .controller('addRouteCtrl', ['$state', '$scope', 'UserService', function($state, $scope, UserService) {
        $scope.creds = {};
        
        $scope.addRoute = function () {
            UserService.addTaxiRoute($scope.creds).then(function(_data){
                $scope.addRoute = _data;
                
                alert("Route added into the system");
                
                $state.go('tab.list', {});
            }, function(_error){
                alert("Error when adding route " + _error.debug)
            });
        }
        
    }])

    //Getting routes controller ---> get view scope and send it to factory
    .controller('getTaxiRouteCtrl', ['$scope', '$scope', 'UserService',
        function($state, $scope, UserService){
            $scope.creds = {};
            
            UserService.init();
            var getRoute = UserService.getTaxiRoutes();
            getRoute.then(function(routeResults){
                $scope.routes = routeResults;
            }, function(reason){
                console.log(reason); 
            });
        }])

    .controller('getAssocCtrl', ['$state', '$scope', 'UserService',
        function($state, $scope, UserService){
            $scope.creds = {};
            
            UserService.init();
            var getAssoc = UserService.getAssociation();
            getAssoc.then(function(resultz){
                $scope.taxiAssociations = resultz;
            }, function(reason){
                console.log(reason);
            });
        }])


    //This controller will trigger the methods that insert into parse
    .controller('getFeedbackCtrl', ['$state', '$scope', 'UserService','$ionicPopup',
        function ($state, $scope, UserService, $ionicPopup) {

            //$scope.creds = {};


            UserService.init();
            var getFeed = UserService.getfeedback();
            getFeed.then(function (results) {
                $scope.taxifareResult = results;
            },function(reason){
                console.log(reason);
            });


            //Modal code to display data from the api
            $scope.infoPopup = function (taxifair) {
                console.log(taxifair);
                //alert("Ok i am hit");
                //$scope.data = {};


                // An elaborate, custom popup
                var infoPopup = $ionicPopup.show({
                    title:taxifair.email,
                    template: taxifair.message +''+"<p> Taxi Plate number"+ taxifair.registration+"</p>",
                    scope: $scope,
                    buttons: [
                        {text: 'Cancel'}
                    ]
                });
                infoPopup.then(function (res) {
                    console.log('Tapped!', res);
                });

            };
        }]
)
//Getting the taxi fare from the database
    .controller('getTaxiFareCtrl', ['$state', '$scope', 'UserService','$ionicPopup',
        function ($state, $scope, UserService) {
            UserService.init();
            var getTaxiFare = UserService.getTaxiFare();
            getTaxiFare.then(function (results) {
                $scope.getTaxiFare= results;
            },function(reason){
                console.log(reason);
            });

}]
)

    //Find distance and add the price
    .controller('DistanceCtrl', function ($scope, $state, $cordovaGeolocation) {


        //function initMap() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: {lat: -26.0096733, lng: 27.5669464}
        });


        directionsDisplay.setMap(map);

        var onChangeHandler = function () {
            calculateAndDisplayRoute(directionsService, directionsDisplay);
        };


        document.getElementById('start').addEventListener('change', onChangeHandler);
        document.getElementById('end').addEventListener('change', onChangeHandler);
        //}

        function calculateAndDisplayRoute(directionsService, directionsDisplay) {
            directionsService.route({
                origin: document.getElementById('start').value,
                destination: document.getElementById('end').value,
                travelMode: google.maps.TravelMode.DRIVING
            }, function (response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }

        window.onload = function () {
            getLocation();
        }

        var x = document.getElementById("map");

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }

        function showPosition(position) {
            console.log('=====');
            // x.innerHTML = "Latitude: " + position.coords.latitude +
            // "<br>Longitude: " + position.coords.longitude;

            currentLocation = position.coords.latitude + position.coords.longitude;

            console.log("Latitude: " + position.coords.latitude +
                "<br>Longitude: " + position.coords.longitude);
        }
    })





    .controller('taxiFinderCtrl', function ($scope, $window, $ionicPlatform, $timeout, $ionicPopup, $ionicLoading, $ionicPopover, $ionicModal, $cordovaToast, $state, $cordovaGeolocation) {

    $scope.dismissRefresher = function () {
        $scope.$broadcast('scroll.refreshComplete');
    }
    $scope.btnFabClick = function () {
        $state.go('ride', {}, {reload: true});
    };

    $scope.btnSearchClick = function () {

        $state.go('search', {}, {reload: true});
    };


    var map;
    var directionDisplay;
    var directionsService;
    var stepDisplay;

    var position;
    var marker = [];
    var polyline = [];
    var poly2 = [];
    var poly = null;
    var startLocation = [];
    var endLocation = [];
    var timerHandle = [];


    var speed = 0.000008, wait = 1;
    var infowindow = null;

    var myPano;
    var panoClient;
    var nextPanoId;

    var startLoc = new Array();
    startLoc[0] = "bela bela,south africa";
    startLoc[1] = "emelo, south africa";
    startLoc[2] = "randburg,south africa";
    startLoc[3] = "midrand, south africa";

    var endLoc = new Array();
    endLoc[0] = 'sandton,south africa';
    endLoc[1] = 'pretoria, south africa';
    endLoc[2] = 'sun city, south africa';
    endLoc[3] = 'kroonstad, south africa';


    var Colors = ["#FF0000", "#00FF00", "#0000FF"];


    function initialize() {

        infowindow = new google.maps.InfoWindow(
            {
                size: new google.maps.Size(150, 50)
            });

        var myOptions = {
            zoom: 7,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        map = new google.maps.Map(document.getElementById("map"), myOptions);

        address = 'gauteng,South Africa'
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': address}, function (results, status) {
            map.fitBounds(results[0].geometry.viewport);

        });
        // setRoutes();
    }

    initialize();

    function createMarker(latlng, label, html) {
// alert("createMarker("+latlng+","+label+","+html+","+color+")");
        var contentString = '<b>' + label + '</b><br>' + html;
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: 'img/car.png',
            title: label,
            zIndex: Math.round(latlng.lat() * -100000) << 5
        });
        marker.myname = label;


        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(contentString);
            infowindow.open(map, marker);
        });
        return marker;
    }

    function setRoutes() {

        var directionsDisplay = new Array();

        for (var i = 0; i < startLoc.length; i++) {

            var rendererOptions = {
                map: map,
                suppressMarkers: true,
                preserveViewport: true
            }
            directionsService = new google.maps.DirectionsService();

            var travelMode = google.maps.DirectionsTravelMode.DRIVING;

            var request = {
                origin: startLoc[i],
                destination: endLoc[i],
                travelMode: travelMode
            };

            directionsService.route(request, makeRouteCallback(i, directionsDisplay[i]));

        }


        function makeRouteCallback(routeNum, disp) {
            if (polyline[routeNum] && (polyline[routeNum].getMap() != null)) {
                startAnimation(routeNum);
                return;
            }
            return function (response, status) {

                if (status == google.maps.DirectionsStatus.OK) {

                    var bounds = new google.maps.LatLngBounds();
                    var route = response.routes[0];
                    startLocation[routeNum] = new Object();
                    endLocation[routeNum] = new Object();


                    polyline[routeNum] = new google.maps.Polyline({
                        path: [],
                        strokeColor: '#FFFF00',
                        strokeWeight: 3
                    });

                    poly2[routeNum] = new google.maps.Polyline({
                        path: [],
                        strokeColor: '#FFFF00',
                        strokeWeight: 3
                    });


                    // For each route, display summary information.
                    var path = response.routes[0].overview_path;
                    var legs = response.routes[0].legs;


                    disp = new google.maps.DirectionsRenderer(rendererOptions);
                    disp.setMap(map);
                    disp.setDirections(response);


                    //Markers
                    for (i = 0; i < legs.length; i++) {
                        if (i == 0) {
                            startLocation[routeNum].latlng = legs[i].start_location;
                            startLocation[routeNum].address = legs[i].start_address;
                            // marker = google.maps.Marker({map:map,position: startLocation.latlng});
                            marker[routeNum] = createMarker(legs[i].start_location, "start", legs[i].start_address, "green");
                        }
                        endLocation[routeNum].latlng = legs[i].end_location;
                        endLocation[routeNum].address = legs[i].end_address;
                        var steps = legs[i].steps;

                        for (j = 0; j < steps.length; j++) {
                            var nextSegment = steps[j].path;
                            var nextSegment = steps[j].path;

                            for (k = 0; k < nextSegment.length; k++) {
                                polyline[routeNum].getPath().push(nextSegment[k]);
                                //bounds.extend(nextSegment[k]);
                            }

                        }
                    }

                }

                polyline[routeNum].setMap(map);
                //map.fitBounds(bounds);
                startAnimation(routeNum);

            } // else alert("Directions request failed: "+status);

        }

    }

    var lastVertex = 1;
    var stepnum = 0;
    var step = 50; // 5; // metres
    var tick = 100; // milliseconds
    var eol = [];
//----------------------------------------------------------------------
    function updatePoly(i, d) {
        // Spawn a new polyline every 20 vertices, because updating a 100-vertex poly is too slow
        if (poly2[i].getPath().getLength() > 20) {
            poly2[i] = new google.maps.Polyline([polyline[i].getPath().getAt(lastVertex - 1)]);
            // map.addOverlay(poly2)
        }

        if (polyline[i].GetIndexAtDistance(d) < lastVertex + 2) {
            if (poly2[i].getPath().getLength() > 1) {
                poly2[i].getPath().removeAt(poly2[i].getPath().getLength() - 1)
            }
            poly2[i].getPath().insertAt(poly2[i].getPath().getLength(), polyline[i].GetPointAtDistance(d));
        } else {
            poly2[i].getPath().insertAt(poly2[i].getPath().getLength(), endLocation[i].latlng);
        }
    }

//----------------------------------------------------------------------------

    function animate(index, d) {
        if (d > eol[index]) {
            marker[index].setPosition(endLocation[index].latlng);
            return;
        }
        var p = polyline[index].GetPointAtDistance(d);
        //map.panTo(p);
        marker[index].setPosition(p);
        updatePoly(index, d);


        Newstep = d + step;

        timerHandle[index] = $timeout(function () {
            animate(index, Newstep)
        }, tick);

        // timerHandle[index] = $timeout("animate("+index+","+(d+step)+")", tick);
    }

//-------------------------------------------------------------------------

    function startAnimation(index) {
        if (timerHandle[index]) clearTimeout(timerHandle[index]);
        eol[index] = polyline[index].Distance();
        map.setCenter(polyline[index].getPath().getAt(0));

        poly2[index] = new google.maps.Polyline({
            path: [polyline[index].getPath().getAt(0)],
            strokeColor: "#FFFF00",
            strokeWeight: 3
        });

        // timerHandle[index] = $timeout("animate("+index+",50)",2000);  // Allow time for the initial map display

        timerHandle[index] = $timeout(function () {
            animate(index, 50)
        }, 2000);
    }

//-------------------------------------------------------------------------


    $timeout(function () {
        setRoutes();
    }, 100);


//----------------------------------------------------------------------------


})

//Google maps controller to find taxi ranks
    .controller('usefulPlacesCtrl', function ($scope, $cordovaGeolocation, uiGmapGoogleMapApi, uiGmapIsReady, ngGPlacesAPI) {

        var posOptions = {timeout: 10000, enableHighAccuracy: false};

        // get user location with ngCordova geolocation plugin
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                $scope.lat  = position.coords.latitude;
                $scope.long = position.coords.longitude;

                // get nearby places once we have user loc in lat & long
                ngGPlacesAPI.nearbySearch({
                    latitude: $scope.lat,
                    longitude: $scope.long
                }).then(
                    function(data){
                        console.log('returned with places data', data);
                        $scope.places = data;
                        return data;
                    });

                // create new map with your location
                uiGmapGoogleMapApi.then(function(maps){

                    $scope.control = {};

                    $scope.myMap = {
                        center: {
                            latitude: $scope.lat,
                            longitude: $scope.long
                        },
                        zoom : 14
                    };
                    $scope.myMarker = {
                        id: 1,
                        coords: {
                            latitude: $scope.lat,
                            longitude: $scope.long
                        },
                        options: {draggable:false}
                    };

                });

            }, function(err) {
                // error
            });

        $scope.getMap = function() {
            var map1 = $scope.control.getGMap();
            console.log('map is:', map1);
            console.log('with places:', $scope.places);
        };

        uiGmapIsReady.promise(1).then(function(instances) {
            instances.forEach(function(inst) {
                var map = inst.map;
                var uuid = map.uiGmap_id;
                var mapInstanceNumber = inst.instance; // Starts at 1.
                console.log('from map is ready:', map, uuid, mapInstanceNumber);
            });
        });	var posOptions = {timeout: 10000, enableHighAccuracy: false};

        // get user location with ngCordova geolocation plugin
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                $scope.lat  = position.coords.latitude;
                $scope.long = position.coords.longitude;

                // get nearby places once we have user loc in lat & long
                ngGPlacesAPI.nearbySearch({
                    latitude: $scope.lat,
                    longitude: $scope.long
                }).then(
                    function(data){
                        console.log('returned with places data', data);
                        $scope.places = data;
                        return data;
                    });

                // create new map with your location
                uiGmapGoogleMapApi.then(function(maps){

                    $scope.control = {};

                    $scope.myMap = {
                        center: {
                            latitude: $scope.lat,
                            longitude: $scope.long
                        },
                        zoom : 14
                    };
                    $scope.myMarker = {
                        id: 1,
                        coords: {
                            latitude: $scope.lat,
                            longitude: $scope.long
                        },
                        options: {draggable:false}
                    };

                });

            }, function(err) {
                // error
            });

        $scope.getMap = function() {
            var map1 = $scope.control.getGMap();
            console.log('map is:', map1);
            console.log('with places:', $scope.places);
        };

        uiGmapIsReady.promise(1).then(function(instances) {
            instances.forEach(function(inst) {
                var map = inst.map;
                var uuid = map.uiGmap_id;
                var mapInstanceNumber = inst.instance; // Starts at 1.
                console.log('from map is ready:', map, uuid, mapInstanceNumber);
            });
        });
    });
