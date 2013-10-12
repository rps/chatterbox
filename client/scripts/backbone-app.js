


var Message = Backbone.Model.extend({

  tagName: 'li',
  idAttribute :'objectId', // reads the message object's "objectId" attribute and saves ID as that

  render : function(){
    return _.template('<div class ="<%- objectId %>"><%- createdAt %> -- <%- username %>: <%- text %></div>',this.attributes);
  }

});

// var Inbox = Backbone.Collection.extend({
//   model: Message
// });

var AllMessages = Backbone.Collection.extend({

  model: Message, // no parens because Message is a class
  url: 'https://api.parse.com/1/classes/chatterbox',
  
  initialize: function(){
    var that = this;
    setInterval(function(){that.fetchMessages()},10000)
  },
  
  fetchMessages: function(){
    var that = this;
    this.fetch({
      // silent:true,
      data: {
        'order': '-createdAt',
        'limit': 10
      },
      success: function(model, data){
        // that.set(that.parse(data),{silent:true});
        that.trigger('change',this)
      }
    });
  },

  parse: function(response) {
    return response.results;
  }

});

var MessageViewer = Backbone.View.extend({

  initialize: function(){
    this.collection.on('change',this.change,this)
    this.collection.on('remove',this.remove,this);
    this.collection.on('add',this.add,this);
    this.collection.on('merge',this.add,this);

    // this.inbox = new Inbox();
    // this.inbox.on('change',this.inb,this)
    // this.inbox.on('remove',this.inbr,this);
    // this.inbox.on('add',this.inba,this);
    // this.inbox.on('merge',this.inb,this);
  },

  // inb: function(e){
  //   console.log('INB')
  // },

  // inba: function(e){
  //   console.log('ADD',e.id)
  // },

  // inbr: function(e){
  //   console.log('DEL')
  // },

  add: function(e){
    console.log('add')
    // this.$el.append(this.collection.render())
    // if(e.get('text') !== undefined){
    //   console.log('add',e.get('text'))
    //   this.$el.append(e.render())
    // }
  },

   change: function(e){
    console.log('change')
    // this.inbox.set(this.collection.models)
    // if(e.get('text') !== undefined){
    //   console.log('add',e.get('text'))
    //   this.$el.append(e.render())
    // }
  },

  merge: function(e){
    console.log('merge')
    // if(e.get('text') !== undefined){
    //   console.log('merge',e.get('text'))
    // }
  },  

  remove: function(e){
    console.log('remove')
    // this.$el.remove();
    // if(e.get('text') !== undefined){
    //   console.log('remove',e.get('text'))

      // var id = e.get('objectId');
      // console.log(this.$el.find(id))
      // this.$el.find(id).remove();
    // }
  },

  render: function(){
    // console.log(this.collection.models[2].render())
    this.$el.append(this.collection.models.map(function(item){
      return item.render();
    }));
  }


});

var allMessages = new AllMessages();
var messageViewer = new MessageViewer({ el: $('body'), collection:allMessages});
allMessages.fetchMessages();


