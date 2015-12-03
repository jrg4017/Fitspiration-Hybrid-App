angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this ge is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

//.controller('FitspirationsCtrl', function($scope){
.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Oranges', id: 1 },
    { title: 'Apples', id: 2 },
    { title: 'Strawberry', id: 3 },
    { title: 'Watermelon', id: 4 }
  ];
})

.controller('TeamhomeCtrl', function($scope) {
  $scope.team = [
    { title: 'You uploaded a Day 1 Video', id: 1 },
    { title: 'Your team has been awarded 100pts!', id: 2 },
    { title: 'Challenge', id: 3 },
    { title: 'Scoreboard', id: 4 }
  ];
})

//.controller('FitspirationCtrl', function($scope){
.controller('PlaylistCtrl', function($scope, $stateParams) {
});

