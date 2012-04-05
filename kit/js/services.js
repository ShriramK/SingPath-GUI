/* http://docs.angularjs.org/#!angular.service */

/**
 * App service which is responsible for the main configuration of the app.
 */
function RouterCtrl($route) {
  $route.when('',         {template: 'includes/index_partial.html', controller: LoadPageCtrl});
  $route.when('/home',    {template: 'includes/home.html',          controller: LoadPageCtrl});
  $route.when('/ranking', {template: 'includes/home.html',          controller: LoadPageCtrl});
}
