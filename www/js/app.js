
angular.module('starter',
    [
        'ionic',
        'ngCordova',
        'app.controllers',
        'app.services',
        'user.controllers',
        'ionic-letter-avatar',
        'user.services',
        'uiGmapgoogle-maps',
        'ngGPlaces'

    ]
)
/**
 *
 * parse constants
 */
    .value('ParseConfiguration', {
        applicationId: "NIXVlVid4U0VPbOqS0aCBg7KkO3fOjrCiQWwRPaY",
        javascriptKey: "leLINlPMeNhWxAO6zeZvpIwXDi6njo9OM6RHt4ws",
        streamName: 'appKwela'
    })
/**
 *
 */
    .config(function ($stateProvider, $urlRouterProvider) {

        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
            // create account state
            .state('app-signup', {
                url: "/signup",
                templateUrl: "templates/user/signup.html",
                controller: "SignUpController"
            })

            // give feedback state
            .state('tab.app-rate-feedback', {
                url: "/ratefeedback",
                views: {
                    'tab-list': {
                        templateUrl: "templates/utills/ratefeedback.html",
                        controller: 'RateFeedbackCtrl'
                    }
                }
            })

            //taxi fare state
            .state('tab.app-taxi-fare', {
                url: "/taxifare",
                views: {
                    'tab-list': {
                        templateUrl: "templates/utills/taxifare.html",
                        controller: "getTaxiFareCtrl"
                    }
                }
            })

            //locate rank state
            .state('tab.app-rank-locate', {
                url: "/locateRank",
                views: {
                    'tab-list': {
                        templateUrl: "templates/utills/locateRank.html",
                        controller: 'usefulPlacesCtrl'

                    }
                }
            })

            //find taxi state
            .state('tab.app-taxi-find', {
                url: "/findTaxi",
                views: {
                    'tab-list': {
                        templateUrl: "templates/utills/findTaxi.html",
                        controller: 'taxiFinderCtrl'
                    }
                }
            })

            //complain list admin state
            .state('tab.app-complains-list', {
                url: "/complainList",
                views: {
                    'tab-list': {
                        templateUrl: "templates/admin/complainList.html",
                        controller: "getFeedbackCtrl"
                    }
                }
            })

            //find taxi state
            .state('tab.app-traffic', {
                url: "/traffic",
                views: {
                    'tab-list': {
                        templateUrl: "templates/utills/traffic.html",
                        controller: "TrafficCtrl"
                    }
                }
            })

            //find taxi state
            .state('tab.app-traffic-feeds', {
                url: "/trafficFeeds",
                views: {
                    'tab-list': {
                        templateUrl: "templates/utills/trafficFeeds.html",
                        controller: "trafficFeedsCtrl"
                    }
                }
            })


            //find distance state
            .state('tab.app-distance-list', {
                url: "/distance",
                views: {
                    'tab-list': {
                        templateUrl: "templates/utills/distance.html",
                        controller: "DistanceCtrl"
                    }
                }
            })

            //finds Schedule Taxi state
            .state('tab.app-scheduleTaxi', {
                url: "/scheduleTaxi",
                views: {
                    'tab-list': {
                        templateUrl: "templates/admin/scheduleTaxi.html"
                    }
                }
            })
        
            //finds Add Taxi state
            .state('tab.app-addTaxi', {
                url: "/addTaxi",
                views: {
                    'tab-list': {
                        templateUrl: "templates/admin/addTaxi.html",
                        controller: "getAssocCtrl"
                        }
                    }
            })
        
            //finds Add Route view
            .state('tab.app-addRoute', {
                url: "/addRoute",
                views: {
                    'tab-list': {
                        templateUrl: "templates/admin/addRoute.html",
                        controller: "addRouteCtrl"
                    }
                }
            })
        
            //finds update route view
            .state('tab.app-updateRoute',{
                   url: "/updateRoute",
                   views: {
                       'tab-list': {
                           templateUrl: "templates/admin/updateRoute.html",
                           controller: "getTaxiRouteCtrl"
                       }
                   } 
              })
        
            //finds update taxi fare
            .state('tab.app-updateTaxiFare', {
                url: "/updateTaxiFare",
                views: {
                    'tab-list': {
                        templateUrl: "templates/admin/updateTaxiFare.html",
                        controller: "getTaxiRouteCtrl"
                    }
                }
            })

            // login state that is needed to log the user in after logout
            // or if there is no user object available
            .state('app-login', {
                url: "/login",
                templateUrl: "templates/user/login.html",
                controller: "LoginController"
            })

            // setup an abstract state for the tabs directive, check for a user
            // object here is the resolve, if there is no user then redirect the
            // user back to login state on the changeStateError
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html",
                resolve: {
                    user: function (UserService) {
                        var value = UserService.init();
                        return value;
                    }
                }
            })

            // Each tab has its own nav history stack:
            .state('tab.list', {
                url: '/list',
                views: {
                    'tab-list': {
                        templateUrl: 'templates/tab-list.html',
                        controller: 'ListCtrl'
                    }
                }
            })
            .state('tab.list-detail', {
                url: '/list/:itemId',
                views: {
                    'tab-list': {
                        templateUrl: 'templates/list-detail.html',
                        controller: 'ListDetailCtrl'
                    }
                }
            })

            .state('tab.account', {
                url: '/account',
                cache: false,
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/list');

    })


    //Sharing the application with your finds
    //.controller("ListCtrl", function($scope, $cordovaSocialSharing) {
    //    $scope.shareViaTwitter = function() {
    //        alert("Share working");
    //        //$cordovaSocialSharing.shareViaTwitter("Check out this cool app I'm using called IonicProject for " + device.platform, null, device.platform == "Android" ? "GOOGLE_PLAY_URL" : "ITUNES_URL");
    //        $cordovaSocialSharing.share("Catching a taxi has never been this easy", " download appKwela ", "www/imagefile.png", "http://blog.nraboy.com");
    //    }
    //})




    //feeds api
    .controller('trafficFeedsCtrl', function ($scope, $state, $cordovaGeolocation, $http,$ionicPopup,$timeout) {
        $scope.posts = [];

        // set the feed url
        var url = "http://feeds.news24.com/articles/news24/TopStories/rss";
        // set the url to google, to convert the cml feed to json
        var google_converter = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=";

        // start the request
        var request = $http.jsonp(google_converter + encodeURIComponent(url));
        // after the request is successful
        request.success(function (res) {
            // pass the requested entries to the view
            $scope.posts = res.responseData.feed.entries;
        });

         //Modal code to display data from the api
        $scope.showPopup = function (post) {
            //alert("Ok i am hit");
            $scope.data = {};
 console.log(post);

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                title: post.title,
                template: post.content+''+ post.publishedDate,
                scope: $scope,
                buttons: [
                    {text: 'Cancel'}

                ]
            });

            myPopup.then(function (res) {
                console.log('Tapped!', res);
            });

        };



    })






    //Traffic controller here
    .controller('TrafficCtrl', function ($scope, $state, $cordovaGeolocation) {

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: {lat: -26.0096732, lng: 27.5669173}
        });

        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);

    })


    .run(function ($ionicPlatform, $rootScope, $state) {
        $rootScope.$on('$stateChangeError',
            function (event, toState, toParams, fromState, fromParams, error) {

                debugger;

                console.log('$stateChangeError ' + error && (error.debug || error.message || error));

                // if the error is "noUser" the go to login state
                if (error && error.error === "noUser") {
                    event.preventDefault();

                    $state.go('app-login', {});
                }
            });

        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    });

