$(() => {
  $('.innerFrame').on('click', event => {
    $('#messageInput').focus()
  })

  let msg = {}
  let msgColor = 'lime'
  let pannelNo
  let comms = false
  let userName
  let mode = 'Config'
  let args
  let commandNames = ['setname', 'help']
  let clientName = ''

  let error = 'red'
  let server = '#ff72ff'
  let client = 'green'

  function clientSend(text, type) {
    let sender
    if(type == client) sender == clientName
    else sender == 'Server'
    $('#holder').append(`
        <div class="pannel" id="pannel-${pannelNo}">
          <p class="msg" style="color:${type}; margin-left: 5px;"> ${sender} > ${text}</p>
        </div>`)
    pannelNo++
  }

  clientSend('ahoy', server)

  $('#messageInput').on('keydown', event => {
    console.log(event.keyCode)



    if (event.keyCode == '13') { // if enter is pressed

      args = $('#messageInput').val().split(' ') // set arguments
      msg.content = $('#messageInput').val()

      if(msg.content == '' || msg.content == ' ') return

      

      if (mode == 'Config') {

        if (commandNames.includes(args[0])) { // if first word is recognised command
          msg.type = 'command'
          console.log('hujdfhhjskdbf')
        }

        if (msg.type == 'command') {
          if (msg.content == 'setname') {

          } else if (msg.content == 'help') {
            console.log('jaja')
            clientSend('Available commands are: /help, /setname')
          }
        } else {
          console.log('jajax')
          clientSend(`Command '${args[0]}' not recognised`, error)
        }

        //else clientSend('no', error)


      }


      /* if (val == '') return
      while (val.startsWith(' ')) val.replace(' ', '')
      if (val.startsWith('/')) msg.type = 'command'
      else msg.type = 'message' */



      console.log(msg.content)

      msg.color = msgColor

      $('#holder').append(`
        <div class="pannel" id="pannel-${pannelNo}">
          <p class="msg" style="color:${msg.color};">  > ${msg.content}</p>
        </div>`)

      socket.emit('msg', { //sends message
        msg: msg,
        pN: pannelNo,
        n: uN,
      })
    }
  })

  socket.on('msg', function (m) {
    if (mode != 'startup') return
    $('#holder').append(`
        <div class="pannel" id="pannel-${m.pN}">
          <p class="msg" style="color:${m.msg.color};">${m.msg.author + ' > '} ${m.msg.content}</p>
        </div>`)
  })
})