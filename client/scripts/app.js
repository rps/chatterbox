var allRooms = ['lobby'];
var currentRoom = 'lobby';
var friends = {};

$(document).ready( function () {
  var name = prompt('What is your name?','Anonymous');
  var limit = 10;
  getMsgs(limit,currentRoom);
  setInterval(function(){
    getMsgs(limit,currentRoom);
    _.each(allRooms, function (room) {
      if ($('.'+room).length === 0){
        var temp = $('<a href = "#">')
          .attr('class',room)
          .text(room)
          .on('click',function(){
            currentRoom = room;
            $('h1').text(currentRoom);
            $('.messagelist').empty();
          });
        $('.rooms').append($('<div>')).append(temp);
      }
    });
  }, 1000);
  $('button').on('click',function(){
    postMsg($('input').val(),name,currentRoom);
    $('input').val('');
  });
});



var msgCount = 0;
var myDate = 0 ;


var message = function(msg,username,room) {
  return {
  'username': username,
  'text': msg,
  'roomname': room
  };
};

var getMsgs = function(limit,currentRoom){
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    contentType: 'application/json',
    data: {
      'order': '-createdAt',
      'limit': limit,
      'roomname':'lobby'
      // 'where': {'createdAt':{'$gte':{'type':'Date','iso':'2011-08-21T18:02:52.249Z'}}}
    },
    success: function(data) {

      _.each(data.results,function(result, i){
        if(allRooms.indexOf(result.roomname) === -1){
          allRooms.push(result.roomname);
        }
        if(Date.parse(result.createdAt) > myDate &&
          result.text.indexOf('<script>') === -1 &&
          result.roomname === currentRoom &&
          result.text.indexOf('alert(') === -1) {
            $('.main').append($('<div>').attr('class', 'separation'));
            $('.main').append($('<a href="#">').attr('class',result.username + " separation").html("</br> <b>" + result.username + "</b> </br> "));
            $('.main').append($('<p>').html(result.text + " @ " + formatTime(result.createdAt)));
            msgCount ++;
            myDate = Date.parse(data.results[0].createdAt);
            if (msgCount > 10) {
              $('p').eq(0).remove();
            }
        }
      });
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message');
    }
  });
};


function formatTime(timestamp){
  var d = new Date(timestamp);
  return (d.getMonth()+1) + '/' + d.getDate() + '/' + (d.getYear()-100) + ' - ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
}

var postMsg = function (msg,name,currentRoom) {
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message(msg,name,currentRoom)),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

