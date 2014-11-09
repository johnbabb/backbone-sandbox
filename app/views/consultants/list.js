define([
    'jquery',
    'underscore',
    'backbone',
    'collections/consultants',
    'views/consultants/list',
    'text!templates/consultants-list.html',
    'text!templates/stats.html',
    'backbone.localStorage'
], function($, _, Backbone, TodoCollection, TodoView, todoListHtml, statsHtml) {
    return Backbone.View.extend({

        // Our template for the list of todos
        template: _.template(todoListHtml),

        // Our template for the line of statistics at the bottom of the app.
        statsTemplate: _.template(statsHtml),

        // Delegated events for creating new items, and clearing completed ones.
        events: {
            "keypress #new-todo":  "createOnEnter",
            "click #clear-completed": "clearCompleted",
            "click #toggle-all": "toggleAllComplete"
        },

        // At initialization we bind to the relevant events on the `Todos`
        // collection, when items are added or changed. Kick things off by
        // loading any preexisting todos that might be saved in *localStorage*.
        initialize: function(options) {

            // Create our global collection of **Todos**.
            this.Todos = new TodoCollection();

            this.Todos.on('add', this.addOne, this);
            this.Todos.on('reset', this.addAll, this);
            this.Todos.on('all', this.render, this);

            // Render this view's blank template
            this.$el.html(this.template({}));

            this.Todos.fetch();

            return this;
        },

        // Re-rendering the App just means refreshing the statistics -- the rest
        // of the app doesn't change.
        render: function() {

            var done = this.Todos.done().length;
            var remaining = this.Todos.remaining().length;

            if (this.Todos.length) {
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

        // Add a single todo item to the list by creating a view for it, and
        // appending its element to the `<ul>`.
        addOne: function(todo) {
            var view = new TodoView({model: todo});
            this.$el.find("#todo-list").append(view.render().$el);
            return this;
        },

        // Add all items in the **Todos** collection at once.
        addAll: function() {
            this.Todos.each(this.addOne, this);
            return this;
        },

        // If you hit return in the main input field, create new **Todo** model,
        // persisting it to *localStorage*.
        createOnEnter: function(e) {
            if (e.keyCode != 13) return;
            if (!this.$el.find("#new-todo").val()) return;
            this.Todos.create({title: this.$el.find("#new-todo").val(),done:false}); // sync new model and add to our Todos collection
            this.$el.find("#new-todo").val('');
            return this;
        },

        // Clear all done todo items, destroying their models.
        clearCompleted: function() {
            _.invoke(this.Todos.done(), 'destroy');
            return false;
        },

        toggleAllComplete: function () {
            var done = this.$el.find("#toggle-all")[0].checked;
            this.Todos.each(function (todo) { todo.save({'done': done}); });
            return this;
        }

    });
});