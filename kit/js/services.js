// Responsible for all page routing
function RouterCtrl($route) {
  $route.when('',         {template: 'includes/index_partial.html', controller: LoadPageCtrl});
  $route.when('/home',    {template: 'includes/home.html',          controller: LoadPageCtrl});
  $route.when('/ranking', {template: 'includes/home.html',          controller: LoadPageCtrl});
}
