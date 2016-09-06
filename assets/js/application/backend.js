'use strict';

var _ = require('underscore');
var $ = require('jquery');

var Model;
var Collection;
var View;

var Profile;
var Profiles;
var ViewProfile;

var template = (function() {
  return '<div class="panel">' + 
  '<select>' +
    '<option value="<%= name %>"><%= name %></option>' +
  '</select></div>';
}());

Model = Backbone.Model.extend({
  defaults: {
    'name': 'defaults'
  },

  url: '/storage',

  initialize: function () {
    this.listenTo(this, 'change', function () {
      console.log('change ->', this.get('name'));
    })
  }
});

Collection = Backbone.Collection.extend({});

View = Backbone.View.extend({
  el: $('body'),

  template: _.template(template),

  initialize: function () {
    this.render();
  },

  render: function (argument) {
    this.$el.append(this.template({name: this.model.get('name')}));
  }
});

Profile = new Model();
Profiles = new Collection();

Profiles.add(({model: Profile}));

Profile.fetch({
  success: function(data) {
    ViewProfile = new View({model: data});
  },

  erroe: function(argument) {
    ViewProfile = new View({model: Profile});
  }
});
