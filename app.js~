var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
}]);
myApp.config(function ($routeProvider) {
    
    $routeProvider
    
    .when('/reportes', {
        templateUrl: 'Reportes.html',
        controller: 'mainController'
    })
    .when('/crearproductos', {
        templateUrl: 'CrearProducto.html',
        controller: 'mainController'
    })
});
myApp.directive('invetarioNav', [function() {
  return {
      controller: 'mainController',
      templateUrl : 'InventarioNavbar.html'
  }
}]);