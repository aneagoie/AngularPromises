// Promises are built off of the q library and they can use them using $q in angular
// Promises represent a result of an action that is performed asynchroneously
// and may or may not be finished at some point in time.
// $http is built on top of the promises library in Angular
var app = angular.module('app', []);
// $timeout is like setTimeout in javascript
app.controller('MainController', function($scope, $q, $timeout){
  $scope.mydata = "old data";
  // we're grabbing a defer object returned from the q library
  // using the defer() method.
  var defer = $q.defer();
  // defer.promise allows us to create the then clause.
  // this says what will happen when the task is finished.
  defer.promise
    .then(function(val){
      $scope.mydata += val;
      return val;
    })
    // you can chain promises
    .then(function(val){
      $scope.mydata += val;
      return val;
    });
  // when defer.resolve is invoked and will take 3 seonds to complete
  $timeout(function() {
    defer.resolve("New data!");
  }, 3000);
});

// Angular Resolve option:
// we want to prepare someething and have it finish before we put it in the view.
app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'view.html',
      // nothing will happen until everything in here is resolved.
      // resolve won't return things in order, just how they are finished.
      resolve: {
        data1: function($q, $timeout) {
          var defer = $q.defer();
          $timeout(function() {
            defer.resolve();
            console.log('finished');
          }, 2000);
          return defer.promise;
        }
      }
    })
    .otherwise({template: "Couldn't match route"});
});


