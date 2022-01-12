run_python = function () {
  let user = document.getElementById('users_name').value
  let connections = document.getElementById('num_of_connections').value
  let start_from = document.getElementById('start_from').value
  if (user == '' || connections == '' || start_from == '') {
    return
  }
  console.log('user: ' + user + 'connections : ' + connections + 'start_from : ' + start_from)
  console.log('run python from client')
  $.ajax({
    type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
    url: '/updateJson/1', // the url where we want to POST
    contentType: 'application/json',
    data: JSON.stringify({
      user: user,
      connections: connections,
      start_from: start_from,
    }),
    processData: false,
    encode: true,
    success: function () {
      // console.log("success");
      callPython2()
      alert('Before making more action, please wait until this action end.')
      //window.location.href = "/runPy";
    },
    error: function (jqXhr, textStatus, errorThrown) {
      alert(errorThrown)
      window.location.href = '/mainPage'
    },
  })
  alert('1')

  alert('nir')
}
callPython2 = function () {
  console.log('callpython2')
  $.ajax({
    type: 'get', // define the type of HTTP verb we want to use (POST for our form)
    url: '/addCon', // the url where we want to POST
    success: function () {
      console.log('addCon is called from client')
    },
    error: function (jqXhr, textStatus, errorThrown) {
      alert(errorThrown)
    },
  })

  alert('nir')
}
