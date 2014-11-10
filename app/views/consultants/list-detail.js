define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/consultants-list-detail.html'
], function($, _, Backbone, detailHtml) {
    return Backbone.View.extend({

        //... is a list tag.
        tagName:  "li",

        // Cache the template function for a single item.
        template: _.template(detailHtml),

        // The DOM events specific to an item.
        events: {
            "click .toggle"   : "toggleDone",
            "dblclick .view"  : "edit",
            "click a.destroy" : "clear",
            "keypress .edit"  : "updateOnEnter",
            "blur .edit"      : "close"
        },

        initialize: function(options) {
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
            return this;
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass('done', this.model.get('done'));
            this.input = this.$el.find('.edit');
            return this;
        },

        toggleDone: function() {
            this.model.save({done: !this.model.get('done')});
            return this;
        },

        edit: function() {
            this.$el.addClass("editing");
            this.input.focus();
            return this;
        },

        close: function() {
            var value = this.input.val();
            if (!value) {
              this.clear();
            } else {
              this.model.save({title: value});
              this.$el.removeClass("editing");
            }
            return this;
        },

        updateOnEnter: function(e) {
            if (e.keyCode == 13)
                this.close();
            return this;
        },
        	
        clear: function() {
            this.model.destroy();
            return this;
        }

    });
});