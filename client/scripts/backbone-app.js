


var User = Backbone.Model.extend({
  url: 'https://api.parse.com/1/classes/chatterbox'

});

var Users = Backbone.Collection.extend({

});

// var Message = Backbone.Model.extend({
//   url: 'https://api.parse.com/1/classes/chatterbox'
// });

var Messages = Backbone.Collection.extend({
  url: 'https://api.parse.com/1/classes/chatterbox'
});

var MessageListView = Backbone.View.extend({
  el : $(".chatBox"),
  render : function () {
    var that = this;
    console.log(that);
    var messages = new Messages();
    messages.fetch({
      success: function(messages){
        console.log('success!',messages.models[0].get('results'));
        var template = _.template($('#message-template').html(), {messages: messages.models[0].get('results')}); // messages.models
        // console.log('template',template);  
        that.$el.html(template);
      }
    });
  }
});



Backbone.history.start();







// <td><%=thing['username']%></td>
//               <td><%=thing.text%></td>
//               <td><%=thing.roomname%></td>








// var getMessages = function(){
//   $.ajax({
    
//     type: 'GET',
//     contentType: 'application/json',
//     data: {
//      
//     },
//     success: function(data) {
//       console.log(data.results);
//     },
//     error: function (data) {
//       // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//       console.error('chatterbox: Failed to receive message');
//     }
//   });
// };




// var postMessage = function (msg,name,currentRoom) {
//   $.ajax({
//     url: 'https://api.parse.com/1/classes/chatterbox',
//     type: 'POST',
//     data: JSON.stringify(message(msg,name,currentRoom)),
//     contentType: 'application/json',
//     success: function (data) {
//       console.log('chatterbox: Message sent');
//     },
//     error: function (data) {
//       // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//       console.error('chatterbox: Failed to send message');
//     }
//   });
// };

