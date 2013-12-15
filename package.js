Package.describe({
  summary: "Angularjs"
});

Package.on_use(function (api) {
  Npm.depends({
    connect: '2.8.8'
  });

  api.use('webapp', ['server']);

  api.add_files('angular/angular.js', 'client');
  api.add_files('angular/angular-animate.js', 'client');
  api.add_files('angular/angular-cookies.js', 'client');
  api.add_files('angular/angular-loader.js', 'client');
  api.add_files('angular/angular-mocks.js', 'client');
  api.add_files('angular/angular-resource.js', 'client');
  api.add_files('angular/angular-route.js', 'client');
  api.add_files('angular/angular-sanitize.js', 'client');
  api.add_files('angular/angular-scenario.js', 'client');
  api.add_files('angular/angular-touch.js', 'client');

  api.add_files('client.js', 'client');
  
  api.add_files('server.js', 'server');
});