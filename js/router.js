define([
    'jquery',
    'backbone'
], function($, Backbone) {
    return Backbone.Router.extend({
	    routes: {
	      // Define some URL routes
	      'projects': 'showProjects',
	      'consultants': 'showConsultants',
	      '': 'showConsultants'
	    },
	    showProjects: function() {
	        this.setView({
	            name: 'projects/list'
	        });
	        return this;
	    },
	    showConsultants: function() {
	        this.setView({
	            name: 'consultants/list'
	        });
	        return this;
	    },
	    // start Backbone Hashtag routing
	    initialize: function(options) {
	        Backbone.history.start();
	        return this;
	    },
	    setView: function(options) {
	        $.proxy(require(['views/'+options.name], function(View) {
	            if (this.view)
	                this.view.remove();
	            this.view = new View(options);
	            $('#app-root').append(this.view.render().$el);
	        }), this);
	        return this;
	    }
    });
});