//the require library is configuring paths
require.config({
	baseUrl: '../app',
    paths: {
                //tries to load jQuery from Google's CDN first and falls back
                //to load locally
        jquery: ["http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min",
                    "../js/vendor/jquery/jquery"],
        underscore: "../js/vendor/underscore/underscore",
        backbone: "../js/vendor/backbone/backbone",
        'backbone.localStorage': '../js/vendor/backbone.localStorage/backbone.localStorage',        	
        router: "../js/router",
        text: "../js/vendor/text/text"
        
    },
    shim: {
        'jquery': {
            exports: '$',
        },
        'underscore': {
            exports: '_',
        },
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone',
        },
        'backbone.localStorage': {
            deps: ['backbone'],
            exports: 'Backbone.localStorage',
        }
    },
        //how long the it tries to load a script before giving up, the default is 7
    waitSeconds: 10
});
//requiring the scripts in the first argument and then passing the library namespaces into a callback
//you should be able to console log all of the callback arguments
require(['jquery', 'underscore', 'backbone', 'router'], function(jquery, _, Backbone, Router){
    window.App = new Router();
});