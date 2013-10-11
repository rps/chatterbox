


var Message = Backbone.Model.extend({

});

var AllMessages = Backbone.Collection.extend({

  model: Message, // no parens because Message is a class
  url: 'https://api.parse.com/1/classes/chatterbox',
  
  initialize: function(){
    // this.fetchMessages();
  },
  
  fetchMessages: function(){
    var that = this;
    this.fetch({
      data: {
        'order': '-createdAt',
        'limit': 10
      },
      success: function(model, data){
        that.set(data.results.map(function(msg){
          return new Message(msg);
        }));
      }
    });
  }



});

var MessageViewer = Backbone.View.extend({

  initialize: function(){
    this.report();
    this.collection.on('add',this.con,this);
  },

  report: function(){
    console.log(this.collection)
  },

  con: function(e){
    this.report();
  }

});

var allMessages = new AllMessages();
var messageViewer = new MessageViewer({collection:allMessages});
allMessages.fetchMessages();
































// var AllMessages = Backbone.Collection.extend({

//   model: Message,
//   url: 'http://arestfulapi.com',

//   fetchMessages: function(){
//     var that = this;
//     this.fetch({
//       data: {
//         'order': '-createdAt',
//         'limit': 10
//       },
//       success: function(model, data){
//         // we want the array in data.results
//         that.set(data.results) // this should trigger a change/set event ?
//       }
//     });
//   }
// });


// var MessageViewer = Backbone.View.extend({

//   initialize: function(){
//     this.collection.on('set',this.log,this); // does not get called from above
//   },

//   log: function(e){
//     console.log('triggered');
//   }

// });
// Instantiation

// var allMessages = new AllMessages();
// var messageViewer = new MessageViewer({collection:allMessages});












