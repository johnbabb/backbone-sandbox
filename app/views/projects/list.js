define([
    'jquery',
    'underscore',
    'backbone',
    "collections/consultants"
], function($, _, Backbone, Consultants) {
	return Backbone.View.extend({
		 initialize: function(options) {
		 	 console.log('loading projects list!');
		 }
	});
});