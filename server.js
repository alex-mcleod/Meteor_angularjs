var connect = Npm.require("connect");
var fs = Npm.require("fs");
var path = Npm.require("path");
var Fiber = Npm.require("fibers");

WebApp.connectHandlers
    .use(connect.query())
    .use(function (req, res, next) {
      
      // Need to create a Fiber since we're using synchronous http calls
      Fiber(function() {
        try{
         var code = fs.readFileSync(path.resolve('bundle/app.html'));
        }catch(e){
          var code = fs.readFileSync(path.resolve('../client/app.html'));
        }
        
        var angular = "";
        try{ 
          angular = fs.readFileSync(path.resolve('bundle/static/angular.html'));
        }catch(e){
          angular = fs.readFileSync(path.resolve('../../../../../public/angular.html'));
        }
        
        code = new String(code);
        code = code.replace("<body>", new String(angular));
        code = code.replace("<html##HTML_ATTRIBUTES##>",'<html ng-app="meteorApp">');
        if (typeof __meteor_runtime_config__ !== 'undefined') {
          code = code.replace(
            "##RUNTIME_CONFIG##",
            "<script type='text/javascript'>" + "__meteor_runtime_config__ = " +
              JSON.stringify(__meteor_runtime_config__) + ";" + "</script>");
          }
          // Hack to remove ##ROOT_URL_PATH_PREFIX## from static files. 
          code = code.replace(/##ROOT_URL_PATH_PREFIX##/g, "");
      
          res.writeHead(200, {'Content-Type': 'text/html'});  
          res.write(code);
          res.end();
          return;
      }).run();
});
