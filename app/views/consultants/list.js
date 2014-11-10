define([
    'jquery',
    'underscore',
    'backbone',
    'collections/consultants',
    'views/consultants/list-detail',
    'text!templates/consultants-list.html',
    'text!templates/stats.html',
    'backbone.localStorage'
], function($, _, Backbone, ConsultantsCollection, ConsultantListDetailView, consultantListHtml, statsHtml) {
    return Backbone.View.extend({

        template: _.template(consultantListHtml),

        // Our template for the line of statistics at the bottom of the app.
        statsTemplate: _.template(statsHtml),

        // Delegated events for creating new items, and clearing completed ones.
        events: {
            "keypress #new-consultant":  "createOnEnter",
            "click #clear-completed": "clearCompleted",
            "click #toggle-all": "toggleAllComplete"
        },

        initialize: function(options) {

            this.Consultants = new ConsultantsCollection();

            this.Consultants.on('add', this.addOne, this);
            this.Consultants.on('reset', this.addAll, this);
            this.Consultants.on('all', this.render, this);

            // Render this view's blank template
            this.$el.html(this.template({}));

            this.Consultants.fetch();

            return this;
        },

        render: function() {

            var done = this.Consultants.done().length;
            var remaining = this.Consultants.remaining().length;

            if (this.Consultants.length) {
                this.$el.find("#main").show();
                this.$el.find("footer").show();
                this.$el.find("footer").html(this.statsTemplate({done: done, remaining: remaining}));
                this.$el.find("#toggle-all")[0].checked = !remaining;
            } else {
                this.$el.find("#main").hide();
                this.$el.find("footer").hide();
            }

            return this;
        },

        addOne: function(c) {
            var view = new ConsultantListDetailView({model: c});
            this.$el.find("#consultant-list").append(view.render().$el);
            return this;
        },

        addAll: function() {
            this.Consultants.each(this.addOne, this);
            return this;
        },

        createOnEnter: function(e) {
            if (e.keyCode != 13) return;
            if (!this.$el.find("#new-consultant").val()) return;
            this.Consultants.create({title: this.$el.find("#new-consultant").val(),done:false});
            this.$el.find("#new-consultant").val('');
            return this;
        },

        clearCompleted: function() {
            _.invoke(this.Consultants.done(), 'destroy');
            return false;
        },

        toggleAllComplete: function () {
            var done = this.$el.find("#toggle-all")[0].checked;
            this.Consultants.each(function (c) { c.save({'done': done}); });
            return this;
        }

    });
});