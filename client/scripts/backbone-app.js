
var Messages = Backbone.Collection.extend({
  url: 'https://api.parse.com/1/classes/chatterbox'

});

var MessageListView = Backbone.View.extend({

  initialize : function () {
    if(this.collection){
    this.collection.on('change', this.render, this);
    }
  },

  el : $(".chatBox"),

  currentRoom : $('.roomInput').val() || 'lobby',

  render : function () {

    var that = this;
    var messages = new Messages();
    console.log('room is',that.currentRoom);
    messages.fetch({
      success: function(messages){
        // console.log('success!',messages.models[0].get('results'));
        var template = _.template($('#message-template').html(), {messages: messages.models[0].get('results')}); // messages.models
        that.$el.html(template);
      },
      data : {
      'order': '-createdAt',
      'limit': 20,
      'roomname':that.currentRoom
      }
    });
  },

  events : {
    'submit .roomsChange': 'changeRoom'
  },

  changeRoom : function (e) {
    e.preventDefault();
    console.log('rendered');
    this.render();

  }
});



Backbone.history.start();

