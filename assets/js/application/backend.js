'use strict';

var Profile = Backbone.Model.extend({
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

var PF = new Profile({name: 'vender'});

PF.fetch({
  success: function (data) {
    console.log(data, PF.get('name'));
  }
})
