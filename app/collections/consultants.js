define("backbone",
'backbone.localStorage', function(Backbone) {
    var Conslutants = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("/api/v1/consultants") // Unique name within your app.
    });

    return Consultants;
});