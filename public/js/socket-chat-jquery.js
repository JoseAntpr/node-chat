// Render users
var params = new URLSearchParams(window.location.search);

var socket = io();

var name = params.get('name');
var sala = params.get('sala');

// Jquery References
var divUsers = $('#divUsuarios');
var sendForm = $('#sendForm');
var txtMessage = $('#txtMessage');
var divChatBox = $('#divChatbox');

function renderUsers(users) {
  console.log(users);

  var html = '';

  html +='<li>';
  html += '<a href="javascript:void(0)" class="active">Chat de <span>'+ params.get('sala')+'</span></a>';
  html +='</li>';

  for( var i = 0; i < users.length; i++) {
    html +='<li>'
    html +='<a data-id="'+ users[i].id +'" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>'+ users[i].name +' <small class="text-success">online</small></span></a>'
    html +='</li>'
  }

  divUsers.html(html);
}

function renderMessages( message ) {

    var html = ''; 


    html += '<li class="animated fadeIn">';
    html +=  '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
    html +=       '<div class="chat-content">';
    html +=          '<h5>' + message.name +'</h5>';
    html +=       '<div class="box bg-light-info">'+ message.message +'</div>';
    html +=   '</div>';
    html +=  '<div class="chat-time">10:56 am</div>';
    html +='</li>';

    divChatBox.append(html);

}


// Listeners

divUsers.on('click', 'a', function() {
    var id = $(this).data('id');

    if( id) {
        console.log(id);
    }
    
});

sendForm.on('submit', function(e){
    e.preventDefault();

    if( txtMessage.val().trim() === 0 ){
        return;
    }

    socket.emit('createMessage', {
        name: name,
        message: txtMessage.val()
    }, function( message ){
        txtMessage.val('').focus();
        renderMessages(message);
    });

});