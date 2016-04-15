/**
 * beginnings of a controller to login to system
 * here for the purpose of showing how a service might
 * be used in an application
 */
angular.module('app.controllers', [ ])

    .controller('ListDetailCtrl', [
        '$state', '$scope', '$stateParams', 'UserService', 'ionic-material',   // <-- controller dependencies
        function ($state, $scope, $stateParams, UserService) {

            //$scope.index = $stateParams.itemId;
            //$scope.index =  $stateProvider.state;

        }])
    .controller('ListCtrl', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService, $cordovaSocialSharing) {

            //$scope.dataList = [ "One", " "];



            $scope.doLogoutAction = function () {
                UserService.logout().then(function () {

                    // transition to next state
                    $state.go('app-login');

                }, function (_error) {
                    alert("error logging in " + _error.debug);
                })
            };

        }])

    .controller('AccountCtrl', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {


            debugger;
            UserService.currentUser().then(function () {
                var userAc  =   $scope.user.username;

                //$scope.user = _user;
                //$scope.user.username =   userAc;

                console.log("Look up here "+ userAc);
            });


        }]);







