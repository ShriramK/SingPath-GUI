/* http://docs.angularjs.org/#!angular.service */

/**
 * App service which is responsible for the main configuration of the app.
 */
angular.service('myAngularApp', function($route, $location, $window) {

  $route.when('', {template: 'includes/index_partial.html', controller:LoadPageCtrl});
  $route.when('/home', {template: 'includes/home.html', controller:LoadPageCtrl});
  $route.when('/ranking', {template: 'includes/home.html', controller:LoadPageCtrl});
  //$route.when('/view2', {template: 'partials/partial2.html', controller: MyCtrl2});

  var self = this;

  $route.onChange(function() {
    if ($location.hash === '') {
      $location.updateHash('');
      //self.$eval();
    } 
    else {
      //$route.current.scope.params = $route.current.params;
      //$window.scrollTo(0,0);
    }
  });

}, {$inject:['$route', '$location', '$window'], $eager: true});
