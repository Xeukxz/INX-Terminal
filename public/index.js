$(() => {
  $('.innerFrame').on('click', event => {
    $('#messageInput').focus()
  })

  let msg = {}
  let msgColor = 'lime'
  let pannelNo
  let comms = false
  let userName
  let mode = 'config'
  let args
  let commandNames = ['setname']

  let error = 'red'
  let server = '#ff72ff'

  function clientSend(text, type) {
    $('#holder').append(`
        <div class="pannel" id="pannel-${pannelNo}">
          <p class="msg" style="color:${type}; margin-left: 5px;"> Server > ${text}</p>
        </div>`)
    pannelNo++
  }

  clientSend('ahoy', server)

  $('#messageInput').on('keydown', event => {
    console.log(event.keyCode)



    if (event.keyCode == '13') {

      args = $('#messageInput').val().split(' ')

      if (mode == 'config') {
        if (commandNames.includes(args[0])) msg.type = 'command'
        else clientSend('no', error)


      }


      if (val == '') return
      while (val.startsWith(' ')) val.replace(' ', '')
      if (val.startsWith('/')) msg.type = 'command'
      else msg.type = 'message'



      msg.content = $('#messageInput').val()
      console.log(message)

      msg.color = msgColor

      $('#holder').append(`
        <div class="pannel" id="pannel-${pannelNo}">
          <p class="msg" style="color:${msg.color};"> >${msg.content}</p>
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