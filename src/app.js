require('angular');

var app = angular.module('app', []);

app.controller('MainController', ['$scope',function($scope) {
    $scope.message = 'Angular Works after minification!'
}]);