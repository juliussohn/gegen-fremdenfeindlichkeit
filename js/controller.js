var app = angular.module('gegen-fremdenfeindlichkeit', ['mgo-angular-wizard', 'ngAnimate','angular-centered']);
app.controller('appCtrl', function ($scope) {
    $scope.value = 0;
    $scope.number = 5;

});