angular.module('myApp').controller('mainController', ['$scope', '$log','$http','$location', function($scope, $log,$http,$location) {
    $scope.name = 'Main';
    var ctrl = this;
    
    ctrl.init = function(){
        
    };
    
    
    ctrl.init();
}]);
