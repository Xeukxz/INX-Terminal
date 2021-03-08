const express = require('express')
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
let userid = 0

var users = {}
/*   var usersid = {} */

function findObjectByKey(array, key, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] == value) {
      return array[i];
    }
  }
  return null;
}

app.use('/', express.static(__dirname + '/public'))

/*
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});
*/



io.on('connection', (socket) => {
  console.log(socket.id + ' connected');

  // adds new users to the users database
  /*   usersl.set(socket.id, {
      username: undefined,
      load: 1
    }) */


  users[socket.id] = {
    username: undefined,
    load: 1,
    id: socket.id,
    userid: userid
  }

  console.log(users)
  if (users[socket.id] == undefined) return
  console.log('pp ' + users.length)
  console.log('1 ' + users[socket.id])
  console.log('2 ' + users[socket.id].load)
  console.log('3 ' + users[socket.id].id)


  socket.on('usernames', (u) => {
    // updates users username

    users[u.id] = {
      username: u.u,
      load: 2,
      id: u.id,
      userid: users[u.id].userid
    }

    userid++

    io.emit('usernames', u)

    console.log(users)

    io.emit('usersLoad', {
        users: users, 
        length: Object.keys(users).length,
      })

/*       console.log('croc' + users.length)
    console.log(Object.keys(users).length) */
  })


  /* socket.broadcast.emit('hi'); */

  socket.on('userTyping', (msg) => {
    console.log(msg);
    io.emit('userTyping', msg);
  })

  socket.on('msg', (msg) => {
    console.log('message: ' + msg);
    io.emit('msg', msg);
  });

  socket.on('disconnect', () => {

    if (users[socket.id].load != 2) {
      delete users[socket.id]
      return
    }

    let user = users[socket.id]

    console.log(`${users[socket.id]} (${users[socket.id].username}) disconnected`)


    io.emit('msg', {
      m: `${users[socket.id].username} has disconnected`, //announcing disconnection
      c: "yellow",
      n: 'Server',
    })

    io.emit('usersUpdate', {
      u: user[socket.id],
      id: socket.id,
    })
    delete users[socket.id]
    users[socket.id]
  });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

io.emit('some event', {
  someProperty: 'some value',
  otherProperty: 'other value'
}); // This will emit the event to all connected sockets