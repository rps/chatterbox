$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  console.log(a);
  $.each(a, function() {
      if (o[this.name] !== undefined) {
          if (!o[this.name].push) {
              o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
      } else {
          o[this.name] = this.value || '';
      }
  });
  return o;
};


var Message = Backbone.Model.extend({
  url: 'https://api.parse.com/1/classes/chatterbox'
});

var Messages = Backbone.Collection.extend({
  model: Message,
  url: 'https://api.parse.com/1/classes/chatterbox',
     initialize : function(){
        console.log('tagfeed model is initialized');
        this.on("change", function(){
            console.log("An attribute has been changed");
        });
    }
});

var MessageListView = Backbone.View.extend({

  initialize : function () {
    this.listenTo(this.model, 'change', this.render);
  },

  el : $(".chatBox"),

  currentRoom : 'lobby',

  render : function () {

    var that = this;
    this.model.fetch({
      success: function(messages){         
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
    'click .changeRoom': 'changeRoom',
    'click .sendMsg': 'postText',
  },

  changeRoom : function () {
    this.currentRoom = $('.roomInput').val();
    this.render();
  },

  postText : function () {
    this.model.create({
      'roomname':this.currentRoom,
      'text':$('.chatInput').val(),
      'username':window.location.search.slice(window.location.search.indexOf('=')+1)
    });
  }

});

var Router = Backbone.Router.extend({
  routes: {
    '':'home'
  }
});

// Backbone.history.start();