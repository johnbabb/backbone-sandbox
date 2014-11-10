define(["backbone",
'backbone.localStorage'], function(Backbone) {
    var Consultants = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("/api/v1/consultants"), // Unique name within your app.
        
        done: function() {
            return this.filter(function(c){ return c.get('done'); });
        },
        	     
        remaining: function() {
            return this.without.apply(this, this.done());
        },
        	
        nextOrder: function() {
            if (!this.length) return 1;
            return this.last().get('order') + 1;
        },

        comparator: function(c) {
            return c.get('order') || this.nextOrder();
        }
    });

    return Consultants;
});